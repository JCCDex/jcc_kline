<template>
  <div ref="volume" :style="{height: `${volumeSize.height}`, width: `${volumeSize.width}`}"></div>
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
      chartType: 'volume',
      volumeSize: {
        height: '',
        width: ''
      }
    };
  },
  props: {
    klineDataObj: {
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
    }
  },
  watch: {
    klineDataObj() {
      if (this.klineDataObj) {
        let klineData = splitData(this.klineDataObj.klineData, this.platform)
        let depthData = getDepthData(this.klineDataObj.volumeData, this.klineDataObj.coinType);
          let data = Object.assign({}, klineData, depthData);
          if(JSON.stringify(this.coinType) !== JSON.stringify(this.klineDataObj.coinType)) {
            this.clearChart();
            this.volume.setVolumeOption(data)
            this.coinType = this.klineDataObj.coinType
          }else {
            this.volume.updateVolumeOption(data)
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
            height: this.klineConfig.size.height + 'px'
          }
          this.resize();
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === 'pc') {
      if (!this.klineConfig.defaultSize) {
        this.volumeSize.height = this.klineConfig.size.height + 'px'
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
    resize() {
      if (this.klineConfig.platform === 'pc') {
        // let isFullScreen = this.$parent.getState()
        this.volume.resizeVolumeChart(this.$refs.volume);
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
