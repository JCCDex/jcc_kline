<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #e6e6e6;">WR1:&nbsp;{{toolTipData.WR1}}</font>
      <font style="color: #f6d026;">WR2:&nbsp;{{toolTipData.WR2}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="WR"
      :style="{height: `${WRSize.height}`, width: `${WRSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import { getWRData } from "../js/CalculateIndicator";
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "WR",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      WRData: null,
      platform: "",
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "wr",
      toolTipData: null,
      WRSize: {
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
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.klineData) {
        this.indicatorsData = {
          indicator: "WR",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.WRData = getWRData(this.chartDataObj.klineData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.WRData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true, 'init');
          this.WR.setWROption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.init(true, 'update');
          this.WR.updateWROption(
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
          JSON.stringify(size) !== JSON.stringify(this.WRSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.WRSize = {
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
        if (this.chartDataObj.klineData && !this.WRData) {
          this.WRData = getWRData(this.chartDataObj.klineData);
        }
        if (this.WRData) {
          this.toolTipData = {
            WR1: formatDecimal(this.WRData.WR1[index], 7, true),
            WR2: formatDecimal(this.WRData.WR2[index], 7, true)
          };
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      this.platform = "pc";
      if (!this.klineConfig.defaultSize) {
        this.WRSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.WRSize.width = this.klineConfig.size.width + "px";
      } else {
        this.WRSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.platform = "mobile";
      this.WRSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.WRSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "wr";
    this.WR = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear, type) {
      this.WR.initWRChart(this.$refs.WR, clear, type);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.WR.getWRTipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    changeDataZoom(type) {
      this.WR.changeWRDataZoom(type);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.WR.resizeWRChart(
          this.$refs.WR,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.WR.disposeWREChart();
    }
  }
};
</script>
