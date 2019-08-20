<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #357ce1;">SAR:{{this.toolTipData.SAR}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="SAR"
      :style="{height: `${SARSize.height}`, width: `${SARSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "SAR",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      SARData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      platform: "",
      SARSize: {
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
        if (this.chartDataObj.candleData && !this.SARData) {
          let data = JSON.parse(
            JSON.stringify(this.chartDataObj.candleData.values)
          );
          this.SARData = this.getSARData(data);
        }
        let precision = this.chartDataObj.precision.price
        if (this.SARData) {
          this.toolTipData = {
            SAR: formatDecimal(this.SARData[index], precision, true),
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
          indicator: "SAR",
          categoryData: this.chartDataObj.candleData.categoryData,
          candlestickData: this.chartDataObj.candleData.values,
          volumes: this.chartDataObj.candleData.volumes
        };
        this.SARData = this.getSARData(this.chartDataObj.candleData);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.SARData;
        if (
          this.chartDataObj.dataZoomData != undefined &&
          this.chartDataObj.dataZoomData
        ) {
          this.indicatorsData.dataZoomData = JSON.parse(
            JSON.stringify(this.chartDataObj.dataZoomData)
          );
        }
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true);
          this.SAR.setSAROption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.SAR.updateSAROption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.SARSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.SARSize = {
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
        this.SARSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.SARSize.width = this.klineConfig.size.width + "px";
      } else {
        this.SARSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.platform = "mobile";
      this.SARSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.SARSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "sar";
    this.SAR = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.SAR.initSARChart(this.$refs.SAR, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.SAR.getSARTipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.SAR.changeSARDataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.SAR.resizeSARChart(
          this.$refs.SAR,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.SAR.disposeSAREChart();
    },
    getSARData(data) {
      if (!data) {
        return;
      }
      if (data.values.length == 1) {
        return SARData = [data.values[3]]
      }
      let SARData = [];
      let cycle = 4; // 时间周期
      let beforeSAR = 0; // SAR(n-1) 前一周期的SAR
      let beforeTrend = 0; // 前一周期的趋势
      let AF = 0.02; // 加速因子
      let EPMax = 0; // 最大值
      let EPMin = 0; // 最小值
      let value = data.values;
      let volume = data.volumes;
      let len = value.length;
      for (let i = 0; i < len; i++) {
        let minPrice = value[i][2];
        let maxPrice = value[i][3];
        let condition1 = i + cycle > len - 1 ? len - 1 : i + cycle;
        for (let j = i; j < condition1; j++) {
          if (parseFloat(value[j][2]) < parseFloat(minPrice)) {
            minPrice = value[j][2];
          }
          if (parseFloat(value[j][3]) > parseFloat(maxPrice)) {
            maxPrice = value[j][3];
          }
        }
        if (i == 0) {
          let trend = 0;
          let condition2 = i + cycle > len - 1 ? len - 1 : i + cycle;
          for (let k = i + 1; k <= condition2; k++) {
            trend = trend + volume[k][2];
          }
          if (trend == 0) {
            if (value[i + 1][1]) {
              if (parseFloat(value[i + 1][1]) > parseFloat(value[condition2][1])) {
                trend = trend + 1;
              } else {
                trend = trend - 1;
              }
            }
          }
          if (trend > 0) {
            //下跌趋势
            SARData.push(maxPrice);
            beforeSAR = maxPrice;
          } else {
            SARData.push(minPrice);
            beforeSAR = minPrice;
          }
          let condition3 = i + cycle > len - 1 ? len - 1 : i + cycle;
          for (let k = i; k < condition3; k++) {
            beforeTrend = beforeTrend + volume[k][2];
          }
          if (beforeTrend == 0) {
            if (parseFloat(value[i][1]) > parseFloat(value[condition3 - 1][1])) {
              beforeTrend = beforeTrend + 1;
            } else {
              beforeTrend = beforeTrend - 1;
            }
          }
        } else {
          // SAR(Tn)=SAR(Tn-1)+AF(Tn)*[EP(Tn-1)-SAR(Tn-1)]
          let trend = 0;
          let SAR = 0;
          let condition4 = i + cycle > len - 1 ? len - 1 : i + cycle;
          for (let k = i; k < condition4; k++) {
            trend = trend + volume[k][2];
          }
          if (trend == 0) {
            if (parseFloat(value[i][1]) > parseFloat(value[condition4 - 1][1])) {
              trend = trend + 1;
            } else {
              trend = trend - 1;
            }
          }
          if (trend > 0) {
            //下跌趋势
            if (beforeTrend > 0) {
              AF = AF + 0.02;
            } else if (beforeTrend < 0 || AF > 0.2) {
              AF = 0.02;
            }
            SAR = parseFloat(beforeSAR)  + AF * (parseFloat(EPMax) - parseFloat(beforeSAR));
            if (SAR < maxPrice || SAR < EPMax) {
              SAR = maxPrice > EPMax ? maxPrice : EPMax;
            }
          } else {
            if (beforeTrend < 0) {
              AF = AF + 0.02;
            } else if (beforeTrend > 0 || AF > 0.2) {
              AF = 0.02;
            }
            SAR = parseFloat(beforeSAR) + AF * (parseFloat(EPMin) - parseFloat(beforeSAR));
            if (SAR > minPrice || SAR > EPMin) {
              SAR = EPMin > minPrice ? minPrice : EPMin;
            }
          }
          SARData.push(SAR);
          beforeSAR = SAR;
          beforeTrend = trend;
        }
        EPMin = minPrice;
        EPMax = maxPrice;
      }
      return SARData;
    }
  }
};
</script>
