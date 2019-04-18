import { splitData, getDepthData, handleDivisionData } from 'js/processData'
import testData from '../../testData/data.json'
import data from '../../testData/testData.json'
import { getKDJData } from '../../../src/js/processData.js';

let precision = {
  price: 6,
  amount: 2
}

describe('test processData', () => {
  it('test splitData', () => {
    let splitdata = splitData(testData.klineData, 'pc')
    expect(splitdata.categoryData).not.toBeNull()
    expect(splitdata.values).not.toBeNull()
    expect(splitdata.volumes).not.toBeNull()
  })

  it('test splitData if platform is mobile', () => {
    let splitdata = splitData(testData.klineData, 'mobile')
    expect(splitdata.categoryData).not.toBeNull()
    expect(splitdata.values).not.toBeNull()
    expect(splitdata.volumes).not.toBeNull()
  })

  it('test splitData if platform is mobile and klineData length less than  100', () => {
    let splitdata = splitData(testData.klineData.slice(0, 50), 'mobile')
    expect(splitdata.categoryData).not.toBeNull()
    expect(splitdata.values).not.toBeNull()
    expect(splitdata.volumes).not.toBeNull()
  })

  it('test splitData, no data', () => {
    let splitdata = splitData(null, 'pc')
    expect(splitdata).toBeUndefined
  })

  it('test splitData, no platform', () => {
    let splitdata = splitData(testData.klineData, null)
    expect(splitdata.categoryData).not.toBeNull()
    expect(splitdata.values).not.toBeNull()
    expect(splitdata.volumes).not.toBeNull()
  })

  it('test getDepthData', () => {
    let data = getDepthData(testData.depthData, precision)
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

  it('test getDepthData, no data', () => {
    let data = getDepthData(null, precision)
    expect(data).not.toBeUndefined
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

})