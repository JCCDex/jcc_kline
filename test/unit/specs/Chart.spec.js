import ChartController from 'js/Chart.js'
import { getDepthData } from 'js/processData'
import testData from '../../../demo/src/data.json'

describe('test KLineSetChart', () => {

  let depthData = getDepthData(testData.depthData, testData.coinType)
  let klineConfig = {
    platform: 'pc',
    chartType: 'candle'
  }

  it('has a created hook', () => {
    expect(typeof ChartController).toBe('function')
  })

  it('test ChartController if klineConfig.chartType is candle', () => {
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

})