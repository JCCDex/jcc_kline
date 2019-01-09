<template>
  <div class="mobile-kline" style="background-color: #161b21;">
        <!-- Cycle按钮 -->
        <div style="margin-right:0.1rem">
          <div @click = "chooseCycle('hour')" :class="this.cycle === 'hour' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.hour}}</div>
          <div @click = "chooseCycle('day')" :class="this.cycle === 'day' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.day}}</div>
          <div @click = "chooseCycle('week')" :class="this.cycle === 'week' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.week}}</div>
          <div @click = "chooseCycle('month')" :class="this.cycle === 'month' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.month}}</div>
          <div @click = "chooseCycle('everyhour')" :class="this.cycle === 'everyhour' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.timeSharing}}</div>
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
      
    <div id = "kline" ref = "klineRef" :style="{height: `${klineConfig.size.height}px`, width: `${klineConfig.size.width}px`}" @click="getToolTipData"></div>
  </div>
</template>
<script>
import '../icon/iconfont.css'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
import downNormal from "../icon/down_normal.png";                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
import downClick from "../icon/down_click.png";                                                                                                   
import upArrow from "../icon/up_arrow.png"
import downArrow from "../icon/down_arrow.png"
import { Actionsheet } from 'vant';
import { splitData, handleDivisionData } from '../js/processData'
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
      outspreadMA: false,
      downnormal: downNormal,
      downclick: downClick,
      upArrow: upArrow,
      downArrow: downArrow
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
      }
    }
  },
  created() {
    this.message = getLanguage();
    // this.setAction();
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
<style>
.kline-cycle-btn {
  float: left;
  min-width: 0.3rem;
  width: auto;
  height: 0.26rem;
  cursor: pointer;
  margin-left: 0.5rem;
  margin-top: 0.08rem;
  text-align: center;
  color: #3669a7;
  line-height: 0.2rem;
  font-size: 0.22rem;
  border-radius: 0.02rem;
}
.kline-btn-active {
  border-bottom:0.01rem solid  #e6e6e6;
  color: #e6e6e6;
}
.kline-cycle {
  float: left;
  padding: 0.14rem 0 0.17rem 0.2rem;
  cursor: pointer;
}
.kline-cycle-time {
  padding: 0.14rem 0 0 0.2rem;
  cursor: pointer;
}
.kline-cycle-time span {
  color: #ffffff;
  padding-top: 0.01rem;
}
.kline-cycle span {
  color: #ffffff;
  padding-top: 0.01rem;
}
.kline-cycle img {
  height: 0.16rem;
  margin-right: 0.1rem;
}
.van-actionsheet {
  left: 0.1rem;
  right: 0;
  top: 2.4rem;
  bottom: 80%;
  width: 1rem;
  color: #232732;
  -webkit-transition: 0.2s ease-out;
  transition: 0.1s ease-out;
  overflow-y: visible;
  background-color: #232732;
}
.van-actionsheet__item {
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.28rem;
  color: #e6e6e6;
  text-align: center;
  background-color: #232732 !important;
  cursor: pointer;
}
.van-actionsheet__item:active {
  color: #1bdafd;
}
.van-hairline--top::after {
  border-top-width: 0rem;
}
.van-actionsheet__list {
  border: 0.02rem solid #37495c;
  border-radius: 0.04rem;
}
.mobile-tooltip-zh {
  text-align: left;
  font-size: 0.18rem;
  padding: 0.5rem 0.2rem 0.23rem 0.2rem;
  z-index:1;
}
.mobile-tooltip-en {
  text-align: left;
  font-size: 0.18rem;
  padding: 0.5rem 0.2rem 0.23rem 0.2rem;
  z-index:1;
}
.mobile-tooltip-en-outspread {
  text-align: right;
  font-size: 0.18rem;
  padding: 0.2rem 0 0.23rem 0.2rem;
  z-index:1;
}
.kline-arrow-up {
  float: right;
  margin: 0.1rem 0.15rem;
  width: 0.16rem;
  height: 0.1rem;
}
.kline-arrow-down {
  float: right;
  margin: 0.1rem 0.15rem;
  width: 0.16rem;
  height: 0.1rem;
}
.arrow-up-en {
  float: right;
  margin: 0.06rem 0.15rem;
  width: 0.16rem;
  height: 0.1rem;
}
.arrow-down-en {
  float: right;
  margin: 0.06rem 0.15rem;
  width: 0.16rem;
  height: 0.1rem;
}
.date-time {
  margin-left: 0.1rem;
}
.time-sharing-data {
  text-align: left;
  font-size: 0.18rem;
  padding: 0.5rem 0.2rem 0.23rem 0.2rem;
  z-index:1;
}
.time-sharing-zh-data {
  text-align: left;
  font-size: 0.18rem;
  padding: 0.5rem 0.2rem 0.23rem 0.2rem;
  z-index:1;
}
.mobile-tooltip-name {
  color: #e6e6e6;
}
.tooltip-data-green {
  color: #3ee99f;
}
.tooltip-data-red {
  color: #ee4b4b;
}
</style>
