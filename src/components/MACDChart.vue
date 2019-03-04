<template>
    <div ref="macd" :style="{height: `${macdSize.height}`, width: `${macdSize.width}`}"></div>
</template>
<script>
import ChartController from '../js/Charts'
import { getLanguage } from '../js/utils'
export default {
  name: "MACD",
  data() {
    return {
      coinType: '',
      chartType: 'MACD',
      macd: '',
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
    klineDataObj() {
      
    },
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
          height: '572px',
          width: '100%'
        }
      }
    } else {
      this.macdSize.height = this.klineConfig.macdSize.height + 'px'
      this.macdSize.width = this.klineConfig.macdSize.width + 'px'
    }
    this.klineConfig.chartType = 'MACD';
    this.Macd = new ChartController(this.klineConfig);
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
      this.macd.initMACD(this.$refs.macd);
      this.resize();
    },
    resize() {
      if (this.klineConfig.platform === 'pc') {
        let isFullScreen = this.$parent.getState()
        this.macd.resizeMACDChart(this.$refs.macd, isFullScreen, this.klineConfig.size);
      }
    },
    clearChart() {
      this.macd.clearMACDEcharts();
    },
    dispose() {
      this.macd.disposeMACDEChart()
    }
  }
}
</script>
