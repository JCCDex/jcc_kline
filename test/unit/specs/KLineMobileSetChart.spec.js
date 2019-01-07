import klineMobileSetChart from 'js/KLineMobileSetChart'
import mobileOption from 'js/KLineMobileOption'
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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

  it('test DOM', () => {
    let showIndicators = ['Candlestick', 'MA', 'Volume']
    let div = '<div id="kline" style="height: 750px; width: 1125px; position: relative; background: rgb(22, 27, 33);"><div style="position: relative; width: 1125px; height: 750px;border-width: 0px;"><canvas width="3375" height="2250" style="position: absolute; width: 1125px; height: 750px;"></canvas><canvas width="3375" height="2250" style="position: absolute; width: 1125px; height: 750px;"></canvas></div><div></div></div>'
    const { document } = (new JSDOM(div)).window;
    let mobileKline = new klineMobileSetChart(mobileOption, showIndicators);
    expect(mobileKline.initMobileECharts(document)).toBe()
  })

})