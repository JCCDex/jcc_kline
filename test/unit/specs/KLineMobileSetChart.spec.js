import klineMobileSetChart from 'js/KLineMobileSetChart'
import mobileOption from 'js/KLineMobileOption'
import { splitData, handleDivisionData } from 'js/processData'
import testData from '../../testData/data.json'

describe('test KLineMobileSetChart', () => {

  let data = splitData(testData.klineData, testData.platform)
  let timeDivisionData = testData.timeDivisionData
  let divisionData = handleDivisionData(testData.timeDivisionData)
  let size = {
    height: 1000,
    width: 780
  }
  let mobileData = {klineSize:size}
  let cycle = 'hour'
  mobileOption.defaultMA = true
  mobileOption.MAIndex = 1
  mobileOption.MA = [
    {
      name: "MA5",
      color: "#ff4d71"
    },
    {
      name: "MA10",
      color: "#67ff7c"
    },
    {
      name: "MA20",
      color: "#16c5ff"
    },
    {
      name: "MA30",
      color: "#f6d026"
    },
    { 
      name: "MA60", 
      color: "#e03bfa"
    }
  ];

  it('test KLineMobileSetChart', () => {
    let mobileKline = new klineMobileSetChart(mobileOption);
    expect(mobileKline).toBeInstanceOf(klineMobileSetChart)
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
    mobileKline.setOption(mobileData)
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile showLoading', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData)
    mobileKline.showLoading()
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile hideLoading', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData)
    mobileKline.showLoading()
    mobileKline.hideLoading()
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile updateOption if defaultMA is false', () => {
    mobileOption.defaultMA = false
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData)
    mobileKline.updateOption(data, cycle)
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
    mobileKline.updateTimeDivisionOption(timeDivisionData, divisionData)
    expect(mobileKline.kline.getOption()).not.toBeNull();
  })


  it('test mobile changeDataZoom if type is leftShift or rightShift', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData)
    cycle = 'week'
    mobileKline.updateOption(data, cycle)
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
    mobileKline.setOption(mobileData)
    cycle = 'month'
    mobileKline.updateOption(data, cycle)
    mobileKline.changeDataZoom('enlarge')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(65);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
    mobileKline.changeDataZoom('narrow')
    expect(mobileKline.kline.getOption().dataZoom[0].start).toBe(60);
    expect(mobileKline.kline.getOption().dataZoom[0].end).toBe(100);
  })

  it('test mobile changeDataZoom if type is refresh', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData)
    cycle = 'day'
    mobileKline.updateOption(data, cycle)
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
    mobileKline.setOption(mobileData)
    mobileKline.updateOption(data, cycle)
    expect(mobileKline.kline.getOption().series).not.toBeNull();
    mobileKline.clearMobileEcharts()
    expect(mobileKline.kline.getOption().series).toEqual(new Array);
  })

  it('test disposeMobileEChart', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData)
    mobileKline.updateOption(data, cycle)
    expect(mobileKline.kline.getOption().series).not.toBeNull();
    mobileKline.disposeMobileEChart()
    expect(mobileKline.kline).not.toBeNull();
  })

  it('test mobile getToolTipData', () => {
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption);
    mobileKline.initMobileECharts(element)
    mobileKline.setOption(mobileData)
    mobileKline.updateOption(data, cycle)
    let tipData = mobileKline.getToolTipData();
    expect(tipData).not.toBeNull();
  })

})