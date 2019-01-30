<template>
            
    <div>
        <!-- <span @click = "changeChart" >分时</span> -->
        <!-- <TimeSharing ref="timeSharing" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></TimeSharing> -->
        <KLine ref="candle" v-on:listenToChildEvent = "changeCycle" :kline-config = "klineConfig" :kline-data-obj = "klineDataObj" :cycle = "cycle"></KLine>
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
      showChart: "candle",
      fullscreen: false
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
    },
    cycle: {
      type: String,
      default: "hour"
    }
  },
  created() {
    this.klineConfig.platform = 'mobile'
  },
  methods: {
    changeCycle(cycle) {
      if (this.cycle === cycle) {
        return;
      }
      this.$emit("listenToChildEvent", cycle)
    }
    // changeChart() {
    //   this.$emit("listenToChildEvent", "everyhour");
    // }
  }
};
</script>

