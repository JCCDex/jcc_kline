<template>
  <div
    id="kline"
    ref="klineRef"
    :style="{height: `${klineSize.height}`, width: `${klineSize.width}`}"
    @mousemove="getToolTipIndex"
  ></div>
</template>
<script>
import "../icon/iconfont.css";
import "../css/common.css";
import KLineController from "../js/KLine";
import { getLanguage } from "../js/utils";
export default {
  name: "jKline",
  data() {
    return {
      kline: null,
      refreshKline: true,
      currentCycle: "",
      isRefresh: true,
      platform: "pc",
      klineSize: {
        width: 0,
        height: 0
      },
      klineData: null,
      coinType: "",
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
      default: ""
    }
  },
  watch: {
    cycle() {
      if (this.cycle === "everyhour") {
        this.init(true);
        this.isRefresh = true;
        return;
      }
      if (this.cycle !== this.currentCycle) {
        if (this.watchLoading) {
          this.kline.showKlineLoading(true);
        } else {
          this.init(true);
          this.isRefresh = true;
          this.watchLoading = true;
        }
      }
      this.currentCycle = JSON.parse(JSON.stringify(this.cycle));
    },
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.candleData) {
        this.watchLoading = false;
        let cycle = this.chartDataObj.cycle;
        let data = this.chartDataObj.candleData;
        data.precision = this.chartDataObj.precision;
        if (data.values && data.volumes && data.categoryData) {
          if (
            this.refreshKline ||
            this.isRefresh ||
            JSON.stringify(this.coinType) !==
              JSON.stringify(this.chartDataObj.coinType)
          ) {
            this.init(true);
            let toolTipIndex = this.kline.setOption(data, this.currentCycle);
            this.isRefresh = false;
            this.refreshKline = false;
            this.$emit("listenToTipIndex", toolTipIndex);
            this.coinType = this.chartDataObj.coinType;
          } else {
            this.kline.updateOption(data, this.currentCycle);
          }
        }
      } else {
        if (
          JSON.stringify(this.coinType) !==
          JSON.stringify(this.chartDataObj.coinType)
        ) {
          this.watchLoading = true;
          this.init(true);
          this.coinType = this.chartDataObj.coinType;
        }
        if (this.watchLoading) {
          this.loadingTime = this.loadingTime + 1;
          if (this.loadingTime > 6) {
            this.kline.showKlineLoading(true);
          }
        }
      }
    },
    klineConfig() {
      let size = {
        width: this.klineConfig.size.width + "px",
        height: this.klineConfig.size.height + "px"
      };
      if (
        JSON.stringify(size) !== JSON.stringify(this.klineSize) &&
        this.klineConfig.defaultSize === false
      ) {
        this.klineSize = {
          width: this.klineConfig.size.width + "px",
          height: "100%"
        };
        this.resize();
      }
    }
  },
  created() {
    if (this.klineConfig.defaultSize) {
      this.klineSize = {
        width: "100%",
        height: "533px"
      };
    } else {
      this.klineSize = {
        width: this.klineConfig.size.width + "px",
        height: this.klineConfig.size.height + "px"
      };
    }
    this.kline = new KLineController(this.platform, this.klineConfig);
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
      this.kline.initChart(this.$refs.klineRef, clear);
      this.resize();
    },
    changeDataZoom(type) {
      this.kline.changeDataZoom(type);
    },
    getToolTipIndex() {
      let toolTipIndex = this.kline.getToolTipIndex();
      this.$emit("listenToTipIndex", toolTipIndex);
    },
    resize() {
      this.kline.resizeChart(
        this.$refs.klineRef,
        this.resizeSize.isFullScreen,
        this.resizeSize.isCloseIndicator,
        this.klineConfig.size
      );
    },
    dispose() {
      this.kline.disposeChart();
    }
  }
};
</script>
