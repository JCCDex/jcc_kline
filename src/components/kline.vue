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
      <!-- <div :class="this.message.language === 'en' ? 'tooltip-data-en' : 'tooltip-data-zh'" v-if="toolTipData">
        <div style="margin-right: 180px;">
          <i :class="outspreadMA ? 'icon iconfont icon-kline-hide' : 'icon iconfont icon-kline-show'" @click="showMAData"></i>
          <font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'" style="margin-right: 10px;">{{this.toolTipData.time}}</font>
          <font class="tooltip-data-name">{{message.volume}}<font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.volume}}</font></font>
          <font class="tooltip-data-name">{{message.opening}}<font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.opening}}</font></font>
          <font class="tooltip-data-name">{{message.max}}<font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.max}}</font></font>
          <font class="tooltip-data-name">{{message.min}}<font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.min}}</font></font>
          <font class="tooltip-data-name">{{message.closing}}<font :class="toolTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.toolTipData.closing}}</font></font><br>
        </div>
        <div v-if = "outspreadMA">
          <font v-for="MAitem in this.klineConfig.MA" :key="MAitem.id" :style = "{ color: MAitem.color, marginRight: '12px'}">{{MAitem.name}}<font>:&nbsp;{{ getMAData(MAitem.name) }}</font></font>
        </div>
      </div> -->
      <!-- kline -->
      <div id="kline" ref="klineRef" :style="{height: `${klineSize.height}`, width: `${klineSize.width}`}" @mousemove="getToolTipIndex"></div>
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
      klineSize: {
        width: 0,
        height: 0
      },
      message: null,
      klineData: null,
      toolTipData: null,
      toolTipIndex: 0,
      coinType: '',
      outspreadMA: true
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
      this.message = getLanguage();
      if (this.chartDataObj.candleData) {
        let data = this.chartDataObj.candleData
        data.precision = this.chartDataObj.precision
        if (data.values && data.volumes && data.categoryData) {
          if (this.cycle !== this.chartDataObj.cycle || JSON.stringify(this.coinType) !== JSON.stringify(this.chartDataObj.coinType)) {
            this.clearChart();
            this.kline.showLoading();
            this.toolTipIndex = this.kline.setOption(data, this.chartDataObj.cycle);
            this.$emit("listenToTipIndex", this.toolTipIndex)
            this.$emit("listenCandleChartEvent", this.kline.getEchart())
            this.cycle = this.chartDataObj.cycle;
            this.coinType = this.chartDataObj.coinType
          } else {
              this.kline.updateOption(data, this.chartDataObj.cycle);
          }
        }
      }
    },
    klineConfig() {
      let size = {
        width: this.klineConfig.size.width + 'px',
        height: this.klineConfig.size.height + 'px'
      }
      if (JSON.stringify(size) !== JSON.stringify(this.klineSize) && this.klineConfig.defaultSize === false) {
        this.klineSize = {
          width: this.klineConfig.size.width + 'px',
          height: '100%'
        }
        this.resize();
      }
    }
  },
  created() {
    if (this.klineConfig.defaultSize) {
      this.klineSize = {
        width: '100%',
        height: '572px'
      }
    } else {
      this.klineSize = {
        width: this.klineConfig.size.width + 'px',
        height: this.klineConfig.size.height + 'px'
      }
    }
    this.message = getLanguage();
    this.kline = new KLineController(this.platform, this.klineConfig);
  },
  mounted() {
    this.init();
    if (this.klineConfig.defaultSize === true) {
      window.addEventListener("resize", this.resize);
    }
  },
  beforeDestroy() {
    if (this.klineConfig.defaultSize === true) {
      window.removeEventListener("resize", this.resize);
    }
    this.dispose()
  },
  methods: {
    getMAData(name) {
      for( let tipData of this.toolTipData.MAData) {
        if (tipData.name === name) {
          return tipData.data
        }
      }
    },
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
    getToolTipIndex() {
      this.toolTipIndex = this.kline.getToolTipIndex()
      this.$emit("listenToTipIndex", this.toolTipIndex)
    },
    showMAData() {
      if (!this.outspreadMA) {
        this.outspreadMA = true
      } else {
        this.outspreadMA = false
      }
    },
    resize() {
      setTimeout(this.resizeSize(), 500)
    },
    resizeSize () {
      let isFullScreen = this.$parent.getState()
      this.kline.resizeChart(this.$refs.klineRef, isFullScreen, this.klineConfig.size);
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
