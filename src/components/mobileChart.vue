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
  },
  methods: {
    changeCycle(cycle) {
      this.$emit("listenToChildEvent", cycle)
    }
  }
};
</script>

