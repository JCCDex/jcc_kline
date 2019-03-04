<template>
  <div class="mobile-kline" style="background-color: #161b21;">
        <!-- Cycle按钮 -->
        <div calss="mobileCycle" style = "height: 0.4rem; z-index: 9;">
          <div @click = "chooseCycle('hour')" :class="this.cycle === 'hour' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.hour}}</div>
          <div @click = "chooseCycle('day')" :class="this.cycle === 'day' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.day}}</div>
          <div @click = "chooseCycle('week')" :class="this.cycle === 'week' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.week}}</div>
          <div @click = "chooseCycle('month')" :class="this.cycle === 'month' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.month}}</div>
          <div @click = "chooseCycle('everyhour')" :class="this.cycle === 'everyhour' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.timeSharing}}</div>
        </div>
    <div id = "kline" ref = "klineRef" :style="{height: `${klineConfig.size.height * 0.82}px`, width: `${klineConfig.size.width}px`}" @click="getToolTipIndex"></div>
    <div style="background:#2b2f33; height:0.1rem"></div>
  </div>
</template>
<script>
import '../css/common.css'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
import KLineController from '../js/KLine'
import { getLanguage } from '../js/utils'
export default {
  name: "mKline",
  data() {
    return {
      kline: null,
      cycle: '',
      platform: 'mobile',
      message: null
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
    }
  },
  watch: {
    chartDataObj() {
      if (this.chartDataObj.cycle !== this.cycle) {
        this.clearChart()
        this.kline.showMobileLoading()
        if (this.chartDataObj.cycle !== "everyhour") {
          this.cycle = this.chartDataObj.cycle
          this.kline.setMobileOption(this.klineConfig.size)
        } else {
          this.cycle = this.chartDataObj.cycle
          this.kline.setTimeDivisionsOption(this.klineConfig.size)
        }
      }
      if (this.chartDataObj.candleData) {
        let candleData = this.chartDataObj.candleData
        if (this.chartDataObj.cycle !== "everyhour" && candleData.values !== null && candleData.volumes !== null && candleData.categoryData !== null) {
          let toolTipIndex = this.kline.updateMobileOption(candleData, this.cycle);
          this.$emit("listenCandleChartEvent", this.kline.getMobileEchart())
          this.$emit("listenTipIndex", toolTipIndex)
        }
      }
      if (this.chartDataObj.cycle === "everyhour" && this.chartDataObj.divisionData) {
        let divisionData = this.chartDataObj.divisionData
        if (divisionData.times !== null && divisionData.averages !== null && divisionData.prices !== null && divisionData.volumes !== null) {
          let toolTipIndex = this.kline.updateTimeDivisionOption(divisionData, this.chartDataObj.precision);
          this.$emit("listenTipIndex", toolTipIndex)
        }
      }
    }
  },
  created() {
    this.message = getLanguage();
    this.kline = new KLineController(this.platform, this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose()
  },
  methods: {
    init() {
      this.kline.initMobileChart(this.$refs.klineRef);
    },
    chooseCycle(cycle) {
      if (this.cycle === cycle) {
        return;
      }
      this.$emit("listenToChildEvent", cycle)
    },
    getToolTipIndex() {
      let toolTipIndex
      if (this.cycle !== 'everyhour') {
        toolTipIndex = this.kline.getMobileToolTipIndex()
      } else {
        toolTipIndex = this.kline.getMobileToolTipIndex()
      }
      this.$emit("listenTipIndex", toolTipIndex)
    },
    changeDataZoom(type) {
      this.kline.changeMobileDataZoom(type)
    },
    clearChart() {
      this.kline.clearMobileChart();
    },
    dispose() {
      this.kline.disposeMobileChart()
    }
  }
}
</script>