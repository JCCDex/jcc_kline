import klineSetChart from 'js/KLineSetChart'
import option from 'js/KLineOption'
import { splitData, getDepthData } from 'js/processData'
import testData from '../../testData/data.json'

describe('test KLineSetChart', () => {

  let depthData = getDepthData(testData.depthData, testData.coinType)
  let pcData = splitData(testData.klineData, 'pc')
  let klineData = Object.assign({}, pcData, depthData);
  let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
  
  it('test klineSetChart', () => {
    let kline = new klineSetChart(option, showIndicators);
    expect(kline).toBeInstanceOf(klineSetChart)
  })

  it('test getXAxis', () => {
    let kline = new klineSetChart(option, showIndicators);
    expect(kline.getXAxis(klineData, 'hour')).not.toBeNull()
    expect(kline.getXAxis(klineData, 'day')).not.toBeNull()
    expect(kline.getXAxis(klineData, 'week')).not.toBeNull()
    expect(kline.getXAxis(klineData, 'month')).not.toBeNull()
  })

  it('test getYAxis', () => {
    let kline = new klineSetChart(option, showIndicators);
    expect(kline.getYAxis(klineData)).not.toBeNull()
  })

  it('test getToolTip', () => {
    let kline = new klineSetChart(option, showIndicators);
    expect(kline.getToolTip(klineData)).not.toBeNull()
  })

  it('test getGrid', () => {
    let kline = new klineSetChart(option, showIndicators);
    let data = {
      sellPercent: 0.5,
      buyPercent: 0.5
    }
    expect(kline.getGrid(data)).not.toBeNull()
  })

  it('test getSeries', () => {
    let kline = new klineSetChart(option, showIndicators);
    expect(kline.getSeries(klineData)).not.toBeNull()
  })

  it('test getDataZoom', () => {
    let kline = new klineSetChart(option, showIndicators);
    expect(kline.getDataZoom()).not.toBeNull()
  })

  it('test initECharts', () => {
    const element = document.createElement('div');
    let kline = new klineSetChart(option, showIndicators);
    kline.initECharts(element)
    expect(kline).not.toBeNull();
  })

  it('test setOption if cycle is hour', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption if cycle is day', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'day')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption if cycle is week', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'week')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption if cycle is month', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'month')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption but klineData is null', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(null, 'hour')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption if showIndicator not MarketDepth', () => {
    let showIndicator = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicator);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption if showIndicator not MarketDepth, Volume', () => {
    let showIndicator = ['Candlestick', 'MA']
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicator);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption if showIndicator not MarketDepth, Volume, MA', () => {
    let showIndicator = ['Candlestick']
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicator);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test updateOption', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.updateOption(klineData, 'hour')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test getToolTipData', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    let tipData = klineChart.getToolTipData()
    expect(tipData.MA5).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen', () => {
    const element = document.createElement('div');
    option.size = {
      width: 600,
      height: 500
    }
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, true)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen and defaultSize is true', () => {
    const element = document.createElement('div');
    option.defaultSize = true;
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, true)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if not fullScreen', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, false)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if DOM is null', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(null, false)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth less than 1280', () => {
    window.innerWidth = 1200;
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, false)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth less than 1366', () => {
    window.innerWidth = 1360;
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, false)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth less than 1440', () => {
    window.innerWidth = 1430;
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, false)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth less than 1680', () => {
    window.innerWidth = 1600;
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, false)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth is 1920', () => {
    window.innerWidth = 1920;
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, false)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if ClientWidth is 2180', () => {
    window.innerWidth = 2180;
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, false)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test changeDataZoom', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.changeDataZoom('leftShift')
    expect(klineChart.kline.getOption().dataZoom[0].start).toBe(58)
    expect(klineChart.kline.getOption().dataZoom[0].end).toBe(98)
    klineChart.changeDataZoom('enlarge')
    expect(klineChart.kline.getOption().dataZoom[0].start).toBe(63)
    expect(klineChart.kline.getOption().dataZoom[0].end).toBe(98)
    klineChart.changeDataZoom('rightShift')
    expect(klineChart.kline.getOption().dataZoom[0].start).toBe(65)
    expect(klineChart.kline.getOption().dataZoom[0].end).toBe(100)
    klineChart.changeDataZoom('refresh')
    expect(klineChart.kline.getOption().dataZoom[0].start).toBe(60)
    expect(klineChart.kline.getOption().dataZoom[0].end).toBe(100)
    klineChart.changeDataZoom('narrow')
    expect(klineChart.kline.getOption().dataZoom[0].start).toBe(55)
    expect(klineChart.kline.getOption().dataZoom[0].end).toBe(100)
  })

  it('test clearEcharts', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.clearEcharts()
    expect(klineChart.kline.getOption().series).toEqual(new Array);
  })

  it('test disposeEChart', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option, showIndicators);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.disposeEChart()
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

})