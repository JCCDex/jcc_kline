import ChartController from 'js/Charts.js'
import { splitData, getDepthData } from 'js/processData'
import testData from '../../testData/data.json'
import timeSharingData from '../../testData/timeSharingData.json'

describe('test Chart', () => {

  let precision = {
    price: 6,
    amount: 2
  }
  let depthData = getDepthData(testData.depthData, testData.coinType, precision)
  let pcData = splitData(testData.klineData)
  let data = Object.assign({}, pcData, depthData);
  depthData.precision = precision
  let klineConfig = {
    platform: 'pc',
    chartType: 'candle',
    defaultDepthSize: true
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
    let resizeSize = {
      width: 700,
      height: 500
    }
    const element = document.createElement('div');
    depth.initDepth(element)
    depth.setDepthOption(depthData)
    depth.resizeDepthChart(element, false, resizeSize)
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
    timeSharingData.timeDivisionData.precision = precision
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

  it('test getTimeSharingTipData', () => {
    let timeSharing = new ChartController(klineConfig)
    const element = document.createElement('div');
    timeSharing.initTimeSharingChart(element)
    timeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    let tipsData = timeSharing.getTimeSharingTipData()
    expect(tipsData).not.toBeNull()
  })

  it('test resizeTimeSharingChart if platform is pc and chartType is timeSharing, is FullScreen', () => {
    let timeSharing = new ChartController(klineConfig)
    let resizeSize = {
      width: 700,
      height: 500
    }
    const element = document.createElement('div');
    timeSharing.initTimeSharingChart(element)
    timeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    timeSharing.resizeTimeSharingChart(element, false, resizeSize)
    timeSharing.updateTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    timeSharing.resizeTimeSharingChart(element, true, resizeSize)
    expect(timeSharing.setTimeSharing.timeSharing.getOption()).not.toBeNull()
  })

  it('test resizeTimeSharingChart if platform is pc and chartType is timeSharing, not FullScreen', () => {
    let timeSharing = new ChartController(klineConfig)
    let resizeSize = {
      width: 700,
      height: 500
    }
    const element = document.createElement('div');
    timeSharing.initTimeSharingChart(element)
    timeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    timeSharing.resizeTimeSharingChart(element, false, resizeSize)
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

  // 测试深度图绘制方法
  let volumeConfig = {
    platform: 'pc',
    chartType: 'volume',
    defaultSize: true
  }

  it('test ChartController if platform is pc and chartType is volume', () => {
    let volume = new ChartController(volumeConfig)
    expect(volume).toBeInstanceOf(ChartController)
  })

  it('test initVolumeChart', () => {
    let volume = new ChartController(volumeConfig)
    const element = document.createElement('div');
    volume.initVolumeChart(element)
    expect(volume.setVolumeChart.volume).not.toBeNull()
  })

  it('test initVolumeChart if platform not pc', () => {
    volumeConfig.platform = 'mobile'
    let volume = new ChartController(volumeConfig)
    expect(volume).toBeInstanceOf(ChartController)
  })

  it('test resizeVolumeChart if not fullScreen', () => {
    volumeConfig.platform = 'pc'
    let volume = new ChartController(volumeConfig)
    const element = document.createElement('div');
    volume.initVolumeChart(element)
    volume.resizeVolumeChart(element, false)
    expect(volume.setVolumeChart.volume).not.toBeNull()
  })

  it('test setVolumeOption', () => {
    let volume = new ChartController(volumeConfig)
    const element = document.createElement('div');
    volume.initVolumeChart(element)
    volume.setVolumeOption(data)
    expect(volume.setVolumeChart.volume.getOption()).not.toBeNull()
  })

  it('test getToolTipIndex', () => {
    let volume = new ChartController(volumeConfig)
    const element = document.createElement('div');
    volume.initVolumeChart(element)
    volume.setVolumeOption(data)
    let tipIndex = volume.getToolTipIndex()
    expect(tipIndex).not.toBeNull()
  })

  it('test getVolumeEchart', () => {
    let volume = new ChartController(volumeConfig)
    const element = document.createElement('div');
    volume.initVolumeChart(element)
    volume.setVolumeOption(data)
    let volumeChart = volume.getVolumeEchart()
    expect(volumeChart).not.toBeNull()
  })

  it('test updateVolumeOption', () => {
    let volume = new ChartController(volumeConfig)
    const element = document.createElement('div');
    volume.initVolumeChart(element)
    volume.setVolumeOption(data)
    volume.updateVolumeOption(data)
    expect(volume.setVolumeChart.volume.getOption()).not.toBeNull()
  })

  it('test clearVolumeEcharts', () => {
    let volume = new ChartController(volumeConfig)
    const element = document.createElement('div');
    volume.initVolumeChart(element)
    volume.setVolumeOption(data)
    volume.clearVolumeEcharts()
    expect(volume.setVolumeChart.volume.getOption().series).not.toBeNull()
  })

  it('test disposeVolumeEcharts', () => {
    let volume = new ChartController(volumeConfig)
    const element = document.createElement('div');
    volume.initVolumeChart(element)
    volume.setVolumeOption(data)
    volume.disposeVolumeEcharts()
    expect(volume.setVolumeChart.volume.getOption()).not.toBeNull()
  })

})