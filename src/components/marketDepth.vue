<template>
    <div id="depth" ref="depth" :style="{height: `${depthSize.height}`, width: `${depthSize.width}`}"></div>
</template>
<script>
import { splitData, getDepthData } from '../js/processData'
import ChartController from '../js/Charts'
import { getLanguage } from '../js/utils'
export default {
  name: "depth",
  data() {
    return {
      depth: null,
      coinType: '',
      chartType: 'depth',
      depthSize: {
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
        let precision = {
          price: this.klineDataObj.pricePrecision,
          amount: this.klineDataObj.amountPrecision
        }
        if (this.klineDataObj.depthData) {
          let depthData = getDepthData(this.klineDataObj.depthData, this.klineDataObj.coinType, precision);
          depthData.precision = precision;
          if (depthData) {
            if(JSON.stringify(this.coinType) !== JSON.stringify(this.klineDataObj.coinType)) {
              this.clearChart();
              this.depth.setDepthOption(depthData)
              this.coinType = this.klineDataObj.coinType
            }else {
              this.depth.updateDepthOption(depthData)
            }
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
        if (JSON.stringify(size) !== JSON.stringify(this.depthSize) && this.klineConfig.defaultSize === false) {
          this.depthSize = {
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
        this.depthSize.height = this.klineConfig.size.height + 'px'
        this.depthSize.width = this.klineConfig.size.width + 'px'
      } else {
        this.depthSize = {
          height: '100%',
          width: '572px'
        }
      }
    } else {
      this.depthSize.height = this.klineConfig.depthSize.height + 'px'
      this.depthSize.width = this.klineConfig.depthSize.width + 'px'
    }
    this.klineConfig.chartType = 'depth';
    this.depth = new ChartController(this.klineConfig);
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
      this.depth.initDepth(this.$refs.depth);
      this.resize();
    },
    resize() {
      if (this.klineConfig.platform === 'pc') {
        let isFullScreen = this.$parent.getState()
        this.depth.resizeDepthChart(this.$refs.depth, isFullScreen, this.klineConfig.size);
      }
      
    },
    clearChart() {
      this.depth.clearDepthEcharts();
    },
    dispose() {
      this.depth.disposeDepthEChart()
    }
  }
}
</script>