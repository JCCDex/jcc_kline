<template>
  <div class="mobile-kline" style="background-color: #161b21;">
        <!-- Cycle按钮 -->
        <div style="margin-right:0.1rem">
          <div @click = "chooseCycle('hour')" :class="this.cycle === 'hour' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.hour}}</div>
          <div @click = "chooseCycle('day')" :class="this.cycle === 'day' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.day}}</div>
          <div @click = "chooseCycle('week')" :class="this.cycle === 'week' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.week}}</div>
          <div @click = "chooseCycle('month')" :class="this.cycle === 'month' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.month}}</div>
          <div @click = "chooseCycle('everyhour')" :class="this.cycle === 'everyhour' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'">{{message.timeSharing}}</div>
        </div>
        <!-- <div style="color: #f5f5f5;font-size: 0.22rem;float: right;" @click="switchBase">
            <span>{{message.more}}</span>
            <span>{{timeData}}</span>
            <img v-if="!show" :src="downnormal"/>
            <img v-else :src="downclick"/>
            <van-actionsheet  v-model="show" :actions="actions" :overlay="false"/>
          </div> -->
        <!-- tooltip 数据显示 -->
        <div :class="this.message.language === 'zh' ? 'mobile-tooltip-zh' : 'mobile-tooltip-en'" v-if="toolTipData">                                                                                                                                                                                                              
          <font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.time}}</font>
          <font class="mobile-tooltip-name" style="margin-left: 0.2rem;">{{message.volumeMobile}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.volume}}</font><br>
          <font class="mobile-tooltip-name">{{message.openingMobile}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.opening}}</font>
          <font class="mobile-tooltip-name">{{message.closingMobile}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.closing}}</font>
          <font class="mobile-tooltip-name">{{message.maxMobile}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.max}}</font>
          <font class="mobile-tooltip-name">{{message.minMobile}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.min}}</font>
        </div>
        <!-- timeDivision tootip 数据显示 -->
        <div :class="this.message.language === 'en' ? 'time-sharing-data' : 'time-sharing-zh-data'" v-if="timeDivisionTipData">
          <font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.time}}</font>
          <font class="mobile-tooltip-name">{{message.volumeMobile}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.volume}}</font> &nbsp;
          <font class="mobile-tooltip-name">{{message.price}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.price}}</font> &nbsp;
          <font class="mobile-tooltip-name">{{message.averagePrice}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.averagePrice}}</font> &nbsp;<br> 
        </div> 
    <div id = "kline" ref = "klineRef" :style="{height: `${klineConfig.size.height}px`, width: `${klineConfig.size.width}px`}"></div>
    <div id = "depth" ref = "depthRef" :style="{height: `${klineConfig.depthSize.height}px`, width: `${klineConfig.depthSize.width}px`}"></div>
  </div>
</template>
<script>
import '../css/common.css'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
import { Actionsheet } from 'vant';
import { splitData, handleDivisionData, getDepthData} from '../js/processData'
import KLineController from '../js/KLine'
import DepthMapController from '../js/DepthMap'
import { getLanguage } from '../js/utils'
export default {
  name: "mKline",
  data() {
    return {
      show: false,
      actions: [
      ],
      kline: null,
      depth:null,
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
    depthMapConfig: {
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
          if(this.status === 0) {
            this.kline.setMobileOption(this.klineDataObj.klineSize);
            this.status = 1;
          }
          let mobileKlineData = splitData(this.klineDataObj.klineData, this.platform)
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
        let depthData = getDepthData(this.klineDataObj.depthData, this.klineDataObj.coinType);
        this.depth.setDepthoption(depthData);
        this.depth.hideDepthLoading();
      }
    }
  },
  created() {
    this.message = getLanguage();
    // this.setAction();
    this.kline = new KLineController(this.platform, this.klineConfig, this.showIndicators);
    this.depth = new DepthMapController(this.depthMapConfig);
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
      this.depth.initMobileChart(this.$refs.depthRef);
    },
    switchBase() {
      this.show = !this.show;
    },
    // setAction () {
    //   let callback = this.onClick;
    //   let actions;
    //   actions = [
    //     {
    //        name: this.message.hour,
    //       ticker: "hour",
    //       callback
    //     },
    //     {
    //       name: this.message.day,
    //       ticker: "day",
    //       callback
    //     },
    //     {
    //       name: this.message.week,
    //       ticker: "week",
    //       callback
    //     },
    //     {
    //       name: this.message.month,
    //       ticker: "month",
    //       callback
    //     },
    //     {
    //       name: this.message.timeSharing,
    //       ticker: "everyhour",
    //       callback
    //     }
    //   ];
    //   this.actions = actions;
    //   this.timeData = actions[0].name;
    // },
    onClick(item) {
      let { name, ticker } = item;
      this.show = false;
      if (this.cycle === name) {
        return;
      }
      this.cycle = name;
      this.$emit("listenToChildEvent", item)
      this.show = false;
    },
    chooseCycle(cycle) {
      if (this.cycle === cycle) {
        return;
      }
      this.cycle = cycle;
      var cycleData = {
          name: this.message.cycle,
          ticker: cycle
      }
      this.$emit("listenToChildEvent", cycleData)
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
