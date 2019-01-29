import ChartController from 'js/Charts.js'
import { getDepthData } from 'js/processData'
import testData from '../../testData/data.json'
import timeSharingData from '../../testData/timeSharingData.json'

describe('test Chart', () => {

  let depthData = getDepthData(testData.depthData, testData.coinType)
  let klineConfig = {
    platform: 'pc',
    chartType: 'candle'
  }

  it('has a created hook', () => {
    expect(typeof ChartController).toBe('function')
  })

  it('test ChartController if platform is pc and chartType is candle', () => {
    klineConfig.chartType = 'candle'
    let depth = new ChartController(klineConfig)
    expect(depth).toBeInstanceOf(ChartController)
  })

  it('test ChartController if platform is pc and chartType is depth', () => {
    klineConfig.chartType = 'depth'
    let depth = new ChartController(klineConfig)
    expect(depth).toBeInstanceOf(ChartController)
  })

  it('test initDepthChart if platform is pc and chartType is depth', () => {
    let depth = new ChartController(klineConfig)
    const element = document.createElement('div');
    depth.initDepth(element)
    expect(depth).not.toBeNull()
  })

  it('test setDepthOption if platform is pc and chartType is depth', () => {
    let depth = new ChartController(klineConfig)
    const element = document.createElement('div');
    depth.initDepth(element)
    depth.setDepthOption(depthData)
    expect(depth.setDepthChart.depth.getOption()).not.toBeNull()
  })

  it('test updateDepthOption if platform is pc and chartType is depth', () => {
    let depth = new ChartController(klineConfig)
    const element = document.createElement('div');
    depth.initDepth(element)
    depth.setDepthOption(depthData)
    depth.updateDepthOption(depthData)
    expect(depth.setDepthChart.depth.getOption()).not.toBeNull()
  })

  it('test resizeDepthChart if platform is pc and chartType is depth, is FullScreen', () => {
    let depth = new ChartController(klineConfig)
    const element = document.createElement('div');
    depth.initDepth(element)
    depth.setDepthOption(depthData)
    depth.resizeDepthChart(element, true)
    expect(depth.setDepthChart.depth.getOption()).not.toBeNull()
  })

  it('test resizeDepthChart if platform is pc and chartType is depth, not FullScreen', () => {
    let depth = new ChartController(klineConfig)
    const element = document.createElement('div');
    depth.initDepth(element)
    depth.setDepthOption(depthData)
    depth.resizeDepthChart(element, false)
    expect(depth.setDepthChart.depth.getOption()).not.toBeNull()
  })

  it('test disposeDepthChart if platform is pc and chartType is depth', () => {
    let depth = new ChartController(klineConfig)
    const element = document.createElement('div');
    depth.initDepth(element)
    depth.setDepthOption(depthData)
    depth.disposeDepthEChart()
    expect(depth.setDepthChart.depth.getOption()).not.toBeNull()
  })

  it('test clearDepthChart if platform is pc and chartType is depth', () => {
    let depth = new ChartController(klineConfig)
    const element = document.createElement('div');
    depth.initDepth(element)
    depth.setDepthOption(depthData)
    depth.clearDepthEcharts()
    expect(depth.setDepthChart.depth.getOption().series).toEqual(new Array)
  })


  it('test ChartController if platform is pc and chartType is timeSharing', () => {
    klineConfig.chartType = 'timeSharing'
    let timeSharing = new ChartController(klineConfig)
    expect(timeSharing).toBeInstanceOf(ChartController)
  })

  it('test initTimeSharingChart if platform is pc and chartType is timeSharing', () => {
    let timeSharing = new ChartController(klineConfig)
    const element = document.createElement('div');
    timeSharing.initTimeSharingChart(element)
    expect(timeSharing).not.toBeNull()
  })

  it('test setTimeSharingOption if platform is pc and chartType is timeSharing', () => {
    let timeSharing = new ChartController(klineConfig)
    const element = document.createElement('div');
    timeSharing.initTimeSharingChart(element)
    timeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    expect(timeSharing.setTimeSharing.timeSharing.getOption()).not.toBeNull()
  })

  it('test updateTimeSharingOption if platform is pc and chartType is timeSharing', () => {
    let timeSharing = new ChartController(klineConfig)
    const element = document.createElement('div');
    timeSharing.initTimeSharingChart(element)
    timeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    timeSharing.updateTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    expect(timeSharing.setTimeSharing.timeSharing.getOption()).not.toBeNull()
  })

  it('test resizeTimeSharingChart if platform is pc and chartType is timeSharing, is FullScreen', () => {
    let timeSharing = new ChartController(klineConfig)
    const element = document.createElement('div');
    timeSharing.initTimeSharingChart(element)
    timeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    timeSharing.resizeTimeSharingChart(element, false)
    timeSharing.updateTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    timeSharing.resizeTimeSharingChart(element, true)
    expect(timeSharing.setTimeSharing.timeSharing.getOption()).not.toBeNull()
  })

  it('test resizeTimeSharingChart if platform is pc and chartType is timeSharing, not FullScreen', () => {
    let timeSharing = new ChartController(klineConfig)
    const element = document.createElement('div');
    timeSharing.initTimeSharingChart(element)
    timeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    timeSharing.resizeTimeSharingChart(element, false)
    expect(timeSharing.setTimeSharing.timeSharing.getOption()).not.toBeNull()
  })

  it('test disposeTimeSharingEChart if platform is pc and chartType is timeSharing', () => {
    let timeSharing = new ChartController(klineConfig)
    const element = document.createElement('div');
    timeSharing.initTimeSharingChart(element)
    timeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    timeSharing.disposeTimeSharingEChart()
    expect(timeSharing.setTimeSharing.timeSharing.getOption()).not.toBeNull()
  })

  it('test clearTimeSharingEcharts if platform is pc and chartType is timeSharing', () => {
    let timeSharing = new ChartController(klineConfig)
    const element = document.createElement('div');
    timeSharing.initTimeSharingChart(element)
    timeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    timeSharing.clearTimeSharingEcharts()
    expect(timeSharing.setTimeSharing.timeSharing.getOption().series).toEqual(new Array)
  })

  it('test initDepthChart if platform is mobile and chartType is timeSharing', () => {
    klineConfig.platform = 'mobile'
    let timeSharing = new ChartController(klineConfig)
    const element = document.createElement('div');
    timeSharing.initTimeSharingChart(element)
    expect(timeSharing).not.toBeNull()
  })

  it('test initDepthChart if platform is mobile and chartType is depth', () => {
    klineConfig.chartType = 'depth'
    klineConfig.platform = 'mobile'
    let depth = new ChartController(klineConfig)
    const element = document.createElement('div');
    depth.initDepth(element)
    expect(depth).not.toBeNull()
  })

})