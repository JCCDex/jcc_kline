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
      refreshKline: true,
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
        this.init(true);
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
          indicator: "WR",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.WRData = this.getWRData(this.chartDataObj.klineData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.WRData;
      } else if (
        JSON.stringify(this.coinType) !==
        JSON.stringify(this.chartDataObj.coinType)
      ) {
        this.init(true);
        this.toolTipData = null;
        this.indicatorsData = null;
        this.coinType = this.chartDataObj.coinType;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh ||
          this.refreshKline
        ) {
          this.init(true);
          this.WR.setWROption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.refreshKline = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.WR.updateWROption(this.indicatorsData, this.currentCycle);
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
          this.WRData = this.getWRData(this.chartDataObj.klineData);
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
    init(clear) {
      this.WR.initWRChart(this.$refs.WR, clear);
      this.refreshKline = true;
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
    },
    getWRData(data) {
      if (!data) {
        return;
      }
      var WR1 = []; //
      var WR2 = []; //
      for (var i = 0; i < data.length; i++) {
        if (i < 9) {
          WR1[i] = "-";
        } else {
          var HIGH1 = data[i][4];
          var LOW1 = data[i][3];
          for (var j = i; j > i - 10; j--) {
            HIGH1 = data[j][4] > HIGH1 ? data[j][4] : HIGH1;
            LOW1 = data[j][3] > LOW1 ? LOW1 : data[j][3];
          }
          if ([HIGH1 - data[i][2]] == 0 || [HIGH1 - LOW1] == 0) {
            WR1[i] = 0;
          } else {
            WR1[i] = (100 * [HIGH1 - data[i][2]]) / [HIGH1 - LOW1];
          }
        }
        if (i < 5) {
          WR2[i] = "-";
        } else {
          var HIGH2 = data[i][4];
          var LOW2 = data[i][3];
          for (var k = i; k > i - 6; k--) {
            HIGH2 = data[k][4] > HIGH2 ? data[k][4] : HIGH2;
            LOW2 = data[k][3] > LOW2 ? LOW2 : data[k][3];
          }
          if ( [HIGH2 - data[i][2]] == 0 || [HIGH2 - LOW2] == 0) {
            WR2[i] = 0;
          } else {
            WR2[i] = (100 * [HIGH2 - data[i][2]]) / [HIGH2 - LOW2];
          }
        }
      }
      return {
        WR1: WR1,
        WR2: WR2
      };
    }
  }
};
</script>
