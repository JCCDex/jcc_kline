<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">RSI6:&nbsp;{{toolTipData.RSI6}}</font>
      <font style="color: #16c5ff;">RSI12:&nbsp;{{toolTipData.RSI12}}</font>
      <font style="color: #e03bfa;">RSI24:&nbsp;{{toolTipData.RSI24}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="RSI"
      :style="{height: `${RSISize.height}`, width: `${RSISize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "RSI",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      RSIData: null,
      platform: "",
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      refreshKline: true,
      chartType: "rsi",
      toolTipData: null,
      RSISize: {
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
      if (this.chartDataObj.cycle === "everyhour") {
        return
      }
      if (this.chartDataObj.candleData) {
        this.indicatorsData = {
          indicator: "RSI",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        let RSI6 = this.getRSIData(this.chartDataObj.candleData.values, 6);
        let RSI12 = this.getRSIData(this.chartDataObj.candleData.values, 12);
        let RSI24 = this.getRSIData(this.chartDataObj.candleData.values, 24);
        this.RSIData = {
          RSI6: RSI6,
          RSI12: RSI12,
          RSI24: RSI24
        };
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.RSIData;
      } else  if (
        JSON.stringify(this.coinType) !==
        JSON.stringify(this.chartDataObj.coinType)
      ) {
        this.init(true);
        this.toolTipData = null;
        this.indicatorsData = null;
        this.coinType = this.chartDataObj.coinType;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh || this.refreshKline
        ) {
          this.init(true);
          this.RSI.setRSIOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.refreshKline = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.RSI.updateRSIOption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.RSISize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.RSISize = {
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
        if (this.chartDataObj.candleData && !this.RSIData) {
          let RSI6 = this.getRSIData(this.chartDataObj.candleData.values, 6);
          let RSI12 = this.getRSIData(this.chartDataObj.candleData.values, 12);
          let RSI24 = this.getRSIData(this.chartDataObj.candleData.values, 24);
          this.RSIData = {
            RSI6: RSI6,
            RSI12: RSI12,
            RSI24: RSI24
          };
        }
        if (this.RSIData) {
          this.toolTipData = {
            RSI6: formatDecimal(this.RSIData.RSI6[index], 2, true),
            RSI12: formatDecimal(this.RSIData.RSI12[index], 2, true),
            RSI24: formatDecimal(this.RSIData.RSI24[index], 2, true)
          };
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      this.platform = "pc";
      if (!this.klineConfig.defaultSize) {
        this.RSISize.height = this.klineConfig.size.height * 0.25 + "px";
        this.RSISize.width = this.klineConfig.size.width + "px";
      } else {
        this.RSISize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.platform = "mobile";
      this.RSISize.height = this.klineConfig.size.height * 0.3 + "px";
      this.RSISize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "rsi";
    this.RSI = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.refreshKline = true;
      this.RSI.initRSIChart(this.$refs.RSI, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.RSI.getRSITipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    changeDataZoom(type) {
      this.RSI.changeRSIDataZoom(type);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.RSI.resizeRSIChart(
          this.$refs.RSI,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.RSI.disposeRSIEChart();
    },
    getRSIData(datas, periodic) {
      if (!datas) {
        return;
      }
      let RSI = [];
      let upsAndDowns = [];
      for (let i = 0; i < datas.length; i++) {
        if (i === 0) {
          upsAndDowns.push(0);
        } else {
          upsAndDowns.push((datas[i][1] - datas[i - 1][1]) / datas[i - 1][1]);
        }
      }
      for (let i = 0; i < upsAndDowns.length; i++) {
        if (i < periodic - 1) {
          RSI.push("-");
        } else {
          let gains = 0; //涨幅
          let gainsNumber = 0; //涨幅天数
          let drop = 0; //跌幅
          let dropNumber = 0; //跌幅天数
          for (let j = i - periodic + 1; j < i + 1; j++) {
            if (upsAndDowns[j] >= 0) {
              gains = gains + upsAndDowns[j];
              gainsNumber = gainsNumber + 1;
            } else {
              drop = drop + upsAndDowns[j];
              dropNumber = dropNumber + 1;
            }
          }
          let gainsAverage = gains / gainsNumber;
          let dropAverage = drop / dropNumber;
          let RSIValue =
            (gainsAverage / (gainsAverage + Math.abs(dropAverage))) * 100;
          if (isNaN(RSIValue)) {
            RSI.push(0);
          } else {
            RSI.push(RSIValue);
          }
        }
      }
      return RSI;
    }
  }
};
</script>
