<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #e6e6e6;">PDI:{{this.toolTipData.PDI}}</font>
      <font style="color: #f6d026;">MDI:{{this.toolTipData.MDI}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="DMA"
      :style="{height: `${DMASize.height}`, width: `${DMASize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "DMA",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      DMAData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      platform: "",
      DMASize: {
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
        if (this.chartDataObj.candleData && !this.DMAData) {
          let data = JSON.parse(
            JSON.stringify(this.chartDataObj.candleData.values)
          );
          this.DMAData = this.getDMAData(data);
        }
        if (this.DMAData) {
          this.toolTipData = {
            PDI: formatDecimal(this.DMAData.PDI[index], 2, true),
            MDI: formatDecimal(this.DMAData.MDI[index], 2, true),
            ADX: formatDecimal(this.DMAData.ADX[index], 2, true),
            ADXR: formatDecimal(this.DMAData.ADXR[index], 2, true)
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
          indicator: "DMA",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.DMAData = this.getDMAData(this.chartDataObj.candleData.values);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.DMAData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true);
          this.DMA.setDMAOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.DMA.updateDMAOption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.DMASize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.DMASize = {
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
        this.DMASize.height = this.klineConfig.size.height * 0.25 + "px";
        this.DMASize.width = this.klineConfig.size.width + "px";
      } else {
        this.DMASize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.platform = "mobile";
      this.DMASize.height = this.klineConfig.size.height * 0.3 + "px";
      this.DMASize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "dma";
    this.DMA = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.DMA.initDMAChart(this.$refs.DMA, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.DMA.getDMATipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.DMA.changeDMADataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.DMA.resizeDMAChart(
          this.$refs.DMA,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.DMA.disposeDMAEChart();
    },
    getDMAData(data) {
      if (!data) {
        return;
      }
    }
  }
};
</script>
