<template>
  <div
    id="volume"
    ref="volume"
    :style="{height: `${volumeSize.height}`, width: `${volumeSize.width}`}"
    @mousemove="getToolTipIndex()"
  ></div>
</template>
<script>
import ChartController from "../js/Charts";
import { getLanguage } from "../js/utils";
export default {
  name: "volume",
  data() {
    return {
      volume: null,
      coinType: "",
      currentCycle: "",
      refreshCycle: 0,
      refreshKline: true,
      isRefresh: true,
      chartType: "volume",
      volumeSize: {
        height: "",
        width: ""
      },
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
        return {};
      }
    },
    resizeSize: {
      type: Object,
      default: () => {
        return {};
      }
    },
    cycle: {
      type: String,
      default: "hour"
    }
  },
  watch: {
    cycle() {
      if (this.cycle !== this.currentCycle) {
        this.loadingTime = 0;
        this.init(true);
        this.isRefresh = true;
        this.watchLoading = true;
      }
      this.currentCycle = JSON.parse(JSON.stringify(this.cycle));
    },
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (
        JSON.stringify(this.coinType) !==
          JSON.stringify(this.chartDataObj.coinType) ||
        this.isRefresh ||
        this.refreshKline
      ) {
        this.watchLoading = true;
        this.init(true);
      }
      if (this.chartDataObj.candleData && this.currentCycle !== "everyhour") {
        this.watchLoading = false;
        this.loadingTime = 0;
        //周期不是分时且有数据时
        let data = this.chartDataObj.candleData;
        data.precision = this.chartDataObj.precision;
        if (data.values && data.volumes && data.categoryData) {
          if (
            JSON.stringify(this.coinType) !==
              JSON.stringify(this.chartDataObj.coinType) ||
            this.isRefresh ||
            this.refreshKline
          ) {
            this.init(true);
            this.volume.setVolumeOption(data, this.currentCycle);
            this.isRefresh = false;
            this.refreshKline = false;
            this.coinType = this.chartDataObj.coinType;
          } else {
            this.volume.updateVolumeOption(data, this.currentCycle);
          }
        }
      } else if (
        !this.chartDataObj.candleData &&
        this.currentCycle !== "everyhour"
      ) {
        if (
          JSON.stringify(this.coinType) !==
          JSON.stringify(this.chartDataObj.coinType)
        ) {
          this.loadingTime = 0;
          this.watchLoading = true;
          this.init(true);
          this.coinType = this.chartDataObj.coinType;
        }
        if (this.watchLoading) {
          this.loadingTime = this.loadingTime + 1;
          if (this.loadingTime > 4) {
            this.volume.showVolumeLoading(true);
          }
        }
      }
      if (
        this.currentCycle === "everyhour" &&
        this.chartDataObj.timeDivisionData &&
        this.chartDataObj.timeDivisionData.length > 0
      ) {
        //周期是分时且有数据时
        this.watchLoading = false;
        this.loadingTime = 0;
        let timeDivisionData = this.chartDataObj.timeDivisionData;
        let divisionData = this.chartDataObj.divisionData;
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          (this.isRefresh &&
            divisionData.times !== null &&
            divisionData.averages !== null &&
            divisionData.prices !== null &&
            divisionData.volumes !== null) ||
          this.refreshKline
        ) {
          this.init(true);
          this.volume.setVolumeOption(divisionData, this.currentCycle);
          this.isRefresh = false;
          this.refreshKline = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.volume.updateVolumeOption(divisionData, this.currentCycle);
        }
      } else {
        if (this.currentCycle === "everyhour") {
          if (
            JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType)
          ) {
            this.loadingTime = 0;
            this.watchLoading = true;
            this.init(true);
            this.coinType = this.chartDataObj.coinType;
          }
          if (this.watchLoading) {
            this.loadingTime = this.loadingTime + 1;
            if (this.loadingTime > 4) {
              this.volume.showVolumeLoading(true);
            }
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
          JSON.stringify(size) !== JSON.stringify(this.volumeSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.volumeSize = {
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
      if (!this.klineConfig.defaultSize) {
        this.volumeSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.volumeSize.width = this.klineConfig.size.width + "px";
      } else {
        this.volumeSize = {
          width: "100%",
          height: "533px"
        };
      }
    } else {
      this.volumeSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.volumeSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "volume";
    this.volume = new ChartController(this.klineConfig);
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
      this.volume.initVolumeChart(this.$refs.volume, clear);
      this.resize();
    },
    getToolTipIndex() {
      let toolTipIndex = this.volume.getToolTipIndex();
      this.$emit("listenToTipIndex", toolTipIndex);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        let isCloseIndicator = this.resizeSize.isCloseIndicator;
        if (this.cycle === "everyhour") {
          isCloseIndicator = true;
        }
        this.volume.resizeVolumeChart(
          this.$refs.volume,
          this.resizeSize.isFullScreen,
          isCloseIndicator,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.volume.disposeVolumeEcharts();
    },
    changeDataZoom(type) {
      this.volume.changeDataZoom(type);
    }
  }
};
</script>
