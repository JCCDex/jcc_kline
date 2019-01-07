import klineSetChart from 'js/KLineSetChart'
import option from 'js/KLineOption'
import { splitData, getDepthData } from 'js/processData'
import testData from '../../../demo/src/data.json'

describe('test KLineSetChart', () => {
  
  it('test klineSetChart', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let kline = new klineSetChart(option, showIndicators);
    expect(kline).toBeInstanceOf(klineSetChart)
  })

  it('test getXAxis', () => {
    let splitdata = splitData(testData.klineData, testData.platform)
    let depthData = getDepthData(testData.depthData, testData.coinType)
    let data = Object.assign({}, splitdata, depthData);
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let kline = new klineSetChart(option, showIndicators);
    expect(kline.getXAxis(data, 'hour')).not.toBeNull()
    expect(kline.getXAxis(data, 'day')).not.toBeNull()
    expect(kline.getXAxis(data, 'week')).not.toBeNull()
    expect(kline.getXAxis(data, 'month')).not.toBeNull()
  })

  it('test getYAxis', () => {
    let splitdata = splitData(testData.klineData, testData.platform)
    let depthData = getDepthData(testData.depthData, testData.coinType)
    let data = Object.assign({}, splitdata, depthData);
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let kline = new klineSetChart(option, showIndicators);
    expect(kline.getYAxis(data)).not.toBeNull()
  })

  it('test getToolTip', () => {
    let splitdata = splitData(testData.klineData, testData.platform)
    let depthData = getDepthData(testData.depthData, testData.coinType)
    let data = Object.assign({}, splitdata, depthData);
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let kline = new klineSetChart(option, showIndicators);
    expect(kline.getToolTip(data)).not.toBeNull()
  })

  it('test getGrid', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let kline = new klineSetChart(option, showIndicators);
    let data = {
      sellPercent: 0.5,
      buyPercent: 0.5
    }
    expect(kline.getGrid(data)).not.toBeNull()
  })

  it('test getSeries', () => {
    let splitdata = splitData(testData.klineData, testData.platform)
    let depthData = getDepthData(testData.depthData, testData.coinType)
    let data = Object.assign({}, splitdata, depthData);
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let kline = new klineSetChart(option, showIndicators);
    expect(kline.getSeries(data)).not.toBeNull()
  })

  it('test getDataZoom', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let kline = new klineSetChart(option, showIndicators);
    expect(kline.getDataZoom()).not.toBeNull()
  })

  it('test initMobileECharts', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    const element = document.createElement('div');
    let kline = new klineSetChart(option, showIndicators);
    kline.initECharts(element)
    expect(kline).not.toBeNull();
  })

//   it('test setOption', () => {
//     let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
//     const element = document.createElement('div');
//     let kline = new klineSetChart(option, showIndicators);
//     kline.initECharts(element)
//     let splitdata = splitData(testData.klineData, testData.platform)
//     let depthData = getDepthData(testData.depthData, testData.coinType)
//     let data = Object.assign({}, splitdata, depthData);
//     kline.setOption(data, 'hour')
//     expect(kline).toBeNull();
//   })

})