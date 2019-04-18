<template>
  <div>
    <div v-show="isMobile" style="background:#2b2f33; height:0.1rem"></div>
    <div v-if="tipsData" class="mobile-kline-tip">
      <div v-if="tipsData.type === 'Buy'" style="color:#ee4b4b;">
        <font>{{message.buyPrice}}{{tipsData.price}}</font>&nbsp;&nbsp;
        <font>{{message.buyTotal}}{{tipsData.total}}</font>
      </div>
      <div v-if="tipsData.type === 'Sell'" style="color:#09e988;">
        <font>{{message.sellPrice}}{{tipsData.price}}</font>&nbsp;&nbsp;
        <font>{{message.sellTotal}}{{tipsData.total}}</font>
      </div>
    </div>
    <div
      id="depth"
      ref="depth"
      :style="{height: `${depthSize.height}`, width: `${depthSize.width}`}"
      @mousemove="getMobileTipData"
    ></div>
  </div>
</template>
<script>
import ChartController from "../js/Charts";
import { getLanguage } from "../js/utils";
export default {
  name: "depth",
  data() {
    return {
      depth: null,
      coinType: "",
      chartType: "depth",
      message: null,
      tipsData: null,
      isMobile: false,
      depthSize: {
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
    }
  },
  watch: {
    chartDataObj() {
      if (this.chartDataObj.depthData) {
        let data = this.chartDataObj.depthData;
        data.precision = this.chartDataObj.precision;
        if (data) {
          if (
            JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType)
          ) {
            this.init(true);
            this.depth.setDepthOption(data);
            this.coinType = this.chartDataObj.coinType;
          } else {
            this.depth.updateDepthOption(data);
          }
        }
      }
    },
    resizeSize() {
      this.resize();
    },
    klineConfig() {
      if (this.klineConfig.platform === "pc") {
        let size = {
          width: this.klineConfig.size.width + "px",
          height: this.klineConfig.size.height + "px"
        };
        if (
          JSON.stringify(size) !== JSON.stringify(this.depthSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.depthSize = {
            width: this.klineConfig.size.width + "px",
            height: this.klineConfig.size.height + "px"
          };
          this.resize();
        }
      }
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      if (!this.klineConfig.defaultSize) {
        this.depthSize.height = this.klineConfig.size.height + "px";
        this.depthSize.width = this.klineConfig.size.width + "px";
      } else {
        this.depthSize = {
          height: "572px",
          width: "100%"
        };
      }
    } else {
      this.depthSize.height = this.klineConfig.depthSize.height + "px";
      this.depthSize.width = this.klineConfig.depthSize.width + "px";
      this.isMobile = true;
    }
    this.klineConfig.chartType = "depth";
    this.depth = new ChartController(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      if (this.klineConfig.platform === "mobile") {
        let touch = document.getElementById("depth");
        touch.addEventListener("touchmove", this.getMobileTipDataByTouchMove);
      }
      this.depth.initDepth(this.$refs.depth, clear);
      this.resize();
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.depth.resizeDepthChart(
          this.$refs.depth,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    getMobileTipData() {
      if (this.klineConfig.platform === "mobile") {
        this.message = getLanguage();
        this.tipsData = this.depth.getMobileTipsData();
      }
    },
    getMobileTipDataByTouchMove() {
      this.message = getLanguage();
      this.tipsData = this.depth.getMobileTipsData();
    },
    dispose() {
      this.depth.disposeDepthEChart();
    }
  }
};
</script>