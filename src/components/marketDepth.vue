<template>
    <div id="depth" ref="depth" :style="{height: `${klineConfig.depthSize.height}`, width: `${klineConfig.depthSize.width}`}"></div>
</template>
<script>
import { splitData, getDepthData } from '../js/processData'
import ChartController from '../js/Charts'
import { getLanguage } from '../js/utils'
export default {
  name: "depth",
  data() {
    return {
      kline: null,
      coinType: '',
      platform: 'pc',
      chartType: 'depth'
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
          platform: 'pc',
          chartType: 'depth'
        }
      }
    }
  },
  watch: {
    klineDataObj() {
      if (this.klineDataObj) {
        let depthData = getDepthData(this.klineDataObj.depthData, this.klineDataObj.coinType);
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
  created() {
    if (this.klineConfig.platform === 'pc') {
      this.klineConfig.depthSize = {
        height: '100%',
        width: '572px'
      }
    } else {
      this.klineConfig.depthSize.height = this.klineConfig.depthSize.height + 'px'
      this.klineConfig.depthSize.width = this.klineConfig.depthSize.width + 'px'
    }
    this.klineConfig.chartType = 'depth';
    this.depth = new ChartController(this.klineConfig);
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
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
        this.depth.resizeDepthChart(this.$refs.depth, isFullScreen);
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