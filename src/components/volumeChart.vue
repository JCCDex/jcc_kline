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
    isFullScreen: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  watch: {
    isFullScreen() {
      this.resize()
    },
    chartDataObj() {
      if (this.chartDataObj.candleData) {
        let data = this.chartDataObj.candleData
        data.precision = this.chartDataObj.precision
        if (data.values && data.volumes && data.categoryData) {
          if(JSON.stringify(this.coinType) !== JSON.stringify(this.chartDataObj.coinType) || this.chartDataObj.cycle !== this.cycle) {
            this.clearChart();
            this.cycle = this.chartDataObj.cycle
            this.volume.setVolumeOption(data, this.cycle)
            this.$emit("listenVolumeChartEvent", this.volume.getVolumeEchart())
            this.coinType = this.chartDataObj.coinType
          }else {
            this.volume.updateVolumeOption(data, this.cycle)
          }
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
          height: '100%',
          width: '572px'
        }
      }
    } else {
      this.volumeSize.height = this.klineConfig.volumeSize.height + 'px'
      this.volumeSize.width = this.klineConfig.volumeSize.width + 'px'
    }
    this.klineConfig.chartType = 'volume';
    this.volume = new ChartController(this.klineConfig);
  },
  mounted() {
    this.init();
    if (this.klineConfig.defaultSize === true) {
      window.addEventListener("resize", this.resize);
    }
  },
  beforeDestroy() {
    if (this.klineConfig.defaultSize === true) {
      window.removeEventListener("resize", this.resize);
    }
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
        this.volume.resizeVolumeChart(this.$refs.volume, this.isFullScreen.fullScreen, this.klineConfig.size);
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
