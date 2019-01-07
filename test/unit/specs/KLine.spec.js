import klineController from 'js/KLine.js'

describe('test KLineSetChart', () => {
  it('has a created hook', () => {
    expect(typeof klineController).toBe('function')
  })

  it('test klineController', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let klineConfig = {
      backgroundColor: '#1ad2b4'
    }
    let kline = new klineController('pc', klineConfig, showIndicators)
    expect(kline).toBeInstanceOf(klineController)
  })

  it('test initChart', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let kline = new klineController('pc', '', showIndicators)
    const element = document.createElement('div');
    kline.initChart(element)
    expect(kline).toBe()
  })

})