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
      if (this.klineDataObj) {
        this.message = getLanguage();
        let klineData = splitData(this.klineDataObj.klineData, this.platform)
        let depthData = getDepthData(this.klineDataObj.depthData, this.klineDataObj.coinType);
        let data = Object.assign({}, klineData, depthData);
        this.klineData = data
        if (data.values !== null && data.volumes !== null && data.categoryData !== null) {
          if(this.cycle !== this.klineDataObj.cycle || JSON.stringify(this.coinType) !== JSON.stringify(this.klineDataObj.coinType)) {
            this.redrawDepth = true
            this.clearChart();
            this.kline.showLoading();
            if (this.showChart === 'candle') {
              this.toolTipData = this.kline.setOption(data, this.cycle);
              this.cycle = this.klineDataObj.cycle;
              this.coinType = this.klineDataObj.coinType
            } else if (this.showChart === 'depth') {
              if (this.redrawDepth) {
                this.kline.setDepthOption(data)
                this.cycle = this.klineDataObj.cycle;
                this.coinType = this.klineDataObj.coinType
                this.redrawDepth = false
              }else {
                this.kline.updateDepthOption(data)
              }
            }
          }else {
            if (this.showChart === 'candle') {
              this.kline.updateOption(data, this.cycle);
            } else {
              this.kline.updateDepthOption(data)
            }
          }
        }
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
    fullScreenToggle() {
      this.$refs['fullscreen'].toggle()
    }
  }
}
</script>