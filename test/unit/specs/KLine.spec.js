import klineController from 'js/KLine.js'
import { splitData, handleDivisionData, getDepthData } from 'js/processData'
import testData from '../../testData/data.json'

describe('test KLine', () => {

  let precision = {
    price: 6,
    amount: 2
  }
  let mobileData = splitData(testData.klineData, 'mobile')
  mobileData.precision = precision
  let depthData = getDepthData(testData.depthData, testData.coinType, precision)
  let pcData = splitData(testData.klineData, 'pc')
  let klineData = Object.assign({}, pcData, depthData);
  klineData.precision = precision
  let timeDivisionData = testData.timeDivisionData
  timeDivisionData.precision = precision
  let divisionData = handleDivisionData(testData.timeDivisionData)
  let size = {
    height: 780,
    width: 900
  }
  let moboleSize = {klineSize:size}
  let cycle = 'hour'

  it('has a created hook', () => {
    expect(typeof klineController).toBe('function')
  })

  it('test klineController if platform is pc', () => {
    let klineConfig = {
      backgroundColor: '#1ad2b4'
    }
    let kline = new klineController('pc', klineConfig)
    expect(kline).toBeInstanceOf(klineController)
  })

  it('test initChart if platform is pc', () => {
    let kline = new klineController('pc', '')
    const element = document.createElement('div');
    kline.initChart(element)
    expect(kline).not.toBeNull()
  })

  it('test showLoading', () => {
    let kline = new klineController('pc', '')
    const element = document.createElement('div');
    kline.initChart(element)
    kline.showLoading()
    expect(kline).not.toBeNull()
  })

  it('test setOption if platform is pc', () => {
    let kline = new klineController('pc', '')
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    expect(kline.setKLineChart.kline.getOption()).not.toBeNull()
  })

  it('test updateOption if platform is pc', () => {
    let kline = new klineController('pc', '')
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    kline.updateOption(klineData, 'hour')
    expect(kline.setKLineChart.kline.getOption()).not.toBeNull()
  })

  it('test resizeChart if platform is pc', () => {
    let kline = new klineController('pc', '')
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    kline.resizeChart(element, true)
    expect(kline.setKLineChart.kline.getOption()).not.toBeNull()
  })

  it('test getToolTipData if platform is pc', () => {
    let kline = new klineController('pc', '')
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    let tipData = kline.getToolTipData()
    expect(tipData).not.toBeNull()
  })

  it('test changeDataZoom if platform is pc', () => {
    let kline = new klineController('pc', '')
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    kline.changeDataZoom('leftShift')
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].start).toBe(58);
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].end).toBe(98);
    kline.changeDataZoom('rightShift')
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].start).toBe(60);
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    kline.changeDataZoom('enlarge')
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].start).toBe(65);
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    kline.changeDataZoom('refresh')
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].start).toBe(60);
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    kline.changeDataZoom('narrow')
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].start).toBe(55);
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test disposeChart if platform is pc', () => {
    let kline = new klineController('pc', '')
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    kline.disposeChart()
    expect(kline.setKLineChart.kline.getOption()).not.toBeNull()
  })

  it('test clearChart if platform is pc', () => {
    let kline = new klineController('pc', '')
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    kline.clearChart()
    expect(kline.setKLineChart.kline.getOption().series).toEqual(new Array)
  })

  it('test initChart if platform is mobile', () => {
    let mobileKline = new klineController('mobile', '')
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    expect(mobileKline.setMobileKLineChart).not.toBeNull()
  })

  it('test setMobileOption if platform is mobile', () => {
    let mobileKline = new klineController('mobile', '')
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull()
  })

  it('test updateMobileOption if platform is mobile', () => {
    let mobileKline = new klineController('mobile', '')
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.updateMobileOption(mobileData)
    expect(mobileKline.setMobileKLineChart.kline.getOption()).not.toBeNull();
  })

  it('test setTimeDivisionsOption if platform is mobile', () => {
    let mobileKline = new klineController('mobile', '')
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setTimeDivisionsOption(size)
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull()
  })

  it('test updateTimeDivisionOption if platform is mobile', () => {
    let mobileKline = new klineController('mobile', '')
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setTimeDivisionsOption(size)
    mobileKline.updateTimeDivisionOption(timeDivisionData, divisionData, precision)
    expect(mobileKline.setMobileKLineChart.kline.getOption()).not.toBeNull()
  })

  it('test showMobileLoading if platform is mobile', () => {
    let mobileKline = new klineController('mobile', '')
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.showMobileLoading()
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull()
  })

  it('test hideMobileLoading if platform is mobile', () => {
    let mobileKline = new klineController('mobile', '')
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.showMobileLoading()
    mobileKline.hideMobileLoading()
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull()
  })

  it('test getMobileToolTipData if platform is mobile', () => {
    let mobileKline = new klineController('mobile', '')
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.updateMobileOption(mobileData)
    let mobileTipData = mobileKline.getMobileToolTipData()
    expect(mobileTipData).not.toBeNull();
  })

  it('test changeMobileDataZoom if platform is mobile', () => {
    let mobileKline = new klineController('mobile', '')
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.updateMobileOption(mobileData)
    mobileKline.changeMobileDataZoom('leftShift')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(58);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(98);
    mobileKline.changeMobileDataZoom('rightShift')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(60);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeMobileDataZoom('enlarge')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(65);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeMobileDataZoom('refresh')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(60);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeMobileDataZoom('narrow')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(55);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test disposeMobileChart if platform is mobile', () => {
    let mobileKline = new klineController('mobile', '')
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.updateMobileOption(mobileData)
    mobileKline.disposeMobileChart()
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull();
  })

  it('test clearMobileChart if platform is mobile', () => {
    let mobileKline = new klineController('mobile', '')
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.updateMobileOption(mobileData)
    mobileKline.clearMobileChart()
    expect(mobileKline.setMobileKLineChart.kline.getOption().series).toEqual(new Array);
  })
})