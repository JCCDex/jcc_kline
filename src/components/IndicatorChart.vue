<template>
  <div>
    <div
      :class="this.klineConfig.platform === 'pc' ? 'kline-tip' : 'mobile-kline-tip'"
      v-if="toolTipData"
    >
      <div v-show="indicatorType === 'Boll'">
        <font style="color: #e6e6e6;">UB:{{this.toolTipData.UB}}</font>
        <font style="color: #f6d026;">MB:{{this.toolTipData.MB}}</font>
        <font style="color: #e03bfa;">LB:{{this.toolTipData.LB}}</font>
      </div>
      <div v-show="indicatorType === 'BRAR'">
        <font style="color: #e6e6e6;">BR:{{this.toolTipData.BR}}</font>
        <font style="color: #f6d026;">AR:{{this.toolTipData.AR}}</font>
      </div>
      <div v-show="indicatorType === 'DMA'">
        <font style="color: #e6e6e6;">DMA:{{this.toolTipData.DMA}}</font>
        <font style="color: #f6d026;">AMA:{{this.toolTipData.AMA}}</font>
      </div>
      <div v-show="indicatorType === 'DMI'">
        <font style="color: #e6e6e6;">PDI:{{this.toolTipData.PDI}}</font>
        <font style="color: #f6d026;">MDI:{{this.toolTipData.MDI}}</font>
        <font style="color: #e03bfa;">ADX:{{this.toolTipData.ADX}}</font>
        <font style="color: #67ff7c;">ADXR:{{this.toolTipData.ADXR}}</font>
      </div>
      <div v-show="indicatorType === 'KDJ'">
        <font style="color: #67ff7c;">K:&nbsp;{{toolTipData.K}}&nbsp;</font>
        <font style="color: #ff4d71;">D:&nbsp;{{toolTipData.D}}&nbsp;</font>
        <font style="color: #f6d026;">J:&nbsp;{{toolTipData.J}}&nbsp;</font>
      </div>
      <div v-show="indicatorType === 'MACD'">
        <font style="color: #67ff7c;">MACD:{{toolTipData.macd}}&nbsp;</font>
        <font style="color: #fd1d57;">DIFF:{{toolTipData.diff}}&nbsp;</font>
        <font style="color: #ffd801;">DEA:{{toolTipData.dea}}&nbsp;</font>
      </div>
      <div v-show="indicatorType === 'MTM'">
        <font style="color: #67ff7c;">MTM6:&nbsp;{{toolTipData.MTM}}</font>
        <font style="color: #f6d026;">MAMTM:&nbsp;{{toolTipData.MAMTM}}</font>
      </div>
      <div v-show="indicatorType === 'OBV'">
        <font style="color: #67ff7c;">OBV:&nbsp;{{toolTipData.OBV}}</font>
      </div>
      <div v-show="indicatorType === 'PSY'">
        <font style="color: #67ff7c;">PSY:&nbsp;{{toolTipData.PSY}}</font>
      </div>
      <div v-show="indicatorType === 'ROC'">
        <font style="color: #67ff7c;">ROC:&nbsp;{{toolTipData.ROC}}</font>
      </div>
      <div v-show="indicatorType === 'RSI'">
        <font style="color: #67ff7c;">RSI6:&nbsp;{{toolTipData.RSI6}}</font>
        <font style="color: #16c5ff;">RSI12:&nbsp;{{toolTipData.RSI12}}</font>
        <font style="color: #e03bfa;">RSI24:&nbsp;{{toolTipData.RSI24}}</font>
      </div>
      <div v-show="indicatorType === 'SAR'">
        <font style="color: #357ce1;">SAR:{{this.toolTipData.SAR}}</font>
      </div>
      <div v-show="indicatorType === 'TRIX'">
        <font style="color: #e6e6e6;">TRIX:{{this.toolTipData.TRIX}}</font>
        <font style="color: #f6d026;">MATRIX:{{this.toolTipData.MATRIX}}</font>
      </div>
      <div v-show="indicatorType === 'VR'">
        <font style="color: #67ff7c;">VR:&nbsp;{{toolTipData.VR}}</font>
        <font style="color: #f6d026;">MAVR:&nbsp;{{toolTipData.MAVR}}</font>
      </div>
      <div v-show="indicatorType === 'WR'">
        <font style="color: #e6e6e6;">WR1:&nbsp;{{toolTipData.WR1}}</font>
        <font style="color: #f6d026;">WR2:&nbsp;{{toolTipData.WR2}}</font>
      </div>
    </div>
    <i
      v-if="platform === 'pc'"
      @click="closeChart"
      style="position:absolute;right:70px;z-index:5;margin-top:3px"
      class="close-icon"
    ></i>
    <div
      id="Indicator"
      ref="Indicator"
      :style="{height: `${IndicatorSize.height}`, width: `${IndicatorSize.width}`}"
      @mousemove="getToolTipIndex()"
    ></div>
  </div>
