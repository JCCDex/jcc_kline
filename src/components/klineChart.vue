<template>
  <div>
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">
      <div style="position: absolute;right:50px;top:20px;z-index:1;font-size: 13px;">
          <div @click = "changeChart('candle')" :class = "this.showChart === 'candle' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'">{{message.candle}}</div>
          <div @click = "changeChart('depth')" :class = "this.showChart === 'depth' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'" style="margin-left: 10px;margin-right: 20px;">{{message.depth}}</div>
          <!-- <span @click = "changeChart('timeSharing')" :class = "this.showChart === 'timeSharing' ? 'chart-btn-active' : 'chart-btn'">timeSharing</span> -->
      </div>
      <div style="position: absolute;right:30px;top:23px;z-index:1;" class="full-screen-div">
        <i :class="fullscreen ? 'icon iconfont icon-exit-full-screen' : 'icon iconfont icon-full-screen'" @click="fullScreenToggle">
          <!-- <span v-show="!fullscreen" class="icon-fullscreen-tooltip">{{message.fullScreen}}</span> -->
          <!-- <span v-show="fullscreen" class="exit-fullscreen-tooltip">{{message.exitFullScreen}}</span> -->
        </i>
      </div>
      <KLine ref="candle" v-show = "showChart === 'candle'" v-on:listenToChildEvent = "changeCycle" :kline-data-obj = "klineDataObj" :cycle = "cycle"></KLine>
      <Depth ref="depth" v-show = "showChart === 'depth'" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></Depth>
      <!-- <time-sharing ref="timeSharing" v-if="showChart === 'timeSharing'" :kline-data-obj = "klineDataObj" :kline-config = "klineConfig"></time-sharing> -->
    </fullscreen>
  </div>
</template>
<script>
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
      fullscreen: false
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