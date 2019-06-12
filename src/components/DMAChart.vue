<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #e6e6e6;">DMA:{{this.toolTipData.DMA}}</font>
      <font style="color: #f6d026;">AMA:{{this.toolTipData.AMA}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="DMA"
      :style="{height: `${DMASize.height}`, width: `${DMASize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "DMA",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      DMAData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      platform: "",
      DMASize: {
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
    toolTipIndex() {
      let index = this.toolTipIndex;
      if (index) {
        if (this.chartDataObj.candleData && !this.DMAData) {
          let data = JSON.parse(JSON.stringify(this.chartDataObj.candleData));
          this.DMAData = this.getDMAData(data);
        }
        if (this.DMAData) {
          let precision = parseInt(this.chartDataObj.precision.price) + 1
          this.toolTipData = {
            DMA: formatDecimal(this.DMAData.DMA[index], precision, true),
            AMA: formatDecimal(this.DMAData.AMA[index], precision, true)
          };
        }
      }
    },
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.candleData) {
        this.indicatorsData = {
          indicator: "DMA",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.DMAData = this.getDMAData(this.chartDataObj.candleData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.DMAData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true);
          this.DMA.setDMAOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.DMA.updateDMAOption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.DMASize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.DMASize = {
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
      this.platform = "pc";
      if (!this.klineConfig.defaultSize) {
        this.DMASize.height = this.klineConfig.size.height * 0.25 + "px";
        this.DMASize.width = this.klineConfig.size.width + "px";
      } else {
        this.DMASize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.platform = "mobile";
      this.DMASize.height = this.klineConfig.size.height * 0.3 + "px";
      this.DMASize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "dma";
    this.DMA = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.DMA.initDMAChart(this.$refs.DMA, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.DMA.getDMATipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.DMA.changeDMADataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.DMA.resizeDMAChart(
          this.$refs.DMA,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.DMA.disposeDMAEChart();
    },
    getDMAData(data) {
      if (!data) {
        return;
      }
      let MA10 = this.calculateMA(10, data);
      let MA50 = this.calculateMA(50, data);
      let DMAData = [];
      for (var i = 0; i < MA50.length; i++) {
        if (isNaN(MA50[i])) {
          DMAData.push("-");
        } else {
          DMAData.push(MA10[i] - MA50[i]);
        }
      }
      let AMAData = this.getMADataByDetailData(10, DMAData);
      return {
        DMA: DMAData,
        AMA: AMAData
      }
    },
    calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount - 1) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          let item = parseFloat(data.values[i - j][1]);
          if (isNaN(item)) {
            sum += 0;
          } else {
            sum += item;
          }
        }
        result.push(+(sum / dayCount));
      }
      return result;
    },
    getMADataByDetailData(periodic, data) {
      var result = [];
      for (var i = 0, len = data.length; i < len; i++) {
        if (i < periodic - 1 || isNaN(data[i])) {
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
