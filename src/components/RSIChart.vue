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
import { getRSIData } from "../js/CalculateIndicator";
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
      chartType: "indicator",
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
        this.init(true, 'init');
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
          indicator: 'RSI',
          categoryData: this.chartDataObj.candleData.categoryData
        };
        let RSI6 = getRSIData(this.chartDataObj.candleData.values, 6);
        let RSI12 = getRSIData(this.chartDataObj.candleData.values, 12);
        let RSI24 = getRSIData(this.chartDataObj.candleData.values, 24);
        this.RSIData = {
          RSI6: RSI6,
          RSI12: RSI12,
          RSI24: RSI24
        };
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.RSIData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true, 'init');
          this.RSI.setIndicatorOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.init(true, 'update');
          this.RSI.updateIndicatorOption(
            this.indicatorsData,
            this.currentCycle
          );
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
          let RSI6 = getRSIData(this.chartDataObj.candleData.values, 6);
          let RSI12 = getRSIData(this.chartDataObj.candleData.values, 12);
          let RSI24 = getRSIData(this.chartDataObj.candleData.values, 24);
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
      this.RSISize.height = this.klineConfig.size.height * 0.4 + "px";
      this.RSISize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "indicator";
    this.RSI = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear, type) {
      this.RSI.initIndicatorChart(this.$refs.RSI, clear, type);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.RSI.getIndicatorTipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    changeDataZoom(type) {
      this.RSI.changeIndicatorDataZoom(type);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.RSI.resizeIndicatorChart(
          this.$refs.RSI,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.RSI.disposeIndicatorEChart();
    }
  }
};
</script>
