<template>
    <div style="position:relative">
      <!-- Cycle按钮 -->
      <div style="position: absolute;left:10px;top:20px;z-index:1;">
        <div @click = "chooseCycle('hour')" :class="this.cycle === 'hour' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.hourPC}}</div>
        <div @click = "chooseCycle('day')" :class="this.cycle === 'day' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.dayPC}}</div>
        <div @click = "chooseCycle('week')" :class="this.cycle === 'week' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.weekPC}}</div>
        <div @click = "chooseCycle('month')" :class="this.cycle === 'month' ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">{{message.monthPC}}</div>
        <!-- <div v-for= "(item, index) in intervals" :key = "item.id" :class="cycle === item.name ? 'kline-cycle-btn kline-btn-active' : 'kline-cycle-btn'">
            <div v-if = "item.values">
              <select class = "cycle-select" v-model= "item.name"  @change= "chooseCycle($event)">
                <option v-for= "(value, index) in item.values" v-bind:value = "value.value">{{value.label}}</option>
              </select>
            </div>
            <div v-else @click = "chooseCycle(item.name)">
              {{item.name}}
            </div>
        </div> -->
      </div>
      <!-- kline -->
      <div id="kline" ref="klineRef" :style="{height: `${klineSize.height}`, width: `${klineSize.width}`}" @mousemove="getToolTipIndex"></div>
    </div>
</template>
<script>
import '../icon/iconfont.css'
import '../css/common.css'
import { getDepthData } from '../js/processData'
import KLineController from '../js/KLine'
import { getLanguage } from '../js/utils'
export default {
  name: "jKline",
  data() {
    return {
      kline: null,
      cycle: 'hour',
      platform: 'pc',
      klineSize: {
        width: 0,
        height: 0
      },
      message: null,
      klineData: null,
      coinType: '',
      intervals: null,
      intervalValue: ''
    };
  },
  props: {
    chartDataObj: {
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
    resizeSize: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  watch: {
    resizeSize() {
      this.resize()
    },
    chartDataObj() {
      this.message = getLanguage();
      if (this.chartDataObj.candleData) {
        let data = this.chartDataObj.candleData
        data.precision = this.chartDataObj.precision
        if (data.values && data.volumes && data.categoryData) {
          if (this.cycle !== this.chartDataObj.cycle || JSON.stringify(this.coinType) !== JSON.stringify(this.chartDataObj.coinType)) {
            this.clearChart();
            this.kline.showLoading();
            let toolTipIndex = this.kline.setOption(data, this.chartDataObj.cycle);
            this.$emit("listenToTipIndex", toolTipIndex)
            this.$emit("listenCandleChartEvent", this.kline.getEchart())
            this.cycle = this.chartDataObj.cycle;
            this.coinType = this.chartDataObj.coinType
          } else {
              this.kline.updateOption(data, this.chartDataObj.cycle);
          }
        }
      }
    },
    klineConfig() {
      let size = {
        width: this.klineConfig.size.width + 'px',
        height: this.klineConfig.size.height + 'px'
      }
      if (JSON.stringify(size) !== JSON.stringify(this.klineSize) && this.klineConfig.defaultSize === false) {
        this.klineSize = {
          width: this.klineConfig.size.width + 'px',
          height: '100%'
        }
        this.resize();
      }
      
    }
  },
  created() {
    if (this.klineConfig.defaultSize) {
      this.klineSize = {
        width: '100%',
        height: '572px'
      }
    } else {
      this.klineSize = {
        width: this.klineConfig.size.width + 'px',
        height: this.klineConfig.size.height + 'px'
      }
    }
    // if (this.klineConfig.intervals) {
    //   this.intervals = this.klineConfig.intervals
    // } else {
    //   this.intervals = [
    //     {
    //       name: 'hour'
    //     },
    //     {
    //       name: 'day'
    //     },
    //     {
    //       name: 'week'
    //     },
    //     {
    //       name: 'month'
    //     }
    //   ]
    // }
    this.message = getLanguage();
    this.kline = new KLineController(this.platform, this.klineConfig);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose()
  },
  methods: {
    init() {
      this.kline.initChart(this.$refs.klineRef);
      this.resize();
    },
    chooseCycle(cycle) {
      let selectCycle = cycle
      if (cycle instanceof Object) {
         selectCycle = cycle.target.value
      }
      if (this.cycle === cycle) {
        return;
      }
      this.$emit("listenToChildEvent", selectCycle)
    },
    changeDataZoom(type) {
      this.kline.changeDataZoom(type)
    },
    getToolTipIndex() {
      let toolTipIndex = this.kline.getToolTipIndex()
      this.$emit("listenToTipIndex", toolTipIndex)
    },
    resize() {
      this.kline.resizeChart(this.$refs.klineRef, this.resizeSize.isFullScreen, this.klineConfig.size);
    },
    clearChart() {
      this.kline.clearChart();
    },
    dispose() {
      this.kline.disposeChart()
    }
  }
}
</script>
