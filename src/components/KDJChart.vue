<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">K:&nbsp;{{toolTipData.K}}&nbsp;</font>
      <font style="color: #ff4d71;">D:&nbsp;{{toolTipData.D}}&nbsp;</font>
      <font style="color: #f6d026;">J:&nbsp;{{toolTipData.J}}&nbsp;</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="stochastic"
      :style="{height: `${stochasticSize.height}`, width: `${stochasticSize.width}`}"
      @mousemove="getToolTipData()"
    ></div>
  </div>
</template>
<script>
import { getKDJData } from "../js/CalculateIndicator";
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "stochastic",
  data() {
    return {
      stochastic: null,
      KDJData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
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
    toolTipIndex() {
      let index = this.toolTipIndex;
      if (index) {
        if (this.chartDataObj.candleData && !this.KDJData) {
          let data = JSON.parse(
            JSON.stringify(this.chartDataObj.candleData.values)
          );
          this.KDJData = getKDJData(9, data);
        }
        if (this.KDJData) {
          this.toolTipData = {
            K: formatDecimal(this.KDJData.K[index], 2, true),
            D: formatDecimal(this.KDJData.D[index], 2, true),
            J: formatDecimal(this.KDJData.J[index], 2, true)
          };
        }
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
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.KDJData.precision = this.chartDataObj.precision;
        this.KDJData.categoryData = JSON.parse(
          JSON.stringify(this.chartDataObj.candleData.categoryData)
        );
        if (this.KDJData) {
          if (
            JSON.stringify(this.coinType) !==
              JSON.stringify(this.chartDataObj.coinType) ||
            this.isRefresh
          ) {
            this.init(true, 'init');
            this.stochastic.setStochasticOption(
              this.KDJData,
              this.currentCycle
            );
            this.isRefresh = false;
            this.coinType = this.chartDataObj.coinType;
          } else {
            this.init(true, 'update')
            this.stochastic.updateStochasticOption(
              this.KDJData,
              this.currentCycle
            );
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
      this.platform = "pc";
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
      this.platform = "mobile";
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
    init(clear, type) {
      this.stochastic.initStochasticChart(this.$refs.stochastic, clear, type);
      this.resize();
    },
    getToolTipData() {
      let index = this.stochastic.getStochasticTipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    changeDataZoom(type) {
      this.stochastic.changeStochasticDataZoom(type);
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
