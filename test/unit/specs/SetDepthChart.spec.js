import SetDepthChart from 'js/SetDepthChart'
import { getDepthData } from 'js/processData'
import testData from '../../../demo/src/data.json'

describe('test KLineSetChart', () => {

  let depthData = getDepthData(testData.depthData, testData.coinType)
  let klineConfig = {
    platform: 'pc',
    chartType: 'candle'
  }
  
  it('test klineSetChart', () => {
    let depth = new SetDepthChart(klineConfig);
    expect(depth).toBeInstanceOf(SetDepthChart)
  })

  it('test getDepthGrid', () => {
    let depth = new SetDepthChart(klineConfig);
    expect(depth.getDepthGrid()).not.toBeNull()
  })

  it('test getDepthXAxis', () => {
    let depth = new SetDepthChart(klineConfig);
    expect(depth.getDepthXAxis()).not.toBeNull()
  })

  it('test getDepthYAxis', () => {
    let depth = new SetDepthChart(klineConfig);
    expect(depth.getDepthYAxis()).not.toBeNull()
  })

  it('test getDepthToolTip', () => {
    let depth = new SetDepthChart(klineConfig);
    expect(depth.getDepthToolTip()).not.toBeNull()
  })

  it('test getDepthSeries', () => {
    let depth = new SetDepthChart(klineConfig);
    expect(depth.getDepthSeries(depthData)).not.toBeNull()
  })

  it('test initDepthECharts', () => {
    const element = document.createElement('div');
    let depth = new SetDepthChart(klineConfig);
    depth.initDepthECharts(element)
    expect(depth).not.toBeNull();
  })

  it('test showLoading', () => {
    const element = document.createElement('div');
    let depth = new SetDepthChart(klineConfig);
    depth.initDepthECharts(element)
    depth.showLoading()
    expect(depth).not.toBeNull();
  })

  it('test setDepthOption', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(klineConfig);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test setDepthOption but depthData is null', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(klineConfig);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(null)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test updateDepthOption', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(klineConfig);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.updateDepthOption(depthData)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(klineConfig);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.resizeECharts(element, true)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen and oldDepthData is null', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(klineConfig);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(null)
    depthChart.resizeECharts(element, true)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test resizeECharts if not fullScreen', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(klineConfig);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.resizeECharts(element, false)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })


  it('test clearDepthEcharts', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(klineConfig);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.clearDepthEcharts()
    expect(depthChart.depth.getOption().series).toEqual(new Array);
  })

  it('test disposeDepthEChart', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(klineConfig);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.disposeDepthEChart()
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test disposeDepthEChart if depth is null', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(klineConfig);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.depth = null;
    depthChart.disposeDepthEChart()
    expect(depthChart.depth).toBeNull();
  })

})