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
      v-if
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;"
      class="icon iconfont icon-popover-close"
    ></i>
    <div
      ref="TRIX"
      :style="{height: `${TRIXSize.height}`, width: `${TRIXSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import { getTRIXData } from "../js/CalculateIndicator";
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
          indicator: 'TRIX',
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.TRIXData = getTRIXData(this.chartDataObj.candleData.values);
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
          this.TRIX.updateTRIXOption(
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
          this.TRIXData = getTRIXData(this.chartDataObj.candleData.values);
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
    }
  }
};
</script>
