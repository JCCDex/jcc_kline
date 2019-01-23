import TimeSharingChart from 'js/SetTimeSharingChart'
import timeSharingConfig from 'js/TimeSharingOption'
import timeSharingData from '../../../demo/src/timeSharingData.json'

describe('test setTimeSharingChart', () => {

  it('test TimeSharingChart', () => {
    timeSharingConfig.platform = 'pc'
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    expect(TimeSharing).toBeInstanceOf(TimeSharingChart)
  })

  it('test getTimeSharingGrid', () => {
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    expect(TimeSharing.getTimeSharingGrid()).not.toBeNull()
  })

  it('test getTimeSharingXAxis', () => {
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    expect(TimeSharing.getTimeSharingXAxis()).not.toBeNull()
  })

  it('test getTimeSharingToolTip', () => {
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    expect(TimeSharing.getTimeSharingToolTip()).not.toBeNull()
  })

  it('test getTimeSharingSeries', () => {
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    expect(TimeSharing.getTimeSharingSeries()).not.toBeNull()
  })

  it('test getTimeSharingDataZoom', () => {
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    expect(TimeSharing.getTimeSharingDataZoom()).not.toBeNull()
  })

  it('test initTimeSharingECharts', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    expect(TimeSharing).not.toBeNull();
  })

  it('test showLoading', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.showLoading()
    expect(TimeSharing).not.toBeNull();
  })

  it('test setTimeSharingOption', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test updateTimeSharingOption', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.updateTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test getTimeSharingTipData', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.updateTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    let tipData = TimeSharing.getTimeSharingTipData()
    expect(tipData).not.toBeNull();
  })

  

  it('test resizeECharts if is fullScreen', () => {
    const element = document.createElement('div');
    timeSharingConfig.platform = 'pc'
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.updateTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.resizeECharts(element, true)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen but oldTimeSharingData is null', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.resizeECharts(element, true)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test resizeECharts if not fullScreen', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.resizeECharts(element, false)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })


  it('test clearTimeSharingEcharts', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.clearTimeSharingEcharts()
    expect(TimeSharing.timeSharing.getOption().series).toEqual(new Array);
  })

  it('test disposeTimeSharingEChart', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.disposeTimeSharingEChart()
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test disposeTimeSharingEChart if timeSharing is null', () => {
    const element = document.createElement('div');
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.timeSharing = null;
    TimeSharing.disposeTimeSharingEChart()
    expect(TimeSharing.timeSharing).toBeNull();
  })

  it('test resizeECharts but platfotm is mobile', () => {
    const element = document.createElement('div');
    timeSharingConfig.platform = 'mobile'
    timeSharingConfig.size = {
      height: 500,
      weight: 780
    }
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    TimeSharing.initTimeSharingECharts(element)
    TimeSharing.setTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.updateTimeSharingOption(timeSharingData.timeDivisionData, timeSharingData.divisionData)
    TimeSharing.resizeECharts(element, true)
    expect(TimeSharing.timeSharing.getOption()).not.toBeNull();
  })

  it('test getTimeSharingGrid if platform is mobile', () => {
    timeSharingConfig.platform = 'mobile'
    let TimeSharing = new TimeSharingChart(timeSharingConfig);
    expect(TimeSharing.getTimeSharingGrid()).not.toBeNull()
  })

})