<template>
  <div ref="stochastic" :style="{height: `${stochasticSize.height}`, width: `${stochasticSize.width}`}" @mousemove="getToolTipIndex()"></div>
</template>
<script>
import { splitData, getDepthData } from '../js/processData'
import IndicatorChart from '../js/IndicatorChart'
import { getLanguage } from '../js/utils'
export default {
  name: "stochastic",
  data() {
    return {
      stochastic: null,
      coinType: '',
      cycle: '',
      refreshCycle: 0,
      chartType: 'stochastic',
      stochasticSize: {
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
        if (data.values && data.stochastics && data.categoryData) {
          if(JSON.stringify(this.coinType) !== JSON.stringify(this.chartDataObj.coinType) || this.chartDataObj.cycle !== this.cycle) {
            this.clearChart();
            this.refreshCycle = 0
            this.cycle = this.chartDataObj.cycle
            let toolTipIndex = this.stochastic.setStochasticOption(data, this.cycle)
            this.$emit("listenToTipIndex", toolTipIndex)
            this.$emit("listenStochasticChartEvent", this.stochastic.getStochasticEchart())
            this.coinType = this.chartDataObj.coinType
          }else {
            this.stochastic.updateStochasticOption(data, this.cycle)
          }
        }
      }
      if (this.chartDataObj.cycle === "everyhour" && this.chartDataObj.timeDivisionData) {
        this.cycle = this.chartDataObj.cycle
        let timeDivisionData = this.chartDataObj.timeDivisionData
        let divisionData = this.chartDataObj.divisionData
        if (this.refreshCycle !== 1 && divisionData.times !== null && divisionData.averages !== null && divisionData.prices !== null && divisionData.stochastics !== null) {
          this.clearChart();
          let toolTipIndex = this.stochastic.setStochasticOption(divisionData, this.cycle)
          this.$emit("listenToTipIndex", toolTipIndex)
          this.refreshCycle = 1
          this.$emit("listenStochasticChartEvent", this.stochastic.getStochasticEchart())
        } else {
           this.stochastic.updateStochasticOption(divisionData, this.cycle)
        }
      }
    },
    klineConfig() {
      if (this.klineConfig.platform === 'pc') {
        let size = {
          width: this.klineConfig.size.width + 'px',
          height: this.klineConfig.size.height + 'px'
        }
        if (JSON.stringify(size) !== JSON.stringify(this.stochasticSize) && this.klineConfig.defaultSize === false) {
          this.stochasticSize = {
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
        this.stochasticSize.height = this.klineConfig.size.height * 0.25 + 'px'
        this.stochasticSize.width = this.klineConfig.size.width + 'px'
      } else {
        this.stochasticSize = {
          height: '572px',
          width: '100%'
        }
      }
    } else {
      this.stochasticSize.height = this.klineConfig.size.height * 0.4 + 'px'
      this.stochasticSize.width = this.klineConfig.size.width + 'px'
    }
    this.klineConfig.chartType = 'stochastic';
    this.stochastic = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose()
  },
  methods: {
    init() {
      this.stochastic.initStochasticChart(this.$refs.stochastic);
      this.resize();
    },
    getToolTipIndex () {
      let toolTipIndex = this.stochastic.getToolTipIndex()
      this.$emit("listenToTipIndex", toolTipIndex)
    },
    resize() {
      if (this.klineConfig.platform === 'pc') {
        this.stochastic.resizeStochasticChart(this.$refs.stochastic, this.resizeSize.isFullScreen, this.klineConfig.size);
      }
    },
    clearChart() {
      this.stochastic.clearStochasticEcharts();
    },
    dispose() {
      this.stochastic.disposeStochasticEcharts()
    }
  }
}
</script>
