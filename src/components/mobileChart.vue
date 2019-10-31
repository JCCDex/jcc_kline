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
      <div v-show="showIndicatorMA" style="font-size:0.16rem; margin-top: 0.1rem;">
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
      @listenShowMA="showMA"
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
    <Indicator
      ref="indicator"
      v-show="showIndicatorChart != null &&cycle !== 'everyhour'"
      :toolTipIndex="toolTipIndex"
      @listenToTipIndex="getTipDataIndex"
      :kline-config="klineConfig"
      :chart-data-obj="chartDataObj"
      :cycle="cycle"
      :indicatorType="showIndicatorChart"
    ></Indicator>
    <Depth ref="depth" :chart-data-obj="chartDataObj" :kline-config="klineConfig"></Depth>
  </div>
</template>
<script>
import KLine from "./mobileKline.vue";
import Depth from "./marketDepth.vue";
import Volume from "./volumeChart.vue";
import TimeSharing from "./timeSharing.vue";
import Indicator from "./IndicatorChart.vue";
import {
  supplementKlineData,
  splitData,
  handleDivisionData,
  getDepthData,
  calculateMA
} from "../js/processData";
import { formatDecimal, getLanguage, formatTime } from "../js/utils";
import { constants } from "zlib";
export default {
  name: "mobileChart",
  components: {
    KLine,
    Depth,
    Volume,
    TimeSharing,
    Indicator
  },
  data() {
    return {
      showChart: "candle",
      showIndicatorChart: null,
      message: null,
      cycle: "",
      chartDataObj: {},
      dataZoom: [],
      toolTipIndex: null,
      toolTipData: null,
      timeSharingTipData: null,
      divisionTime: null,
      candle: null,
      volume: null,
      macd: null,
      stochastic: null,
      indicator: null,
      showIndicatorMA: true
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
          color: "#fd1d57"
        },
        {
          name: "MA10",
          color: "#4df561"
        },
        {
          name: "MA20",
          color: "#2bdaff"
        },
        {
          name: "MA30",
          color: "#ffd801"
        },
        {
          name: "MA60",
          color: "#f721ff"
        }
      ];
    }
  },
  watch: {
    klineDataObj() {
      this.message = getLanguage();
      let suppKlineData = [];
      if (this.klineDataObj.klineData) {
        suppKlineData = JSON.parse(JSON.stringify(this.klineDataObj.klineData));
      }
      this.cycle = this.klineDataObj.cycle;
      this.klineDataObj.klineData = supplementKlineData(
        suppKlineData,
        this.cycle,
        this.klineDataObj.pricePrecision
      );
      this.changeChartDataObj(this.klineDataObj, this.showIndicatorMA);
    }
  },
  methods: {
    showMA() {
      this.showIndicatorMA = !this.showIndicatorMA;
      this.changeChartDataObj(this.klineDataObj, this.showIndicatorMA);
    },
    changeCycle(cycle) {
      this.toolTipData = null;
      this.timeSharingTipData = null;
      this.dataZoom = null;
      this.cycle = cycle;
      this.toolTipIndex = null;
      this.chartDataObj.candleData = null;
      this.$emit("listenToChildEvent", cycle);
    },
    changeChartDataObj(klineDataObj, MA) {
      let chartData = JSON.parse(JSON.stringify(klineDataObj));
      let candleData;
      let depthData;
      let divisionData;
      let timeDivisionData;
      let dataZoomData;
      let MAData = [];
      let precision = {
        price: chartData.pricePrecision,
        amount: chartData.amountPrecision
      };
      if (chartData.cycle !== "everyhour" && chartData.klineData) {
        candleData = splitData(chartData.klineData);
        for (var i = 0; i < this.klineConfig.MA.length; i++) {
          MAData[i] = {};
          MAData[i].name = this.klineConfig.MA[i].name;
          MAData[i].data = calculateMA(
            this.klineConfig.MA[i].name.substring(2) * 1,
            candleData
          );
        }
        candleData.MAData = MAData;
        candleData.showIndicatorMA = this.showIndicatorMA;
        candleData.precision = precision;
        if (!this.toolTipIndex) {
          this.toolTipIndex = candleData.values.length - 1;
        }
      }
      if (this.dataZoom && this.dataZoom.length > 0) {
        dataZoomData = JSON.parse(JSON.stringify(this.dataZoom));
        this.dataZoom = null;
      }
      if (chartData.depthData) {
        depthData = getDepthData(chartData.depthData, precision);
      }
      if (
        chartData.cycle === "everyhour" &&
        chartData.timeDivisionData &&
        chartData.timeDivisionData.length > 0
      ) {
        timeDivisionData = chartData.timeDivisionData;
        divisionData = handleDivisionData(timeDivisionData);
        this.divisionTime = divisionData.divisionTime;
        if (!this.toolTipIndex) {
          this.toolTipIndex = divisionData.prices.length - 1;
        }
      }
      this.chartDataObj = {
        platform: "mobile",
        precision: precision,
        klineData: chartData.klineData,
        indicators: this.showIndicatorChart,
        cycle: chartData.cycle,
        coinType: chartData.coinType,
        index: this.toolTipIndex,
        candleData: candleData,
        depthData: depthData,
        dataZoomData: dataZoomData,
        timeDivisionData: timeDivisionData,
        divisionData: divisionData
      };
    },
    getMATipData(name) {
      for (let tipData of this.toolTipData.MAData) {
        if (tipData.name === name) {
          return tipData.data;
        }
      }
    },
    getIndicatorOpenClose(indicatorData) {
      let indicator = indicatorData.indicator;
      this.dataZoom = indicatorData.dataZoom;
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
          if (data.MAData) {
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
        this.$refs.indicator.changeDataZoom(type);
      } else if (this.cycle === "everyhour") {
        this.$refs.candle.changeDataZoom(type);
        this.$refs.volume.changeDataZoom(type);
      }
    }
  }
};
</script>

