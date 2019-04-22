<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">VR:&nbsp;{{toolTipData.VR}}</font>
    </div>
    <i
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;"
      class="icon iconfont icon-popover-close"
    ></i>
    <div
      ref="VR"
      :style="{height: `${VRSize.height}`, width: `${VRSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import { getVRData } from "../js/CalculateIndicator";
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage } from "../js/utils";
export default {
  name: "VR",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      VRData: null,
      coinType: "",
      currentCycle: '',
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      VRSize: {
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
          indicator: "VR",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.VRData = getVRData(this.chartDataObj.klineData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.VRData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (JSON.stringify(this.coinType) !== JSON.stringify(this.chartDataObj.coinType) || this.isRefresh) {
          this.VR.setIndicatorOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.VR.updateIndicatorOption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.VRSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.VRSize = {
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
        if (this.chartDataObj.klineData && !this.VRData) {
          this.VRData = getVRData(this.chartDataObj.klineData);
        }
        if (this.VRData) {
          this.toolTipData = {
            VR: parseFloat(this.VRData[index]).toFixed(7)
          };
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      if (!this.klineConfig.defaultSize) {
        this.VRSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.VRSize.width = this.klineConfig.size.width + "px";
      } else {
        this.VRSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.VRSize.height = this.klineConfig.size.height * 0.4 + "px";
      this.VRSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "indicator";
    this.VR = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init() {
      this.VR.initIndicatorChart(this.$refs.VR);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.VR.getIndicatorTipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true)
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.VR.resizeIndicatorChart(
          this.$refs.VR,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.VR.disposeIndicatorEChart();
    }
  }
};
</script>
