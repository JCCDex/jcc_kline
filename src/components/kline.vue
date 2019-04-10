<template>
  <div style="position:relative">
    <!-- Cycle按钮 -->
    <div class="kline-cycle">
      <div class="kline-cycle-div">
        <div @click="clickMinCycle()">
          <div
            :class="!this.showMinCycle ? 'kline-cycle-drop-down' : 'kline-cycle-drop-down kline-select-color'"
          >
            <font
              :class="selectMin !== '分'  ? selectMin !== 'm' ? 'kline-select-color kline-text-decoration' : 'kline-uncheck-color' : 'kline-uncheck-color'"
            >{{selectMin}}</font>
            <i :class="!this.showMinCycle ? 'drop-down-icon' : 'drop-down-select'"></i>
          </div>
          <div v-show="showMinCycle" class="kline-cycle-float">
            <div
              @click="chooseCycle('minute')"
              :class="this.currentCycle === 'minute' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
            >{{message.oneMin}}</div>
            <div
              @click="chooseCycle('5minute')"
              :class="this.currentCycle === '5minute' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
            >{{message.fiveMin}}</div>
            <div
              @click="chooseCycle('15minute')"
              :class="this.currentCycle === '15minute' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
            >{{message.fifteenMin}}</div>
            <div
              @click="chooseCycle('30minute')"
              :class="this.currentCycle === '30minute' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
            >{{message.thirtyMin}}</div>
          </div>
        </div>
        <div @click="clickHourCycle()">
          <div
            :class="!this.showHourCycle ? 'kline-cycle-drop-down kline-margin-left10' : 'kline-cycle-drop-down kline-margin-left10 kline-select-color'"
          >
            <font
              :class="selectHour !== '时'  ? selectHour !== 'H' ? 'kline-select-color kline-text-decoration' : 'kline-uncheck-color' : 'kline-uncheck-color'"
            >{{selectHour}}</font>
            <i :class="!this.showHourCycle ? 'drop-down-icon' : 'drop-down-select'"></i>
          </div>
          <div v-show="showHourCycle" class="kline-cycle-float kline-hour-cycle">
            <div
              @click="chooseCycle('hour')"
              :class="this.currentCycle === 'hour' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
            >{{message.oneHour}}</div>
            <div
              @click="chooseCycle('4hour')"
              :class="this.currentCycle === '4hour' ? 'kline-cycle-detail kline-select-color' : 'kline-cycle-detail kline-uncheck-color'"
            >{{message.fourHour}}</div>
          </div>
        </div>
      </div>
      <div
        @click="chooseCycle('day')"
        :class="this.currentCycle === 'day' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'"
      >{{message.dayPC}}</div>
      <div
        @click="chooseCycle('week')"
        :class="this.currentCycle === 'week' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'"
      >{{message.weekPC}}</div>
      <div
        @click="chooseCycle('month')"
        :class="this.currentCycle === 'month' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'"
      >{{message.monthPC}}</div>
      <!-- <div
        v-for="(item, index) in intervals"
        :key="item.id"
        :class="cycle === item.name ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'"
      >
        <div v-if="item.values">
          <select class="cycle-select" v-model="item.name" @change="chooseCycle($event)">
            <option v-for="(value, index) in item.values" v-bind:value="value.value">{{value.label}}</option>
          </select>
        </div>
        <div v-else @click="chooseCycle(item.name)">{{item.name}}</div>
      </div>-->
    </div>
    <!-- kline -->
    <div
      id="kline"
      ref="klineRef"
      :style="{height: `${klineSize.height}`, width: `${klineSize.width}`}"
      @mousemove="getToolTipIndex"
    ></div>
  </div>
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
      currentCycle: "hour",
      isRefresh: true,
      platform: "pc",
      klineSize: {
        width: 0,
        height: 0
      },
      message: null,
      klineData: null,
      coinType: "",
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
    resizeSize: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    resizeSize() {
      this.resize();
    },
    chartDataObj() {
      this.message = getLanguage();
      this.changeCycleLanguage(this.currentCycle);
      if (this.chartDataObj.candleData) {
        let data = this.chartDataObj.candleData;
        data.precision = this.chartDataObj.precision;
        if (data.values && data.volumes && data.categoryData) {
          if (
            this.isRefresh ||
            JSON.stringify(this.coinType) !==
              JSON.stringify(this.chartDataObj.coinType)
          ) {
            this.init(true)
            let toolTipIndex = this.kline.setOption(data, this.currentCycle);
            this.isRefresh = false;
            this.$emit("listenToTipIndex", toolTipIndex);
            this.coinType = this.chartDataObj.coinType;
          } else {
            this.kline.updateOption(data, this.currentCycle);
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
      this.kline.initChart(this.$refs.klineRef, clear);
      this.resize();
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
    chooseCycle(cycle) {
      let selectCycle = cycle;
      if (cycle instanceof Object) {
        selectCycle = cycle.target.value;
      }
      if (this.currentCycle === cycle) {
        return;
      }
      this.changeCycleLanguage(selectCycle);
      this.init(true)
      this.currentCycle = selectCycle;
      this.isRefresh = true;
      this.$emit("listenToChildEvent", selectCycle);
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
