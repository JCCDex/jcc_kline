<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">MTM6:&nbsp;{{toolTipData.MTM}}</font>
      <font style="color: #f6d026;">MAMTM:&nbsp;{{toolTipData.MAMTM}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="MTM"
      :style="{height: `${MTMSize.height}`, width: `${MTMSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "MTM",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      MTMData: null,
      platform: "",
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      refreshKline: true,
      chartType: "mtm",
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
          indicator: "MTM",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.MTMData = this.getMTMData(this.chartDataObj.klineData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.MTMData;
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
          this.MTM.setMTMOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.refreshKline = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.MTM.updateMTMOption(this.indicatorsData, this.currentCycle);
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
          this.MTMData = this.getMTMData(this.chartDataObj.klineData);
        }
        if (this.MTMData) {
          let precision = parseInt(this.chartDataObj.precision.price) + 1
          this.toolTipData = {
            MTM: formatDecimal(this.MTMData.MTM[index], precision, true),
            MAMTM: formatDecimal(this.MTMData.MAMTM[index], precision, true)
          };
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      this.platform = "pc";
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
      this.platform = "mobile";
      this.MTMSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.MTMSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "mtm";
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
      this.refreshKline = true;
      this.MTM.initMTMChart(this.$refs.MTM, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.MTM.getMTMTipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    changeDataZoom(type) {
      this.MTM.changeMTMDataZoom(type);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.MTM.resizeMTMChart(
          this.$refs.MTM,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.MTM.disposeMTMEChart();
    },
    getMTMData(data) {
      if (!data) {
        return;
      }
      var MTM = [];
      var MTMTmp = "";
      for (var i = 0; i < data.length; i++) {
        if (i < 6) {
          MTM.push("-");
        } else {
          MTMTmp = data[i][1] - data[i - 6][1];
          MTM.push(MTMTmp);
        }
      }
      var MAMTM = this.getMADataByDetailData(10, MTM);
      return {
        MTM: MTM,
        MAMTM: MAMTM
      };
    },
    getMADataByDetailData(periodic, data) {
      var result = [];
      for (var i = 0, len = data.length; i < len; i++) {
        if (i < periodic - 1) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < periodic - 1; j++) {
          let item = parseFloat(data[i - j]);
          if (isNaN(item)) {
            sum += 0;
          } else {
            sum += item;
          }
        }
        result.push(sum / periodic);
      }
      return result;
    }
  }
};
</script>
