import klineController from 'js/KLine.js'
import { splitData, handleDivisionData } from 'js/processData'
import testData from '../../testData/data.json'
import data from '../../testData/testData.json'

describe('test KLine', () => {

  let precision = {
    price: 6,
    amount: 2
  }
  let mobileData = splitData(testData.klineData)
  mobileData.precision = precision
  let klineData = data.candleData;
  let timeDivisionData = testData.timeDivisionData
  timeDivisionData.precision = precision
  let divisionData = handleDivisionData(testData.timeDivisionData)
  let size = {
    height: 780,
    width: 900
  }
  let klineConfig = {
    backgroundColor: '#1ad2b4',
    defaultMA: false,
    MA: [
      {
        name: 'MA3',
        color: '#67ff7c'
      },
      {
        name: 'MA10',
        color: '#ff4d71'
      },
      {
        name: 'MA15',
        color: '#f6d026'
      },
      {
        name: 'MA20',
        color: '#ff4d71'
      },
      {
        name: 'MA30',
        color: '#000000'
      }
    ]
  }
  let moboleSize = {klineSize:size}
  let cycle = 'hour'

  it('has a created hook', () => {
    expect(typeof klineController).toBe('function')
  })

  it('test klineController if platform is pc', () => {
    let kline = new klineController('pc', klineConfig)
    expect(kline).toBeInstanceOf(klineController)
  })

  it('test initChart if platform is pc', () => {
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    expect(kline).not.toBeNull()
  })

  it('test initChart if platform is pc, defaultMA is true', () => {
    klineConfig.defaultMA = true
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    expect(kline).not.toBeNull()
  })

  it('test showLoading', () => {
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    kline.showLoading()
    expect(kline).not.toBeNull()
  })

  it('test setOption if platform is pc', () => {
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    expect(kline.setKLineChart.kline.getOption()).not.toBeNull()
  })
  it('test getEchart if platform is pc', () => {
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    let klineChart = kline.getEchart()
    expect(klineChart).not.toBeNull()
  })

  it('test updateOption if platform is pc', () => {
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    kline.updateOption(klineData, 'hour')
    expect(kline.setKLineChart.kline.getOption()).not.toBeNull()
  })

  it('test resizeChart if platform is pc', () => {
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    kline.resizeChart(element, true)
    expect(kline.setKLineChart.kline.getOption()).not.toBeNull()
  })

  it('test getToolTipIndex if platform is pc', () => {
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    let tipData = kline.getToolTipIndex()
    expect(tipData).not.toBeNull()
  })

  it('test changeDataZoom if platform is pc', () => {
    let kline = new klineController('pc', klineConfig)
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
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    kline.disposeChart()
    expect(kline.setKLineChart.kline.getOption()).not.toBeNull()
  })

  it('test clearChart if platform is pc', () => {
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    kline.clearChart()
    expect(kline.setKLineChart.kline.getOption().series).toEqual(new Array)
  })

  it('test initChart if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    expect(mobileKline.setMobileKLineChart).not.toBeNull()
  })

  it('test setMobileOption if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull()
  })

  it('test getMobileEchart if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    let chart = mobileKline.getMobileEchart()
    expect(chart).not.toBeNull()
  })

  it('test updateMobileOption if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.updateMobileOption(mobileData, cycle)
    expect(mobileKline.setMobileKLineChart.kline.getOption()).not.toBeNull();
  })

  it('test setTimeDivisionsOption if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setTimeDivisionsOption(size)
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull()
  })

  it('test updateTimeDivisionOption if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setTimeDivisionsOption(size)
    mobileKline.updateTimeDivisionOption(divisionData, precision)
    expect(mobileKline.setMobileKLineChart.kline.getOption()).not.toBeNull()
  })

  it('test showMobileLoading if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.showMobileLoading()
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull()
  })

  it('test hideMobileLoading if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.showMobileLoading()
    mobileKline.hideMobileLoading()
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull()
  })

  it('test getMobileToolTipIndex if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.updateMobileOption(mobileData, cycle)
    let mobileTipIndex = mobileKline.getMobileToolTipIndex()
    expect(mobileTipIndex).not.toBeNull();
  })

  it('test changeMobileDataZoom if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.updateMobileOption(mobileData, cycle)
    mobileKline.changeMobileDataZoom('leftShift')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(78);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(98);
    mobileKline.changeMobileDataZoom('rightShift')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(80);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeMobileDataZoom('enlarge')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(85);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeMobileDataZoom('refresh')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(80);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeMobileDataZoom('narrow')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(75);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test disposeMobileChart if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.updateMobileOption(mobileData, cycle)
    mobileKline.disposeMobileChart()
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull();
  })

  it('test clearMobileChart if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, cycle)
    mobileKline.updateMobileOption(mobileData, cycle)
    mobileKline.clearMobileChart()
    expect(mobileKline.setMobileKLineChart.kline.getOption().series).toEqual(new Array);
  })
})