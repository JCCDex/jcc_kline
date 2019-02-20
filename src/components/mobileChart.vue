<template>
    <div>
      <!-- <span @click = "changeChart" >分时</span> -->
      <!-- <TimeSharing ref="timeSharing" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></TimeSharing> -->
      <KLine ref="candle" v-on:listenToChildEvent = "changeCycle" :kline-config = "klineConfig" :kline-data-obj = "klineDataObj"></KLine>
      <Depth ref="depth" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></Depth>
    </div>
</template>
<script>
import KLine from './mobileKline.vue'
import Depth from './marketDepth.vue'
import TimeSharing from './timeSharing.vue'
export default {
  name: "mobileChart",
  components: {
    KLine,
    Depth,
    TimeSharing
  },
  data() {
    return {
      showChart: "candle"
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
  methods: {
    changeCycle(cycle) {
      this.$emit("listenToChildEvent", cycle)
    }
  }
};
</script>

