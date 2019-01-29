<template>
<div>
    <el-col :span='24'>
        <div style='position:relative'>
            <jKline ref='vkline' v-on:listenToChildEvent='changeCycle' :kline-data-obj='klineDataObj' :kline-config='klineConfig' :cycle='cycle'></jKline>
        </div>
    </el-col>
</div>
</template>

<script>
// import { Chart } from 'jcc_kline/src/index'
import {JcInfo} from 'jcc_rpc'
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
        platform: 'pc',
        size: {
          width: 1900,
          height: 800
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
    clearInterval(this.id)
  },
  mounted () {
    this.$refs.vkline.status = 0
    // this.klineDataObj = require('../data')
  },
  methods: {
    changeCycle (cycle) {
      this.cycle = cycle
      this.getKline()
    },
    update () {
      this.getKline()
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
      let coinType = {
        baseTitle: 'swt',
        counterTitle: 'cnt'
      }
      let [res1, res2] = await Promise.all([p1, p2])
      this.klineDataObj = {
        klineData: res1.data,
        depthData: res2.data,
        coinType: coinType,
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
