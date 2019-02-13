<template>
  <div>
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">
      <div v-show = "showExitFullScreen" class = "exit-full-screen">
        <div class="exit-full-screen-btn" @click = "fullScreenToggle" >Exit Full Screen(Esc)</div>
      </div>
      <div style="position: absolute;right:50px;top:20px;z-index:1;font-size: 13px;">
          <div @click = "changeChart('candle')" :class = "this.showChart === 'candle' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'">{{message.candle}}</div>
          <div @click = "changeChart('depth')" :class = "this.showChart === 'depth' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'" style="margin-left: 10px;margin-right: 20px;">{{message.depth}}</div>
          <!-- <span @click = "changeChart('timeSharing')" :class = "this.showChart === 'timeSharing' ? 'chart-div chart-btn-active' : 'chart-div chart-btn'">timeSharing</span> -->
      </div>
      <div style="position: absolute;right:30px;top:23px;z-index:1;" class="full-screen-div">
          <i v-show = "!fullscreen" class="icon iconfont icon-full-screen" @click="fullScreenToggle">
            <span v-show="!fullscreen" :class=" message.language === 'zh' ? 'icon-fullscreen-tooltip' : 'icon-fullscreen-entip'"><font style="font-size:14px;line-height:22px;">{{message.fullScreen}}</font></span>
          </i>
          <i v-show = "fullscreen" class="icon iconfont icon-exit-full-screen" @click="fullScreenToggle">
            <span v-show="fullscreen" :class=" message.language === 'zh' ? 'exit-fullscreen-tooltip' : 'exit-fullscreen-entip'"><font style="font-size:14px;line-height:22px;">{{message.exitFullScreen}}</font></span>
          </i>
      </div>
      <!-- <div class = "kline-levitation-div" v-show = "showChart === 'candle'" @mouseenter="enter()" @mouseleave="leave()">
        <div class="kline-levitation-icon" v-show = "isShow">
          <div class="kline-levitation-btn" @click = "changeDataZoom('leftShift')">左移</div>
          <div class="kline-levitation-btn" @click = "changeDataZoom('narrow')">缩小</div>
          <div class="kline-levitation-btn" @click = "changeDataZoom('refresh')">刷新</div>
          <div class="kline-levitation-btn" @click = "changeDataZoom('enlarge')">放大</div>
          <div class="kline-levitation-btn" @click = "changeDataZoom('rightShift')">右移</div>
        </div>
      </div> -->
      <KLine ref="candle" v-show = "showChart === 'candle'" v-on:listenToChildEvent = "changeCycle" :kline-config = "klineConfig" :kline-data-obj = "klineDataObj" :cycle = "cycle"></KLine>
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
      fullscreen: false,
      isShow: false,
      showExitFullScreen: false
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
        }
      }
    },
    cycle: {
      type: String,
      default: 'hour'
    }
  },
  created() {
    this.klineConfig.platform = 'pc'
    this.message = getLanguage();

  },
  watch: {
    klineDataObj() {
        this.message = getLanguage();
    },
    fullscreen() {
      if (this.fullscreen && (getLanguage().language === "en")) {
          this.showExitFullScreen = true;
        } else {
          this.showExitFullScreen = false;
        }
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
    changeDataZoom(type){
      if (this.showChart === 'candle') {
        this.$refs.candle.changeDataZoom(type)
      }
    },
    fullScreenToggle() {
      this.$refs['fullscreen'].toggle()
    },
    enter() {
      this.isShow = true;
    },
    leave() {
      this.isShow = false;
    }
  }
}
</script>