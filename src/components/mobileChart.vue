<template>
  <div>
    <div
      :class="this.message.language === 'zh' ? 'mobile-tooltip-zh' : 'mobile-tooltip-en'"
      v-if="toolTipData"
    >
      <div style="margin-left: -0.1rem; margin-top: 0.05rem;">
        <font class="mobile-tooltip-name">{{message.openingMobile}}</font>
        <font class="mobile-tooltip-data">{{this.toolTipData.opening}}</font>
        <font class="mobile-tooltip-name">{{message.closingMobile}}</font>
        <font class="mobile-tooltip-data">{{this.toolTipData.closing}}</font>
        <font class="mobile-tooltip-name">{{message.maxMobile}}</font>
        <font class="mobile-tooltip-data">{{this.toolTipData.max}}</font>
        <font class="mobile-tooltip-name">{{message.minMobile}}</font>
        <font class="mobile-tooltip-data">{{this.toolTipData.min}}</font>
        <font class="mobile-tooltip-name">{{message.volumeMobile}}</font>
        <font class="mobile-tooltip-data">{{this.toolTipData.volume}}</font>
      </div>
      <div style="font-size:0.16rem; margin-top: 0.1rem;">
        <font
          v-for="MAitem in this.klineConfig.MA"
          :key="MAitem.id"
          :style="{ color: MAitem.color, marginRight: '0.14rem'}"
        >
          {{MAitem.name}}
          <font>:&nbsp;{{ getMATipData(MAitem.name) }}</font>
        </font>
        <br />
      </div>
    </div>
    <!-- timeDivision tootip 数据显示 -->
    <div
      :class="this.message.language === 'en' ? 'time-sharing-en-data' : 'time-sharing-zh-data'"
      v-if="timeSharingTipData"
    >
      <font
        :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'"
      >{{this.timeSharingTipData.time}}</font>
      <font class="mobile-tooltip-name">{{message.volumeMobile}}</font>
      <font
        :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'"
      >{{this.timeSharingTipData.volume}}</font> &nbsp;
      <font class="mobile-tooltip-name">{{message.price}}</font>
      <font
        :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'"
      >{{this.timeSharingTipData.price}}</font> &nbsp;
      <font class="mobile-tooltip-name">{{message.averagePrice}}</font>
      <font
        :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'"
      >{{this.timeSharingTipData.averagePrice}}</font> &nbsp;
      <br />
    </div>
    <!-- 平移、刷新、缩放按钮 -->
    <div class="kline-levitation-mobile-div">
      <div class="kline-levitation-icon">
        <div class="kline-levitation-btn" @click="changeDataZoom('narrow')">
          <i class="narrow-icon"></i>
        </div>
        <div class="kline-levitation-btn" @click="changeDataZoom('enlarge')">
          <i class="enlarge-icon"></i>
        </div>
      </div>
    </div>
    <KLine
      ref="candle"
      v-show="showChart === 'candle'"
      v-on:listenToChildEvent="changeCycle"
      v-on:listenTipIndex="getTipDataIndex"
      v-on:listenIndicatorChartOpenClose="getIndicatorOpenClose"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
    ></KLine>
    <Volume
      ref="volume"
      v-show="showChart === 'candle'"
      v-on:listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></Volume>
    <MACD
      ref="macd"
      v-show="showIndicatorChart === 'MACD' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></MACD>
    <KDJ
      ref="kdj"
      v-show="showIndicatorChart === 'KDJ' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></KDJ>
    <RSI
      ref="rsi"
      v-show="showIndicatorChart === 'RSI' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></RSI>
    <MTM
      ref="mtm"
      v-show="showIndicatorChart === 'MTM' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></MTM>
    <WR
      ref="wr"
      v-show="showIndicatorChart === 'WR' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></WR>
    <VR
      ref="vr"
      v-show="showIndicatorChart === 'VR' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></VR>
    <OBV
      ref="obv"
      v-show="showIndicatorChart === 'OBV' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></OBV>
    <TRIX
      ref="trix"
      v-show="showIndicatorChart === 'TRIX' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></TRIX>
    <DMI
      ref="dmi"
      v-show="showIndicatorChart === 'DMI' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></DMI>
    <PSY
      ref="psy"
      v-show="showIndicatorChart === 'PSY' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></PSY>
    <ROC
      ref="roc"
      v-show="showIndicatorChart === 'ROC' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></ROC>
    <DMA
      ref="dma"
      v-show="showIndicatorChart === 'DMA' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></DMA>
    <BRAR
      ref="brar"
      v-show="showIndicatorChart === 'BRAR' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></BRAR>
    <Boll
      ref="boll"
      v-show="showIndicatorChart === 'Boll' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></Boll>
    <SAR
      ref="sar"
      v-show="showIndicatorChart === 'SAR' && cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
    ></SAR>
    <Depth ref="depth" :chart-data-obj="chartDataObj" :kline-config="klineConfig"></Depth>
  </div>
