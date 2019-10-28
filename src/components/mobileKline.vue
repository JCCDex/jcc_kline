<template>
  <div class="mobile-kline" style="background-color: #161b21;">
    <!-- Cycle按钮 -->
    <div calss="mobileCycle" style="height: 0.4rem; z-index: 9;">
      <div class="kline-cycle-div">
        <div @click="clickMinCycle()">
          <div
            :class="!this.showMinCycle ? this.message.language === 'en' ? 'mobile-kline-drop-down-en':'mobile-kline-drop-down' : this.message.language === 'en' ? 'mobile-kline-drop-down-en kline-select-color':'mobile-kline-drop-down kline-select-color'"
          >
            <font
              :class="selectMin !== '分'  ? selectMin !== 'm' ? 'kline-select-color kline-text-decoration' : 'kline-uncheck-color' : 'kline-uncheck-color'"
            >{{selectMin}}</font>
            <i
              :class="!this.showMinCycle ? 'drop-down-icon mobile-drop-down' : 'drop-down-select mobile-drop-down'"
            ></i>
          </div>
          <div v-show="showMinCycle" class="mobile-kline-cycle-float">
            <div
              @click="chooseCycle('minute')"
              :class="this.currentCycle === 'minute' ? 'mobile-kline-cycle-detail kline-select-color' : 'mobile-kline-cycle-detail kline-uncheck-color'"
            >{{message.oneMin}}</div>
            <div
              @click="chooseCycle('5minute')"
              :class="this.currentCycle === '5minute' ? 'mobile-kline-cycle-detail kline-select-color' : 'mobile-kline-cycle-detail kline-uncheck-color'"
            >{{message.fiveMin}}</div>
            <div
              @click="chooseCycle('15minute')"
              :class="this.currentCycle === '15minute' ? 'mobile-kline-cycle-detail kline-select-color' : 'mobile-kline-cycle-detail kline-uncheck-color'"
            >{{message.fifteenMin}}</div>
            <div
              @click="chooseCycle('30minute')"
              :class="this.currentCycle === '30minute' ? 'mobile-kline-cycle-detail kline-select-color' : 'mobile-kline-cycle-detail kline-uncheck-color'"
            >{{message.thirtyMin}}</div>
          </div>
        </div>
        <div @click="clickHourCycle()">
          <div
            :class="!this.showHourCycle  ? this.message.language === 'en' ? 'mobile-kline-drop-down-en':'mobile-kline-drop-down' : this.message.language === 'en' ? 'mobile-kline-drop-down-en kline-select-color':'mobile-kline-drop-down kline-select-color'"
          >
            <font
              :class="selectHour !== '时'  ? selectHour !== 'H' ? 'kline-select-color kline-text-decoration' : 'kline-uncheck-color' : 'kline-uncheck-color'"
            >{{selectHour}}</font>
            <i
              :class="!this.showHourCycle ? 'drop-down-icon mobile-drop-down' : 'drop-down-select mobile-drop-down'"
            ></i>
          </div>
          <div v-show="showHourCycle" class="mobile-kline-cycle-float kline-hour-cycle">
            <div
              @click="chooseCycle('hour')"
              :class="this.currentCycle === 'hour' ? 'mobile-kline-cycle-detail kline-select-color' : 'mobile-kline-cycle-detail kline-uncheck-color'"
            >{{message.oneHour}}</div>
            <div
              @click="chooseCycle('4hour')"
              :class="this.currentCycle === '4hour' ? 'mobile-kline-cycle-detail kline-select-color' : 'mobile-kline-cycle-detail kline-uncheck-color'"
            >{{message.fourHour}}</div>
          </div>
        </div>
      </div>
      <div
        @click="chooseCycle('day')"
        :class="this.currentCycle === 'day' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'"
      >{{message.day}}</div>
      <div
        @click="chooseCycle('week')"
        :class="this.currentCycle === 'week' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'"
      >{{message.week}}</div>
      <div
        @click="chooseCycle('month')"
        :class="this.currentCycle === 'month' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'"
      >{{message.month}}</div>
      <div
        @click="chooseCycle('everyhour')"
        :class="this.currentCycle === 'everyhour' ? 'mobile-cycle-btn mobile-btn-active' : 'mobile-cycle-btn'"
      >{{message.timeSharing}}</div>
      <!-- 指标线图标 -->
      <div @click="openCloseIndicator" class="indicator-select-div">
        <i
          v-show="showIndicatorBtn"
          :class="this.showIndicatorDiv ? 'icon iconfont icon-indicator-selected' : 'icon iconfont icon-indicator-unselected'"
        ></i>
      </div>
    </div>
    <!-- 指标线按钮 -->
    <div v-show="showIndicatorDiv && currentCycle !== 'everyhour'" class="indicatorConfigure">
      <div class="mobile-indicator">
        <div class="indicator-font">
          <font>{{message.indicator}}</font>
        </div>
        <div
          @click="showMA"
          :class="this.showIndicatorMA ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >{{message.MA}}</div>
        <div
          @click="showIndicatorChart('MACD')"
          :class="this.showIndicator ==='MACD' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.MACD}}</div>
        </div>
        <div
          @click="showIndicatorChart('KDJ')"
          :class="this.showIndicator ==='KDJ' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.KDJ}}</div>
        </div>
        <div
          @click="showIndicatorChart('RSI')"
          :class="this.showIndicator ==='RSI' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.RSI}}</div>
        </div>
        <div
          @click="showIndicatorChart('MTM')"
          :class="this.showIndicator ==='MTM' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.MTM}}</div>
        </div>
        <div
          @click="showIndicatorChart('WR')"
          :class="this.showIndicator ==='WR' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.WR}}</div>
        </div>
        <div
          @click="showIndicatorChart('VR')"
          :class="this.showIndicator ==='VR' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.VR}}</div>
        </div>
        <div
          @click="showIndicatorChart('OBV')"
          :class="this.showIndicator ==='OBV' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.OBV}}</div>
        </div>
        <div
          @click="showIndicatorChart('TRIX')"
          :class="this.showIndicator ==='TRIX' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.TRIX}}</div>
        </div>
        <div
          @click="showIndicatorChart('DMI')"
          :class="this.showIndicator ==='DMI' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.DMI}}</div>
        </div>
        <div
          @click="showIndicatorChart('PSY')"
          :class="this.showIndicator ==='PSY' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.PSY}}</div>
        </div>
        <div
          @click="showIndicatorChart('ROC')"
          :class="this.showIndicator ==='ROC' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.ROC}}</div>
        </div>
        <div
          @click="showIndicatorChart('BRAR')"
          :class="this.showIndicator ==='BRAR' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.BRAR}}</div>
        </div>
        <div
          @click="showIndicatorChart('DMA')"
          :class="this.showIndicator ==='DMA' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.DMA}}</div>
        </div>
        <div
          @click="showIndicatorChart('Boll')"
          :class="this.showIndicator ==='Boll' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.Boll}}</div>
        </div>
        <div
          @click="showIndicatorChart('SAR')"
          :class="this.showIndicator ==='SAR' ? 'mobile-indicator-div-active' : 'mobile-indicator-div'"
        >
          <div class="indicator-mobile-line">{{message.SAR}}</div>
        </div>
      </div>
      <div
        @click="openCloseEyes"
        :class="this.showIndicator === '' ? 'close-eye-icon' : 'open-eye-icon'"
      ></div>
    </div>
    <!-- mobile kline -->
    <div
      id="kline"
      ref="klineRef"
      :style="{height: `${klineConfig.size.height * 0.82}px`, width: `${klineConfig.size.width}px`}"
      @click="getToolTipIndex"
    ></div>
    <div style="background:#2b2f33; height:0.1rem"></div>
  </div>
