<template>
<div>
    <el-col :span='24'>
        <div style='position:relative'>
            <jKline ref='vkline' v-on:listenToChildEvent='changeCycle' :kline-data-obj='klineDataObj' :kline-config='klineConfig'></jKline>
        </div>
    </el-col>
</div>
</template>

<script>
// import { Chart } from 'jcc_kline/src/index'
import {JcInfo} from 'jcc_rpc'
let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
export default {
  name: 'KLine',
  // components: {
  //   jKline: Chart
  // },
  data () {
    return {
      id: null,
      cycle: 'hour',
      kline: null,
      klineDataObj: null,
      klineConfig: {
        backgroundColor: '#161b21',
        defaultSize: false,
        size: {
          width: width * 0.8,
          height: height * 0.7
        }
      }
    }
  },
  created () {
    localStorage.setItem('languageType', 'zh')
    var pairs = {
      base: 'SWTC'
    }
    localStorage.setItem('coinItem', pairs)
    clearInterval(this.id)
    this.getKline()
    this.id = setInterval(this.update, 5000)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
    clearInterval(this.id)
  },
  mounted () {
    window.addEventListener('resize', this.resize)
  },
  methods: {
    changeCycle (cycle) {
      this.cycle = cycle
      this.getKline()
    },
    update () {
      this.getKline()
    },
    resize () {
      let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      this.klineConfig = {
        backgroundColor: '#161b21',
        defaultSize: false,
        size: {
          width: width * 0.8,
          height: height * 0.7
        }
      }
    },
    async getKline () {
      var hosts = process.env.infoHosts
      // var hosts = ['iujhg293cabc.jccdex.cn']
      var port = process.env.infoPort
      var https = true
      let inst = new JcInfo(hosts, port, https)
      var base = 'SWT'
      var counter = 'CNT'
      let p1 = inst.getKline(base, counter, this.cycle)
      let p2 = inst.getDepth(base, counter, 'more')
      let res3 = await inst.getHistory(base, counter, 'all')
      let coinType = {
        baseTitle: 'swt',
        counterTitle: 'cnt'
      }
      let [res1, res2] = await Promise.all([p1, p2])
      this.klineDataObj = {
        klineData: res1.data,
        depthData: res2.data,
        coinType: coinType,
        timeDivisionData: res3.data.reverse(),
        cycle: this.cycle
      }
    }
  }
}
</script>

<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
