<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #e6e6e6;">TRIX:{{this.toolTipData.TRIX}}</font>
      <font style="color: #f6d026;">MATRIX:{{this.toolTipData.MATRIX}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="TRIX"
      :style="{height: `${TRIXSize.height}`, width: `${TRIXSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "TRIX",
  data() {
    return {
      indicator: null,
      indicatorData: null,
      TRIXData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      platform: "",
      chartType: "indicator",
      toolTipData: null,
      TRIXSize: {
        height: "",
        width: ""
      }
    };
  },
  props: {
    chartDataObj: {
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
    },
    resizeSize: {
      type: Object,
      default: () => {
        return {};
      }
    },
    toolTipIndex: {
      type: Number,
      default: null
    },
    cycle: {
      type: String,
      default: "hour"
    }
  },
  watch: {
    cycle() {
      if (this.cycle !== this.currentCycle) {
        this.init(true);
        this.isRefresh = true;
      }
      this.currentCycle = JSON.parse(JSON.stringify(this.cycle));
    },
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.candleData) {
        this.indicatorsData = {
          indicator: "TRIX",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.TRIXData = this.getTRIXData(this.chartDataObj.candleData.values);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.TRIXData;
      }
      if (this.indicatorsData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true);
          this.TRIX.setTRIXOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.TRIX.updateTRIXOption(this.indicatorsData, this.currentCycle);
        }
      }
    },
    klineConfig() {
      if (this.klineConfig.platform === "pc") {
        let size = {
          width: this.klineConfig.size.width + "px",
          height: this.klineConfig.size.height + "px"
        };
        if (
          JSON.stringify(size) !== JSON.stringify(this.TRIXSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.TRIXSize = {
            width: this.klineConfig.size.width + "px",
            height: this.klineConfig.size.height * 0.25 + "px"
          };
          this.resize();
        }
      }
    },
    toolTipIndex() {
      let index = this.toolTipIndex;
      if (index) {
        if (this.chartDataObj.candleData && this.TRIXData) {
          this.TRIXData = this.getTRIXData(this.chartDataObj.candleData.values);
        }
        if (this.TRIXData) {
          this.toolTipData = {
            TRIX: formatDecimal(this.TRIXData.TRIX[index], 2, true),
            MATRIX: formatDecimal(this.TRIXData.MATRIX[index], 2, true)
          };
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      this.platform = "pc";
      if (!this.klineConfig.defaultSize) {
        this.TRIXSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.TRIXSize.width = this.klineConfig.size.width + "px";
      } else {
        this.TRIXSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.platform = "mobile";
      this.TRIXSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.TRIXSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "trix";
    this.TRIX = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.TRIX.initTRIXChart(this.$refs.TRIX, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.TRIX.getTRIXTipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.TRIX.changeTRIXDataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.TRIX.resizeTRIXChart(
          this.$refs.TRIX,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.TRIX.disposeTRIXEChart();
    },
    getTRIXData(datas) {
      if (!datas) {
        return;
      }
      var TR = [];
      let TRa = this.calculateEMAByCandleData(datas, 12);
      let TRb = this.getEMAData(TRa, 12);
      TR = this.getEMAData(TRb, 12);
      var TRIX = [];
      for (let i = 0; i < TR.length; i++) {
        if (i === 0) {
          TRIX.push("-");
        } else {
          TRIX.push(((TR[i] - TR[i - 1]) / TR[i - 1]) * 100);
        }
      }
      var MATRIX = this.getMADataByDetailData(20, TRIX);
      return {
        TRIX: TRIX,
        MATRIX: MATRIX
      };
    },
    calculateEMAByCandleData(data, periodic) {
      var EMA = [];
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          EMA.push(data[i][1]);
        } else {
          let value =
            (2 * data[i][1] + (periodic - 1) * EMA[i - 1]) / (periodic + 1);
          EMA.push(value);
        }
      }
      return EMA;
    },
    getEMAData(data, periodic) {
      var EMA = [];
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          EMA.push(data[i]);
        } else {
          EMA.push(
            (2 * data[i] + (periodic - 1) * EMA[i - 1]) / (periodic + 1)
          );
        }
      }
      return EMA;
    },
    getMADataByDetailData(periodic, data) {
      var result = [];
      for (var i = 0, len = data.length; i < len; i++) {
        if (i < periodic - 1) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < periodic - 1; j++) {
          let item = parseFloat(data[i - j]);
          if (isNaN(item)) {
            sum += 0;
          } else {
            sum += item;
          }
        }
        result.push(sum / periodic);
      }
      return result;
    }
  }
};
</script>
