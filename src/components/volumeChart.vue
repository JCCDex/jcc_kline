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
      cycle: '',
      refreshCycle: 0,
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
    }
  },
  watch: {
    resizeSize() {
      this.resize()
    },
    chartDataObj() {
      if (this.chartDataObj.candleData && this.chartDataObj.cycle !== 'everyhour') {
        let data = this.chartDataObj.candleData
        data.precision = this.chartDataObj.precision
        if (data.values && data.volumes && data.categoryData) {
          if(JSON.stringify(this.coinType) !== JSON.stringify(this.chartDataObj.coinType) || this.chartDataObj.cycle !== this.cycle) {
            this.clearChart();
            this.refreshCycle = 0
            this.cycle = this.chartDataObj.cycle
            let toolTipIndex = this.volume.setVolumeOption(data, this.cycle)
            this.$emit("listenToTipIndex", toolTipIndex)
            this.$emit("listenVolumeChartEvent", this.volume.getVolumeEchart())
            this.coinType = this.chartDataObj.coinType
          }else {
            this.volume.updateVolumeOption(data, this.cycle)
          }
        }
      }
      if (this.chartDataObj.cycle === "everyhour" && this.chartDataObj.timeDivisionData) {
        this.cycle = this.chartDataObj.cycle
        let timeDivisionData = this.chartDataObj.timeDivisionData
        let divisionData = this.chartDataObj.divisionData
        if (this.refreshCycle !== 1 && divisionData.times !== null && divisionData.averages !== null && divisionData.prices !== null && divisionData.volumes !== null) {
          this.clearChart();
          let toolTipIndex = this.volume.setVolumeOption(divisionData, this.cycle)
          this.$emit("listenToTipIndex", toolTipIndex)
          this.refreshCycle = 1
          this.$emit("listenVolumeChartEvent", this.volume.getVolumeEchart())
        } else {
           this.volume.updateVolumeOption(divisionData, this.cycle)
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
          height: '107px',
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
        this.volume.resizeVolumeChart(this.$refs.volume, this.resizeSize.isFullScreen,　this.resizeSize.isCloseIndicator, this.klineConfig.size);
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
