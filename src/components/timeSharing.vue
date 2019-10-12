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
      timeSharingData: null,
      currentCycle: "",
      isRefresh: true,
      refreshKline: true,
      watchLoading: false,
      loadingTime: 0
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
    },
    cycle: {
      type: String,
      default: ""
    }
  },
  watch: {
    cycle() {
      if (this.cycle !== this.currentCycle) {
        if (this.watchLoading) {
          this.timeSharing.showTimeSharingLoading(true);
        } else {
          this.watchLoading = true;
          this.init(true);
        }
        this.isRefresh = true;
      }
      this.currentCycle = JSON.parse(JSON.stringify(this.cycle));
    },
    chartDataObj() {
      this.message = getLanguage();
      let precision = this.chartDataObj.precision;
      if (this.chartDataObj.divisionData) {
        this.watchLoading = false;
        this.loadingTime = 0;
        let divisionData = this.chartDataObj.divisionData;
        divisionData.precision = precision;
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh ||
          this.refreshKline
        ) {
          this.init(true);
          let tipIndex = this.timeSharing.setTimeSharingOption(divisionData);
          this.$emit("listenToTipIndex", tipIndex);
          this.timeSharing.resizeTimeSharingChart(
            this.$refs.timeSharing,
            false,
            this.klineConfig.size
          );
          this.refreshKline = false;
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.timeSharing.updateTimeSharingOption(divisionData);
        }
      } else {
        this.loadingTime = this.loadingTime + 1;
        if (
          JSON.stringify(this.coinType) !==
          JSON.stringify(this.chartDataObj.coinType)
        ) {
          this.watchLoading = true;
          this.init(true);
        }
        if (this.watchLoading) {
          if (this.loadingTime > 6) {
            this.timeSharing.showTimeSharingLoading(true);
          }
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
      this.refreshKline = true;
      this.timeSharing.initTimeSharingChart(this.$refs.timeSharing, clear);
      this.resizeSize(this.klineConfig.size);
    },
    changeDataZoom(type) {
      this.timeSharing.changeTimeSharingDataZoom(type);
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
