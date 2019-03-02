<template>
  <div>
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">
      <div v-show = "showExitFullScreen" class = "exit-full-screen">
        <div class="exit-full-screen-btn" @click = "fullScreenToggle" >Exit Full Screen(Esc)</div>
      </div>
      <!-- tooltip数据显示 -->
      <div :class="this.message.language === 'en' ? 'tooltip-data-en' : 'tooltip-data-zh'" v-if = "showChart === 'candle' && toolTipData">
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
      </div>
      <div style="position: absolute;right:50px;top:20px;z-index:5;font-size: 13px;">
          <div @click = "changeChart('candle')" :class = "this.showChart === 'candle' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'">{{message.candle}}</div>
          <div @click = "changeChart('depth')" :class = "this.showChart === 'depth' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'" style="margin-left: 10px;margin-right: 20px;">{{message.depth}}</div>
          <!-- <span @click = "changeChart('timeSharing')" :class = "this.showChart === 'timeSharing' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'">timeSharing</span> -->
      </div>
      <div style="position: absolute;right:30px;top:23px;z-index:5;" class="full-screen-div">
          <i v-show = "!fullscreen" class="icon iconfont icon-full-screen" @click="fullScreenToggle">
            <span v-show="!fullscreen" :class=" message.language === 'zh' ? 'icon-fullscreen-tooltip' : 'icon-fullscreen-entip'"><font style="font-size:14px;line-height:22px;">{{message.fullScreen}}</font></span>
          </i>
          <i v-show = "fullscreen" class="icon iconfont icon-exit-full-screen" @click="fullScreenToggle">
            <span v-show="fullscreen" :class=" message.language === 'zh' ? 'exit-fullscreen-tooltip' : 'exit-fullscreen-entip'"><font style="font-size:14px;line-height:22px;">{{message.exitFullScreen}}</font></span>
          </i>
      </div>
      <!-- <div class = "kline-levitation-div" v-show = "showChart === 'candle'" @mouseenter="enter()" @mouseleave="leave()">
        <div class="kline-levitation-icon" v-show = "isShow">
          <div class="kline-levitation-btn" @click = "changeDataZoom('leftShift')">左移</div>
          <div class="kline-levitation-btn" @click = "changeDataZoom('narrow')">缩小</div>
          <div class="kline-levitation-btn" @click = "changeDataZoom('refresh')">刷新</div>
          <div class="kline-levitation-btn" @click = "changeDataZoom('enlarge')">放大</div>
          <div class="kline-levitation-btn" @click = "changeDataZoom('rightShift')">右移</div>
        </div>
      </div> -->
      <KLine ref="candle" v-show = "showChart === 'candle'" v-on:listenCandleChartEvent = 'getCandleChart' v-on:listenToTipIndex = "getTipDataIndex" v-on:listenToChildEvent = "changeCycle" :kline-config = "klineConfig" :chart-data-obj = "chartDataObj"></KLine>
      <Volume ref = 'volume' v-show = "showChart === 'candle'" v-on:listenVolumeChartEvent = 'getVolumeChart' v-on:listenToTipIndex = "getTipDataIndex" :kline-config = "klineConfig" :chart-data-obj = "chartDataObj"></Volume>
      <Depth ref="depth" v-show = "showChart === 'depth'" :chart-data-obj = "chartDataObj" :kline-config = "klineConfig"></Depth>
      <!-- <time-sharing ref="timeSharing" v-show="showChart === 'timeSharing'" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></time-sharing> -->
    </fullscreen>
  </div>
