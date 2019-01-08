import { splitData, getDepthData, handleDivisionData, calculateMA, indicatorsOption, mobileIndicatorsOption } from 'js/processData'
import testData from '../../../demo/src/data.json'

describe('test processData', () => {
  it('test splitData', () => {
    let splitdata = splitData(testData.klineData, 'pc')
    expect(splitdata.categoryData).not.toBeNull()
    expect(splitdata.values).not.toBeNull()
    expect(splitdata.volumes).not.toBeNull()
  })

  it('test getDepthData', () => {
    let data = getDepthData(testData.depthData, testData.coinType)
    expect(data).not.toBeNull()
    expect(data.maxAmount).not.toBeNull()
    expect(data.maxBuyPrice).not.toBeNull()
    expect(data.minBuyPrice).not.toBeNull()
    expect(data.maxSellPrice).not.toBeNull()
    expect(data.minSellPrice).not.toBeNull()
    expect(data.buyAmounts).not.toBeNull()
    expect(data.buyPrices).not.toBeNull()
    expect(data.sellPrices).not.toBeNull()
    expect(data.sellAmounts).not.toBeNull()
    expect(data.buyPercent).not.toBeNull()
    expect(data.sellPercent).not.toBeNull()
  })

  it('test handleDivisionData', () => {
    let data = handleDivisionData(testData.timeDivisionData)
    expect(data).not.toBeNull()
    expect(data.averages).not.toBeNull()
    expect(data.divisionTime).not.toBeNull()
    expect(data.prices).not.toBeNull()
    expect(data.times).not.toBeNull()
    expect(data.volumes).not.toBeNull()
  })

  it('test calculateMA', () => {
    let splitdata = splitData(testData.klineData, 'pc')
    let depthData = getDepthData(testData.depthData, testData.coinType)
    let data = Object.assign({}, splitdata, depthData);
    let MA5 = calculateMA(5, data)
    expect(MA5).not.toBeNull()
    let MA10 = calculateMA(10, data)
    expect(MA10).not.toBeNull()
  })

  it('test indicatorsOption', () => {
    let showIndicators1 = ['Candlestick', 'MA', 'Volume', 'MarketDepth']
    let option1 = indicatorsOption(showIndicators1)
    expect(option1).not.toBeNull()
    let showIndicators2 = ['Candlestick', 'MA', 'Volume']
    let option2 = indicatorsOption(showIndicators2)
    expect(option2).not.toBeNull()
    let showIndicators3 = ['Candlestick', 'MA']
    let option3 = indicatorsOption(showIndicators3)
    expect(option3).not.toBeNull()
  })

  it('test mobileIndicatorsOption', () => {
    let showIndicators1 = ['Candlestick', 'MA', 'Volume']
    let option1 = mobileIndicatorsOption(showIndicators1)
    expect(option1).not.toBeNull()
    let showIndicators2 = ['Candlestick', 'MA']
    let option2 = mobileIndicatorsOption(showIndicators2)
    expect(option2).not.toBeNull()
    let showIndicators3 = ['Candlestick']
    let option3 = mobileIndicatorsOption(showIndicators3)
    expect(option3).not.toBeNull()
  })
})