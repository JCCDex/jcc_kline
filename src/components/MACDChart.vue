<template>
  <div>
    <div style="background:#2b2f33; height:0.05rem"></div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'macd-tip-data' : 'mobile-macd-tip'"
      v-if="toolTipData"
    >
      <font style="color: #67ff7c;">MACD:{{toolTipData.macd}}&nbsp;</font>
      <font style="color: #fd1d57;">DIFF:{{toolTipData.diff}}&nbsp;</font>
      <font style="color: #ffd801;">DEA:{{toolTipData.dea}}&nbsp;</font>
    </div>
    <i
      v-show="isPC"
      @click="closeMacd"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="macd"
      :style="{height: `${macdSize.height}`, width: `${macdSize.width}`}"
      @mousemove="getToolTipData()"
    ></div>
  </div>
</template>

<script>
import ChartController from "../js/Charts";
import { getLanguage } from "../js/utils";
export default {
  name: "MACD",
  data() {
    return {
      coinType: "",
      chartType: "MACD",
      currentCycle: "",
      refreshCycle: 0,
      isRefresh: true,
      macdData: "",
      toolTipData: null,
      macd: "",
      isPC: false,
      macdSize: {
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
    toolTipIndex() {
      let index = this.toolTipIndex;
      if (this.macdData) {
        let length = this.macdData.times.length;
        if (this.cycle === "week" && length - 1 < index) {
          index = length - 1;
        }
        if (this.cycle === "month" && length - 1 < index) {
          index = length - 1;
        }
        this.toolTipData = {
          macd: this.macdData.macds[index],
          diff: this.macdData.difs[index],
          dea: this.macdData.deas[index]
        };
      }
    },
    chartDataObj() {
      if (
        this.chartDataObj.candleData &&
        this.chartDataObj.cycle !== "everyhour"
      ) {
        let data = this.chartDataObj.candleData;
        data.precision = this.chartDataObj.precision;
        if (data.MACDData && data.categoryData) {
          var macdData = this.splitData(data.MACDData);
          this.macdData = macdData;
          if (
            JSON.stringify(this.coinType) !==
              JSON.stringify(this.chartDataObj.coinType) ||
            this.isRefresh
          ) {
            this.isRefresh = false;
            this.init(true);
            this.refreshCycle = 0;
            this.cycle = this.chartDataObj.cycle;
            this.macd.setMACDOption(macdData);
            this.coinType = this.chartDataObj.coinType;
          } else {
            this.macd.updateMACDOption(macdData);
          }
        }
      } else {
        this.init(true)
        this.toolTipData = null;
        this.coinType = this.chartDataObj.coinType;
      }
    },
    klineConfig() {
      if (this.klineConfig.platform === "pc") {
        let size = {
          width: this.klineConfig.size.width + "px",
          height: this.klineConfig.size.height + "px"
        };
        if (
          JSON.stringify(size) !== JSON.stringify(this.macdSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.macdSize = {
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
      this.isPC = true;
      if (!this.klineConfig.defaultSize) {
        this.macdSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.macdSize.width = this.klineConfig.size.width + "px";
      } else {
        this.macdSize = {
          height: "527px",
          width: "100%"
        };
      }
    } else {
      this.macdSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.macdSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "MACD";
    this.macd = new ChartController(this.klineConfig);
  },
  mounted() {
    this.init();
    if (this.klineConfig.defaultSize === true) {
      window.addEventListener("resize", this.resize);
    }
  },
  beforeDestroy() {
    if (this.klineConfig.defaultSize === true) {
      window.removeEventListener("resize", this.resize);
    }
    this.dispose();
  },
  methods: {
    init(clear) {
      this.macd.initMACDECharts(this.$refs.macd, clear);
      this.resize();
    },
    getToolTipData() {
      let index = this.macd.getMacdTipData();
      this.$emit("listenToTipIndex", index);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        let isFullScreen = this.$parent.getState();
        this.macd.resizeMACDChart(
          this.$refs.macd,
          isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.macd.disposeMACDEChart();
    },
    splitData(rawData) {
      var times = [];
      var macds = [];
      var difs = [];
      var deas = [];
      for (var i = 0; i < rawData.length; i++) {
        times.push(rawData[i].splice(0, 1)[0]);
        macds.push(rawData[i][2]);
        difs.push(rawData[i][0]);
        deas.push(rawData[i][1]);
      }
      return {
        times: times,
        macds: macds,
        difs: difs,
        deas: deas
      };
    },
    closeMacd() {
      this.$emit("listenMacdChartClose", true);
    },
    changeDataZoom(type) {
      this.macd.changeMacdDataZoom(type);
    }
  }
};
</script>
