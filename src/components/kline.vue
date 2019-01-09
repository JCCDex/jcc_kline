<template>
  <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">
    <div style="position:relative">
      <!-- Cycle按钮 -->
      <div style="position: absolute;left:10px;top:20px;z-index:1;">
        <div @click = "chooseCycle('hour')" :class="this.cycle === 'hour' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.hour}}</div>
        <div @click = "chooseCycle('day')" :class="this.cycle === 'day' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.day}}</div>
        <div @click = "chooseCycle('week')" :class="this.cycle === 'week' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.week}}</div>
        <div @click = "chooseCycle('month')" :class="this.cycle === 'month' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.month}}</div>
      </div>
      <!-- tooltip数据显示 -->
      <div :class="this.message.language === 'en' ? 'tooltip-data-en' : 'tooltip-data-zh'" v-if="toolTipData">
          <i :class="outspreadMA ? 'icon iconfont icon-kxian-guanbi' : 'icon iconfont icon-kxian-zhankai'" @click="showMAData"></i>
          <font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.time}}</font>
          <font class="tooltip-data-name">{{message.volume}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.volume}}</font>
          <font class="tooltip-data-name">{{message.opening}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.opening}}</font>
          <font class="tooltip-data-name">{{message.max}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.max}}</font>
          <font class="tooltip-data-name">{{message.min}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.min}}</font>
          <font class="tooltip-data-name">{{message.closing}}</font><font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.closing}}</font><br>
        <div v-if = "outspreadMA">
          <font class="tooltip-data-ma5">MA5: </font><font class="tooltip-ma5">{{this.toolTipData.MA5}}</font> &nbsp;
          <font class="tooltip-data-ma10">MA10: </font><font class="tooltip-ma10">{{this.toolTipData.MA10}}</font> &nbsp;
          <font class="tooltip-data-ma20">MA20: </font><font class="tooltip-ma20">{{this.toolTipData.MA20}}</font> &nbsp;
          <font class="tooltip-data-ma30">MA30: </font><font class="tooltip-ma30">{{this.toolTipData.MA30}}</font> &nbsp;
          <font class="tooltip-data-ma60">MA60: </font><font class="tooltip-ma60">{{this.toolTipData.MA60}}</font> &nbsp;
        </div>
      </div>
      <div style="position: absolute;left:1150px;top:20px;z-index:1;font-size: 13px;font-family: 'Microsoft YaHei';">
        <span @click = "changeChart('candle')">{{message.candle}}</span>
        <span @click = "changeChart('depth')">{{message.depth}}</span>
      </div>
      <!-- fullscreen 按钮 -->
      <!-- <button type="button" class="fullscreen" @click="toggle">Fullscreen</button> -->
      <!-- kline -->
      <div id="kline" ref="klineRef" style="width:100%;height:572px;" @mousemove="getToolTipData"></div>
    </div>
  </fullscreen>
