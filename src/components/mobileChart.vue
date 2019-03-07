<template>
    <div>
      <!-- <span @click = "changeChart" >分时</span> -->
      <div :class="this.message.language === 'zh' ? 'mobile-tooltip-zh' : 'mobile-tooltip-en'" v-if="toolTipData">
        <div style="font-size:0.16rem; margin-top: 0.1rem;">
          <font v-for="MAitem in this.klineConfig.MA" :key="MAitem.id" :style = "{ color: MAitem.color, marginRight: '0.14rem'}">{{MAitem.name}}<font>:&nbsp;{{ getMATipData(MAitem.name) }}</font></font><br>
        </div>
        <div style="margin-left: -0.1rem; margin-top: 0.05rem;">
          <font class="mobile-tooltip-name">{{message.openingMobile}} </font><font class="mobile-tooltip-data">{{this.toolTipData.opening}}</font>
          <font class="mobile-tooltip-name">{{message.closingMobile}} </font><font class="mobile-tooltip-data">{{this.toolTipData.closing}}</font>
          <font class="mobile-tooltip-name">{{message.maxMobile}} </font><font class="mobile-tooltip-data">{{this.toolTipData.max}}</font>
          <font class="mobile-tooltip-name">{{message.minMobile}} </font><font class="mobile-tooltip-data">{{this.toolTipData.min}}</font>
          <font class="mobile-tooltip-name">{{message.volumeMobile}} </font><font class="mobile-tooltip-data">{{this.toolTipData.volume}}</font>
        </div>
      </div>
      <!-- timeDivision tootip 数据显示 -->
      <div :class="this.message.language === 'en' ? 'time-sharing-en-data' : 'time-sharing-zh-data'" v-if="timeSharingTipData">
        <font :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeSharingTipData.time}}</font>
        <font class="mobile-tooltip-name">{{message.volumeMobile}}</font><font :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeSharingTipData.volume}}</font> &nbsp;
        <font class="mobile-tooltip-name">{{message.price}}</font><font :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeSharingTipData.price}}</font> &nbsp;
        <font class="mobile-tooltip-name">{{message.averagePrice}}</font><font :class="timeSharingTipData.color === 1 ? 'tooltip-data-green' : 'tooltip-data-red'">{{this.timeSharingTipData.averagePrice}}</font> &nbsp;<br> 
      </div>
      <!-- <TimeSharing ref="timeSharing" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></TimeSharing> -->
      <KLine ref="candle" v-show = "showChart === 'candle'" v-on:listenToChildEvent = "changeCycle" v-on:listenTipIndex = "getTipDataIndex" v-on:listenCandleChartEvent = 'getCandleChart' :kline-config = "klineConfig" :chart-data-obj = "chartDataObj"></KLine>
      <Volume ref = 'volume' v-show = "showChart === 'candle'" v-on:listenVolumeChartEvent = 'getVolumeChart' v-on:listenToTipIndex = "getTipDataIndex" :kline-config = "klineConfig" :chart-data-obj = "chartDataObj"></Volume>
      <!-- <MACD ref="macd" v-show = "showChart === 'candle'" v-on:listenMacdChartEvent = 'getMacdChart' :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></MACD> -->
      <MACD ref="macd" v-show = "showChart === 'candle'" v-on:listenMacdChartEvent = 'getMacdChart' :kline-config = "klineConfig" :chart-data-obj = "chartDataObj"></MACD>
      <Depth ref="depth" :chart-data-obj = "chartDataObj" :kline-config = "klineConfig"></Depth>
    </div>
