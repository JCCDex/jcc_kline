<template>
    <div id="macd" ref="macd"></div>
</template>
<script>
import { splitData, getDepthData } from '../js/processData'
import ChartController from '../js/Charts'
import { getLanguage } from '../js/utils'
export default {
  name: "macd",
  data() {
    return {
      kline: null,
      coinType: '',
      platform: 'pc',
      chartType: 'macd',
      macdSize: {
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
    // klineDataObj() {
    //   if (this.klineDataObj) {
    //     let macdData = getDepthData(this.klineDataObj.macdData, this.klineDataObj.coinType);
    //     if (macdData) {
    //       if(JSON.stringify(this.coinType) !== JSON.stringify(this.klineDataObj.coinType)) {
    //         this.clearChart();
    //         this.macd.setDepthOption(macdData)
    //         this.coinType = this.klineDataObj.coinType
    //       }else {
    //         this.macd.updateDepthOption(macdData)
    //       }
    //     }
    //   }
    // },
    klineConfig() {
      if (this.klineConfig.platform === 'pc') {
        let size = {
          width: this.klineConfig.size.width + 'px',
          height: this.klineConfig.size.height + 'px'
        }
        if (JSON.stringify(size) !== JSON.stringify(this.macdSize) && this.klineConfig.defaultSize === false) {
          this.macdSize = {
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
        this.macdSize.height = this.klineConfig.size.height + 'px'
        this.macdSize.width = this.klineConfig.size.width + 'px'
      } else {
        this.macdSize = {
          height: '100%',
          width: '572px'
        }
      }
    } else {
      this.macdSize.height = this.klineConfig.macdSize.height + 'px'
      this.macdSize.width = this.klineConfig.macdSize.width + 'px'
    }
    this.klineConfig.chartType = 'macd';
    this.macd = new ChartController(this.klineConfig);
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
      this.macd.initDepth(this.$refs.macd);
      this.resize();
    },
    resize() {
      if (this.klineConfig.platform === 'pc') {
        let isFullScreen = this.$parent.getState()
        this.macd.resizeDepthChart(this.$refs.macd, isFullScreen, this.klineConfig.size);
      }
      
    },
    clearChart() {
      this.macd.clearDepthEcharts();
    },
    dispose() {
      this.macd.disposeDepthEChart()
    }
  }
}
</script>