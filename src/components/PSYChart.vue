<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">PSY:&nbsp;{{toolTipData.PSY}}</font>
    </div>
    <i
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;"
      class="icon iconfont icon-popover-close"
    ></i>
    <div
      ref="PSY"
      :style="{height: `${PSYSize.height}`, width: `${PSYSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import { getPSYData } from "../js/CalculateIndicator";
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage } from "../js/utils";
export default {
  name: "PSY",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      PSYData: null,
      coinType: "",
      currentCycle: '',
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      PSYSize: {
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
          indicator: "PSY",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.PSYData = getPSYData(this.chartDataObj.klineData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.PSYData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (JSON.stringify(this.coinType) !== JSON.stringify(this.chartDataObj.coinType) || this.isRefresh) {
          this.PSY.setIndicatorOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.PSY.updateIndicatorOption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.PSYSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.PSYSize = {
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
        if (this.chartDataObj.klineData && !this.PSYData) {
          this.PSYData = getPSYData(this.chartDataObj.klineData);
        }
        if (this.PSYData) {
          this.toolTipData = {
            PSY: parseFloat(this.PSYData[index]).toFixed(7)
          };
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      if (!this.klineConfig.defaultSize) {
        this.PSYSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.PSYSize.width = this.klineConfig.size.width + "px";
      } else {
        this.PSYSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.PSYSize.height = this.klineConfig.size.height * 0.4 + "px";
      this.PSYSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "indicator";
    this.PSY = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init() {
      this.PSY.initIndicatorChart(this.$refs.PSY);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.PSY.getIndicatorTipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true)
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.PSY.resizeIndicatorChart(
          this.$refs.PSY,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.PSY.disposeIndicatorEChart();
    }
  }
};
</script>
