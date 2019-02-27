<template>
  <div>
        <!-- timeDivision tootip 数据显示 -->
          <div :class="this.platform === 'pc' ? this.message.language === 'en' ? 'time-sharing-en-pc' : 'time-sharing-zh-pc' : this.message.language === 'en' ? 'time-sharing-en-mobile' : 'time-sharing-zh-mobile'" v-if="timeSharingTipData">
            <font :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeSharingTipData.time}}</font>
            <font class="mobile-tooltip-name">{{message.volumeMobile}}</font><font :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeSharingTipData.volume}}</font> &nbsp;
            <font class="mobile-tooltip-name">{{message.price}}</font><font :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeSharingTipData.price}}</font> &nbsp;
            <font class="mobile-tooltip-name">{{message.averagePrice}}</font><font :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeSharingTipData.averagePrice}}</font> &nbsp;<br> 
          </div>
    <div id = "timeSharing" ref = "timeSharing" :style="{height: `${timeSharingSize.height}`, width: `${timeSharingSize.width}`}" @mousemove="getTimeSharingTipData"></div>
  </div>
</template>
<script>
import '../css/common.css'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
import { splitData, handleDivisionData } from '../js/processData'
import ChartController from '../js/Charts'
import { getLanguage } from '../js/utils'
export default {
  name: "timeSharing",
  data() {
    return {
      kline: null,
      platform: '',
      chartType: 'timeSharing',
      timeSharingSize: {
        height: '',
        width: ''
      },
      coinType: null,
      timeSharingTipData: null,
      divisionTime: null,
      timeDivisionData: null,
      message: null,
      isRefresh: true
    };
  },
  props: {
    klineDataObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    klineConfig: {
      type: Object,
      default: () => {
        return {
          chartType: 'timeSharing'
        }
      }
    }
  },
  watch: {
    klineDataObj() {
      if (this.klineDataObj.timeDivisionData) {
        let precision = {
          price: this.klineDataObj.pricePrecision,
          amount: this.klineDataObj.amountPrecision
        }
        let timeDivisionData = this.klineDataObj.timeDivisionData;
        let divisionData = handleDivisionData(timeDivisionData)
        this.divisionTime = divisionData.divisionTime;
        this.message = getLanguage();
        timeDivisionData.precision = precision;
        if (JSON.stringify(this.coinType) !== JSON.stringify(this.klineDataObj.coinType)) {
          this.clearChart()
          this.timeSharingTipData = this.timeSharing.setTimeSharingOption(timeDivisionData, divisionData)
          this.timeSharing.resizeTimeSharingChart(this.$refs.timeSharing, false, this.klineConfig.size)
          this.coinType = this.klineDataObj.coinType
          this.isRefresh = false
        } else {
          this.timeSharing.updateTimeSharingOption(timeDivisionData, divisionData);
        }
      }
    },
    klineConfig() {
      if (this.klineConfig.platform === 'pc') {
        let size = {
          width: this.klineConfig.size.width + 'px',
          height: this.klineConfig.size.height + 'px'
        }
        if (JSON.stringify(size) !== JSON.stringify(this.timeSharingSize) && this.klineConfig.defaultSize === false) {
          this.timeSharingSize = {
            width: this.klineConfig.size.width + 'px',
            height: this.klineConfig.size.height + 'px'
          }
          this.resizeSize();
        }
      }
    }
  },
  created() {
    this.message = getLanguage();
    if (this.klineConfig.platform === 'pc') {
      if (!this.klineConfig.defaultSize) {
        this.timeSharingSize.height = this.klineConfig.size.height + 'px'
        this.timeSharingSize.width = this.klineConfig.size.width + 'px'
      } else {
        this.timeSharingSize = {
          height: '100%',
          width: '572px'
        }
      }
    } else {
      this.timeSharingSize.height = this.klineConfig.timeSharingSize.height + 'px'
      this.timeSharingSize.width = this.klineConfig.timeSharingSize.width + 'px'
    }
    this.platform = this.klineConfig.platform
    this.klineConfig.chartType = 'timeSharing'
    this.timeSharing = new ChartController(this.klineConfig);
  },
  mounted() {
    this.init();
    if (this.klineConfig.defaultSize === true) {
      window.addEventListener("resize", this.resizeSize);
    }
  },
  beforeDestroy() {
    if (this.klineConfig.defaultSize === true) {
      window.removeEventListener("resize", this.resizeSize);
    }
    this.timeSharingTipData = null;
    this.dispose()
  },
  methods: {
    init() {
      this.timeSharing.initTimeSharingChart(this.$refs.timeSharing);
      this.resizeSize(this.klineConfig.size)
    },
    resizeSize() {
      if (this.klineConfig.platform === 'pc') {
        let isFullScreen = this.$parent.getState();
        this.timeSharing.resizeTimeSharingChart(this.$refs.timeSharing, isFullScreen, this.klineConfig.size)
      }
    },
    clearChart() {
      this.timeSharing.clearTimeSharingEcharts();
    },
    getTimeSharingTipData() {
      this.timeSharingTipData = this.timeSharing.getTimeSharingTipData()
    },
    dispose() {
      this.timeSharing.disposeTimeSharingEChart()
    }
  }
}
</script>
