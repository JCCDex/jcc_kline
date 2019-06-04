<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">PSY:&nbsp;{{toolTipData.PSY}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="PSY"
      :style="{height: `${PSYSize.height}`, width: `${PSYSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
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
      platform: "",
      currentCycle: "",
      isRefresh: true,
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
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.klineData) {
        this.indicatorsData = {
          indicator: "PSY",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.PSYData = this.getPSYData(this.chartDataObj.klineData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.PSYData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.PSY.setPSYOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.PSY.updatePSYOption(this.indicatorsData, this.currentCycle);
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
          this.PSYData = this.getPSYData(this.chartDataObj.klineData);
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
      this.platform = "pc";
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
      this.platform = "mobile";
      this.PSYSize.height = this.klineConfig.size.height * 0.4 + "px";
      this.PSYSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "psy";
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
      this.PSY.initPSYChart(this.$refs.PSY);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.PSY.getPSYTipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.PSY.changePSYDataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.PSY.resizePSYChart(
          this.$refs.PSY,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.PSY.disposePSYEChart();
    },
    getPSYData(data) {
      if (!data) {
        return;
      }
      var PSY = [];
      for (var i = 0; i < data.length; i++) {
        var riseDay = 0;
        if (i < 11) {
          PSY.push("-");
        } else {
          for (var j = i - 11; j <= i; j++) {
            if (data[j][2] - data[j][1] > 0) {
              riseDay++;
            }
          }
          PSY.push((riseDay / 12) * 100);
        }
      }
      return PSY;
    }
  }
};
</script>
