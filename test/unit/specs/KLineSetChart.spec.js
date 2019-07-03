import klineSetChart from 'js/KLineSetChart'
import option from 'js/KLineOption'
import testData from '../../testData/testData.json'

describe('test KLineSetChart', () => {

  let klineData = testData.candleData
  klineData.indicatorType = "Boll"
  option.defaultMA = false
  option.MAIndex = 1
  option.MA = [
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
  
  it('test klineSetChart', () => {
    let kline = new klineSetChart(option);
    expect(kline).toBeInstanceOf(klineSetChart)
  })

  it('test getXAxis', () => {
    let kline = new klineSetChart(option);
    expect(kline.getXAxis(klineData, 'hour')).not.toBeNull()
    expect(kline.getXAxis(klineData, 'day')).not.toBeNull()
    expect(kline.getXAxis(klineData, 'week')).not.toBeNull()
    expect(kline.getXAxis(klineData, 'month')).not.toBeNull()
  })

  it('test getToolTip', () => {
    let kline = new klineSetChart(option);
    expect(kline.getToolTip(klineData)).not.toBeNull()
  })

  it('test getSeries', () => {
    let kline = new klineSetChart(option);
    expect(kline.getSeries(klineData)).not.toBeNull()
  })

  it('test getDataZoom', () => {
    let kline = new klineSetChart(option);
    expect(kline.getDataZoom(klineData)).not.toBeNull()
  })

  it('test initECharts', () => {
    const element = document.createElement('div');
    let kline = new klineSetChart(option);
    kline.initECharts(element, false)
    expect(kline).not.toBeNull();
  })

  it('test setOption if cycle is hour and data length less than 80', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    let testKlineData = {
      categoryData: klineData.categoryData.slice(0, 60),
      values: klineData.values.slice(0, 60),
      volumes: klineData.volumes.slice(0, 60),
      MAData: klineData.MAData.slice(0, 60),
      precision: klineData.precision
    }
    klineChart.setOption(testKlineData, 'hour')
    klineChart.initECharts(element, true)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption if cycle is week and data length less than 120', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineData.precision.price = 5
    klineData.precision.amount = 1
    let testKlineData = {
      categoryData: klineData.categoryData.slice(0, 100),
      values: klineData.values.slice(0, 100),
      volumes: klineData.volumes.slice(0, 100),
      MAData: klineData.MAData.slice(0, 100),
      precision: klineData.precision
    }
    klineChart.setOption(testKlineData, 'week')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption if cycle is month and data length less than 160', () => {
    klineData.indicatorType = ""
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    let testKlineData = {
      categoryData: klineData.categoryData.slice(0, 130),
      values: klineData.values.slice(0, 130),
      volumes: klineData.volumes.slice(0, 130),
      MAData: klineData.MAData.slice(0, 130),
      precision: klineData.precision
    }
    klineChart.setOption(testKlineData, 'month')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption but klineData is null', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineChart.setOption(null, 'day')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption if showIndicator not MarketDepth and data length less than 200', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    let testKlineData = {
      categoryData: klineData.categoryData.slice(0, 180),
      values: klineData.values.slice(0, 180),
      volumes: klineData.volumes.slice(0, 180),
      MAData: klineData.MAData.slice(0, 180),
      precision: klineData.precision
    }
    klineChart.setOption(testKlineData, '5minute')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption if showIndicator not MarketDepth, Volume and data length more than 200', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    let testKlineData = {
      categoryData: klineData.categoryData.slice(0, 210),
      values: klineData.values.slice(0, 210),
      volumes: klineData.volumes.slice(0, 210),
      MAData: klineData.MAData.slice(0, 210),
      precision: klineData.precision
    }
    klineChart.setOption(testKlineData, 'day')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test setOption if showIndicator not MarketDepth, Volume, MA', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'aa')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test updateOption', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.updateOption(klineData, 'hour')
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test getToolTipIndex', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    let tipData = klineChart.getToolTipIndex()
    expect(tipData).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen', () => {
    window.innerWidth = 1200;
    const element = document.createElement('div');
    option.size = {
      width: 600,
      height: 500
    }
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, true)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if not fullScreen', () => {
    window.innerWidth = 1360;
    const element = document.createElement('div');
    let size = {
      width: 600,
      height: 500
    }
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, false, false, size)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if is fullScreen and defaultSize is true', () => {
    window.innerWidth = 1430;
    const element = document.createElement('div');
    option.defaultSize = true;
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, true)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if not fullScreen', () => {
    window.innerWidth = 1600;
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(element, false)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test resizeECharts if DOM is null', () => {
    window.innerWidth = 1920;
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.resizeECharts(null, false)
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

  it('test changeDataZoom', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.changeDataZoom('leftShift')
    expect(klineChart.kline.getOption().dataZoom[0].start).toBe(43)
    expect(klineChart.kline.getOption().dataZoom[0].end).toBe(98)
    klineChart.changeDataZoom('enlarge')
    expect(klineChart.kline.getOption().dataZoom[0].start).toBe(48)
    expect(klineChart.kline.getOption().dataZoom[0].end).toBe(98)
    klineChart.changeDataZoom('rightShift')
    expect(klineChart.kline.getOption().dataZoom[0].start).toBe(50)
    expect(klineChart.kline.getOption().dataZoom[0].end).toBe(100)
    klineChart.changeDataZoom('refresh')
    expect(klineChart.kline.getOption().dataZoom[0].start).toBe(45)
    expect(klineChart.kline.getOption().dataZoom[0].end).toBe(100)
    klineChart.changeDataZoom('narrow')
    expect(klineChart.kline.getOption().dataZoom[0].start).toBe(40)
    expect(klineChart.kline.getOption().dataZoom[0].end).toBe(100)
  })

  it('test disposeEChart', () => {
    const element = document.createElement('div');
    let klineChart = new klineSetChart(option);
    klineChart.initECharts(element)
    klineChart.setOption(klineData, 'hour')
    klineChart.disposeEChart()
    expect(klineChart.kline.getOption()).not.toBeNull();
  })

})