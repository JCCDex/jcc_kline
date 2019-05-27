<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #e6e6e6;">PDI:{{this.toolTipData.PDI}}</font>
      <font style="color: #f6d026;">MDI:{{this.toolTipData.MDI}}</font>
      <font style="color: #e03bfa;">ADX:{{this.toolTipData.ADX}}</font>
      <font style="color: #67ff7c;">ADXR:{{this.toolTipData.ADXR}}</font>
    </div>
    <i
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;"
      class="icon iconfont icon-popover-close"
    ></i>
    <div
      ref="DMI"
      :style="{height: `${DMISize.height}`, width: `${DMISize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import { getDMIData } from "../js/CalculateIndicator";
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "DMI",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      DMIData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      DMISize: {
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
        if (this.chartDataObj.candleData && !this.DMIData) {
          let data = JSON.parse(
            JSON.stringify(this.chartDataObj.candleData.values)
          );
          this.DMIData = getDMIData(data);
        }
        if (this.DMIData) {
          this.toolTipData = {
            PDI: formatDecimal(this.DMIData.PDI[index], 2, true),
            MDI: formatDecimal(this.DMIData.MDI[index], 2, true),
            ADX: formatDecimal(this.DMIData.ADX[index], 2, true),
            ADXR: formatDecimal(this.DMIData.ADXR[index], 2, true)
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
          indicator: 'DMI',
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.DMIData = getDMIData(this.chartDataObj.candleData.values);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.DMIData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true);
          this.DMI.setDMIOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.DMI.updateDMIOption(
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
          JSON.stringify(size) !== JSON.stringify(this.DMISize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.DMISize = {
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
        this.DMISize.height = this.klineConfig.size.height * 0.25 + "px";
        this.DMISize.width = this.klineConfig.size.width + "px";
      } else {
        this.DMISize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.DMISize.height = this.klineConfig.size.height * 0.4 + "px";
      this.DMISize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "dmi";
    this.DMI = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.DMI.initDMIChart(this.$refs.DMI, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.DMI.getDMITipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.DMI.changeDMIDataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.DMI.resizeDMIChart(
          this.$refs.DMI,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.DMI.disposeDMIEChart();
    }
  }
};
</script>
