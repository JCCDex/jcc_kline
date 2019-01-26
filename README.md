# jcc_kline

[![Build Status](https://travis-ci.com/JCCDex/jcc_kline.svg?branch=master)](https://travis-ci.com/JCCDex/jcc_kline)
[![Coverage Status](https://coveralls.io/repos/github/JCCDex/jcc_kline/badge.svg)](https://coveralls.io/github/JCCDex/jcc_kline)

## Installtion

```shell
npm install jcc_kline
```

### 目录结构
```
├── demo					// demo目录	
├── src 					// 组件目录
├── test					// 测试			
├── package.json
└── README
```

## 快速上手

引入jcc_kline

``` javascript
// 引入jcc_kline
import kline from 'jcc_kline'

Vue.use(kline)

```
## 组件

### K线图

```vue
<jKline v-on:listenToChildEvent='changeCycle' :kline-data-obj='klineDataObj' :kline-config='klineConfig' :cycle='cycle'></jKline>
```