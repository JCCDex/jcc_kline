<template>
  <div style="background-color: #161b21;">
      <div :class="this.outspreadMA ? 'kline-outspread-data' : 'kline-option-data'">
        <!-- Cycle按钮 -->
        <div :class=" this.cycle === 'everyhour' ? 'kline-cycle-time' : 'kline-cycle'" @click="switchBase">
          <span>{{timeData}}</span>
          <img v-if="!show" :src="downnormal"/>
          <img v-else :src="downclick"/>
          <van-actionsheet  v-model="show" :actions="actions" :overlay="false"/>
        </div>
        <!-- tooltip 数据显示 -->
        <div :class="this.message.language === 'zh' ? 'tooltip-data-zh' : this.outspreadMA ? 'tooltip-en-outspread' : 'tooltip-data-en'" v-if="toolTipData">
          <font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.time}}</font>
          <font class="tooltip-data-name" style="margin-left: 0.2rem;">{{message.volumeMobile}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.volume}}</font>
          <img v-if="!outspreadMA" :class="this.message.language === 'zh' ? 'kline-arrow-right' : 'arrow-right-en'" :src="rightArrow" @click="showMAData"/>
          <img v-else :src="downArrow" :class=" this.message.language === 'zh' ? 'kline-arrow-down' : 'arrow-down-en'" @click="showMAData"/>
          <div v-if = "outspreadMA" style="margin-top: 6px;margin-right: 0.15rem;">
            <font class="tooltip-data-name">{{message.openingMobile}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.opening}}</font>
            <font class="tooltip-data-name">{{message.closingMobile}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.closing}}</font>
            <font class="tooltip-data-name">{{message.maxMobile}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.max}}</font>
            <font class="tooltip-data-name">{{message.minMobile}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.min}}</font>
          </div>
        </div>
        <!-- timeDivision tootip 数据显示 -->
        <div :class="this.message.language === 'en' ? 'time-sharing-data' : 'time-sharing-zh-data'" v-if="timeDivisionTipData">
          <font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.time}}</font>
          <font class="tooltip-data-name">{{message.volumeMobile}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.volume}}</font> &nbsp;
          <font class="tooltip-data-name">{{message.price}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.price}}</font> &nbsp;
          <font class="tooltip-data-name">{{message.averagePrice}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.averagePrice}}</font> &nbsp;<br> 
        </div>
      </div>
    <div id = "kline" ref = "klineRef" :style="{height: `${klineConfig.size.height}px`, width: `${klineConfig.size.width}px`}" @click="getToolTipData"></div>
  </div>
</template>
<script>
import '../icon/iconfont.css'
import downNormal from "../icon/down_normal.png";
import downClick from "../icon/down_click.png";
import rightArrow from "../icon/right_arrow.png"
import downArrow from "../icon/down_arrow.png"
import { Actionsheet } from 'vant';
import { splitData, handleDivisionData } from '../js/processData'
import KLineController from '../js/KLine'
import { getLanguage } from '../js/utils'
export default {
  name: "mobileKline",
  data() {
    return {
      show: false,
      actions: [
      ],
      timeData: '',
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
      rightArrow: rightArrow,
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
          this.toolTipData = this.kline.updateMobileOption(mobileKlineData);
            this.kline.hideMobileLoading()
        } else {
          if(this.status === 0) {
            this.kline.setTimeDivisionsOption(this.klineDataObj.klineSize)
            this.status = 1;
          }
          let timeDivisionData = this.klineDataObj.timeDivisionData;
          let divisionData = handleDivisionData(timeDivisionData)
          this.divisionTime = divisionData.divisionTime;
          this.timeDivisionTipData = this.kline.updateTimeDivisionOption(timeDivisionData, divisionData);
          this.kline.hideMobileLoading()
        }
      }
    }
  },
  created() {
    this.message = getLanguage();
    this.timeData = this.message.hour
    this.setAction();
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
    setAction () {
      let callback = this.onClick;
      let actions;
      actions = [
        {
           name: this.message.hour,
          ticker: "hour",
          callback
        },
        {
          name: this.message.day,
          ticker: "day",
          callback
        },
        {
          name: this.message.week,
          ticker: "week",
          callback
        },
        {
          name: this.message.month,
          ticker: "month",
          callback
        },
        {
          name: this.message.timeSharing,
          ticker: "everyhour",
          callback
        }
      ];
      this.actions = actions;
      this.timeData = actions[0].name;
    },
    onClick(item) {
      let { name, ticker } = item;
      this.show = false;
      if (this.timeData === name) {
        return;
      }
      this.timeData = name;
      this.$emit("listenToChildEvent", item)
      this.show = false;
    },
    getToolTipData() {
      if (this.cycle !== 'everyhour') {
        this.toolTipData = this.kline.getMobileToolTipData()
      } else {
        this.timeDivisionTipData = this.kline.getMobileToolTipData()
      }
    },
    showMAData() {
      this.outspreadMA = !this.outspreadMA
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
.tooltip-data-zh {
  text-align: right;
  font-size: 0.18rem;
  padding: 0.2rem 0 0.23rem 0.2rem;
  z-index:1;
  font-family: 'Microsoft YaHei';
}
.tooltip-data-en {
  text-align: right;
  font-size: 0.18rem;
  padding: 0.2rem 0 0.23rem 0.2rem;
  z-index:1;
  font-family: 'Microsoft YaHei';
}
.tooltip-en-outspread {
  text-align: right;
  font-size: 0.18rem;
  padding: 0.2rem 0 0.23rem 0.2rem;
  z-index:1;
  font-family: 'Microsoft YaHei';
}
.kline-arrow-right {
  float: right;
  margin: 10px 0.15rem;
  height: 0.16rem;
}
.kline-arrow-down {
  float: right;
  margin: 0.1rem 0.15rem;
  height: 0.1rem;
}
.arrow-right-en {
  float: right;
  margin: 0.03rem 0.15rem;
  height: 0.16rem;
}
.arrow-down-en {
  float: right;
  margin: 0.06rem 0.15rem;
  height: 0.1rem;
}
.date-time {
  margin-left: 0.1rem;
}
.time-sharing-data {
  text-align: right;
  font-size: 0.18rem;
  padding: 0.1rem 0.15rem 0 0;
  z-index:1;
  font-family: 'Microsoft YaHei';
}
.time-sharing-zh-data {
  text-align: right;
  font-size: 0.18rem;
  padding: 0.1rem 0.15rem 0 0;
  z-index:1;
  font-family: 'Microsoft YaHei';
}
.tooltip-data-name {
  color: #e6e6e6;
}
.tooltip-data-ma5 {
  color: #ff4d71;
  margin-left: 0.05rem;
}
.tooltip-data-ma10 {
  color: #72ff66;
  margin-left: 0.05rem;
}
.tooltip-data-ma20 {
  color: #16c5ff;
  margin-left: 0.05rem;
}
.tooltip-data-ma30 {
  color: #f6d026;
  margin-left: 0.05rem;
}
.tooltip-data-ma60 {
  color: #e03bfa;
  margin-left: 0.05rem;
}
.tooltip-data-green {
  color: #3ee99f;
}
.tooltip-data-red {
  color: #ee4b4b;
}
</style>
