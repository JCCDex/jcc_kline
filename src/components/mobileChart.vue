<template>
    <div>
      <!-- <span @click = "changeChart" >分时</span> -->
      <!-- <TimeSharing ref="timeSharing" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></TimeSharing> -->
      <KLine ref="candle" v-on:listenToChildEvent = "changeCycle" :kline-config = "klineConfig" :chart-data-obj = "chartDataObj"></KLine>
      <Depth ref="depth" :chart-data-obj = "chartDataObj" :kline-config = "klineConfig"></Depth>
      <!-- <MACD ref="macd" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></MACD> -->
    </div>
</template>
<script>
import KLine from './mobileKline.vue'
import Depth from './marketDepth.vue'
import TimeSharing from './timeSharing.vue'
import MACD from './MACDChart.vue'
import { splitData, handleDivisionData, getDepthData } from '../js/processData'
import { formatDecimal } from '../js/utils';
export default {
  name: "mobileChart",
  components: {
    KLine,
    Depth,
    TimeSharing,
    MACD
  },
  data() {
    return {
      showChart: "candle",
      chartDataObj: {},
      divisionTime: null
    };
  },
  props: {
    klineDataObj: {
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
  created() {
    this.klineConfig.platform = 'mobile'
    if (this.klineConfig.defaultMA !== false) {
      this.klineConfig.defaultMA = true;
      this.klineConfig.MA = [
        {
          name: "MA5",
          color: "#ff4d71"
        },
        {
          name: "MA10",
          color: "#67ff7c"
        },
        {
          name: "MA20",
          color: "#16c5ff"
        },
        {
          name: "MA30",
          color: "#f6d026"
        },
        { 
          name: "MA60", 
          color: "#e03bfa"
        }
      ];
    }
  },
  watch: {
    klineDataObj () {
      let candleData
      let depthData
      let timeDivisionData
      let divisionData
      let precision = {
        price: this.klineDataObj.pricePrecision,
        amount: this.klineDataObj.amountPrecision
      }
      if (this.klineDataObj.cycle !== "everyhour" && this.klineDataObj.klineData) {
        candleData = splitData(this.klineDataObj.klineData, 'mobile')
      }
      if (this.klineDataObj.depthData) {
        depthData = getDepthData(this.klineDataObj.depthData);
      }
      if (this.klineDataObj.cycle === "everyhour" && this.klineDataObj.timeDivisionData) {
        timeDivisionData = this.klineDataObj.timeDivisionData
        divisionData = handleDivisionData(timeDivisionData)
        this.divisionTime = divisionData.divisionTime
      }
      this.chartDataObj = {
        platform: 'mobile',
        precision: precision,
        cycle: this.klineDataObj.cycle,
        coinType: this.klineDataObj.coinType,
        candleData: candleData,
        depthData: depthData,
        timeDivisionData: timeDivisionData,
        divisionData: divisionData
      }
    }
  },
  methods: {
    changeCycle(cycle) {
      this.$emit("listenToChildEvent", cycle)
    }
  }
};
</script>

