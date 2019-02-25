import klineMobileSetChart from 'js/KLineMobileSetChart'
import mobileOption from 'js/KLineMobileOption'
import { splitData, handleDivisionData } from 'js/processData'
import testData from '../../testData/data.json'

describe('test KLineMobileSetChart', () => {

  let precision = {
    price: 6,
    amount: 2
  }
  let data = splitData(testData.klineData, testData.platform)
  data.precision = precision
  let timeDivisionData = testData.timeDivisionData
  timeDivisionData.precision = precision
  let divisionData = handleDivisionData(testData.timeDivisionData)
  let size = {
    height: 1000,
    width: 780
  }
  let mobileData = {klineSize:size}
  let cycle = 'hour'

  it('test KLineMobileSetChart', () => {
    let mobileKline = new klineMobileSetChart(mobileOption);
    expect(mobileKline).toBeInstanceOf(klineMobileSetChart)
  })

  it('test mobile getGrid', () => {
    let mobileKline = new klineMobileSetChart(mobileOption);
    expect(mobileKline.getGrid(size)).not.toBeNull()
  })

  it('test mobile getYAxis', () => {
    let mobileKline = new klineMobileSetChart(mobileOption);
    expect(mobileKline.getYAxis(size)).not.toBeNull()
  })

  it('test mobile initMobileECharts', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile setOption', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile updateOption if not precision', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    data.precision.price = undefined
    data.precision.amount = undefined
    mobileKline.setOption(mobileData, cycle)
    mobileKline.updateOption(data)
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile setOption if cycle is day', () => {
    cycle = "day"
    data.precision = precision
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile setOption if cycle is week', () => {
    cycle = "week"
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile setOption if cycle is month', () => {
    cycle = "month"
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile showLoading', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    mobileKline.showLoading()
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile hideLoading', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    mobileKline.showLoading()
    mobileKline.hideLoading()
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile updateOption', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    mobileKline.updateOption(data)
    expect(mobileKline.kline.getOption()).not.toBeNull();
  })

  it('test setTimeDivisionsOption', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setTimeDivisionsOption(size)
    expect(mobileKline.kline.getOption()).not.toBeNull();
  })

  it('test updateTimeDivisionOption', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setTimeDivisionsOption(size)
    mobileKline.updateTimeDivisionOption(timeDivisionData, divisionData, precision)
    expect(mobileKline.kline.getOption()).not.toBeNull();
  })


  it('test mobile changeDataZoom if type is leftShift or rightShift', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    mobileKline.updateOption(data)
    mobileKline.changeDataZoom('leftShift')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(58);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(98);
    mobileKline.changeDataZoom('rightShift')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(60);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test mobile changeDataZoom if type is enlarge or narrow', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    mobileKline.updateOption(data)
    mobileKline.changeDataZoom('enlarge')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(65);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeDataZoom('narrow')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(60);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test mobile changeDataZoom if cycle is everyhour', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setTimeDivisionsOption(size)
    mobileKline.updateTimeDivisionOption(timeDivisionData, divisionData, precision)
    mobileKline.changeDataZoom('enlarge')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(65);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test mobile changeDataZoom if type is refresh', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    mobileKline.updateOption(data)
    mobileKline.changeDataZoom('enlarge')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(65);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeDataZoom('refresh')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(60);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test clearMobileEcharts', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    mobileKline.updateOption(data)
    expect(mobileKline.kline.getOption().series).not.toBeNull();
    mobileKline.clearMobileEcharts()
    expect(mobileKline.kline.getOption().series).toEqual(new Array);
  })

  it('test disposeMobileEChart', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    mobileKline.updateOption(data)
    expect(mobileKline.kline.getOption().series).not.toBeNull();
    mobileKline.disposeMobileEChart()
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile getToolTipData', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData, cycle)
    mobileKline.updateOption(data)
    let tipData = mobileKline.getToolTipData();
    expect(tipData).not.toBeNull();
  })

})