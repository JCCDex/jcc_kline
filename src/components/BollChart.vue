<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #e6e6e6;">UB:{{this.toolTipData.UB}}</font>
      <font style="color: #f6d026;">MB:{{this.toolTipData.MB}}</font>
      <font style="color: #e03bfa;">LB:{{this.toolTipData.LB}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="Boll"
      :style="{height: `${BollSize.height}`, width: `${BollSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "Boll",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      BollData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      platform: "",
      BollSize: {
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
        if (this.chartDataObj.candleData && !this.BollData) {
          let data = JSON.parse(
            JSON.stringify(this.chartDataObj.candleData)
          );
          this.BollData = this.getBollData(data, 20);
        }
        if (this.BollData) {
          this.toolTipData = {
            UB: formatDecimal(this.BollData.UB[index], 2, true),
            MB: formatDecimal(this.BollData.MB[index], 2, true),
            LB: formatDecimal(this.BollData.LB[index], 2, true),
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
          indicator: "Boll",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.BollData = this.getBollData(this.chartDataObj.candleData, 20);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.BollData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true);
          this.Boll.setBollOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.Boll.updateBollOption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.BollSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.BollSize = {
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
        this.BollSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.BollSize.width = this.klineConfig.size.width + "px";
      } else {
        this.BollSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.platform = "mobile";
      this.BollSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.BollSize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "Boll";
    this.Boll = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.Boll.initBollChart(this.$refs.Boll, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.Boll.getBollTipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.Boll.changeBollDataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.Boll.resizeBollChart(
          this.$refs.Boll,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.Boll.disposeBollEChart();
    },
    getBollData(datas, periodic) {
      if (!datas) return;
      let UB = []; //上轨线
      let MB = []; //中轨线
      let LB = []; //下轨线
      let MD = []; //标准差
      let MAData = this.calculateMA(periodic, datas);
      for (let i = 0; i < MAData.length; i++) {
        if (isNaN(MAData[i - 1])) {
          UB.push("-");
          MB.push("-");
          LB.push("-");
          MD.push("-");
        } else {
          MB.push(MAData[i - 1]);
          let MDValues = 0;
          for (let j = i - periodic; j < i; j++) {
            if (isNaN(MAData[j])) {
              MDValues = MDValues + Math.pow(datas.values[j][1], 2);
            } else {
              MDValues = MDValues + Math.pow(datas.values[j][1] - MAData[j], 2);
            }
          }
          MD.push(Math.sqrt(MDValues) / periodic);
          UB.push(MB[i] + 2 * MD[i]);
          LB.push(MB[i] - 2 * MD[i]);
        }
      }
      return {
        UB: UB,
        MB: MB,
        LB: LB
      };
    },
    calculateMA(dayCount, data){
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount - 1) {
            result.push('-');
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
}
  }
};
</script>
