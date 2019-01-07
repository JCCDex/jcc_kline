import klineMobileSetChart from 'js/KLineMobileSetChart'
import mobileOption from 'js/KLineMobileOption'

describe('test KLineMobileSetChart', () => {
    
  it('test KLineMobileSetChart', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    expect(mobileKline).toBeInstanceOf(klineMobileSetChart)
  })

  it('test getGrid', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    let size = {
      height: 1000,
      width: 780
    }
    expect(mobileKline.getGrid(size)).not.toBeNull()
  })

  it('test getYAxis', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    let size = {
      height: 1000,
      width: 780
    }
    expect(mobileKline.getYAxis(size)).not.toBeNull()
  })

  it('test initMobileECharts', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    const element = document.createElement('div');
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    mobileKline.initMobileECharts(element)
    expect(mobileKline.kline).not.toBeNull();
  })

})