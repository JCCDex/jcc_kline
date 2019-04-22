<template>
  <div>
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen" @change="fullscreenChange">
      <div v-show="showExitFullScreen" class="exit-full-screen">
        <div class="exit-full-screen-btn" @click="fullScreenToggle">Exit Full Screen(Esc)</div>
      </div>
      <!-- tooltip数据显示 -->
      <div
        :class="this.message.language === 'en' ? 'tooltip-data-en' : 'tooltip-data-zh'"
        v-if="showChart === 'candle' && toolTipData"
      >
        <div style="margin-right: 180px;">
          <i
            :class="outspreadMA ? 'icon iconfont icon-kline-hide' : 'icon iconfont icon-kline-show'"
            @click="showMAData"
          ></i>
          <font class="tooltip-data-name">{{message.opening}}{{this.toolTipData.opening}}</font>
          <font class="tooltip-data-name">{{message.closing}}{{this.toolTipData.closing}}</font>
          <font class="tooltip-data-name">{{message.max}}{{this.toolTipData.max}}</font>
          <font class="tooltip-data-name">{{message.min}}{{this.toolTipData.min}}</font>
          <font class="tooltip-data-name">{{message.volume}}{{this.toolTipData.volume}}</font>
          <br>
        </div>
        <div v-if="outspreadMA">
          <font
            v-for="MAitem in this.klineConfig.MA"
            :key="MAitem.id"
            :style="{ color: MAitem.color, marginRight: '12px'}"
          >
            {{MAitem.name}}
            <font>:&nbsp;{{ getMAData(MAitem.name) }}</font>
          </font>
        </div>
      </div>
      <!-- 技术指标 -->
      <div style="position: absolute;right:50px;top:20px;z-index:5;font-size: 13px;">
        <!-- <div style="position: absolute;right:150px;top:4px;z-index:5;" class="icon-indicator-div">
            <el-popover placement="bottom" width="60" trigger="click">
              <div class="indicatorOpt">
                <div @click = "showIndicatorChart('OBV')" class = "chart-indicator-div">{{message.OBV}}</div><br>
                <div @click = "showIndicatorChart('DMI')" class = "chart-indicator-div">{{message.DMI}}</div><br>
                <div @click = "showIndicatorChart('MACD')" class = "chart-indicator-div">{{message.MACD}}</div><br>
                <div @click = "showIndicatorChart('Boll')" class = "chart-indicator-div">{{message.Boll}}</div><br>
                <div @click = "showIndicatorChart('TRIX')" class = "chart-indicator-div">{{message.TRIX}}</div><br>
                <div @click = "showIndicatorChart('Stochastic')" class = "chart-indicator-div">{{message.KDJ}}</div><br>
              </div>
              <i v-show = "true" slot="reference" class="icon iconfont icon-indicator">
                <span v-show="true" :class=" message.language === 'zh' ? 'icon-indicator-ch' : 'icon-indicator-en'"><font style="font-size:14px;line-height:22px;">{{message.indicator}}</font></span>
              </i>
            </el-popover>
        </div>-->

        <div v-show="showChart==='candle'"
          style="position: absolute;right:154px;top:3px;z-index:5;"
          class="icon-indicator-div">
          <i v-show="true" @click="showIndicatorOptions" :class="this.showIndicatorOpt ? 'icon iconfont icon-indicator-ed' : 'icon iconfont icon-indicator'">
            <span v-show="true" :class=" message.language === 'zh' ? 'icon-indicator-ch' : 'icon-indicator-en'">
              <font style="font-size:14px;line-height:22px;">{{message.indicator}}</font>
            </span>
          </i>
        </div>
        <div
          @click="changeChart('candle')"
          :class="this.showChart === 'candle' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'"
        >{{message.candle}}</div>
        <div
          @click="changeChart('depth')"
          :class="this.showChart === 'depth' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'"
          style="margin-left: 10px;margin-right: 20px;"
        >{{message.depth}}</div>

        <div v-show="showIndicatorOpt" style="background-color: #1e262c; margin-top: 30px; right: 660px; height: 100px; width: 212px;">
          <div class="indicatorOpt">
            <div style="margin-left:10px">
              <font>{{message.indicator}}</font>
            </div>
            <div @click="showIndicatorOptions" style="margin-right: 10px; float:right; margin-top: -14px;" class="close-background-icon">
            </div>
            <div style="height: 0.05rem; background-color:#2b3944; margin-top:5px"></div>
            <div @click = "showIndicatorChart('MACD')" :class = "this.showIndicator ==='MACD' ? 'chart-indicator-div-active' : 'chart-indicator-div'">
              <div class = "indicator-line">{{message.MACD}}</div>
            </div>
            <div @click = "showIndicatorChart('KDJ')" :class = "this.showIndicator ==='KDJ' ? 'chart-indicator-div-active' : 'chart-indicator-div'">
              <div class = "indicator-line">{{message.KDJ}}</div>
            </div>
            <div @click = "showIndicatorChart('RSI')" :class = "this.showIndicator ==='RSI' ? 'chart-indicator-div-active' : 'chart-indicator-div'">
              <div class = "indicator-line">{{message.RSI}}</div>
            </div>
          </div>
        </div>
        

        <!-- <span @click = "changeChart('timeSharing')" :class = "this.showChart === 'timeSharing' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'">timeSharing</span> -->
      </div>
      <!-- 全屏按钮 -->
      <div style="position: absolute;right:30px;top:23px;z-index:5;" class="full-screen-div">
        <i v-show="!fullscreen" class="icon iconfont icon-full-screen" @click="fullScreenToggle">
          <span
            v-show="!fullscreen"
            :class=" message.language === 'zh' ? 'icon-fullscreen-tooltip' : 'icon-fullscreen-entip'"
          >
            <font style="font-size:14px;line-height:22px;">{{message.fullScreen}}</font>
          </span>
        </i>
        <i
          v-show="fullscreen"
          class="icon iconfont icon-exit-full-screen"
          @click="fullScreenToggle"
        >
          <span
            v-show="fullscreen"
            :class=" message.language === 'zh' ? 'exit-fullscreen-tooltip' : 'exit-fullscreen-entip'"
          >
            <font style="font-size:14px;line-height:22px;">{{message.exitFullScreen}}</font>
          </span>
        </i>
      </div>
      <!-- 平移、刷新、缩放按钮 -->
      <div
        class="kline-levitation-div"
        v-show="showChart === 'candle'"
        @mouseenter="enter()"
        @mouseleave="leave()"
      >
        <div class="kline-levitation-icon" v-show="isShow">
          <div class="kline-levitation-btn" @click="changeDataZoom('leftShift')">
            <div class="left-shift-icon"></div>
          </div>
          <div class="kline-levitation-btn" @click="changeDataZoom('enlarge')">
            <i class="enlarge-icon"></i>
          </div>
          <div class="kline-levitation-btn" @click="changeDataZoom('refresh')">
            <i class="refresh-icon"></i>
          </div>
          <div class="kline-levitation-btn" @click="changeDataZoom('narrow')">
            <i class="narrow-icon"></i>
          </div>
          <div class="kline-levitation-btn" @click="changeDataZoom('rightShift')">
            <i class="right-shift-icon"></i>
          </div>
        </div>
      </div>
      <!-- 图表 -->
      <KLine
        ref="candle"
        v-show="showChart === 'candle'"
        v-on:listenToTipIndex="getTipDataIndex"
        v-on:listenToChildEvent="changeCycle"
        :kline-config="klineConfig"
        :chart-data-obj="chartDataObj"
        :resize-size="resizeSize"
        :cycle="cycle"
      ></KLine>
      <Depth
        ref="depth"
        v-show="showChart === 'depth'"
        :chart-data-obj="chartDataObj"
        :kline-config="klineConfig"
        :resize-size="resizeSize"
      ></Depth>
      <Volume
        ref="volume"
        v-show="showChart !== 'depth'"
        v-on:listenToTipIndex="getTipDataIndex"
        :kline-config="klineConfig"
        :chart-data-obj="chartDataObj"
        :resize-size="resizeSize"
        :cycle="cycle"
      ></Volume>
      <MACD
        ref="macd"  
        v-show="showIndicator === 'MACD' && showChart !== 'depth'"
        v-on:listenMacdChartClose="getMacdClose"
        v-on:listenToTipIndex="getTipDataIndex"
        :toolTipIndex="toolTipIndex"
        :kline-config="klineConfig"
        :chart-data-obj="chartDataObj"
        :resize-size="resizeSize"
        :cycle="cycle"
      ></MACD>
      <KDJ ref = "indicator" 
        v-show="showIndicator === 'KDJ' && showChart !== 'depth'"
        @listenIndicatorChartClose = 'closeIndicatorChart' 
        v-on:listenToTipIndex = "getTipDataIndex" 
        :toolTipIndex = "toolTipIndex" 
        :kline-config = "klineConfig" 
        :chart-data-obj = "chartDataObj" 
        :resize-size = "resizeSize" 
        :cycle = "cycle"
      ></KDJ>
      <RSI ref = "indicator" 
        v-show="showIndicator === 'RSI' && showChart !== 'depth'"
        @listenIndicatorChartClose = 'closeIndicatorChart' 
        v-on:listenToTipIndex = "getTipDataIndex" 
        :toolTipIndex = "toolTipIndex" 
        :kline-config = "klineConfig" 
        :chart-data-obj = "chartDataObj" 
        :resize-size = "resizeSize" 
        :cycle = "cycle"
      ></RSI>
      <!-- <PSY ref = "indicator" 
        v-show="showIndicator === 'PSY' && showChart !== 'depth'"
        @listenIndicatorChartClose = 'closeIndicatorChart' 
        v-on:listenToTipIndex = "getTipDataIndex" 
        :toolTipIndex = "toolTipIndex" 
        :kline-config = "klineConfig" 
        :chart-data-obj = "chartDataObj" 
        :resize-size = "resizeSize" 
        :cycle = "cycle"
      ></PSY>
      <ROC ref = "indicator"
        v-show="showIndicator === 'ROC' && showChart !== 'depth'"
        @listenIndicatorChartClose = 'closeIndicatorChart'
        v-on:listenToTipIndex = "getTipDataIndex"
        :toolTipIndex = "toolTipIndex"
        :kline-config = "klineConfig"
        :chart-data-obj = "chartDataObj"
        :resize-size = "resizeSize"
        :cycle = "cycle"
      ></ROC>
      <VR ref = "indicator"
        v-show="showIndicator === 'VR' && showChart !== 'depth'"
        @listenIndicatorChartClose = 'closeIndicatorChart'
        v-on:listenToTipIndex = "getTipDataIndex"
        :toolTipIndex = "toolTipIndex"
        :kline-config = "klineConfig"
        :chart-data-obj = "chartDataObj"
        :resize-size = "resizeSize"
        :cycle = "cycle"
      ></VR> -->
       <!-- <BRAR ref = "indicator" v-show = "showIndicator === 'BRAR' && showChart !== 'depth'" @listenIndicatorChartClose = 'closeIndicatorChart' v-on:listenToTipIndex = "getTipDataIndex" :toolTipIndex = "toolTipIndex" :kline-config = "klineConfig" :chart-data-obj = "chartDataObj" :resize-size = "resizeSize" :cycle = "cycle"></BRAR> -->
    </fullscreen>
  </div>
