import klineMobileSetChart from 'js/KLineMobileSetChart'
import mobileOption from 'js/KLineMobileOption'
import { splitData, handleDivisionData } from 'js/processData'
import testData from '../../../demo/src/data.json'

describe('test KLineMobileSetChart', () => {

  let data = splitData(testData.klineData, testData.platform)
  let timeDivisionData = testData.timeDivisionData
  let divisionData = handleDivisionData(testData.timeDivisionData)
  let size = {
    height: 1000,
    width: 780
  }

  it('test KLineMobileSetChart', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    expect(mobileKline).toBeInstanceOf(klineMobileSetChart)
  })

  it('test mobile getGrid', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    expect(mobileKline.getGrid(size)).not.toBeNull()
  })

  it('test mobile getGrid if showIndicators not Volume', () => {
    let showIndicators = ['Candlestick', 'MA']
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    expect(mobileKline.getGrid(size)).not.toBeNull()
  })

  it('test mobile getYAxis', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    expect(mobileKline.getYAxis(size)).not.toBeNull()
  })

  it('test mobile initMobileECharts', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile setOption', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile showLoading', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    mobileKline.showLoading()
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile hideLoading', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    mobileKline.showLoading()
    mobileKline.hideLoading()
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile setOption if showIndicators not Volume', () => {
    let showIndicators = ['Candlestick', 'MA']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile updateOption', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    mobileKline.updateOption(data)
    expect(mobileKline.kline.getOption()).not.toBeNull();
  })

  it('test mobile updateOption if showIndicators not Volume', () => {
    let showIndicators = ['Candlestick', 'MA']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    mobileKline.updateOption(data)
    expect(mobileKline.kline.getOption()).not.toBeNull();
  })

  it('test mobile updateOption if showIndicators not Volume, MA', () => {
    let showIndicators = ['Candlestick']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    mobileKline.updateOption(data)
    expect(mobileKline.kline.getOption()).not.toBeNull();
  })

  it('test setTimeDivisionsOption', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setTimeDivisionsOption(size)
    expect(mobileKline.kline.getOption()).not.toBeNull();
  })

  it('test updateTimeDivisionOption', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setTimeDivisionsOption(size)
    mobileKline.updateTimeDivisionOption(timeDivisionData, divisionData)
    expect(mobileKline.kline.getOption()).not.toBeNull();
  })

  it('test updateTimeDivisionOption if showIndicators not Volume', () => {
    let showIndicators = ['Candlestick', 'MA']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setTimeDivisionsOption(size)
    mobileKline.updateTimeDivisionOption(timeDivisionData, divisionData)
    expect(mobileKline.kline.getOption()).not.toBeNull();
  })

  it('test mobile changeDataZoom if type is leftShift or rightShift', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    mobileKline.updateOption(data)
    mobileKline.changeDataZoom('leftShift')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(58);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(98);
    mobileKline.changeDataZoom('rightShift')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(60);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test mobile changeDataZoom if type is enlarge or narrow', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    mobileKline.updateOption(data)
    mobileKline.changeDataZoom('enlarge')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(65);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeDataZoom('narrow')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(60);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test mobile changeDataZoom if type is refresh', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    mobileKline.updateOption(data)
    mobileKline.changeDataZoom('enlarge')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(65);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeDataZoom('refresh')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(60);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test clearMobileEcharts', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    mobileKline.updateOption(data)
    expect(mobileKline.kline.getOption().series).not.toBeNull();
    mobileKline.clearMobileEcharts()
    expect(mobileKline.kline.getOption().series).toEqual(new Array);
  })

  it('test disposeMobileEChart', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    mobileKline.updateOption(data)
    expect(mobileKline.kline.getOption().series).not.toBeNull();
    mobileKline.disposeMobileEChart()
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile getToolTipData', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(size)
    mobileKline.updateOption(data)
    let tipData = mobileKline.getToolTipData();
    expect(tipData).not.toBeNull();
  })

})