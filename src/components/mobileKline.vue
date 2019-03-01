<template>
  <div class="mobile-kline" style="background-color: #161b21;">
        <!-- Cycle按钮 -->
        <div calss="mobileCycle">
          <div @click = "chooseCycle('hour')" :class="this.cycle === 'hour' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.hour}}</div>
          <div @click = "chooseCycle('day')" :class="this.cycle === 'day' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.day}}</div>
          <div @click = "chooseCycle('week')" :class="this.cycle === 'week' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.week}}</div>
          <div @click = "chooseCycle('month')" :class="this.cycle === 'month' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.month}}</div>
          <div @click = "chooseCycle('everyhour')" :class="this.cycle === 'everyhour' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.timeSharing}}</div>
        </div>
        <!-- tooltip 数据显示 -->
        <div :class="this.message.language === 'zh' ? 'mobile-tooltip-zh' : 'mobile-tooltip-en'" v-if="toolTipData">
          <div style="font-size:0.16rem; margin-top: 0.1rem;">
            <font v-for="MAitem in this.klineConfig.MA" :key="MAitem.id" :style = "{ color: MAitem.color, marginRight: '0.14rem'}">{{MAitem.name}}<font>:&nbsp;{{ getMATipData(MAitem.name) }}</font></font><br>
          </div>
          <div style="margin-left: -0.1rem; margin-top: 0.05rem;">
            <font class="mobile-tooltip-name">{{message.openingMobile}} </font><font class="mobile-tooltip-data">{{this.toolTipData.opening}}</font>
            <font class="mobile-tooltip-name">{{message.closingMobile}} </font><font class="mobile-tooltip-data">{{this.toolTipData.closing}}</font>
            <font class="mobile-tooltip-name">{{message.maxMobile}} </font><font class="mobile-tooltip-data">{{this.toolTipData.max}}</font>
            <font class="mobile-tooltip-name">{{message.minMobile}} </font><font class="mobile-tooltip-data">{{this.toolTipData.min}}</font>
            <font class="mobile-tooltip-name">{{message.volumeMobile}} </font><font class="mobile-tooltip-data">{{this.toolTipData.volume}}</font>
          </div>
        </div>
        <!-- timeDivision tootip 数据显示 -->
        <div :class="this.message.language === 'en' ? 'time-sharing-en-data' : 'time-sharing-zh-data'" v-if="timeDivisionTipData">
          <font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.time}}</font>
          <font class="mobile-tooltip-name">{{message.volumeMobile}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.volume}}</font> &nbsp;
          <font class="mobile-tooltip-name">{{message.price}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.price}}</font> &nbsp;
          <font class="mobile-tooltip-name">{{message.averagePrice}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.averagePrice}}</font> &nbsp;<br> 
        </div>
    <div id = "kline" ref = "klineRef" :style="{height: `${klineConfig.size.height}px`, width: `${klineConfig.size.width}px`}" @click="getToolTipData"></div>
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
      show: false,
      actions: [
      ],
      kline: null,
      cycle: '',
      platform: 'mobile',
      divisionTime: null,
      timeDivisionData: null,
      toolTipData: null,
      timeDivisionTipData: null,
      message: null,
      outspreadMA: false
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
        this.toolTipData = null;
        this.timeDivisionTipData = null;
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
        candleData.precision = this.chartDataObj.precision
        if (this.chartDataObj.cycle !== "everyhour" && candleData.values !== null && candleData.volumes !== null && candleData.categoryData !== null) {
          this.toolTipData = this.kline.updateMobileOption(candleData, this.cycle);
        }
      }
      if (this.chartDataObj.cycle === "everyhour" && this.chartDataObj.timeDivisionData) {
        let timeDivisionData = this.chartDataObj.timeDivisionData
        let divisionData = this.chartDataObj.divisionData
        if (timeDivisionData !== null && divisionData.times !== null && divisionData.averages !== null && divisionData.prices !== null && divisionData.volumes !== null) {
          this.timeDivisionTipData = this.kline.updateTimeDivisionOption(timeDivisionData, divisionData, this.chartDataObj.precision);
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
    this.timeDivisionTipData = null;
    this.toolTipData = null;
    this.dispose()
  },
  methods: {
    init() {
      this.kline.initMobileChart(this.$refs.klineRef);
    },
    switchBase() {
      this.show = !this.show;
    },
    chooseCycle(cycle) {
      if (this.cycle === cycle) {
        return;
      }
      this.$emit("listenToChildEvent", cycle)
    },
    getMATipData(name) {
      for( let tipData of this.toolTipData.MAData) {
        if (tipData.name === name) {
          return tipData.data
        }
      }
    },
    getToolTipData() {
      if (this.cycle !== 'everyhour') {
        this.toolTipData = this.kline.getMobileToolTipData()
      } else {
        this.timeDivisionTipData = this.kline.getMobileToolTipData()
      }
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