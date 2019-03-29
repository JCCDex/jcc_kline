<template>
  <div class="mobile-kline" style="background-color: #161b21;">
    <!-- Cycle按钮 -->
    <div calss="mobileCycle" style="height: 0.4rem; z-index: 9;">
      <div class="kline-cycle-div">
        <div @click="clickMinCycle()">
          <div
            :class="!this.showMinCycle ? 'mobile-kline-drop-down' : 'mobile-kline-drop-down kline-select-color'"
          >
            <font
              :class="selectMin !== '分'  ? selectMin !== 'm' ? 'kline-select-color kline-text-decoration' : 'kline-uncheck-color' : 'kline-uncheck-color'"
            >{{selectMin}}</font>
            <i
              :class="!this.showMinCycle ? 'icon iconfont icon-drop-down' : 'icon iconfont icon-drop-down kline-select-color'"
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
            :class="!this.showHourCycle ? 'mobile-kline-drop-down' : 'mobile-kline-drop-down kline-select-color'"
          >
            <font
              :class="selectHour !== '时'  ? selectHour !== 'H' ? 'kline-select-color kline-text-decoration' : 'kline-uncheck-color' : 'kline-uncheck-color'"
            >{{selectHour}}</font>
            <i
              :class="!this.showHourCycle ? 'icon iconfont icon-drop-down' : 'icon iconfont icon-drop-down kline-select-color'"
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
      <div style="float:right; margin-right:0.2rem; margin-top:0.05rem" class="icon-indicator-div">
        <i v-show = "true" @click = "openCloseMacd" :class="this.isSelected ? 'icon iconfont icon-indicator-selected' : 'icon iconfont icon-indicator-unselected'">
        <!-- <i v-show = "isSelected" @click = "openCloseMacd" class="icon iconfont icon-indicator-selected"> -->
          <!-- <span v-show="true" :class=" message.language === 'zh' ? 'icon-indicator-ch' : 'icon-indicator-en'"><font style="font-size:14px;line-height:22px;">{{message.MACD}}</font></span> -->
        </i>
      </div>
    </div>
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
      currentCycle: 'hour',
      isRefresh: true,
      message: null,
      isSelected: false,
      showMinCycle: false,
      showHourCycle: false,
      selectMin: "",
      selectHour: ""
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
    cycle: {
      type: String,
      default: 'hour'  
    }
  },
  watch: {
    cycle () {
      if (this.cycle !== this.currentCycle) {
        this.isRefresh = true
      }
      this.currentCycle = JSON.parse(JSON.stringify(this.cycle))
    },
    chartDataObj() {
      this.changeCycleLanguage(this.currentCycle);
      if (!this.chartDataObj) {return}
      if (this.isRefresh) {
        if (this.currentCycle !== "everyhour") {
          this.kline.setMobileOption(this.klineConfig.size);
          this.isRefresh = false;
        } else {
          this.kline.setTimeDivisionsOption(this.klineConfig.size);
          this.isRefresh = false;
        }
      }
      if (this.chartDataObj.candleData) {
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
          this.$emit("listenCandleChartEvent", this.kline.getMobileEchart());
          this.$emit("listenTipIndex", toolTipIndex);
        }
      }
      if (
        this.currentCycle === "everyhour" &&
        this.chartDataObj.divisionData
      ) {
        let divisionData = this.chartDataObj.divisionData;
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
    init() {
      this.kline.initMobileChart(this.$refs.klineRef);
    },
    clickMinCycle() {
      this.showMinCycle = !this.showMinCycle;
      if (this.showMinCycle) {
        this.showHourCycle = false;
      }
    },
    clickHourCycle() {
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
      let selectCycle = cycle;
      if (cycle instanceof Object) {
        selectCycle = cycle.target.value;
      }
      if (this.currentCycle === cycle) {
        return;
      }
      this.changeCycleLanguage(selectCycle);
      this.clearChart();
      this.kline.showMobileLoading();
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
    clearChart() {
      this.kline.clearMobileChart();
    },
    dispose() {
      this.kline.disposeMobileChart()
    },
    openCloseMacd() {
      this.isSelected = !this.isSelected;
      this.$emit("listenMacdChartOpenClose", true)
    }
  }
};
</script>