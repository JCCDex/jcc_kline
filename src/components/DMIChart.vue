<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <font style="color: #e6e6e6;">PDI:{{this.toolTipData.PDI}}</font>
      <font style="color: #f6d026;">MDI:{{this.toolTipData.MDI}}</font>
      <font style="color: #e03bfa;">ADX:{{this.toolTipData.ADX}}</font>
      <font style="color: #67ff7c;">ADXR:{{this.toolTipData.ADXR}}</font>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      ref="DMI"
      :style="{height: `${DMISize.height}`, width: `${DMISize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "DMI",
  data() {
    return {
      indicator: null,
      indicatorsData: null,
      DMIData: null,
      coinType: "",
      currentCycle: "",
      isRefresh: true,
      chartType: "indicator",
      toolTipData: null,
      platform: "",
      DMISize: {
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
        if (this.chartDataObj.candleData && !this.DMIData) {
          let data = JSON.parse(
            JSON.stringify(this.chartDataObj.candleData.values)
          );
          this.DMIData = this.getDMIData(data);
        }
        if (this.DMIData) {
          this.toolTipData = {
            PDI: formatDecimal(this.DMIData.PDI[index], 2, true),
            MDI: formatDecimal(this.DMIData.MDI[index], 2, true),
            ADX: formatDecimal(this.DMIData.ADX[index], 2, true),
            ADXR: formatDecimal(this.DMIData.ADXR[index], 2, true)
          };
        }
      }
    },
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.cycle === "everyhour") {
        return;
      }
      if (this.chartDataObj.candleData) {
        this.indicatorsData = {
          indicator: "DMI",
          categoryData: this.chartDataObj.candleData.categoryData
        };
        this.DMIData = this.getDMIData(this.chartDataObj.candleData.values);
        let index = this.chartDataObj.index;
        this.$emit("listenToTipIndex", index);
        this.indicatorsData.indicatorData = this.DMIData;
      }
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !==
            JSON.stringify(this.chartDataObj.coinType) ||
          this.isRefresh
        ) {
          this.init(true);
          this.DMI.setDMIOption(this.indicatorsData, this.currentCycle);
          this.isRefresh = false;
          this.coinType = this.chartDataObj.coinType;
        } else {
          this.DMI.updateDMIOption(this.indicatorsData, this.currentCycle);
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
          JSON.stringify(size) !== JSON.stringify(this.DMISize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.DMISize = {
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
        this.DMISize.height = this.klineConfig.size.height * 0.25 + "px";
        this.DMISize.width = this.klineConfig.size.width + "px";
      } else {
        this.DMISize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.platform = "mobile";
      this.DMISize.height = this.klineConfig.size.height * 0.3 + "px";
      this.DMISize.width = this.klineConfig.size.width + "px";
    }
    this.klineConfig.chartType = "dmi";
    this.DMI = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    init(clear) {
      this.DMI.initDMIChart(this.$refs.DMI, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.DMI.getDMITipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.DMI.changeDMIDataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.DMI.resizeDMIChart(
          this.$refs.DMI,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.DMI.disposeDMIEChart();
    },
    getDMIData(data) {
      if (!data) {
        return;
      }
      let datas = JSON.parse(JSON.stringify(data));
      var PDM = []; //上升动向
      var MDM = []; //下降动向
      var TR = []; //真实波动
      for (let i = 0; i < datas.length; i++) {
        let TRa;
        let TRb;
        let TRc;
        if (i === 0) {
          PDM.push(0);
          MDM.push(0);
          TRb = 0;
          TRc = 0;
        } else {
          PDM.push(
            parseFloat(datas[i][3]) - parseFloat(datas[i - 1][3]) <= 0
              ? 0
              : parseFloat(datas[i][3]) - parseFloat(datas[i - 1][3])
          );
          MDM.push(
            parseFloat(datas[i - 1][2]) - parseFloat(datas[i][2]) <= 0
              ? 0
              : parseFloat(datas[i - 1][2]) - parseFloat(datas[i][2])
          );
          TRb = parseFloat(datas[i][3]) - parseFloat(datas[i - 1][1]);
          TRc = parseFloat(datas[i][2]) - parseFloat(datas[i - 1][1]);
        }
        TRa = parseFloat(datas[i][3]) - parseFloat(datas[i][2]);
        TR.push(Math.max(Math.abs(TRa), Math.abs(TRb), Math.abs(TRc)));
      }

      var PDI = []; //上升方向指标线
      var MDI = []; //下降方向指标线
      var PDM14 = this.getMADataByDetailData(
        14,
        JSON.parse(JSON.stringify(PDM))
      );
      var MDM14 = this.getMADataByDetailData(
        14,
        JSON.parse(JSON.stringify(MDM))
      );
      var TR14 = this.getMADataByDetailData(14, JSON.parse(JSON.stringify(TR)));
      for (let j = 0; j < PDM.length; j++) {
        if (
          isNaN(PDM14[j]) ||
          isNaN(TR14[j]) ||
          (parseFloat(PDM14[j]) == 0 || parseFloat(TR14[j])) == 0
        ) {
          PDI.push(0);
        } else {
          PDI.push((parseFloat(PDM14[j]) / parseFloat(TR14[j])) * 100);
        }
        if (
          isNaN(MDM14[j]) ||
          isNaN(TR14[j]) ||
          parseFloat(MDM14[j]) == 0 ||
          parseFloat(TR14[j]) == 0
        ) {
          MDI.push(0);
        } else {
          MDI.push((parseFloat(MDM14[j]) / parseFloat(TR14[j])) * 100);
        }
      }

      var DX = []; //动向指数
      var ADX = []; //动向平均数
      for (let i = 0; i < PDI.length; i++) {
        if (isNaN(PDI[i]) || isNaN(MDI[i])) {
          DX.push("-");
        } else {
          DX.push(
            (Math.abs(parseFloat(MDI[i]) - parseFloat(PDI[i])) /
              (parseFloat(MDI[i]) + parseFloat(PDI[i]))) *
              100
          );
        }
      }
      ADX = this.getMADataByDetailData(13 + 6, DX);

      var ADXR = []; //评估数值 ADXR=（当日的ADX+前6日的ADX）÷2
      for (let i = 0; i < ADX.length; i++) {
        if (i < 5 || isNaN(ADX[i]) || isNaN(ADX[i - 5])) {
          ADXR.push("-");
        } else {
          ADXR.push((parseFloat(ADX[i]) + parseFloat(ADX[i - 5])) / 2);
        }
      }
      return {
        PDI: PDI,
        MDI: MDI,
        ADX: ADX,
        ADXR: ADXR
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
        result.push(sum / periodic);
      }
      return result;
    }
  }
};
</script>
