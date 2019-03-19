<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'stochastic-tip-data' : 'mobile-stochastic-tip'"
      v-if="toolTipData"
    >
      <font style="color: #e6e6e6;">PDI:{{this.toolTipData.PDI}}</font>
      <font style="color: #f6d026;">MDI:{{this.toolTipData.MDI}}</font>
      <font style="color: #e03bfa;">ADX:{{this.toolTipData.ADX}}</font>
      <font style="color: #67ff7c;">ADXR:{{this.toolTipData.ADXR}}</font>
    </div>
    <div
      ref="indicator"
      :style="{height: `${indicatorSize.height}`, width: `${indicatorSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import {
  splitData,
  getDepthData,
  getKDJData,
  getDMIData
} from "../js/processData";
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "indicator",
  data() {
    return {
      indicator: null,
      indicatorData: null,
      DMIData: null,
      coinType: "",
      cycle: "",
      chartType: "indicator",
      toolTipData: null,
      indicatorSize: {
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
    }
  },
  watch: {
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.klineData) {
        this.indicatorData = {
          indicator: this.chartDataObj.indicators,
          categoryData: this.chartDataObj.candleData.categoryData
        };
        if (this.chartDataObj.indicators === "DMI") {
          this.DMIData = getDMIData(this.chartDataObj.candleData.values);
          let index = this.chartDataObj.index;
          this.$emit("listenToTipIndex", index);
          this.indicatorData.indicatorData = this.DMIData;
        }
      }
      if (this.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.chartDataObj.cycle !== this.cycle
        ) {
          this.indicator.clearIndicatorEcharts();
          this.cycle = this.chartDataObj.cycle;
          this.indicator.setIndicatorOption(this.indicatorData, this.cycle);
          this.$emit(
            "listenIndicatorChartEvent",
            this.indicator.getIndicatorEchart()
          );
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.indicator.updateIndicatorOption(this.indicatorData, this.cycle);
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
          JSON.stringify(size) !== JSON.stringify(this.indicatorSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.indicatorSize = {
            width: this.klineConfig.size.width + "px",
            height: this.klineConfig.size.height * 0.25 + "px"
          };
          this.resize();
        }
      }
    },
    toolTipIndex() {
      let index = this.toolTipIndex;
      let pricePrecision = !isNaN(this.chartDataObj.precision.price)
        ? this.chartDataObj.precision.price
        : 6;
      if (this.chartDataObj.indicators === "DMI") {
        this.toolTipData = {
          PDI: formatDecimal(this.DMIData.PDI[index], pricePrecision, true),
          MDI: formatDecimal(this.DMIData.MDI[index], pricePrecision, true),
          ADX: formatDecimal(this.DMIData.ADX[index], pricePrecision, true),
          ADXR: formatDecimal(this.DMIData.ADXR[index], pricePrecision, true)
        };
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      if (!this.klineConfig.defaultSize) {
        this.indicatorSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.indicatorSize.width = this.klineConfig.size.width + "px";
      } else {
        this.indicatorSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.indicatorSize.height = this.klineConfig.size.height * 0.4 + "px";
      this.indicatorSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "indicator";
    this.indicator = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init() {
      this.indicator.initIndicatorChart(this.$refs.indicator);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.indicator.getIndicatorTipData();
      this.$emit("listenToTipIndex", index);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.indicator.resizeIndicatorChart(
          this.$refs.indicator,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.indicator.disposeIndicatorEChart();
    }
  }
};
</script>
