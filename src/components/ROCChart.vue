<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">ROC:&nbsp;{{toolTipData.ROC}}</font>
    </div>
    <i
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;"
      class="icon iconfont icon-popover-close"
    ></i>
    <div
      ref="ROC"
      :style="{height: `${ROCSize.height}`, width: `${ROCSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import { getROCData } from "../js/CalculateIndicator";
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage } from "../js/utils";
export default {
  name: "ROC",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      ROCData: null,
      coinType: "",
      currentCycle: '',
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      ROCSize: {
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
      default: 'hour'
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
      if (this.chartDataObj.klineData) {
        this.indicatorsData = {
          indicator: "ROC",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.ROCData = getROCData(this.chartDataObj.klineData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.ROCData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (JSON.stringify(this.coinType) !== JSON.stringify(this.chartDataObj.coinType) || this.isRefresh) {
          this.ROC.setIndicatorOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.ROC.updateIndicatorOption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.ROCSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.ROCSize = {
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
        if (this.chartDataObj.klineData && !this.ROCData) {
          this.ROCData = getROCData(this.chartDataObj.klineData);
        }
        if (this.ROCData) {
          this.toolTipData = {
            ROC: parseFloat(this.ROCData[index]).toFixed(7)
          };
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      if (!this.klineConfig.defaultSize) {
        this.ROCSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.ROCSize.width = this.klineConfig.size.width + "px";
      } else {
        this.ROCSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.ROCSize.height = this.klineConfig.size.height * 0.4 + "px";
      this.ROCSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "indicator";
    this.ROC = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init() {
      this.ROC.initIndicatorChart(this.$refs.ROC);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.ROC.getIndicatorTipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true)
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.ROC.resizeIndicatorChart(
          this.$refs.ROC,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.ROC.disposeIndicatorEChart();
    }
  }
};
</script>
