<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">OBV:&nbsp;{{toolTipData.OBV}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="OBV"
      :style="{height: `${OBVSize.height}`, width: `${OBVSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "OBV",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      OBVData: null,
      coinType: "",
      platform: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      OBVSize: {
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
          indicator: "OBV",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.OBVData = this.getOBVData(this.chartDataObj.klineData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.OBVData;
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
          this.OBV.setOBVOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.OBV.updateOBVOption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.OBVSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.OBVSize = {
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
        if (this.chartDataObj.klineData && !this.OBVData) {
          this.OBVData = this.getOBVData(this.chartDataObj.klineData);
        }
        if (this.OBVData) {
          this.toolTipData = {
            OBV: formatDecimal(this.OBVData.OBV[index], 2, false)
          };
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      this.platform = "pc";
      if (!this.klineConfig.defaultSize) {
        this.OBVSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.OBVSize.width = this.klineConfig.size.width + "px";
      } else {
        this.OBVSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.platform = "mobile";
      this.OBVSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.OBVSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "obv";
    this.OBV = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.OBV.initOBVChart(this.$refs.OBV, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.OBV.getOBVTipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.OBV.changeOBVDataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.OBV.resizeOBVChart(
          this.$refs.OBV,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.OBV.disposeOBVEChart();
    },
    getOBVData(data) {
      if (!data) {
        return;
      }
      var OBV = [];
      var OnBalanceVolume;
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          OBV.push("-");
          OnBalanceVolume = 0;
        } else {
          let oldValues = JSON.parse(JSON.stringify(data[i - 1]));
          let values = JSON.parse(JSON.stringify(data[i]));
          if (values[2] > oldValues[2]) {
            OnBalanceVolume = OnBalanceVolume + values[6];
          } else if (values[2] < oldValues[2]) {
            OnBalanceVolume = OnBalanceVolume - values[6];
          }
          OBV.push(OnBalanceVolume);
        }
      }
      return { OBV: OBV };
    }
  }
};
</script>