</template>
<script>
import '../icon/iconfont.css'
import '../css/common.css'
import Fullscreen from "vue-fullscreen/src/component.vue"
import KLine from './kline.vue'
import Depth from './marketDepth.vue'
import Volume from './volumeChart.vue'
import { getLanguage, getDefaultChartSize, formatDecimal } from '../js/utils'
import { splitData, getDepthData, calculateMA } from '../js/processData'
import { linkageVolume } from '../js/linkageCharts'
// import TimeSharing from './timeSharing.vue'
export default {
  name: "klineChart",
  components: {
    KLine,
    Depth,
    Volume,
    Fullscreen
    // TimeSharing
  },
  data() {
    return {
      showChart: 'candle',
      fullscreen: false,
      isShow: false,
      showExitFullScreen: false,
      candle: null,
      volume: null,
      pricePrecision: 6,
      amountsPrecision: 2,
      chartDataObj: {},
      toolTipData: null,
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
          platform: 'pc',
          defaultSize: true
        }
      }
    }
  },
  created() {
    this.klineConfig.platform = 'pc'
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
    if (this.klineConfig.defaultSize !== false) {
      this.klineConfig.size = getDefaultChartSize()
    }
    this.message = getLanguage();
  },
  watch: {
    klineConfig() {
      this.klineConfig.platform = 'pc'
      if (this.klineConfig.defaultSize !== false) {
        this.klineConfig.size = getDefaultChartSize()
      }
    },
    klineDataObj() {
      let candleData
      let depthData
      let MAData = []
      this.message = getLanguage()
      let precision = {
        price: this.klineDataObj.pricePrecision,
        amount: this.klineDataObj.amountPrecision
      }
      if (this.klineDataObj.klineData) {
        candleData = splitData(this.klineDataObj.klineData, 'pc')
        for (var i = 0; i < this.klineConfig.MA.length; i++) {
          MAData[i] = {}
          MAData[i].name = this.klineConfig.MA[i].name
          MAData[i].data = calculateMA(this.klineConfig.MA[i].name.substring(2) * 1, candleData)
        }
        candleData.MAData = MAData
        candleData.precision = precision
      }
      if (this.klineDataObj.depthData) {
        depthData = getDepthData(this.klineDataObj.depthData);
      }
      this.chartDataObj = {
        platform: 'pc',
        precision: precision,
        cycle: this.klineDataObj.cycle,
        coinType: this.klineDataObj.coinType,
        candleData: candleData,
        depthData: depthData
      }
    },
    fullscreen() {
      if (this.fullscreen && (getLanguage().language === "en")) {
          this.showExitFullScreen = true;
        } else {
          this.showExitFullScreen = false;
        }
    }
  },
  methods: {
    getMAData(name) {
      if (this.toolTipData) {
        for( let tipData of this.toolTipData.MAData) {
          if (tipData.name === name) {
            return tipData.data
          }
        }
      }
    },
    showMAData() {
      if (!this.outspreadMA) {
        this.outspreadMA = true
      } else {
        this.outspreadMA = false
      }
    },
    changeCycle(cycle) {
      this.$emit("listenToChildEvent", cycle)
    },
    getCandleChart(candle) {
      this.candle = candle
      if (this.volume) {
        linkageVolume(this.candle, this.volume)
      }
    },
    getVolumeChart(volume) {
      this.volume = volume
      if (this.candle) {
        linkageVolume(this.candle, this.volume)
      }
    },
    getTipDataIndex(index) {
      let data = JSON.parse(JSON.stringify(this.chartDataObj.candleData))
      let pricePrecision = !isNaN(data.precision.price) ? data.precision.price : this.pricePrecision;
      let amountsPrecision = !isNaN(data.precision.amount) ? data.precision.amount : this.amountsPrecision;
      this.toolTipData = {
        time: data.categoryData[index],
        volume: formatDecimal(data.values[index][5], amountsPrecision, true),
        opening: formatDecimal(data.values[index][0], pricePrecision, true),
        closing: formatDecimal(data.values[index][1], pricePrecision, true),
        max: formatDecimal(data.values[index][3], pricePrecision, true),
        min: formatDecimal(data.values[index][2], pricePrecision, true),
        MAData: [],
        color: data.volumes[index][2]
      }
      for (var i = 0; i < data.MAData.length; i++) {
        this.toolTipData.MAData[i] = {
          name: data.MAData[i].name,
          data: formatDecimal(data.MAData[i].data[index], pricePrecision, true),
        };
      }
    },
    changeChart(type) {
      if (this.showChart === type) {
        return;
      }
      this.showChart = type
    },
    changeDataZoom(type){
      if (this.showChart === 'candle') {
        this.$refs.candle.changeDataZoom(type)
      }
    },
    fullScreenToggle() {
      this.$refs['fullscreen'].toggle()
    },
    enter() {
      this.isShow = true;
    },
    leave() {
      this.isShow = false;
    }
  }
}
</script>