<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'stochastic-tip-data' : 'mobile-stochastic-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">K:&nbsp;{{toolTipData.K}}&nbsp;</font>
      <font style="color: #ff4d71;">D:&nbsp;{{toolTipData.D}}&nbsp;</font>
      <font style="color: #f6d026;">J:&nbsp;{{toolTipData.J}}&nbsp;</font>
    </div>
    <div
      ref="stochastic"
      :style="{height: `${stochasticSize.height}`, width: `${stochasticSize.width}`}"
      @mousemove="getToolTipData()"
    ></div>
  </div>
</template>
<script>
import { splitData, getDepthData, getKDJData } from "../js/processData";
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "stochastic",
  data() {
    return {
      stochastic: null,
      KDJData: null,
      coinType: "",
      cycle: "",
      chartType: "stochastic",
      toolTipData: null,
      stochasticSize: {
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
    toolTipIndex() {
      let index = this.toolTipIndex;
      if (this.KDJData) {
        let pricePrecision = !isNaN(this.KDJData.precision.price)
          ? this.KDJData.precision.price
          : 6;
        this.toolTipData = {
          K: formatDecimal(this.KDJData.K[index], pricePrecision, true),
          D: formatDecimal(this.KDJData.D[index], pricePrecision, true),
          J: formatDecimal(this.KDJData.J[index], pricePrecision, true)
        };
      }
    },
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.candleData) {
        let data = JSON.parse(
          JSON.stringify(this.chartDataObj.candleData.values)
        );
        this.KDJData = getKDJData(9, data);
        let index = this.KDJData.K.length - 1;
        this.$emit("listenToTipIndex", index);
        this.KDJData.precision = this.chartDataObj.precision;
        this.KDJData.categoryData = JSON.parse(
          JSON.stringify(this.chartDataObj.candleData.categoryData)
        );
        if (this.KDJData) {
          if (
            JSON.stringify(this.coinType) !==
              JSON.stringify(this.chartDataObj.coinType) ||
            this.chartDataObj.cycle !== this.cycle
          ) {
            this.stochastic.clearStochasticEcharts();
            this.cycle = this.chartDataObj.cycle;
            this.stochastic.setStochasticOption(this.KDJData, this.cycle);
            this.$emit(
              "listenStochasticChartEvent",
              this.stochastic.getStochasticEchart()
            );
            this.coinType = this.chartDataObj.coinType;
          } else {
            this.stochastic.updateStochasticOption(this.KDJData, this.cycle);
          }
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
          JSON.stringify(size) !== JSON.stringify(this.stochasticSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.stochasticSize = {
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
        this.stochasticSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.stochasticSize.width = this.klineConfig.size.width + "px";
      } else {
        this.stochasticSize = {
          height: "572px",
          width: "100%"
        };
      }
    } else {
      this.stochasticSize.height = this.klineConfig.size.height * 0.4 + "px";
      this.stochasticSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "stochastic";
    this.stochastic = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init() {
      this.stochastic.initStochasticChart(this.$refs.stochastic);
      this.resize();
    },
    getToolTipData() {
      let index = this.stochastic.getStochasticTipData();
      this.$emit("listenToTipIndex", index);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.stochastic.resizeStochasticChart(
          this.$refs.stochastic,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.stochastic.disposeStochasticEChart();
    }
  }
};
</script>
