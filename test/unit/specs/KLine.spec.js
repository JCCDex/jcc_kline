import klineController from 'js/KLine.js'
import { splitData, handleDivisionData } from 'js/processData'
import testData from '../../testData/data.json'

describe('test KLine', () => {

  let precision = {
    price: 6,
    amount: 2
  }
  let mobileData = splitData(testData.klineData)
  mobileData.precision = precision
  mobileData.MAData = testData.MAData
  let klineData = testData.candleData;
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
  let moboleSize = { klineSize: size }
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

  it('test setOption if platform is pc', () => {
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(klineData, 'hour')
    expect(kline.setKLineChart.kline.getOption()).not.toBeNull()
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
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].start).toBe(43);
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].end).toBe(98);
    kline.changeDataZoom('rightShift')
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].start).toBe(45);
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    kline.changeDataZoom('enlarge')
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].start).toBe(50);
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    kline.changeDataZoom('refresh')
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].start).toBe(45);
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    kline.changeDataZoom('narrow')
    expect(kline.setKLineChart.kline.getOption().dataZoom[0].start).toBe(40);
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
    mobileKline.setMobileOption(moboleSize, mobileData)
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull()
  })

  it('test updateMobileOption if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, mobileData)
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

  it('test getMobileToolTipIndex if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, mobileData)
    mobileKline.updateMobileOption(mobileData, cycle)
    let mobileTipIndex = mobileKline.getMobileToolTipIndex()
    expect(mobileTipIndex).not.toBeNull();
  })

  it('test changeMobileDataZoom if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, mobileData)
    mobileKline.updateMobileOption(mobileData, cycle)
    mobileKline.changeMobileDataZoom('leftShift')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(73);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(98);
    mobileKline.changeMobileDataZoom('rightShift')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(75);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeMobileDataZoom('enlarge')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(80);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeMobileDataZoom('refresh')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(75);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeMobileDataZoom('narrow')
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].start).toBe(70);
    expect(mobileKline.setMobileKLineChart.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test disposeMobileChart if platform is mobile', () => {
    let mobileKline = new klineController('mobile', klineConfig)
    const element = document.createElement('div');
    mobileKline.initMobileChart(element)
    mobileKline.setMobileOption(moboleSize, mobileData)
    mobileKline.updateMobileOption(mobileData, cycle)
    mobileKline.disposeMobileChart()
    expect(mobileKline.setMobileKLineChart.kline).not.toBeNull();
  })

})