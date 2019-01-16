<template>
  <div>
      <div style="position: absolute;right:50px;top:20px;z-index:1;font-size: 13px;">
          <span @click = "changeChart('candle')" :class = "this.showChart === 'candle' ? 'chart-btn-active' : 'chart-btn'">candle</span>
          <span @click = "changeChart('depth')" :class = "this.showChart === 'depth' ? 'chart-btn-active' : 'chart-btn'">depth</span>
          <span @click = "changeChart('timeSharing')" :class = "this.showChart === 'timeSharing' ? 'chart-btn-active' : 'chart-btn'">timeSharing</span>
      </div>
      <KLine ref="kline" v-if = "showChart === 'candle'" v-on:listenToChildEvent = "changeCycle" :kline-data-obj = "klineDataObj" :cycle = "cycle" :platform = "platform"></KLine>
      <Depth ref="depth" v-if = "showChart === 'depth'" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></Depth>
      <time-sharing ref="timeSharing" v-if="showChart === 'timeSharing'" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></time-sharing>
  </div>
</template>
<script>
import KLine from './kline.vue'
import Depth from './marketDepth.vue'
import TimeSharing from './timeSharing.vue'
export default {
  name: "klineChart",
  components: {
    KLine,
    Depth,
    TimeSharing
  },
  data() {
    return {
      showChart: 'candle'
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
          chartType: 'depth'
        }
      }
    },
    platform: {
      type: String,
      default: 'pc'
    },
    cycle: {
      type: String,
      default: 'hour'
    }
  },
  methods: {
    changeCycle(cycle) {
      console.log(this.$refs.kline.toolTipData)
      if (this.cycle === cycle) {
        return;
      }
      this.$emit("listenToChildEvent", cycle)
    },
    changeChart(type) {
      if (this.showChart === type) {
        return;
      }
      this.showChart = type
    }
  }
}
</script>