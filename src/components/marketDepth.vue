<template>
    <div id="kline" ref="klineRef" style="width:100%;height:572px;"></div>
</template>
<script>
import { splitData, getDepthData } from '../js/processData'
import ChartController from '../js/Chart'
import { getLanguage } from '../js/utils'
export default {
  name: "depth",
  data() {
    return {
      kline: null,
      coinType: ''
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
        if (depthData !== null) {
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
      this.depth.initDepth(this.$refs.klineRef);
      this.resize();
    },
    resize() {
      this.depth.resizeDepthChart(this.$refs.klineRef, false, this.showChart);
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