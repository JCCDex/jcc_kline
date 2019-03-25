<template>
  <div ref="volume" :style="{height: `${volumeSize.height}`, width: `${volumeSize.width}`}" @mousemove="getToolTipIndex()"></div>
</template>
<script>
import { splitData, getDepthData } from '../js/processData'
import ChartController from '../js/Charts'
import { getLanguage } from '../js/utils'
export default {
  name: "volume",
  data() {
    return {
      volume: null,
      coinType: '',
      currentCycle: '',
      refreshCycle: 0,
      isRefresh: true,
      chartType: 'volume',
      volumeSize: {
        height: '',
        width: ''
      }
    };
  },
  props: {
    chartDataObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    klineConfig: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    resizeSize: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    cycle: {
      type: String,
      default: 'hour'
    }
  },
  watch: {
    cycle () {
      if (this.cycle !== this.currentCycle) {
        this.clearChart();
        this.volume.showLoading()
        this.isRefresh = true
      }
      this.currentCycle = JSON.parse(JSON.stringify(this.cycle))
    },
    resizeSize() {
      this.resize()
    },
    chartDataObj() {
      if (this.chartDataObj.candleData && this.currentCycle !== 'everyhour') {
        let data = this.chartDataObj.candleData
        data.precision = this.chartDataObj.precision
        if (data.values && data.volumes && data.categoryData) {
          if(JSON.stringify(this.coinType) !== JSON.stringify(this.chartDataObj.coinType) || this.isRefresh) {
            let toolTipIndex = this.volume.setVolumeOption(data, this.currentCycle)
            this.isRefresh = false
            this.$emit("listenToTipIndex", toolTipIndex)
            this.$emit("listenVolumeChartEvent", this.volume.getVolumeEchart())
            this.coinType = this.chartDataObj.coinType
          }else {
            this.volume.updateVolumeOption(data, this.currentCycle)
          }
        }
      }
      if (this.currentCycle === "everyhour" && this.chartDataObj.timeDivisionData) {
        let timeDivisionData = this.chartDataObj.timeDivisionData
        let divisionData = this.chartDataObj.divisionData
        if (this.isRefresh && divisionData.times !== null && divisionData.averages !== null && divisionData.prices !== null && divisionData.volumes !== null) {
          let toolTipIndex = this.volume.setVolumeOption(divisionData, this.currentCycle)
          this.isRefresh = false
          this.$emit("listenToTipIndex", toolTipIndex)
          this.$emit("listenVolumeChartEvent", this.volume.getVolumeEchart())
        } else {
           this.volume.updateVolumeOption(divisionData, this.currentCycle)
        }
      }
    },
    klineConfig() {
      if (this.klineConfig.platform === 'pc') {
        let size = {
          width: this.klineConfig.size.width + 'px',
          height: this.klineConfig.size.height + 'px'
        }
        if (JSON.stringify(size) !== JSON.stringify(this.volumeSize) && this.klineConfig.defaultSize === false) {
          this.volumeSize = {
            width: this.klineConfig.size.width + 'px',
            height: this.klineConfig.size.height * 0.25 + 'px'
          }
          this.resize();
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === 'pc') {
      if (!this.klineConfig.defaultSize) {
        this.volumeSize.height = this.klineConfig.size.height * 0.25 + 'px'
        this.volumeSize.width = this.klineConfig.size.width + 'px'
      } else {
        this.volumeSize = {
          height: '572px',
          width: '100%'
        }
      }
    } else {
      this.volumeSize.height = this.klineConfig.size.height * 0.4 + 'px'
      this.volumeSize.width = this.klineConfig.size.width + 'px'
    }
    this.klineConfig.chartType = 'volume';
    this.volume = new ChartController(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose()
  },
  methods: {
    init() {
      this.volume.initVolumeChart(this.$refs.volume);
      this.resize();
    },
    getToolTipIndex () {
      let toolTipIndex = this.volume.getToolTipIndex()
      this.$emit("listenToTipIndex", toolTipIndex)
    },
    resize() {
      if (this.klineConfig.platform === 'pc') {
        this.volume.resizeVolumeChart(this.$refs.volume, this.resizeSize.isFullScreen, this.klineConfig.size);
      }
    },
    clearChart() {
      this.volume.clearVolumeEcharts();
    },
    dispose() {
      this.volume.disposeVolumeEcharts()
    }
  }
}
</script>
