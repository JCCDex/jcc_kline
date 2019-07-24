<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">VR:&nbsp;{{toolTipData.VR}}</font>
      <font style="color: #f6d026;">MAVR:&nbsp;{{toolTipData.MAVR}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="VR"
      :style="{height: `${VRSize.height}`, width: `${VRSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "VR",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      VRData: null,
      platform: "",
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "vr",
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
          indicator: "VR",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.VRData = this.getVRData(this.chartDataObj.klineData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.VRData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true);
          this.VR.setVROption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.VR.updateVROption(this.indicatorsData, this.currentCycle);
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
          this.VRData = this.getVRData(this.chartDataObj.klineData);
        }
        if (this.VRData) {
          this.toolTipData = {
            VR: this.fixed(parseFloat(this.VRData.VR[index]), 7),
            MAVR: this.fixed(parseFloat(this.VRData.MAVR[index]), 7)
          };
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      this.platform = "pc";
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
      this.platform = "mobile";
      this.VRSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.VRSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "vr";
    this.VR = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.VR.initVRChart(this.$refs.VR, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.VR.getVRTipData();
      this.$emit("listenToTipIndex", index);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    changeDataZoom(type) {
      this.VR.changeVRDataZoom(type);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.VR.resizeVRChart(
          this.$refs.VR,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.VR.disposeVREChart();
    },
    fixed(value, num) {
      if (isNaN(value)) {
        return "--";
      } else {
        return value.toFixed(num);
      }
    },
    getVRData(data) {
      if (!data) {
        return;
      }
      var VR = [];
      for (var i = 0; i < data.length; i++) {
        var UVS = 0;
        var DVS = 0;
        var PVS = 0;
        var temp;
        if (i < 11) {
          VR.push("-");
        } else {
          for (var j = i; j > i - 12; j--) {
            if (j === 0) {
              temp = data[0][2] - data[0][1];
              // up
              if (temp > 0) {
                UVS = UVS + data[0][6];
              } else if (temp < 0) {
                DVS = DVS + data[0][6];
              } else if (temp === 0) {
                PVS = PVS + data[0][6];
              }
            } else {
              temp = data[j][2] - data[j - 1][2];
              if (temp > 0) {
                UVS = UVS + data[j][6];
              } else if (temp < 0) {
                DVS = DVS + data[j][6];
              } else if (temp === 0) {
                PVS = PVS + data[j][6];
              }
            }
          }
          var VRTmp = (UVS + 0.5 * PVS) / (DVS + 0.5 * PVS);
          if (VRTmp == Infinity || isNaN(parseFloat(VRTmp))) {
            VRTmp = 0;
          }
          VR.push(VRTmp);
        }
      }
      var MAVR = this.getMADataByDetailData(10, VR);
      return {
        VR: VR,
        MAVR: MAVR
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
        if (sum == 0) {
          result.push(0);
        } else {
          result.push(sum / periodic);
        }
      }
      return result;
    }
  }
};
</script>
