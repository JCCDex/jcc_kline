import klineController from 'js/KLine.js'

describe('test KLineSetChart', () => {
  it('has a created hook', () => {
    expect(typeof klineController).toBe('function')
  })

  it('test klineController if platform is pc', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let klineConfig = {
      backgroundColor: '#1ad2b4'
    }
    let kline = new klineController('pc', klineConfig, showIndicators)
    expect(kline).toBeInstanceOf(klineController)
  })

  it('test initChart if platform is pc', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let kline = new klineController('pc', '', showIndicators)
    const element = document.createElement('div');
    kline.initChart(element)
    expect(kline).not.toBeNull()
  })

  it('test initChart if platform is mobile', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let kline = new klineController('mobile', '', showIndicators)
    const element = document.createElement('div');
    kline.initMobileChart(element)
    expect(kline.setMobileKLineChart).not.toBeNull()
  })

})