</template>
<script>
import "../css/common.css";
import KLineController from "../js/KLine";
import { getLanguage } from "../js/utils";
export default {
  name: "mKline",
  data() {
    return {
      kline: null,
      platform: "mobile",
      currentCycle: "hour",
      coinType: null,
      isRefresh: true,
      refreshKline: true,
      message: null,
      isSelected: false,
      showMinCycle: false,
      showHourCycle: false,
      selectMin: "",
      selectHour: "",
      showIndicatorBtn: true,
      showIndicatorDiv: false,
      showIndicator: "",
      watchLoading: true,
      loadingTime: 0,
      showIndicatorMA: true //是否展示MA均线
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
    }
  },
  watch: {
    chartDataObj() {
      this.changeCycleLanguage(this.currentCycle);
      if (!this.chartDataObj) {
        return;
      }
      if (
        ((this.chartDataObj.candleData == undefined ||
          this.chartDataObj.candleData == []) &&
          this.chartDataObj.cycle != "everyhour") ||
        ((this.chartDataObj.timeDivisionData == undefined ||
          this.chartDataObj.timeDivisionData == []) &&
          this.chartDataObj.cycle == "everyhour")
      ) {
        if (this.watchLoading) {
          this.loadingTime = this.loadingTime + 1;
          if (this.loadingTime > 4) {
            this.kline.showMobileLoading(true);
          }
        }
        return;
      }
      if (this.isRefresh || this.refreshKline) {
        this.init(true);
        if (
          !this.chartDataObj.candleData &&
          this.currentCycle !== "everyhour"
        ) {
          return;
        }
        if (this.currentCycle !== "everyhour") {
          this.watchLoading = false;
          this.kline.setMobileOption(
            this.klineConfig.size,
            this.chartDataObj.candleData
          );
          this.isRefresh = false;
          this.refreshKline = false;
        } else {
          this.kline.setTimeDivisionsOption(this.klineConfig.size);
          this.isRefresh = false;
          this.refreshKline = false;
        }
      }
      if (this.chartDataObj.candleData) {
        this.watchLoading = false;
        let candleData = this.chartDataObj.candleData;
        if (
          this.currentCycle !== "everyhour" &&
          candleData.values !== null &&
          candleData.volumes !== null &&
          candleData.categoryData !== null
        ) {
          let toolTipIndex = this.kline.updateMobileOption(
            candleData,
            this.currentCycle
          );
          this.coinType = this.chartDataObj.coinType;
          this.$emit("listenTipIndex", toolTipIndex);
        }
      } else if (
        JSON.stringify(this.coinType) !==
        JSON.stringify(this.chartDataObj.coinType)
      ) {
        this.init(true);
      }
      if (this.currentCycle === "everyhour" && this.chartDataObj.divisionData) {
        let divisionData = this.chartDataObj.divisionData;
        this.watchLoading = false;
        if (
          divisionData.times !== null &&
          divisionData.averages !== null &&
          divisionData.prices !== null &&
          divisionData.volumes !== null
        ) {
          let toolTipIndex = this.kline.updateTimeDivisionOption(
            divisionData,
            this.chartDataObj.precision
          );
          this.$emit("listenTipIndex", toolTipIndex);
        }
      } else if (
        this.currentCycle === "everyhour" &&
        !this.chartDataObj.divisionData
      ) {
        this.init(true);
      }
    }
  },
  created() {
    this.message = getLanguage();
    this.selectMin = this.message.minute;
    this.selectHour = this.message.hourPC;
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
      this.kline.initMobileChart(this.$refs.klineRef, clear);
    },
    clickMinCycle() {
      this.showIndicatorDiv = false;
      this.showMinCycle = !this.showMinCycle;
      if (this.showMinCycle) {
        this.showHourCycle = false;
      }
    },
    clickHourCycle() {
      this.showIndicatorDiv = false;
      this.showHourCycle = !this.showHourCycle;
      if (this.showHourCycle) {
        this.showMinCycle = false;
      }
    },
    changeCycleLanguage(selectCycle) {
      this.message = getLanguage();
      if (selectCycle === "minute") {
        this.selectMin = this.message.oneMin;
        this.selectHour = this.message.hourPC;
      } else if (selectCycle === "5minute") {
        this.selectMin = this.message.fiveMin;
        this.selectHour = this.message.hourPC;
      } else if (selectCycle === "15minute") {
        this.selectMin = this.message.fifteenMin;
        this.selectHour = this.message.hourPC;
      } else if (selectCycle === "30minute") {
        this.selectMin = this.message.thirtyMin;
        this.selectHour = this.message.hourPC;
      } else if (selectCycle === "hour") {
        this.selectHour = this.message.oneHour;
        this.selectMin = this.message.minute;
        this.selectMin = this.message.minute;
      } else if (selectCycle === "4hour") {
        this.selectHour = this.message.fourHour;
        this.selectMin = this.message.minute;
      } else {
        this.selectMin = this.message.minute;
        this.selectHour = this.message.hourPC;
      }
    },
    chooseCycle(cycle) {
      this.showIndicatorDiv = false;
      if (cycle === "everyhour") {
        this.showIndicatorBtn = false;
      } else {
        this.showIndicatorBtn = true;
      }
      if (
        cycle === "day" ||
        cycle === "week" ||
        cycle === "month" ||
        cycle === "everyhour"
      ) {
        this.showHourCycle = false;
        this.showMinCycle = false;
      }
      let selectCycle = cycle;
      if (cycle instanceof Object) {
        selectCycle = cycle.target.value;
      }
      if (this.currentCycle === cycle) {
        return;
      }
      this.changeCycleLanguage(selectCycle);
      this.init(true);
      this.watchLoading = true;
      this.loadingTime = 0;
      this.currentCycle = cycle;
      this.isRefresh = true;
      this.$emit("listenToChildEvent", selectCycle);
    },
    getToolTipIndex() {
      let toolTipIndex;
      if (this.currentCycle !== "everyhour") {
        toolTipIndex = this.kline.getMobileToolTipIndex();
      } else {
        toolTipIndex = this.kline.getMobileToolTipIndex();
      }
      this.$emit("listenTipIndex", toolTipIndex);
    },
    changeDataZoom(type) {
      this.kline.changeMobileDataZoom(type);
    },
    dispose() {
      this.kline.disposeMobileChart();
    },
    openCloseIndicator() {
      this.showHourCycle = false;
      this.showMinCycle = false;
      this.showIndicatorDiv = !this.showIndicatorDiv;
    },
    // 点击显示、隐藏MA事件
    showMA() {
      this.showIndicatorMA = !this.showIndicatorMA;
      this.$emit("listenShowMA", this.showIndicatorMA);
      this.showIndicatorDiv = false;
    },
    showIndicatorChart(indicator) {
      let dataZoom = this.kline.getMobileKlineDataZoom();
      let indicatorData = {
        dataZoom: dataZoom,
        indicator: indicator
      };
      this.$emit("listenIndicatorChartOpenClose", indicatorData);
      if (this.showIndicator === indicator) {
        this.showIndicator = "";
      } else {
        this.showIndicator = indicator;
      }
      this.showIndicatorDiv = false;
    },
    openCloseEyes() {
      if (this.showIndicator === null) {
        this.showIndicatorDiv = !this.showIndicatorDiv;
      } else {
        this.showIndicatorChart(this.showIndicator);
      }
    }
  }
};
</script>