</template>
<script>
import "../icon/iconfont.css";
import "../css/common.css";
import Fullscreen from "vue-fullscreen/src/component.vue";
import KLine from "./kline.vue";
import Depth from "./marketDepth.vue";
import Volume from "./volumeChart.vue";
import MACD from "./MACDChart.vue";
import KDJ  from "./KDJChart.vue";
import RSI from "./RSIChart.vue"
// import BRAR from "./BRARChart.vue";
// import PSY from "./PSYChart.vue";
// import ROC from "./ROCChart.vue";
// import VR from "./VRChart.vue";
import { getLanguage, getDefaultChartSize, formatDecimal } from "../js/utils";
import { splitData, getDepthData, handleDivisionData, calculateMA } from "../js/processData";
export default {
  name: "klineChart",
  components: {
    KLine,
    Depth,
    Volume,
    Fullscreen,
    MACD,
    KDJ,
    RSI
    // BRAR,
    // PSY,
    // ROC,
    // VR,
    // DMI,
    // OBV,
    // TRIX,
    // MTM,
    // TimeSharing
  },
  data() {
    return {
      showChart: "candle",
      cycle: "",
      fullscreen: false,
      isShow: false,
      showExitFullScreen: false,
      candle: null,
      volume: null,
      timeSharing: null,
      stochastic: null,
      macd: null,
      indicator: null,
      chartDataObj: {},
      toolTipIndex: null,
      toolTipData: null,
      outspreadMA: true,
      resizeSize: {},
      isFullScreen: false,
      showIndicator: null,
      relevanceIndicator: "MA",
      isClose: true,
      showIndicatorOpt: false,
      showIndicator: "",
      isClose: true
    };
  },
  props: {
    klineDataObj: {
      type: Object,
      default: () => {
        return {};
      }
    },
    klineConfig: {
      type: Object,
      default: () => {
        return {
          platform: "pc",
          defaultSize: true
        };
      }
    }
  },
  created() {
    this.klineConfig.platform = "pc";
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
      this.klineConfig.size = getDefaultChartSize();
    }
    this.message = getLanguage();
  },
  mounted() {
    if (this.klineConfig.defaultSize === true) {
      window.addEventListener("resize", this.resize);
    }
  },
  watch: {
    klineConfig() {
      this.klineConfig.platform = "pc";
      if (this.klineConfig.defaultSize !== false) {
        this.klineConfig.size = getDefaultChartSize();
      }
    },
    klineDataObj() {
      this.cycle = this.klineDataObj.cycle;
      this.changeChartDataObj(this.klineDataObj);
    },
    fullscreen() {
      if (this.fullscreen && getLanguage().language === "en") {
        this.showExitFullScreen = true;
      } else {
        this.showExitFullScreen = false;
      }
    }
  },
  beforeDestroy() {
    if (this.klineConfig.defaultSize === true) {
      window.removeEventListener("resize", this.resize);
    }
  },
  methods: {
    getMAData(name) {
      if (this.toolTipData) {
        for (let tipData of this.toolTipData.MAData) {
          if (tipData.name === name) {
            return tipData.data;
          }
        }
      }
    },
    changeChartDataObj(data) {
      let candleData;
      let depthData;
      let timeDivisionData;
      let divisionData;
      let MAData = [];
      this.message = getLanguage();
      let precision = {
        price: data.pricePrecision,
        amount: data.amountPrecision
      };
      let cycle = data.cycle;
      if (data.klineData) {
        candleData = splitData(data.klineData);
        for (var i = 0; i < this.klineConfig.MA.length; i++) {
          MAData[i] = {};
          MAData[i].name = this.klineConfig.MA[i].name;
          MAData[i].data = calculateMA(
            this.klineConfig.MA[i].name.substring(2) * 1,
            candleData
          );
        }
        candleData.MAData = MAData;
        candleData.precision = precision;
      }
      if (data.depthData) {
        depthData = getDepthData(data.depthData, precision);
      }
      if (data.timeDivisionData) {
        timeDivisionData = data.timeDivisionData;
        divisionData = handleDivisionData(timeDivisionData);
        this.divisionTime = divisionData.divisionTime;
      }
      this.chartDataObj = {
        platform: "pc",
        precision: precision,
        cycle: cycle,
        index: this.toolTipIndex,
        klineData: this.klineDataObj.klineData,
        indicators: this.showIndicator,
        coinType: data.coinType,
        candleData: candleData,
        depthData: depthData,
        divisionData: divisionData,
        timeDivisionData: timeDivisionData
      };
    },
    showMAData() {
      if (!this.outspreadMA) {
        this.outspreadMA = true;
      } else {
        this.outspreadMA = false;
      }
    },
    showIndicatorChart(indicator) {
      if (indicator === this.showIndicator) {
        this.showIndicator = null;
        this.isClose = true;
      } else {
        this.showIndicator = indicator;
        this.isClose = false;
      }
      this.resize();
      this.changeChartDataObj(this.klineDataObj);
    },
    changeCycle(cycle) {
      this.toolTipData = null;
      this.cycle = cycle;
      this.toolTipIndex = null;
      this.$emit("listenToChildEvent", cycle);
    },
    getTipDataIndex(index) {
      if (!isNaN(index)) {
        this.toolTipIndex = index;
        if (this.chartDataObj.precision) {
          let pricePrecision = !isNaN(this.chartDataObj.precision.price)
            ? this.chartDataObj.precision.price
            : 6;
          let amountsPrecision = !isNaN(this.chartDataObj.precision.amount)
            ? this.chartDataObj.precision.amount
            : 2;
          if (this.chartDataObj.candleData) {
            if (
              this.chartDataObj.candleData.values[index] &&
              this.chartDataObj.candleData.categoryData[index]
            ) {
              this.toolTipData = {
                time: this.chartDataObj.candleData.categoryData[index],
                volume: formatDecimal(
                  this.chartDataObj.candleData.values[index][5],
                  amountsPrecision,
                  true
                ),
                opening: formatDecimal(
                  this.chartDataObj.candleData.values[index][0],
                  pricePrecision,
                  true
                ),
                closing: formatDecimal(
                  this.chartDataObj.candleData.values[index][1],
                  pricePrecision,
                  true
                ),
                max: formatDecimal(
                  this.chartDataObj.candleData.values[index][3],
                  pricePrecision,
                  true
                ),
                min: formatDecimal(
                  this.chartDataObj.candleData.values[index][2],
                  pricePrecision,
                  true
                ),
                MAData: [],
                color: this.chartDataObj.candleData.volumes[index][2]
              };
              for (
                var i = 0;
                i < this.chartDataObj.candleData.MAData.length;
                i++
              ) {
                this.toolTipData.MAData[i] = {
                  name: this.chartDataObj.candleData.MAData[i].name,
                  data: formatDecimal(
                    this.chartDataObj.candleData.MAData[i].data[index],
                    pricePrecision,
                    true
                  )
                };
              }
            }
          }
        }
      }
    },
    fullscreenChange(fullscreen) {
      this.isFullScreen = fullscreen;
      this.resize();
    },
    resize() {
      this.resizeSize = {
        isFullScreen: this.isFullScreen,
        isCloseIndicator: this.isClose
      };
    },
    changeChart(type) {
      if (this.showChart === type) {
        return;
      }
      this.showChart = type;
    },
    changeDataZoom(type) {
      if (this.showChart !== "depth") {
        this.$refs.candle.changeDataZoom(type);
        this.$refs.volume.changeDataZoom(type);
        this.$refs.macd.changeDataZoom(type);
      }
    },
    fullScreenToggle() {
      this.$refs["fullscreen"].toggle();
    },
    enter() {
      this.isShow = true;
    },
    leave() {
      this.isShow = false;
    },
    getMacdClose(isClose) {
      this.showIndicator = null;
      this.isClose = isClose;
      this.resize();
    },
    closeIndicatorChart(isClose) {
      this.showIndicator = null;
      this.isClose = isClose;
      this.resize();
    },
    showIndicatorOptions() {
      this.showIndicatorOpt = !this.showIndicatorOpt;
    }
  }
};
</script>