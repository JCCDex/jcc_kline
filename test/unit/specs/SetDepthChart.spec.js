import SetDepthChart from 'js/SetDepthChart'
import { depthOption } from 'js/DepthOption'
import { getDepthData } from 'js/processData'
import testData from '../../testData/data.json'

describe('test SetDepthChart', () => {

  depthOption.defaultSize = true
  let precision = {
    price: 6,
    amount: 2
  }
  let depthData = getDepthData(testData.depthData, testData.coinType, precision)
  depthData.precision = precision
  depthOption.platform = 'pc'

  it('test depthSetChart', () => {
    let depth = new SetDepthChart(depthOption);
    expect(depth).toBeInstanceOf(SetDepthChart)
  })

  it('test getDepthToolTip', () => {
    let depth = new SetDepthChart(depthOption);
    expect(depth.getDepthToolTip()).not.toBeNull()
  })

  it('test getDepthSeries', () => {
    let depth = new SetDepthChart(depthOption);
    expect(depth.getDepthSeries(depthData)).not.toBeNull()
  })

  it('test initDepthECharts', () => {
    const element = document.createElement('div');
    let depth = new SetDepthChart(depthOption);
    depth.initDepthECharts(element)
    expect(depth).not.toBeNull();
  })

  it('test showLoading', () => {
    const element = document.createElement('div');
    let depth = new SetDepthChart(depthOption);
    depth.initDepthECharts(element)
    depth.showLoading()
    expect(depth).not.toBeNull();
  })

  it('test setDepthOption', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test setDepthOption but not precision', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthData.precision.price = undefined
    depthData.precision.amount = undefined
    depthChart.setDepthOption(depthData)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test updateDepthOption but not precision', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthData.precision.price = undefined
    depthData.precision.amount = undefined
    depthChart.setDepthOption(depthData)
    depthChart.updateDepthOption(depthData)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test setDepthOption but depthData is null', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(null)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test updateDepthOption', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthData.precision = precision
    depthChart.setDepthOption(depthData)
    depthChart.updateDepthOption(depthData)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test updateDepthOption if platform is mobile', () => {
    const element = document.createElement('div');
    depthOption.platform = 'mobile'
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.updateDepthOption(depthData)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })


  it('test resizeECharts if is fullScreen', () => {
    window.innerWidth = 2180;
    const element = document.createElement('div');
    depthOption.platform = 'pc'
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.resizeECharts(element, true)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen and oldDepthData is null', () => {
    window.innerWidth = 2560;
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(null)
    depthChart.resizeECharts(element, true)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test resizeECharts if not fullScreen', () => {
    window.innerWidth = 3440;
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.resizeECharts(element, false)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test resizeECharts if defaultDepthSize is true', () => {
    window.innerWidth = 3840;
    depthOption.defaultDepthSize = false
    depthOption.size = {
      width: 600,
      height: 560
    }
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.resizeECharts(element, false)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test resizeECharts if not DOM', () => {
    depthOption.defaultDepthSize = true
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.resizeECharts(null, false)
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test clearDepthEcharts', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.clearDepthEcharts()
    expect(depthChart.depth.getOption().series).toEqual(new Array);
  })

  it('test disposeDepthEChart', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.disposeDepthEChart()
    expect(depthChart.depth.getOption()).not.toBeNull();
  })

  it('test disposeDepthEChart if depth is null', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    depthChart.initDepthECharts(element)
    depthChart.setDepthOption(depthData)
    depthChart.depth = null;
    depthChart.disposeDepthEChart()
    expect(depthChart.depth).toBeNull();
  })

  it('test getDepthYAxis if platform is pc', () => {
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    let yAxis = depthChart.getDepthYAxis(element)
    expect(yAxis).toBe();
  })

  it('test getDepthYAxis if platform is mobile', () => {
    depthOption.platform = 'mobile'
    const element = document.createElement('div');
    let depthChart = new SetDepthChart(depthOption);
    let yAxis = depthChart.getDepthYAxis(element)
    expect(yAxis).not.toBeNull();
  })

})