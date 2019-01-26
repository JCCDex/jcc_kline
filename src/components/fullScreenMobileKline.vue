<template>
  <div class="mobile-kline" style="background-color: #161b21;">
        <!-- Cycle按钮 -->
        <div calss="mobileCycleFullScreen">
          <div @click = "chooseCycle('hour')" :class="this.cycle === 'hour' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.hour}}</div>
          <div @click = "chooseCycle('day')" :class="this.cycle === 'day' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.day}}</div>
          <div @click = "chooseCycle('week')" :class="this.cycle === 'week' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.week}}</div>
          <div @click = "chooseCycle('month')" :class="this.cycle === 'month' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.month}}</div>
          <div @click = "chooseCycle('everyhour')" :class="this.cycle === 'everyhour' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.timeSharing}}</div>
        </div>
        <div :class="this.message.language === 'zh' ? 'mobile-tooltip-fullScreen-zh' : 'mobile-tooltip-fullScreen-en'" v-if="toolTipData">
          <div style="font-size:0.18rem; margin-top: 0.1rem;　height:0.2rem">
            <font class="mobile-tooltip-data-ma5">MA5: </font><font class="tooltip-ma5-fullScreen">{{this.toolTipData.MA5}}</font>
            <font class="mobile-tooltip-data-ma10">MA10: </font><font class="tooltip-ma10-fullScreen">{{this.toolTipData.MA10}}</font>
            <font class="mobile-tooltip-data-ma20">MA20: </font><font class="tooltip-ma20-fullScreen">{{this.toolTipData.MA20}}</font>
            <font class="mobile-tooltip-data-ma30">MA30: </font><font class="tooltip-ma30-fullScreen">{{this.toolTipData.MA30}}</font>
            <font class="mobile-tooltip-data-ma60">MA60: </font><font class="tooltip-ma60-fullScreen">{{this.toolTipData.MA60}}</font>
          </div>
          <div style="font-size:0.18rem; margin-left: -0.78rem; margin-top: 0.05rem;">
          <font class="mobile-tooltip-name-fullScreen">{{message.openingMobile}}</font><font class="mobile-tooltip-data">{{this.toolTipData.opening}}</font>
          <font class="mobile-tooltip-name-fullScreen">{{message.closingMobile}}</font><font class="mobile-tooltip-data">{{this.toolTipData.closing}}</font>
          <font class="mobile-tooltip-name-fullScreen">{{message.maxMobile}}</font><font class="mobile-tooltip-data">{{this.toolTipData.max}}</font>
          <font class="mobile-tooltip-name-fullScreen">{{message.minMobile}}</font><font class="mobile-tooltip-data">{{this.toolTipData.min}}</font>
          </div>
          <div style="float:right;margin-top: -0.8rem">
          <font class="mobile-tooltip-volume">{{message.volumeMobile}}</font><font class="mobile-tooltip-volume">{{this.toolTipData.volume}}</font>
          </div>
        </div>

        <!-- timeDivision tootip 数据显示 -->
        <div :class="this.message.language === 'en' ? 'time-sharing-data' : 'time-sharing-zh-data'" v-if="timeDivisionTipData">
          <font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.time}}</font>
          <font class="mobile-tooltip-name">{{message.volumeMobile}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.volume}}</font> &nbsp;
          <font class="mobile-tooltip-name">{{message.price}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.price}}</font> &nbsp;
          <font class="mobile-tooltip-name">{{message.averagePrice}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.averagePrice}}</font> &nbsp;<br> 
        </div>
    <div id = "kline" ref = "klineRef" :style="{height: `${klineConfig.size.height}px`, width: `${klineConfig.size.width}px`}" @click="getToolTipData"></div>
  </div>
</template>
<script>
import '../css/common.css'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
import { splitData, handleDivisionData} from '../js/processData'
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
      status: 0,
      divisionTime: null,
      timeDivisionData: null,
      toolTipData: null,
      timeDivisionTipData: null,
      message: null,
      outspreadMA: false
    };
  },
  props: {
    klineDataObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cycle: {
      type: String,
      default: 'hour'
    },
    platform: {
      type: String,
      default: 'mobile'
    },
    klineConfig: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    showIndicators: {
      type: Array,
      default: () => {
        return ['Candlestick', 'MA', 'Volume']
      }
    }
  },
  watch: {
    cycle() {
      if(this.platform !== 'pc') {
        this.toolTipData = null;
        this.timeDivisionTipData = null;
        this.clearChart()
        this.kline.showMobileLoading();
      }
    },
    klineDataObj() {
      if (this.klineDataObj) {
        this.message = getLanguage();
        if(this.cycle !== 'everyhour') {
          let mobileKlineData = splitData(this.klineDataObj.klineData, this.platform)
          this.klineDataObj.categoryData = mobileKlineData.categoryData;
          if(this.status === 0) {
            this.kline.setMobileOption(this.klineDataObj, this.cycle);
            this.status = 1;
          }
          // let mobileKlineData = splitData(this.klineDataObj.klineData, this.platform)
          if (mobileKlineData.values !== null && mobileKlineData.volumes !== null && mobileKlineData.categoryData !== null) {
            this.toolTipData = this.kline.updateMobileOption(mobileKlineData);
            this.kline.hideMobileLoading()
          }
        } else {
          if(this.status === 0) {
            this.kline.setTimeDivisionsOption(this.klineDataObj.klineSize)
            this.status = 1;
          }
          let timeDivisionData = this.klineDataObj.timeDivisionData;
          let divisionData = handleDivisionData(timeDivisionData)
          this.divisionTime = divisionData.divisionTime;
          if (timeDivisionData !== null && divisionData.times !== null && divisionData.averages !== null && divisionData.prices !== null && divisionData.volumes !== null) {
            this.timeDivisionTipData = this.kline.updateTimeDivisionOption(timeDivisionData, divisionData);
            this.kline.hideMobileLoading()
          }
        }
      }
    }
  },
  created() {
    this.message = getLanguage();
    this.kline = new KLineController(this.platform, this.klineConfig, this.showIndicators);
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
      // this.cycle = cycle;
      this.$emit("listenToChildEvent", cycle)
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