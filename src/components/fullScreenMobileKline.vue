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
            <font v-for="(MAitem, index) in this.klineConfig.MA" :key="MAitem.id" :style = "{ color: MAitem.color, marginRight: '0.36rem'}">{{MAitem.name}}<font>:&nbsp;{{ getMATipData(MAitem.name) }}</font></font><br>
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
        <div :class="this.message.language === 'en' ? 'time-sharing-en-data' : 'time-sharing-zh-data'" v-if="timeDivisionTipData">
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
        this.message = getLanguage();
        if (this.klineDataObj.cycle !== "everyhour") {
          var mobileKlineData = splitData(this.klineDataObj.klineData, this.platform)
          this.klineDataObj.categoryData = mobileKlineData.categoryData
        }
        if (this.klineDataObj.cycle !== this.cycle) {
          this.clearChart()
          this.toolTipData = null;
          this.timeDivisionTipData = null;
          this.kline.showMobileLoading()
          if (this.klineDataObj.cycle !== "everyhour") {
            this.cycle = this.klineDataObj.cycle
            this.kline.setMobileOption(this.klineDataObj, this.cycle)
          } else {
            this.cycle = this.klineDataObj.cycle
            this.kline.setTimeDivisionsOption(this.klineDataObj.klineSize)
          }
        }
       if (this.klineDataObj.cycle !== "everyhour" && mobileKlineData.values !== null && mobileKlineData.volumes !== null && mobileKlineData.categoryData !== null) {
          this.toolTipData = this.kline.updateMobileOption(mobileKlineData);
        }
        if (this.klineDataObj.cycle === "everyhour") {
          let timeDivisionData = this.klineDataObj.timeDivisionData
          let divisionData = handleDivisionData(timeDivisionData)
          this.divisionTime = divisionData.divisionTime
          if (timeDivisionData !== null && divisionData.times !== null && divisionData.averages !== null && divisionData.prices !== null && divisionData.volumes !== null) {
            this.timeDivisionTipData = this.kline.updateTimeDivisionOption(timeDivisionData, divisionData);
          }
        }
      }
    }
  },
  created() {
    this.message = getLanguage();
    if (this.klineConfig.defaultMA !== false) {
      this.klineConfig.defaultMA = true;
      this.klineConfig.MA = [
        {
          name: "MA5",
          color: "#ff4d71"
        },
        {
          name: "MA10",
          color: "#67ff7c"
        },
        {
          name: "MA20",
          color: "#16c5ff"
        },
        {
          name: "MA30",
          color: "#f6d026"
        },
        { 
          name: "MA60", 
          color: "#e03bfa"
        }
      ];
    }
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
    getMATipData(name) {
      for( let tipData of this.toolTipData.MAData) {
        if (tipData.name === name) {
          return tipData.data
        }
      }
    },
    chooseCycle(cycle) {
      if (this.cycle === cycle) {
        return;
      }
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