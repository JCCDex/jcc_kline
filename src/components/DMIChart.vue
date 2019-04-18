<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #e6e6e6;">PDI:{{this.toolTipData.PDI}}</font>
      <font style="color: #f6d026;">MDI:{{this.toolTipData.MDI}}</font>
      <font style="color: #e03bfa;">ADX:{{this.toolTipData.ADX}}</font>
      <font style="color: #67ff7c;">ADXR:{{this.toolTipData.ADXR}}</font>
    </div>
    <i
      v-if
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;"
      class="icon iconfont icon-popover-close"
    ></i>
    <div
      ref="DMI"
      :style="{height: `${DMISize.height}`, width: `${DMISize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import { getDMIData } from "../js/CalculateIndicator";
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage } from "../js/utils";
export default {
  name: "DMI",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      DMIData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      DMISize: {
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
        this.DMI.clearIndicatorEcharts();
        this.DMI.showLoading();
        this.isRefresh = true;
      }
      this.currentCycle = JSON.parse(JSON.stringify(this.cycle));
    },
    toolTipIndex() {
      let index = this.toolTipIndex;
      if (index) {
        if (this.chartDataObj.candleData && !this.DMIData) {
          let data = JSON.parse(
            JSON.stringify(this.chartDataObj.candleData.values)
          );
          this.DMIData = getDMIData(data);
        }
        if (this.DMIData) {
          this.toolTipData = {
            PDI: parseFloat(this.DMIData.PDI[index]).toFixed(4),
            MDI: parseFloat(this.DMIData.MDI[index]).toFixed(4),
            ADX: parseFloat(this.DMIData.ADX[index]).toFixed(4),
            ADXR: parseFloat(this.DMIData.ADXR[index]).toFixed(4)
          };
        }
      }
    },
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.candleData) {
        this.indicatorsData = {
          indicator: this.chartDataObj.indicators,
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.DMIData = getDMIData(this.chartDataObj.candleData.values);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.DMIData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.DMI.clearIndicatorEcharts();
          this.DMI.setIndicatorOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.$emit(
            "listenIndicatorChartEvent",
            this.DMI.getIndicatorEchart()
          );
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.DMI.updateIndicatorOption(
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
          JSON.stringify(size) !== JSON.stringify(this.DMISize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.DMISize = {
            width: this.klineConfig.size.width + "px",
            height: this.klineConfig.size.height * 0.25 + "px"
          };
          this.resize();
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      if (!this.klineConfig.defaultSize) {
        this.DMISize.height = this.klineConfig.size.height * 0.25 + "px";
        this.DMISize.width = this.klineConfig.size.width + "px";
      } else {
        this.DMISize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.DMISize.height = this.klineConfig.size.height * 0.4 + "px";
      this.DMISize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "indicator";
    this.DMI = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init() {
      this.DMI.initIndicatorChart(this.$refs.DMI);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.DMI.getIndicatorTipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true)
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.DMI.resizeIndicatorChart(
          this.$refs.DMI,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.DMI.disposeIndicatorEChart();
    }
  }
};
</script>