</template>
<script>
import KLine from "./mobileKline.vue";
import Depth from "./marketDepth.vue";
import Volume from "./volumeChart.vue";
import TimeSharing from "./timeSharing.vue";
import MACD from "./MACDChart.vue";
import KDJ from "./KDJChart.vue";
import RSI from "./RSIChart.vue";
import MTM from "./MTMChart.vue";
import WR from "./WRChart.vue";
import OBV from "./OBVChart.vue";
import TRIX from "./TRIXChart.vue";
import DMI from "./DMIChart.vue";
import PSY from "./PSYChart.vue";
import ROC from "./ROCChart.vue";
import BRAR from "./BRARChart.vue";
import VR from "./VRChart.vue";
import DMA from "./DMAChart.vue";
import Boll from "./BollChart.vue"
import SAR from "./SARChart.vue"
import {
  splitData,
  handleDivisionData,
  getDepthData,
  calculateMA
} from "../js/processData";
import { formatDecimal, getLanguage, formatTime } from "../js/utils";
export default {
  name: "mobileChart",
  components: {
    KLine,
    Depth,
    Volume,
    TimeSharing,
    MACD,
    KDJ,
    RSI,
    MTM,
    WR,
    OBV,
    TRIX,
    DMI,
    PSY,
    ROC,
    BRAR,
    VR,
    DMA,
    Boll,
    SAR
  },
  data() {
    return {
      showChart: "candle",
      showIndicatorChart: null,
      message: null,
      cycle: "",
      chartDataObj: {},
      toolTipIndex: null,
      toolTipData: null,
      timeSharingTipData: null,
      divisionTime: null,
      candle: null,
      volume: null,
      macd: null,
      stochastic: null,
      indicator: null
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
        return {};
      }
    }
  },
  created() {
    this.message = getLanguage();
    this.klineConfig.platform = "mobile";
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
  },
  watch: {
    klineDataObj() {
      this.message = getLanguage();
      this.cycle = this.klineDataObj.cycle;
      let candleData;
      let depthData;
      let divisionData;
      let timeDivisionData;
      let MAData = [];
      let precision = {
        price: this.klineDataObj.pricePrecision,
        amount: this.klineDataObj.amountPrecision
      };
      if (
        this.klineDataObj.cycle !== "everyhour" &&
        this.klineDataObj.klineData
      ) {
        candleData = splitData(this.klineDataObj.klineData);
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
        if (!this.toolTipIndex) {
          this.toolTipIndex = candleData.values.length - 1;
        }
      }
      if (this.klineDataObj.depthData) {
        depthData = getDepthData(this.klineDataObj.depthData, precision);
      }
      if (
        this.klineDataObj.cycle === "everyhour" &&
        this.klineDataObj.timeDivisionData
      ) {
        timeDivisionData = this.klineDataObj.timeDivisionData;
        divisionData = handleDivisionData(timeDivisionData);
        this.divisionTime = divisionData.divisionTime;
        if (!this.toolTipIndex) {
          this.toolTipIndex = divisionData.prices.length - 1;
        }
      }
      this.chartDataObj = {
        platform: "mobile",
        precision: precision,
        klineData: this.klineDataObj.klineData,
        indicators: this.showIndicatorChart,
        cycle: this.klineDataObj.cycle,
        coinType: this.klineDataObj.coinType,
        index: this.toolTipIndex,
        candleData: candleData,
        depthData: depthData,
        timeDivisionData: timeDivisionData,
        divisionData: divisionData
      };
    }
  },
  methods: {
    changeCycle(cycle) {
      this.toolTipData = null;
      this.timeSharingTipData = null;
      this.cycle = cycle;
      this.toolTipIndex = null;
      this.chartDataObj.candleData = null;
      this.$emit("listenToChildEvent", cycle);
    },
    getMATipData(name) {
      for (let tipData of this.toolTipData.MAData) {
        if (tipData.name === name) {
          return tipData.data;
        }
      }
    },
    getIndicatorOpenClose(indicator) {
      if (this.showIndicatorChart === indicator) {
        this.showIndicatorChart = null;
      } else {
        this.showIndicatorChart = indicator;
      }
    },
    getTipDataIndex(index) {
      if (index) {
        this.toolTipIndex = index;
        var precision = JSON.parse(JSON.stringify(this.chartDataObj.precision));
        var pricePrecision = !isNaN(precision.price) ? precision.price : 6;
        var amountsPrecision = !isNaN(precision.amount) ? precision.amount : 2;
        if (
          this.chartDataObj.candleData &&
          this.chartDataObj.cycle !== "everyhour"
        ) {
          let data = JSON.parse(JSON.stringify(this.chartDataObj.candleData));
          if (
            data.values[index] &&
            data.categoryData[index] &&
            data.volumes[index]
          ) {
            this.toolTipData = {
              time: data.categoryData[index],
              volume: formatDecimal(
                data.values[index][5],
                amountsPrecision,
                true
              ),
              opening: formatDecimal(
                data.values[index][0],
                pricePrecision,
                true
              ),
              closing: formatDecimal(
                data.values[index][1],
                pricePrecision,
                true
              ),
              max: formatDecimal(data.values[index][3], pricePrecision, true),
              min: formatDecimal(data.values[index][2], pricePrecision, true),
              MAData: [],
              color: data.volumes[index][2]
            };
          }
          for (var i = 0; i < data.MAData.length; i++) {
            this.toolTipData.MAData[i] = {
              name: data.MAData[i].name,
              data: formatDecimal(
                data.MAData[i].data[index],
                pricePrecision,
                true
              )
            };
          }
        } else if (
          this.chartDataObj.divisionData &&
          this.chartDataObj.cycle === "everyhour"
        ) {
          let data = JSON.parse(JSON.stringify(this.chartDataObj.divisionData));
          if (
            data.averages[index] &&
            data.volumes[index] &&
            data.prices[index]
          ) {
            this.timeSharingTipData = {
              time: data.times[index],
              volume: formatDecimal(
                data.volumes[index][1],
                amountsPrecision,
                true
              ),
              price: formatDecimal(data.prices[index], pricePrecision, true),
              averagePrice: formatDecimal(
                data.averages[index],
                pricePrecision,
                true
              ),
              color: data.volumes[index][2]
            };
          }
        }
      }
    },
    changeDataZoom(type) {
      if (this.cycle !== "everyhour") {
        this.$refs.candle.changeDataZoom(type);
        this.$refs.volume.changeDataZoom(type);
        this.$refs.macd.changeDataZoom(type);
        this.$refs.kdj.changeDataZoom(type);
        this.$refs.rsi.changeDataZoom(type);
        this.$refs.mtm.changeDataZoom(type);
        this.$refs.wr.changeDataZoom(type);
        this.$refs.obv.changeDataZoom(type);
        this.$refs.trix.changeDataZoom(type);
        this.$refs.dmi.changeDataZoom(type);
        this.$refs.psy.changeDataZoom(type);
        this.$refs.roc.changeDataZoom(type);
        this.$refs.brar.changeDataZoom(type);
        this.$refs.vr.changeDataZoom(type);
        this.$refs.dma.changeDataZoom(type);
        this.$refs.boll.changeDataZoom(type);
        this.$refs.sar.changeDataZoom(type);
      } else if (this.cycle === "everyhour") {
        this.$refs.candle.changeDataZoom(type);
        this.$refs.volume.changeDataZoom(type);
      }
    }
  }
};
</script>

