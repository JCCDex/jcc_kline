<template>
  <div style="background-color: #161b21;">
        <!-- timeDivision tootip 数据显示 -->
        <div :class="this.message.language === 'en' ? 'time-sharing-data' : 'time-sharing-zh-data'" v-if="timeDivisionTipData">
          <font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.time}}</font>
          <font class="mobile-tooltip-name">{{message.volumeMobile}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.volume}}</font> &nbsp;
          <font class="mobile-tooltip-name">{{message.price}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.price}}</font> &nbsp;
          <font class="mobile-tooltip-name">{{message.averagePrice}}</font><font :class="timeDivisionTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeDivisionTipData.averagePrice}}</font> &nbsp;<br> 
        </div>
    <div id = "kline" ref = "klineRef" style="width:100%;height:572px;" @mousemove="getDepthTipData"></div>
  </div>
</template>
<script>
import '../css/common.css'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
import { splitData, handleDivisionData } from '../js/processData'
import ChartController from '../js/Chart'
import { getLanguage } from '../js/utils'
export default {
  name: "timeSharing",
  data() {
    return {
      kline: null,
      status: 0,
      depthTipData: null,
      divisionTime: null,
      timeDivisionData: null,
      timeDivisionTipData: null,
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
          platform: 'pc',
          chartType: 'timeSharing'
        }
      }
    }
  },
  watch: {
    klineDataObj() {
      // if (this.klineDataObj) {
        this.message = getLanguage();
          // if(this.status === 0) {
            if (this.isRefresh) {
              this.timeSharing.setTimeSharingOption()
              this.timeSharing.resizeTimeSharingChart(this.$refs.klineRef, false)
              this.isRefresh = false
            } else {
              let timeDivisionData = this.klineDataObj.timeDivisionData;
              let divisionData = handleDivisionData(timeDivisionData)
              this.divisionTime = divisionData.divisionTime;
              this.depthTipData = this.timeSharing.updateTimeSharingOption(timeDivisionData, divisionData);
              console.log(this.depthTipData)
            }
          //   this.status = 1;
          // }
          // let timeDivisionData = this.klineDataObj.timeDivisionData;
          // let divisionData = handleDivisionData(timeDivisionData)
          // this.divisionTime = divisionData.divisionTime;
          // if (timeDivisionData !== null && divisionData.times !== null && divisionData.averages !== null && divisionData.prices !== null && divisionData.volumes !== null) {
          //   this.timeDivisionTipData = this.kline.updateTimeDivisionOption(timeDivisionData, divisionData);
          //   this.kline.hideMobileLoading()
          // }
      // }
    }
  },
  created() {
    this.message = getLanguage();
    this.klineConfig.chartType = 'timeSharing'
    this.timeSharing = new ChartController(this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.timeDivisionTipData = null;
    this.dispose()
  },
  methods: {
    init() {
      this.timeSharing.initTimeSharingChart(this.$refs.klineRef);
    },
    clearChart() {
      this.timeSharing.clearTimeSharingEcharts();
    },
    getDepthTipData() {
      this.depthTipData = this.timeSharing.getDepthTipData()
    },
    dispose() {
      this.timeSharing.disposeTimeSharingEChart()
    }
  }
}
</script>
