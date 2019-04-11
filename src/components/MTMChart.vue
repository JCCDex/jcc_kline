<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">MTM:&nbsp;{{toolTipData.MTM}}</font>
    </div>
    <i
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;"
      class="icon iconfont icon-popover-close"
    ></i>
    <div
      ref="MTM"
      :style="{height: `${MTMSize.height}`, width: `${MTMSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import { getMTMData } from "../js/processData";
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage } from "../js/utils";
export default {
  name: "MTM",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      MTMData: null,
      coinType: "",
      currentCycle: '',
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      MTMSize: {
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
    cycle () {
      if (this.cycle !== this.currentCycle) {
        this.init(true)
        this.toolTipData = null
        this.isRefresh = true
      }
      this.currentCycle = JSON.parse(JSON.stringify(this.cycle))
    },
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.klineData) {
        this.indicatorsData = {
          indicator: "MTM",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.MTMData = getMTMData(this.chartDataObj.klineData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.MTMData;
      }
      if (
        this.indicatorsData &&
        this.indicatorsData.indicatorData
      ) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true)
          this.MTM.setIndicatorOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false
          this.$emit(
            "listenIndicatorChartEvent",
            this.MTM.getIndicatorEchart()
          );
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.MTM.updateIndicatorOption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.MTMSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.MTMSize = {
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
        if (this.chartDataObj.klineData && !this.MTMData) {
          this.MTMData = getMTMData(this.chartDataObj.klineData);
        }
        if (this.MTMData) {
          this.toolTipData = {
            MTM: parseFloat(this.MTMData[index]).toFixed(7)
          };
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      if (!this.klineConfig.defaultSize) {
        this.MTMSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.MTMSize.width = this.klineConfig.size.width + "px";
      } else {
        this.MTMSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.MTMSize.height = this.klineConfig.size.height * 0.4 + "px";
      this.MTMSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "indicator";
    this.MTM = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.MTM.initIndicatorChart(this.$refs.MTM, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.MTM.getIndicatorTipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true)
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.MTM.resizeIndicatorChart(
          this.$refs.MTM,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.MTM.disposeIndicatorEChart();
    }
  }
};
</script>
