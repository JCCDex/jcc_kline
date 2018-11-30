<template>
  <div>
    <jKline ref = "vkline" :kline-data-obj = "klineDataObj" :show-indicators = "showIndicators" :kline-config = "klineConfig" :cycle = "cycle" :platform = "platform"></jKline>
  </div>
</template>

<script>
export default {
  name: 'KLine',
  data () {
    return {
      cycle: 'hour',
      kline: null,
      klineDataObj: null,
      platform: 'pc',
      klineConfig: {
        backgroundColor: '#161b21'
      },
      showIndicators: ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    }
  },
  created () {
    localStorage.setItem('languageType', 'zh')
    var pairs = {
      base: 'SWTC'
    }
    localStorage.setItem('coinItem', pairs)
  },
  mounted () {
    this.$refs.vkline.status = 0
    this.klineDataObj = require('../data')
  }
}
</script>

<style scoped>
h1, h2 {
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
