<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'stochastic-tip-data' : 'mobile-stochastic-tip'"
      v-if="toolTipData"
    >
      <!-- <font style="color: #e6e6e6;">PDI:{{this.toolTipData.PDI}}</font>
      <font style="color: #f6d026;">MDI:{{this.toolTipData.MDI}}</font>
      <font style="color: #e03bfa;">ADX:{{this.toolTipData.ADX}}</font>
      <font style="color: #67ff7c;">ADXR:{{this.toolTipData.ADXR}}</font>-->
    </div>
    <div
      ref="TRIX"
      :style="{height: `${TRIXSize.height}`, width: `${TRIXSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import { getTRIXData } from "../js/processData";
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
      cycle: "",
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
        // getTRIXData(this.chartDataObj.candleData.values);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        //   this.indicatorData.indicatorData = this.TRIXData;
      }
      if (this.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.chartDataObj.cycle !== this.cycle
        ) {
          this.TRIX.clearIndicatorEcharts();
          this.cycle = this.chartDataObj.cycle;
          this.TRIX.setIndicatorOption(this.indicatorData, this.cycle);
          this.$emit(
            "listenIndicatorChartEvent",
            this.TRIX.getIndicatorEchart()
          );
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.TRIX.updateIndicatorOption(this.indicatorData, this.cycle);
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
      let pricePrecision = !isNaN(this.chartDataObj.precision.price)
        ? this.chartDataObj.precision.price
        : 6;
      if (this.chartDataObj.indicators === "TRIX") {
        this.toolTipData = {
          //   PDI: formatDecimal(this.TRIXData.PDI[index], pricePrecision, true),
          //   MDI: formatDecimal(this.TRIXData.MDI[index], pricePrecision, true),
          //   ADX: formatDecimal(this.TRIXData.ADX[index], pricePrecision, true),
          //   ADXR: formatDecimal(this.TRIXData.ADXR[index], pricePrecision, true)
        };
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
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
      this.TRIXSize.height = this.klineConfig.size.height * 0.4 + "px";
      this.TRIXSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "indicator";
    this.TRIX = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init() {
      this.TRIX.initIndicatorChart(this.$refs.TRIX);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.TRIX.getIndicatorTipData();
      this.$emit("listenToTipIndex", index);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.TRIX.resizeIndicatorChart(
          this.$refs.TRIX,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.TRIX.disposeIndicatorEChart();
    }
  }
};
</script>
