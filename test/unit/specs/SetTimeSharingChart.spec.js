import TimeSharingChart from 'js/setTimeSharingChart'
import timeSharingData from '../../../demo/src/timeSharingData.json'

describe('test setTimeSharingChart', () => {

  let klineConfig = {
      platform: 'pc',
      chartType: 'timeSharing'
    }

  it('test TimeSharingChart', () => {
    let TimeSharing = new TimeSharingChart(klineConfig);
    expect(TimeSharing).toBeInstanceOf(TimeSharingChart)
  })

  it('test getTimeSharingGrid', () => {
    let TimeSharing = new TimeSharingChart(klineConfig);
    expect(TimeSharing.getTimeSharingGrid()).not.toBeNull()
  })

  it('test getTimeSharingXAxis', () => {
    let TimeSharing = new TimeSharingChart(klineConfig);
    expect(TimeSharing.getTimeSharingXAxis()).not.toBeNull()
  })

  it('test getTimeSharingYAxis', () => {
    let TimeSharing = new TimeSharingChart(klineConfig);
    expect(TimeSharing.getTimeSharingYAxis()).not.toBeNull()
  })

  it('test getTimeSharingToolTip', () => {
    let TimeSharing = new TimeSharingChart(klineConfig);
    expect(TimeSharing.getTimeSharingToolTip()).not.toBeNull()
  })

  it('test getTimeSharingSeries', () => {
    let TimeSharing = new TimeSharingChart(klineConfig);
    expect(TimeSharing.getTimeSharingSeries()).not.toBeNull()
  })

  it('test getTimeSharingDataZoom', () => {
    let TimeSharing = new TimeSharingChart(klineConfig);
    expect(TimeSharing.getTimeSharingDataZoom()).not.toBeNull()
  })

  it('test initTimeSharingECharts', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    expect(TimeSharing).not.toBeNull();
  })

  it('test showLoading', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.showLoading()
    expect(TimeSharing).not.toBeNull();
  })

  it('test setTimeSharingOption', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption()
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test updateTimeSharingOption', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption()
    TimeSharing.updateTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test getDepthTipData', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption()
    TimeSharing.updateTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    let tipData = TimeSharing.getDepthTipData()
    expect(tipData).not.toBeNull();
  })

  it('test resizeECharts but platfotm is mobile', () => {
    const element = document.createElement('div');
    klineConfig.platform = 'mobile'
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption()
    TimeSharing.updateTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.resizeECharts(element, true)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen', () => {
    const element = document.createElement('div');
    klineConfig.platform = 'pc'
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption()
    TimeSharing.updateTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.resizeECharts(element, true)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen but oldTimeSharingData is null', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption()
    TimeSharing.resizeECharts(element, true)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if not fullScreen', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption()
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })


  it('test clearTimeSharingEcharts', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption()
    TimeSharing.clearTimeSharingEcharts()
    expect(TimeSharing.timeSharing.getOption().series).toEqual(new Array);
  })

  it('test disposeTimeSharingEChart', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption()
    TimeSharing.disposeTimeSharingEChart()
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test disposeTimeSharingEChart if timeSharing is null', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(klineConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption()
    TimeSharing.timeSharing = null;
    TimeSharing.disposeTimeSharingEChart()
    expect(TimeSharing.timeSharing).toBeNull();
  })

})