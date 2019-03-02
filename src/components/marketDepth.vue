<template>
    <div id="depth" ref="depth" :style="{height: `${depthSize.height}`, width: `${depthSize.width}`}"></div>
</template>
<script>
import { getDepthData } from '../js/processData'
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
    chartDataObj() {
      if (this.chartDataObj.depthData) {
        let data = this.chartDataObj.depthData
        data.precision = this.chartDataObj.precision
        if (data) {
          if(JSON.stringify(this.coinType) !== JSON.stringify(this.chartDataObj.coinType)) {
            this.clearChart();
            this.depth.setDepthOption(data)
            this.coinType = this.chartDataObj.coinType
          }else {
            this.depth.updateDepthOption(data)
          }
        }
      }
    },
    resizeSize() {
      this.resize()
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
  },
  beforeDestroy() {
    this.dispose()
  },
  methods: {
    init() {
      this.depth.initDepth(this.$refs.depth);
      this.resize();
    },
    resize() {
      if (this.klineConfig.platform === 'pc') {
        this.depth.resizeDepthChart(this.$refs.depth, this.resizeSize.isFullScreen, this.klineConfig.size);
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