</template>
<script>
import '../icon/iconfont.css'
import { splitData, getDepthData } from '../js/processData'
import KLineController from '../js/KLine'
import Fullscreen from "vue-fullscreen/src/component.vue"
import { getLanguage } from '../js/utils'
export default {
  name: "jKline",
  components: {Fullscreen},
  data() {
    return {
      kline: null,
      message: null,
      klineData: null,
      toolTipData: null,
      cycle: 'hour',
      coinType: '',
      outspreadMA: false,
      fullscreen: false,
      showChar: 'candle'
    };
  },
  props: {
    klineDataObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    platform: {
      type: String,
      default: 'pc'
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
        return ['Candlestick', 'MA', 'Volume', 'MarketDepth']
      }
    }
  },
  watch: {
    klineDataObj() {
      if (this.klineDataObj) {
        this.message = getLanguage();
        let klineData = splitData(this.klineDataObj.klineData, this.platform)
        let depthData = getDepthData(this.klineDataObj.depthData, this.klineDataObj.coinType);
        let data = Object.assign({}, klineData, depthData);
        this.klineData = data
        if (data.values !== null && data.volumes !== null && data.categoryData !== null) {
          if(this.cycle !== this.klineDataObj.cycle || JSON.stringify(this.coinType) !== JSON.stringify(this.klineDataObj.coinType)) {
            this.clearChart();
            this.kline.showLoading();
            if (this.showChar === 'candle') {
              this.toolTipData = this.kline.setOption(data, this.cycle);
              this.cycle = this.klineDataObj.cycle;
              this.coinType = this.klineDataObj.coinType
            } else if (this.showChar === 'depth') {
              this.kline.setDepthOption(data)
            }
          }else {
            if (this.showChar === 'candle') {
              this.kline.updateOption(data, this.cycle);
            } else {
              this.kline.updateDepthOption(data)
            }
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
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    this.dispose()
  },
  methods: {
    init() {
      this.kline.initChart(this.$refs.klineRef);
      this.resize();
    },
    chooseCycle(cycle) {
      if (this.cycle === cycle) {
        return;
      }
      this.$emit("listenToChildEvent", cycle)
    },
    changeChart(type) {
      if (type === this.showChar) {
        return;
      }
      if (type === 'candle') {
        this.clearChart();
        this.kline.showLoading();
        this.kline.setOption(this.klineData, this.cycle)
        this.showChar = type
      } else {
        this.clearChart();
        this.kline.showLoading();
        this.kline.setDepthOption(this.klineData)
        this.showChar = type
      }
    },
    changeDataZoom(type) {
      if(this.platform === 'pc') {
        this.kline.changeDataZoom(type)
      }else {
        this.kline.changeMobileDataZoom(type)
      }
    },
    getToolTipData() {
      this.toolTipData = this.kline.getToolTipData()
    },
    showMAData() {
      if (!this.outspreadMA) {
        this.outspreadMA = true
      } else {
        this.outspreadMA = false
      }
    },
    toggle () {
      this.$refs['fullscreen'].toggle()
    },
    resize() {
      let isFullScreen = this.$refs['fullscreen'].getState();
      this.kline.resizeChart(this.$refs.klineRef, isFullScreen);
    },
    clearChart() {
      this.kline.clearChart();
    },
    dispose() {
      this.kline.disposeChart()
    }
  }
}
</script>
<style>
/* .fullscreen {
  position: absolute;
  z-index: 1;
  right: 10px;
} */
.kline-cycle-btn {
  float: left;
  min-width: 20px;
  width: auto;
  height: 20px;
  cursor: pointer;
  margin-left: 10px;
  text-align: center;
  color: #3669a7;
  line-height: 20px;
  font-size: 12px;
  border-radius: 2px;
}
.kline-btn-active {
  color: #e6e6e6;
  background: #34b9ea;
}
.tooltip-data-zh {
  font-size: 12px;
  position: absolute;
  left: 16.7%;
  top: 20px;
  z-index: 1;
  float: left;
  height: 33px;
  font-family: 'Microsoft YaHei';
}
.tooltip-data-en {
  font-size: 12px;
  position: absolute;
  left: 16.67%;
  top: 23px;
  z-index: 1;
  float: left;
  height: 33px;
  font-family: 'Microsoft YaHei';
}
.icon-kxian-zhankai {
  color: #b9cadd;
  z-index: 2;
  font-size: 12px;
}
.icon-kxian-guanbi {
  color: #b9cadd;
  z-index: 2;
  font-size: 12px;
}
.tooltip-data-name {
  margin-left: 10px;
  color: #b9cadd;
}
.tooltip-data-ma5 {
  color: #ff4d71
}
.tooltip-ma5 {
  color: #ff4d71
}
.tooltip-data-ma10 {
  margin-left: 10px;
  color: #67ff7c
}
.tooltip-ma10 {
  color: #67ff7c
}
.tooltip-data-ma20 {
  margin-left: 10px;
  color: #16c5ff
}
.tooltip-ma20 {
  color: #16c5ff
}
.tooltip-data-ma30 {
  margin-left: 10px;
  color: #f6d026
}
.tooltip-ma30 {
  color: #f6d026
}
.tooltip-data-ma60 {
  margin-left: 10px;
  color: #e03bfa
}
.tooltip-ma60 {
  color: #e03bfa
}
.tooltip-data-green {
  color: #3ee99f;
}
.tooltip-data-red {
  color: #ee4b4b;
}
</style>
