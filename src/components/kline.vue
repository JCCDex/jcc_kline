<template>
    <div style="position:relative">
      <!-- Cycle按钮 -->
      <div style="position: absolute;left:10px;top:20px;z-index:1;">
        <div @click = "chooseCycle('hour')" :class="this.cycle === 'hour' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.hourPC}}</div>
        <div @click = "chooseCycle('day')" :class="this.cycle === 'day' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.dayPC}}</div>
        <div @click = "chooseCycle('week')" :class="this.cycle === 'week' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.weekPC}}</div>
        <div @click = "chooseCycle('month')" :class="this.cycle === 'month' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.monthPC}}</div>
      </div>
      <!-- tooltip数据显示 -->
      <div :class="this.message.language === 'en' ? 'tooltip-data-en' : 'tooltip-data-zh'" v-if="toolTipData">
          <i :class="outspreadMA ? 'icon iconfont icon-kline-hide' : 'icon iconfont icon-kline-show'" @click="showMAData"></i>
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
      <!-- kline -->
      <div id="kline" ref="klineRef" :style="{height: `${klineSize.height}`, width: `${klineSize.width}`}" @mousemove="getToolTipData"></div>
    </div>
</template>
<script>
import '../icon/iconfont.css'
import '../css/common.css'
import { splitData, getDepthData } from '../js/processData'
import KLineController from '../js/KLine'
import { getLanguage } from '../js/utils'
export default {
  name: "jKline",
  data() {
    return {
      kline: null,
      cycle: 'hour',
      platform: 'pc',
      showIndicators: ['Candlestick', 'MA', 'Volume', 'MarketDepth'],
      klineSize: {
        width: 0,
        height: 0
      },
      message: null,
      klineData: null,
      toolTipData: null,
      coinType: '',
      outspreadMA: true
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
        let klineData = splitData(this.klineDataObj.klineData, this.platform)
        let depthData = getDepthData(this.klineDataObj.depthData, this.klineDataObj.coinType);
        let data = Object.assign({}, klineData, depthData);
        this.klineData = data
        if (data.values && data.volumes && data.categoryData) {
          if(this.cycle !== this.klineDataObj.cycle || JSON.stringify(this.coinType) !== JSON.stringify(this.klineDataObj.coinType)) {
            this.clearChart();
            this.kline.showLoading();
            this.toolTipData = this.kline.setOption(data, this.cycle);
            this.cycle = this.klineDataObj.cycle;
            this.coinType = this.klineDataObj.coinType
          }else {
              this.kline.updateOption(data, this.cycle);
          }
        }
      }
    }
  },
  created() {
    if (!this.klineConfig.size) {
      this.klineConfig.defaultSize = true
      this.klineSize = {
        width: '100%',
        height: '572px'
      }
    } else {
      this.klineConfig.defaultSize = false
      this.klineSize = {
        width: this.klineConfig.size.width + 'px',
        height: this.klineConfig.size.height + 'px'
      }
    }
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
    changeDataZoom(type) {
      this.kline.changeDataZoom(type)
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
    resize() {
      let isFullScreen = this.$parent.getState()
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
