<template>
  <div>
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">
      <div style="position: absolute;right:50px;top:20px;z-index:1;font-size: 13px;">
          <span @click = "changeChart('candle')" :class = "this.showChart === 'candle' ? 'chart-btn-active' : 'chart-btn'">{{message.candle}}</span>
          <span @click = "changeChart('depth')" :class = "this.showChart === 'depth' ? 'chart-btn-active' : 'chart-btn'">{{message.depth}}</span>
          <!-- <span @click = "changeChart('timeSharing')" :class = "this.showChart === 'timeSharing' ? 'chart-btn-active' : 'chart-btn'">timeSharing</span> -->
      </div>
      <div style="position: absolute;right:20px;top:20px;z-index:1;">
        <img  v-if="!fullscreen" @click="fullScreenToggle" :src="fullscreenImg" style="width: 20px;height: 20px;"/>
        <img  v-if="fullscreen" @click="fullScreenToggle" :src="exitFullScreen" style="width: 20px;height: 20px;"/>
      </div>
      <KLine ref="candle" v-if = "showChart === 'candle'" v-on:listenToChildEvent = "changeCycle" :kline-data-obj = "klineDataObj" :cycle = "cycle" :platform = "platform"></KLine>
      <Depth ref="depth" v-if = "showChart === 'depth'" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></Depth>
      <!-- <time-sharing ref="timeSharing" v-if="showChart === 'timeSharing'" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></time-sharing> -->
    </fullscreen>
  </div>
</template>
<script>
import fullscreenImg from '../icon/fullscreen.png'
import exitFullScreen from '../icon/exitFullscreen.png'
import Fullscreen from "vue-fullscreen/src/component.vue"
import KLine from './kline.vue'
import Depth from './marketDepth.vue'
import { getLanguage } from '../js/utils'
// import TimeSharing from './timeSharing.vue'
export default {
  name: "klineChart",
  components: {
    KLine,
    Depth,
    Fullscreen
    // TimeSharing
  },
  data() {
    return {
      showChart: 'candle',
      fullscreen: false,
      fullscreenImg: fullscreenImg,
      exitFullScreen: exitFullScreen
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
  created() {
    this.message = getLanguage();
  },
  watch: {
    klineDataObj() {
        this.message = getLanguage();
    }
  },
  methods: {
    changeCycle(cycle) {
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
    },
    fullScreenToggle() {
      this.$refs['fullscreen'].toggle()
    }
  }
}
</script>