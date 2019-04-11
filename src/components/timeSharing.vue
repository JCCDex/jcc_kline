<template>
  <div
    id="timeSharing"
    ref="timeSharing"
    :style="{height: `${timeSharingSize.height}`, width: `${timeSharingSize.width}`}"
    @mousemove="getTimeSharingTipData"
  ></div>
</template>
<script>
import "../css/common.css";
import { splitData, handleDivisionData } from "../js/processData";
import ChartController from "../js/Charts";
import { getLanguage } from "../js/utils";
export default {
  data() {
    return {
      kline: null,
      platform: "",
      chartType: "timeSharing",
      timeSharingSize: {
        height: "",
        width: ""
      },
      coinType: null,
      message: null,
      timeSharingData: null
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
        return {
          chartType: "timeSharing"
        };
      }
    }
  },
  watch: {
    chartDataObj() {
      this.message = getLanguage();
      let precision = this.chartDataObj.precision;
      if (this.chartDataObj.divisionData) {
        let divisionData = this.chartDataObj.divisionData;
        divisionData.precision = precision;
        if (
          JSON.stringify(this.coinType) !==
          JSON.stringify(this.chartDataObj.coinType)
        ) {
          this.init(true);
          let tipIndex = this.timeSharing.setTimeSharingOption(divisionData);
          this.$emit("listenToTipIndex", tipIndex);
          this.$emit(
            "listenTimeSharingChart",
            this.timeSharing.getTimeSharingChart()
          );
          this.timeSharing.resizeTimeSharingChart(
            this.$refs.timeSharing,
            false,
            this.klineConfig.size
          );
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.timeSharing.updateTimeSharingOption(divisionData);
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
          JSON.stringify(size) !== JSON.stringify(this.timeSharingSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.timeSharingSize = {
            height: "572px",
            width: "100%"
          };
          this.resizeSize();
        }
      }
    }
  },
  created() {
    this.message = getLanguage();
    if (this.klineConfig.platform === "pc") {
      if (!this.klineConfig.defaultSize) {
        this.timeSharingSize.height = this.klineConfig.size.height + "px";
        this.timeSharingSize.width = this.klineConfig.size.width + "px";
      } else {
        this.timeSharingSize = {
          height: "572px",
          width: "100%"
        };
      }
    } else {
      this.timeSharingSize.height =
        this.klineConfig.timeSharingSize.height + "px";
      this.timeSharingSize.width =
        this.klineConfig.timeSharingSize.width + "px";
    }
    this.platform = this.klineConfig.platform;
    this.klineConfig.chartType = "timeSharing";
    this.timeSharing = new ChartController(this.klineConfig);
  },
  mounted() {
    this.init();
    if (this.klineConfig.defaultSize === true) {
      window.addEventListener("resize", this.resizeSize);
    }
  },
  beforeDestroy() {
    if (this.klineConfig.defaultSize === true) {
      window.removeEventListener("resize", this.resizeSize);
    }
    this.dispose();
  },
  methods: {
    init(clear) {
      this.timeSharing.initTimeSharingChart(this.$refs.timeSharing, clear);
      this.resizeSize(this.klineConfig.size);
    },
    resizeSize() {
      if (this.klineConfig.platform === "pc") {
        let isFullScreen = this.$parent.getState();
        this.timeSharing.resizeTimeSharingChart(
          this.$refs.timeSharing,
          isFullScreen,
          this.klineConfig.size
        );
      }
    },
    clearChart() {
      this.timeSharing.clearTimeSharingEcharts();
    },
    getTimeSharingTipData() {
      let toolTipIndex = this.timeSharing.getTimeSharingTipIndex();
      this.$emit("listenToTipIndex", toolTipIndex);
    },
    dispose() {
      this.timeSharing.disposeTimeSharingEChart();
    }
  }
};
</script>
