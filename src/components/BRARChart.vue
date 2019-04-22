<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #e6e6e6;">BR:{{this.toolTipData.BR}}</font>
      <font style="color: #f6d026;">AR:{{this.toolTipData.AR}}</font>
    </div>
    <i
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;"
      class="icon iconfont icon-popover-close"
    ></i>
    <div
      ref="BRAR"
      :style="{height: `${BRARSize.height}`, width: `${BRARSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import { getBRARData } from "../js/CalculateIndicator";
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage } from "../js/utils";
export default {
  name: "BRAR",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      BRARData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      BRARSize: {
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
    toolTipIndex() {
      let index = this.toolTipIndex;
      if (index) {
        if (this.chartDataObj.candleData && !this.BRARData) {
          let data = JSON.parse(
            JSON.stringify(this.chartDataObj.candleData.values)
          );
          this.BRARData = getBRARData(data, 24);
        }
        if (this.BRARData) {
          this.toolTipData = {
            BR: parseFloat(this.BRARData.BR[index]).toFixed(4),
            AR: parseFloat(this.BRARData.AR[index]).toFixed(4)
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
        this.BRARData = getBRARData(this.chartDataObj.candleData.values, 24);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.BRARData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true);
          this.BRAR.setIndicatorOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.BRAR.updateIndicatorOption(
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
          JSON.stringify(size) !== JSON.stringify(this.BRARSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.BRARSize = {
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
        this.BRARSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.BRARSize.width = this.klineConfig.size.width + "px";
      } else {
        this.BRARSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.BRARSize.height = this.klineConfig.size.height * 0.4 + "px";
      this.BRARSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "indicator";
    this.BRAR = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.BRAR.initIndicatorChart(this.$refs.BRAR, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.BRAR.getIndicatorTipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.BRAR.resizeIndicatorChart(
          this.$refs.BRAR,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.BRAR.disposeIndicatorEChart();
    }
  }
};
</script>