</template>
<script>
import IndicatorChart from "../js/IndicatorChart";
import { getLanguage, formatDecimal } from "../js/utils";
export default {
  name: "Indicator",
  data() {
    return {
      Indicator: null,
      indicatorsData: {},
      IndicatorData: null,
      coinType: "",
      platform: "",
      currentCycle: "",
      isRefresh: true,
      toolTipData: null,
      IndicatorSize: {
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
    toolTipIndex: {
      type: Number,
      default: null
    },
    cycle: {
      type: String,
      default: "hour"
    },
    indicatorType: {
      type: String,
      default: ""
    }
  },
  watch: {
    cycle() {
      if (this.cycle !== this.currentCycle) {
        this.loadingTime = 0;
        this.init(true);
        this.toolTipData = null;
        this.watchLoading = true;
        this.isRefresh = true;
      }
      this.currentCycle = JSON.parse(JSON.stringify(this.cycle));
    },
    indicatorType() {
      if (this.chartDataObj.cycle === "everyhour") {
        return;
      }
      if (this.chartDataObj.candleData && this.chartDataObj.klineData) {
        this.watchLoading = false;
        this.loadingTime = 0;
        let type = this.indicatorType;
        let data = JSON.parse(JSON.stringify(this.chartDataObj));
        this.calculateIndicatorData(type, data);
        let index = this.toolTipIndex;
        let precision = parseInt(this.chartDataObj.precision.price) + 1;
        this.changeChartTipData(index, type, precision);
      }
    },
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      if (this.chartDataObj.cycle === "everyhour") {
        return;
      }
      if (this.chartDataObj.candleData && this.chartDataObj.klineData) {
        this.watchLoading = false;
        this.loadingTime = 0;
        let data = JSON.parse(JSON.stringify(this.chartDataObj));
        this.calculateIndicatorData(this.indicatorType, data);
      } else {
        if (
          JSON.stringify(this.coinType) !==
          JSON.stringify(this.chartDataObj.coinType)
        ) {
          this.loadingTime = 0;
          this.watchLoading = true;
          this.toolTipData = null;
          this.init(true);
          this.isRefresh = true;
          this.coinType = this.chartDataObj.coinType;
        }
        if (this.watchLoading) {
          this.loadingTime = this.loadingTime + 1;
          if (this.loadingTime > 4) {
            this.Indicator.showIndicatorLoading(true);
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
          JSON.stringify(size) !== JSON.stringify(this.IndicatorSize) &&
          this.klineConfig.defaultSize === false
        ) {
          this.IndicatorSize = {
            width: this.klineConfig.size.width + "px",
            height: this.klineConfig.size.height * 0.25 + "px"
          };
          this.resize();
        }
      }
    },
    toolTipIndex() {
      let index = this.toolTipIndex;
      let type = this.indicatorType;
      let precision = parseInt(this.chartDataObj.precision.price) + 1;
      this.changeChartTipData(index, type, precision);
    }
  },
  created() {
    if (this.klineConfig.platform === "pc") {
      this.platform = "pc";
      if (!this.klineConfig.defaultSize) {
        this.IndicatorSize.height = this.klineConfig.size.height * 0.25 + "px";
        this.IndicatorSize.width = this.klineConfig.size.width + "px";
      } else {
        this.IndicatorSize = {
          height: "132px",
          width: "100%"
        };
      }
    } else {
      this.platform = "mobile";
      this.IndicatorSize.height = this.klineConfig.size.height * 0.3 + "px";
      this.IndicatorSize.width = this.klineConfig.size.width + "px";
    }
    this.Indicator = new IndicatorChart(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    calculateIndicatorData(type, data) {
      if (data.cycle === "everyhour" || !data.candleData) {
        return;
      }
      if (data.klineData) {
        this.indicatorsData = {
          indicator: type,
          categoryData: data.candleData.categoryData,
          candlestickData: data.candleData.values,
          volumes: data.candleData.volumes
        };
      }
      if (type === "Boll") {
        this.IndicatorData = this.getBollData(data.candleData, 20);
      } else if (type === "BRAR") {
        this.IndicatorData = this.getBRARData(data.candleData.values, 24);
      } else if (type === "DMA") {
        this.IndicatorData = this.getDMAData(data.candleData);
      } else if (type === "DMI") {
        this.IndicatorData = this.getDMIData(data.candleData.values);
      } else if (type === "KDJ") {
        this.IndicatorData = this.getKDJData(9, data.candleData.values);
      } else if (type === "MACD") {
        this.IndicatorData = this.getMACDData(data.candleData.MACDData);
      } else if (type === "MTM") {
        this.IndicatorData = this.getMTMData(data.klineData);
      } else if (type === "OBV") {
        this.IndicatorData = this.getOBVData(data.klineData);
      } else if (type === "PSY") {
        this.IndicatorData = this.getPSYData(data.klineData);
      } else if (type === "ROC") {
        this.IndicatorData = this.getROCData(data.klineData);
      } else if (type === "RSI") {
        let RSI6 = this.getRSIData(data.candleData.values, 6);
        let RSI12 = this.getRSIData(data.candleData.values, 12);
        let RSI24 = this.getRSIData(data.candleData.values, 24);
        this.IndicatorData = {
          RSI6: RSI6,
          RSI12: RSI12,
          RSI24: RSI24
        };
      } else if (type === "SAR") {
        this.IndicatorData = this.getSARData(data.candleData);
      } else if (type === "TRIX") {
        this.IndicatorData = this.getTRIXData(data.candleData.values);
      } else if (type === "VR") {
        this.IndicatorData = this.getVRData(data.klineData);
      } else {
        this.IndicatorData = this.getWRData(data.klineData);
      }
      this.indicatorsData.indicatorData = this.IndicatorData;
      if (this.indicatorsData && this.indicatorsData.indicatorData) {
        if (
          JSON.stringify(this.coinType) !== JSON.stringify(data.coinType) ||
          this.isRefresh
        ) {
          this.Indicator.setIndicatorOption(
            this.indicatorsData,
            this.currentCycle
          );
          this.isRefresh = false;
          this.coinType = data.coinType;
        } else {
          this.Indicator.updateIndicatorOption(
            this.indicatorsData,
            this.currentCycle
          );
        }
      }
    },
    changeChartTipData(index, type, precision) {
      if (index) {
        if (this.IndicatorData) {
          if (type === "Boll") {
            this.toolTipData = {
              UB: formatDecimal(this.IndicatorData.UB[index], precision, true),
              MB: formatDecimal(this.IndicatorData.MB[index], precision, true),
              LB: formatDecimal(this.IndicatorData.LB[index], precision, true)
            };
          } else if (type === "BRAR") {
            this.toolTipData = {
              BR: this.fixed(parseFloat(this.IndicatorData.BR[index]), 4),
              AR: this.fixed(parseFloat(this.IndicatorData.AR[index]), 4)
            };
          } else if (type === "DMA") {
            this.toolTipData = {
              DMA: formatDecimal(
                this.IndicatorData.DMA[index],
                precision,
                true
              ),
              AMA: formatDecimal(this.IndicatorData.AMA[index], precision, true)
            };
          } else if (type === "DMI") {
            this.toolTipData = {
              PDI: formatDecimal(this.IndicatorData.PDI[index], 2, true),
              MDI: formatDecimal(this.IndicatorData.MDI[index], 2, true),
              ADX: formatDecimal(this.IndicatorData.ADX[index], 2, true),
              ADXR: formatDecimal(this.IndicatorData.ADXR[index], 2, true)
            };
          } else if (type === "KDJ") {
            this.toolTipData = {
              K: formatDecimal(this.IndicatorData.K[index], 2, true),
              D: formatDecimal(this.IndicatorData.D[index], 2, true),
              J: formatDecimal(this.IndicatorData.J[index], 2, true)
            };
          } else if (type === "MACD") {
            this.toolTipData = {
              macd: this.IndicatorData.macds[index],
              diff: this.IndicatorData.difs[index],
              dea: this.IndicatorData.deas[index]
            };
          } else if (type === "MTM") {
            this.toolTipData = {
              MTM: formatDecimal(
                this.IndicatorData.MTM[index],
                precision,
                true
              ),
              MAMTM: formatDecimal(
                this.IndicatorData.MAMTM[index],
                precision,
                true
              )
            };
          } else if (type === "OBV") {
            this.toolTipData = {
              OBV: formatDecimal(this.IndicatorData.OBV[index], 2, false)
            };
          } else if (type === "PSY") {
            this.toolTipData = {
              PSY: formatDecimal(this.IndicatorData[index], 2, true)
            };
          } else if (type === "ROC") {
            this.toolTipData = {
              ROC: formatDecimal(this.IndicatorData[index], 2, true)
            };
          } else if (type === "RSI") {
            this.toolTipData = {
              RSI6: formatDecimal(this.IndicatorData.RSI6[index], 2, true),
              RSI12: formatDecimal(this.IndicatorData.RSI12[index], 2, true),
              RSI24: formatDecimal(this.IndicatorData.RSI24[index], 2, true)
            };
          } else if (type === "SAR") {
            this.toolTipData = {
              SAR: formatDecimal(this.IndicatorData[index], precision, true)
            };
          } else if (type === "TRIX") {
            this.toolTipData = {
              TRIX: formatDecimal(this.IndicatorData.TRIX[index], 2, true),
              MATRIX: formatDecimal(this.IndicatorData.MATRIX[index], 2, true)
            };
          } else if (type === "VR") {
            this.toolTipData = {
              VR: this.fixed(parseFloat(this.IndicatorData.VR[index]), 7),
              MAVR: this.fixed(parseFloat(this.IndicatorData.MAVR[index]), 7)
            };
          } else if (type === "WR") {
            this.toolTipData = {
              WR1: formatDecimal(this.IndicatorData.WR1[index], 7, true),
              WR2: formatDecimal(this.IndicatorData.WR2[index], 7, true)
            };
          }
        }
      }
    },
    init(clear) {
      this.Indicator.initIndicatorChart(this.$refs.Indicator, clear);
      this.resize();
    },
    getToolTipIndex() {
      let index = this.Indicator.getIndicatorTipData();
      this.$emit("listenToTipIndex", index);
    },
    changeDataZoom(type) {
      this.Indicator.changeIndicatorDataZoom(type);
    },
    closeChart() {
      this.$emit("listenIndicatorChartClose", true);
    },
    resize() {
      if (this.klineConfig.platform === "pc") {
        this.Indicator.resizeIndicatorChart(
          this.$refs.Indicator,
          this.resizeSize.isFullScreen,
          this.klineConfig.size
        );
      }
    },
    dispose() {
      this.Indicator.disposeIndicatorEChart();
    },
    fixed(value, num) {
      if (isNaN(value)) {
        return "--";
      } else {
        return value.toFixed(num);
      }
    },
    getBollData(datas, periodic) {
      if (!datas) return;
      let UB = []; //上轨线
      let MB = []; //中轨线
      let LB = []; //下轨线
      let MD = []; //标准差
      let MAData = this.calculateMA(periodic, datas);
      MB = JSON.parse(JSON.stringify(MAData));
      for (let i = 0; i < MAData.length; i++) {
        if (isNaN(MAData[i])) {
          UB.push("-");
          LB.push("-");
          MD.push("-");
        } else {
          let MDValues = 0;
          for (let j = i - periodic + 1; j < i; j++) {
            if (isNaN(MAData[i])) {
              MDValues = MDValues + Math.pow(datas.values[j][1], 2);
            } else {
              MDValues = MDValues + Math.pow(datas.values[j][1] - MAData[i], 2);
            }
          }
          MD.push(Math.sqrt(MDValues / periodic));
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
    getBRARData(data, periodic) {
      if (!data) {
        return;
      }
      var BR = [];
      var AR = [];
      var HighMinusOpen = []; // 当日最高价 - 当日开盘价
      var OpenMinusLow = []; // 当日开盘价 - 当日最低价
      var HighMinusCY = []; // 当日最高价 - 前一日收盘价
      var CYMinusLow = []; // 前一日收盘价 - 当日最低价
      for (let i = 0; i < data.length; i++) {
        HighMinusOpen.push(parseFloat(data[i][3]) - parseFloat(data[i][0]));
        OpenMinusLow.push(parseFloat(data[i][0]) - parseFloat(data[i][2]));
        if (i === 0) {
          HighMinusCY.push(0);
          CYMinusLow.push(0);
        } else {
          HighMinusCY.push(parseFloat(data[i][3]) - parseFloat(data[i - 1][1]));
          CYMinusLow.push(parseFloat(data[i - 1][1]) - parseFloat(data[i][2]));
        }
        if (i < periodic) {
          BR.push("-");
          AR.push("-");
        } else {
          let HighMinusOpenSum = 0;
          let OpenMinusLowSum = 0;
          let HighMinusCYSum = 0;
          let CYMinusLowSum = 0;
          for (let j = i - periodic; j < i; j++) {
            HighMinusOpenSum = HighMinusOpenSum + parseFloat(HighMinusOpen[j]);
            OpenMinusLowSum = OpenMinusLowSum + parseFloat(OpenMinusLow[j]);
            HighMinusCYSum = HighMinusCYSum + parseFloat(HighMinusCY[j]);
            CYMinusLowSum = CYMinusLowSum + parseFloat(CYMinusLow[j]);
          }
          if (OpenMinusLowSum === 0) {
            AR.push(0);
          } else {
            AR.push((HighMinusOpenSum / OpenMinusLowSum) * 100);
          }
          if (CYMinusLowSum === 0) {
            BR.push(0);
          } else {
            BR.push((HighMinusCYSum / CYMinusLowSum) * 100);
          }
        }
      }
      return {
        AR: AR,
        BR: BR
      };
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
      };
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
    getKDJData(dayCount, data) {
      if (!data) {
        return;
      }
      var RSV = [];
      var KData = [];
      var DData = [];
      var JData = [];
      for (var i = 0; i < data.length; i++) {
        if (i < dayCount - 1) {
          RSV.push("-");
          KData.push("-");
          DData.push("-");
          JData.push("-");
        } else {
          var dayCountData = data.slice(i - dayCount + 1, i + 1);
          var lowestPriceData = [];
          var highestPriceData = [];
          for (var countData of dayCountData) {
            lowestPriceData.push(countData[2]);
            highestPriceData.push(countData[3]);
          }
          let smallToBigLowestPriceData = JSON.parse(
            JSON.stringify(lowestPriceData)
          );
          smallToBigLowestPriceData = smallToBigLowestPriceData.sort(function(
            a,
            b
          ) {
            return a - b;
          });
          let lowestPrice = smallToBigLowestPriceData[0];
          let bigToSmallHighestPriceData = JSON.parse(
            JSON.stringify(lowestPriceData)
          );
          bigToSmallHighestPriceData = bigToSmallHighestPriceData.sort(function(
            a,
            b
          ) {
            return b - a;
          });
          let highestPrice = bigToSmallHighestPriceData[0];
          let RSVData =
            ((data[i][1] - lowestPrice) / (highestPrice - lowestPrice)) * 100;
          if (isNaN(RSVData) || RSVData == Infinity) {
            RSVData = 0;
          }
          RSV.push(RSVData);
          let KBeforeData;
          if (!isNaN(KData[i - 1])) {
            KBeforeData = KData[i - 1];
          } else {
            KBeforeData = 50;
          }
          let DBeforeData;
          if (!isNaN(DData[i - 1])) {
            DBeforeData = KData[i - 1];
          } else {
            DBeforeData = 50;
          }
          KData.push((2 / 3) * KBeforeData + (1 / 3) * RSV[i]);
          DData.push((2 / 3) * DBeforeData + (1 / 3) * KData[i]);
          JData.push(3 * KData[i] - 2 * DData[i]);
        }
      }
      return {
        RSV: RSV,
        K: KData,
        D: DData,
        J: JData
      };
    },
    getMACDData(rawData) {
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
    getMTMData(data) {
      if (!data) {
        return;
      }
      var MTM = [];
      var MTMTmp = "";
      for (var i = 0; i < data.length; i++) {
        if (i < 6) {
          MTM.push("-");
        } else {
          MTMTmp = data[i][1] - data[i - 6][1];
          MTM.push(MTMTmp);
        }
      }
      var MAMTM = this.getMADataByDetailData(10, MTM);
      return {
        MTM: MTM,
        MAMTM: MAMTM
      };
    },
    getOBVData(data) {
      if (!data) {
        return;
      }
      var OBV = [];
      var OnBalanceVolume;
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          OBV.push("-");
          OnBalanceVolume = 0;
        } else {
          let oldValues = JSON.parse(JSON.stringify(data[i - 1]));
          let values = JSON.parse(JSON.stringify(data[i]));
          if (values[2] > oldValues[2]) {
            OnBalanceVolume = OnBalanceVolume + values[6];
          } else if (values[2] < oldValues[2]) {
            OnBalanceVolume = OnBalanceVolume - values[6];
          }
          OBV.push(OnBalanceVolume);
        }
      }
      return { OBV: OBV };
    },
    getPSYData(data) {
      if (!data) {
        return;
      }
      var PSY = [];
      for (var i = 0; i < data.length; i++) {
        var riseDay = 0;
        if (i < 11) {
          PSY.push("-");
        } else {
          for (var j = i - 11; j <= i; j++) {
            if (data[j][2] - data[j][1] > 0) {
              riseDay++;
            }
          }
          PSY.push((riseDay / 12) * 100);
        }
      }
      return PSY;
    },
    getROCData(data) {
      if (!data) {
        return;
      }
      var ROC = [];
      for (var i = 0; i < data.length; i++) {
        if (i < 12) {
          ROC.push("-");
        } else {
          var ROCTmp = ((data[i][2] - data[i - 12][2]) / data[i - 12][2]) * 100;
          ROC.push(ROCTmp);
        }
      }
      return ROC;
    },
    getRSIData(datas, periodic) {
      if (!datas) {
        return;
      }
      let RSI = [];
      let upsAndDowns = [];
      for (let i = 0; i < datas.length; i++) {
        if (i === 0) {
          upsAndDowns.push(0);
        } else {
          upsAndDowns.push((datas[i][1] - datas[i - 1][1]) / datas[i - 1][1]);
        }
      }
      for (let i = 0; i < upsAndDowns.length; i++) {
        if (i < periodic - 1) {
          RSI.push("-");
        } else {
          let gains = 0; //涨幅
          let gainsNumber = 0; //涨幅天数
          let drop = 0; //跌幅
          let dropNumber = 0; //跌幅天数
          for (let j = i - periodic + 1; j < i + 1; j++) {
            if (upsAndDowns[j] >= 0) {
              gains = gains + upsAndDowns[j];
              gainsNumber = gainsNumber + 1;
            } else {
              drop = drop + upsAndDowns[j];
              dropNumber = dropNumber + 1;
            }
          }
          let gainsAverage = gains / gainsNumber;
          let dropAverage = drop / dropNumber;
          let RSIValue =
            (gainsAverage / (gainsAverage + Math.abs(dropAverage))) * 100;
          if (isNaN(RSIValue)) {
            RSI.push(0);
          } else {
            RSI.push(RSIValue);
          }
        }
      }
      return RSI;
    },
    getSARData(data) {
      if (!data) {
        return;
      }
      if (data.values.length == 1) {
        return (SARData = [data.values[3]]);
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
              if (
                parseFloat(value[i + 1][1]) > parseFloat(value[condition2][1])
              ) {
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
            if (
              parseFloat(value[i][1]) > parseFloat(value[condition3 - 1][1])
            ) {
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
            if (
              parseFloat(value[i][1]) > parseFloat(value[condition4 - 1][1])
            ) {
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
            SAR =
              parseFloat(beforeSAR) +
              AF * (parseFloat(EPMax) - parseFloat(beforeSAR));
            if (SAR < maxPrice || SAR < EPMax) {
              SAR = maxPrice > EPMax ? maxPrice : EPMax;
            }
          } else {
            if (beforeTrend < 0) {
              AF = AF + 0.02;
            } else if (beforeTrend > 0 || AF > 0.2) {
              AF = 0.02;
            }
            SAR =
              parseFloat(beforeSAR) +
              AF * (parseFloat(EPMin) - parseFloat(beforeSAR));
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
    },
    getTRIXData(datas) {
      if (!datas) {
        return;
      }
      var TR = [];
      let TRa = this.calculateEMAByCandleData(datas, 12);
      let TRb = this.getEMAData(TRa, 12);
      TR = this.getEMAData(TRb, 12);
      var TRIX = [];
      for (let i = 0; i < TR.length; i++) {
        if (i === 0) {
          TRIX.push("-");
        } else {
          TRIX.push(((TR[i] - TR[i - 1]) / TR[i - 1]) * 100);
        }
      }
      var MATRIX = this.getMADataByDetailData(20, TRIX);
      return {
        TRIX: TRIX,
        MATRIX: MATRIX
      };
    },
    getVRData(data) {
      if (!data) {
        return;
      }
      var VR = [];
      for (var i = 0; i < data.length; i++) {
        var UVS = 0;
        var DVS = 0;
        var PVS = 0;
        var temp;
        if (i < 11) {
          VR.push("-");
        } else {
          for (var j = i; j > i - 12; j--) {
            if (j === 0) {
              temp = data[0][2] - data[0][1];
              // up
              if (temp > 0) {
                UVS = UVS + data[0][6];
              } else if (temp < 0) {
                DVS = DVS + data[0][6];
              } else if (temp === 0) {
                PVS = PVS + data[0][6];
              }
            } else {
              temp = data[j][2] - data[j - 1][2];
              if (temp > 0) {
                UVS = UVS + data[j][6];
              } else if (temp < 0) {
                DVS = DVS + data[j][6];
              } else if (temp === 0) {
                PVS = PVS + data[j][6];
              }
            }
          }
          var VRTmp = (UVS + 0.5 * PVS) / (DVS + 0.5 * PVS);
          if (VRTmp == Infinity || isNaN(parseFloat(VRTmp))) {
            VRTmp = 0;
          }
          VR.push(VRTmp);
        }
      }
      var MAVR = this.getMADataByDetailData(10, VR);
      return {
        VR: VR,
        MAVR: MAVR
      };
    },
    getWRData(data) {
      if (!data) {
        return;
      }
      var WR1 = []; //
      var WR2 = []; //
      for (var i = 0; i < data.length; i++) {
        if (i < 9) {
          WR1[i] = "-";
        } else {
          var HIGH1 = data[i][4];
          var LOW1 = data[i][3];
          for (var j = i; j > i - 10; j--) {
            HIGH1 = data[j][4] > HIGH1 ? data[j][4] : HIGH1;
            LOW1 = data[j][3] > LOW1 ? LOW1 : data[j][3];
          }
          if ([HIGH1 - data[i][2]] == 0 || [HIGH1 - LOW1] == 0) {
            WR1[i] = 0;
          } else {
            WR1[i] = (100 * [HIGH1 - data[i][2]]) / [HIGH1 - LOW1];
          }
        }
        if (i < 5) {
          WR2[i] = "-";
        } else {
          var HIGH2 = data[i][4];
          var LOW2 = data[i][3];
          for (var k = i; k > i - 6; k--) {
            HIGH2 = data[k][4] > HIGH2 ? data[k][4] : HIGH2;
            LOW2 = data[k][3] > LOW2 ? LOW2 : data[k][3];
          }
          if ([HIGH2 - data[i][2]] == 0 || [HIGH2 - LOW2] == 0) {
            WR2[i] = 0;
          } else {
            WR2[i] = (100 * [HIGH2 - data[i][2]]) / [HIGH2 - LOW2];
          }
        }
      }
      return {
        WR1: WR1,
        WR2: WR2
      };
    },
    calculateEMAByCandleData(data, periodic) {
      var EMA = [];
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          EMA.push(data[i][1]);
        } else {
          let value =
            (2 * data[i][1] + (periodic - 1) * EMA[i - 1]) / (periodic + 1);
          EMA.push(value);
        }
      }
      return EMA;
    },
    getEMAData(data, periodic) {
      var EMA = [];
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          EMA.push(data[i]);
        } else {
          EMA.push(
            (2 * data[i] + (periodic - 1) * EMA[i - 1]) / (periodic + 1)
          );
        }
      }
      return EMA;
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