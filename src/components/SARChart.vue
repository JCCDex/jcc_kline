<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #e6e6e6;">PDI:{{this.toolTipData.PDI}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="SAR"
      :style="{height: `${SARSize.height}`, width: `${SARSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "SAR",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      SARData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      platform: "",
      SARSize: {
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
        if (this.chartDataObj.candleData && !this.SARData) {
          let data = JSON.parse(
            JSON.stringify(this.chartDataObj.candleData.values)
          );
          this.SARData = this.getSARData(data);
        }
        if (this.SARData) {
          this.toolTipData = {
            PDI: formatDecimal(this.SARData.PDI[index], 2, true),
            MDI: formatDecimal(this.SARData.MDI[index], 2, true),
            ADX: formatDecimal(this.SARData.ADX[index], 2, true),
            ADXR: formatDecimal(this.SARData.ADXR[index], 2, true)
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
          indicator: "SAR",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.SARData = this.getSARData(this.chartDataObj.candleData.values);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.SARData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true);
          this.SAR.setSAROption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.SAR.updateSAROption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.SARSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.SARSize = {
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
        this.SARSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.SARSize.width = this.klineConfig.size.width + "px";
      } else {
        this.SARSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.platform = "mobile";
      this.SARSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.SARSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "sar";
    this.SAR = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.SAR.initSARChart(this.$refs.SAR, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.SAR.getSARTipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.SAR.changeSARDataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.SAR.resizeSARChart(
          this.$refs.SAR,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.SAR.disposeSAREChart();
    },
    getSARData(data) {
      if (!data) {
        return;
      }
    }
  }
};
</script>
