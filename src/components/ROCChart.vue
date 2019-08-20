<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">ROC:&nbsp;{{toolTipData.ROC}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="ROC"
      :style="{height: `${ROCSize.height}`, width: `${ROCSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "ROC",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      ROCData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      platform: "",
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
      default: "hour"
    }
  },
  watch: {
    cycle() {
      if (this.cycle !== this.currentCycle) {
        this.init(true);
        this.toolTipData = null;
        this.isRefresh = true;
      }
      this.currentCycle = JSON.parse(JSON.stringify(this.cycle));
    },
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.cycle === "everyhour") {
        return;
      }
      if (this.chartDataObj.klineData) {
        this.indicatorsData = {
          indicator: "ROC",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.ROCData = this.getROCData(this.chartDataObj.klineData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.ROCData;
        if (
          this.chartDataObj.dataZoomData != undefined &&
          this.chartDataObj.dataZoomData
        ) {
          this.indicatorsData.dataZoomData = JSON.parse(
            JSON.stringify(this.chartDataObj.dataZoomData)
          );
        }
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true);
          this.ROC.setROCOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.ROC.updateROCOption(this.indicatorsData, this.currentCycle);
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
          this.ROCData = this.getROCData(this.chartDataObj.klineData);
        }
        if (this.ROCData) {
          this.toolTipData = {
            ROC: formatDecimal(this.ROCData[index], 2, true)
          };
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      this.platform = "pc";
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
      this.platform = "mobile";
      this.ROCSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.ROCSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "roc";
    this.ROC = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.ROC.initROCChart(this.$refs.ROC, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.ROC.getROCTipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.ROC.changeROCDataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.ROC.resizeROCChart(
          this.$refs.ROC,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.ROC.disposeROCEChart();
    },
    getROCData(data) {
      if (!data) {
        return;
      }
      var ROC = [];
      for (var i = 0; i < data.length; i++) {
        if (i < 12) {
          ROC.push("-");
        } else {
          var ROCTmp = ((data[i][2] - data[i - 12][2]) / data[i - 12][2]) * 100;
          ROC.push(ROCTmp);
        }
      }
      return ROC;
    }
  }
};
</script>