</template>
<script>
import KLine from './mobileKline.vue'
import Depth from './marketDepth.vue'
import Volume from './volumeChart.vue'
import TimeSharing from './timeSharing.vue'
import MACD from './MACDChart.vue'
import { splitData, handleDivisionData, getDepthData, calculateMA } from '../js/processData'
import { formatDecimal, getLanguage, formatTime } from '../js/utils';
import { linkageVolume, linkageMacd } from '../js/linkageCharts';
export default {
  name: "mobileChart",
  components: {
    KLine,
    Depth,
    Volume,
    TimeSharing,
    MACD
  },
  data() {
    return {
      showChart: "candle",
      message: null,
      chartDataObj: {},
      toolTipData: null,
      timeSharingTipData: null,
      divisionTime: null,
      candle: null,
      volume: null,
      macd: null
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
    this.message = getLanguage()
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
      this.message = getLanguage()
      let candleData
      let depthData
      let divisionData
      let timeDivisionData
      let MAData = []
      let precision = {
        price: this.klineDataObj.pricePrecision,
        amount: this.klineDataObj.amountPrecision
      }
      if (this.klineDataObj.cycle !== "everyhour" && this.klineDataObj.klineData) {
        candleData = splitData(this.klineDataObj.klineData)
        for (var i = 0; i < this.klineConfig.MA.length; i++) {
          MAData[i] = {}
          MAData[i].name = this.klineConfig.MA[i].name
          MAData[i].data = calculateMA(this.klineConfig.MA[i].name.substring(2) * 1, candleData)
        }
        candleData.MAData = MAData
        candleData.precision = precision
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
      if (cycle === "everyhour") {
        this.toolTipData = null
      } else {
        this.timeSharingTipData = null
      }
      this.$emit("listenToChildEvent", cycle)
    },
    getCandleChart(candle) {
      this.candle = candle
      if (this.volume) {
        linkageVolume(this.candle, this.volume)
      }
    },
    getVolumeChart(volume) {
      this.volume = volume
      if (this.candle) {
        linkageVolume(this.candle, this.volume)
      }
    },
    getMacdChart(macd) {
      this.macd = macd
      if(this.candle) {
        linkageMacd(this.candle, this.macd)
      }
    },
    getMATipData(name) {
      for( let tipData of this.toolTipData.MAData) {
        if (tipData.name === name) {
          return tipData.data
        }
      }
    },
    getTipDataIndex(index) {
      if (this.chartDataObj.candleData && this.chartDataObj.cycle !== "everyhour") {
        let data = JSON.parse(JSON.stringify(this.chartDataObj.candleData))
        let precision = JSON.parse(JSON.stringify(this.chartDataObj.precision))
        let pricePrecision = !isNaN(precision.price) ? precision.price : this.pricePrecision;
        let amountsPrecision = !isNaN(precision.amount) ? precision.amount : this.amountsPrecision;
        this.toolTipData = {
          time: data.categoryData[index],
          volume: formatDecimal(data.values[index][5], amountsPrecision, true),
          opening: formatDecimal(data.values[index][0], pricePrecision, true),
          closing: formatDecimal(data.values[index][1], pricePrecision, true),
          max: formatDecimal(data.values[index][3], pricePrecision, true),
          min: formatDecimal(data.values[index][2], pricePrecision, true),
          MAData: [],
          color: data.volumes[index][2]
        }
        for (var i = 0; i < data.MAData.length; i++) {
          this.toolTipData.MAData[i] = {
            name: data.MAData[i].name,
            data: formatDecimal(data.MAData[i].data[index], pricePrecision, true),
          };
        }
      } else if (this.chartDataObj.timeDivisionData && this.chartDataObj.cycle === "everyhour") {
        let timeSharingData = JSON.parse(JSON.stringify(this.chartDataObj.timeDivisionData))
        let data = JSON.parse(JSON.stringify(this.chartDataObj.divisionData))
        let precision = JSON.parse(JSON.stringify(this.chartDataObj.precision))
        let pricePrecision = !isNaN(precision.price) ? precision.price : this.pricePrecision;
        let amountsPrecision = !isNaN(precision.amount) ? precision.amount : this.amountsPrecision;
        this.timeSharingTipData = {
          time: formatTime(timeSharingData[index][3]),
          volume: formatDecimal(timeSharingData[index][1], amountsPrecision, true),
          price: formatDecimal(timeSharingData[index][2], pricePrecision, true),
          averagePrice: formatDecimal(data.averages[index], pricePrecision, true),
          color: data.volumes[index][2]
        }
      }
    }
  }
};
</script>

