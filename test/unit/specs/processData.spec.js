import { splitData, getDepthData, handleDivisionData, calculateMA, getOBVData, getDMIData, getRSIData, getTRIXData, getBollData } from 'js/processData'
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

  it('test calculateMA', () => {
    let splitdata = splitData(testData.klineData, 'pc')
    let depthData = getDepthData(testData.depthData, precision)
    let data = Object.assign({}, splitdata, depthData);
    let MA5 = calculateMA(5, data)
    expect(MA5).not.toBeNull()
    let MA10 = calculateMA(10, data)
    expect(MA10).not.toBeNull()
  })

  it('test calculateMA if value is NaN', () => {
    let splitdata = splitData(testData.klineData, 'pc')
    let depthData = getDepthData(testData.depthData, precision)
    let data = Object.assign({}, splitdata, depthData);
    data.values.push([1, 'aaa', 123213])
    let MA5 = calculateMA(5, data)
    expect(MA5).not.toBeNull()
  })

  it('test getKDJData', () => {
    let KDJData = getKDJData(9, testData.klineData)
    expect(KDJData).not.toBeNull()
  })

  it('test getKDJData if data is null', () => {
    let KDJData = getKDJData(9, null)
    expect(KDJData).toBe(undefined)
  })

  it('test getOBVData', () => {
    let OBVData = getOBVData(testData.klineData)
    expect(OBVData).not.toBeNull()
  })

  it('test getOBVData if data is null', () => {
    let OBVData = getOBVData(null)
    expect(OBVData).toBe(undefined)
  })

  it('test getDMIData', () => {
    let DMIData = getDMIData(data.candleData.values)
    expect(DMIData).not.toBeNull()
  })

  it('test getDMIData if data is null', () => {
    let DMIData = getDMIData(null)
    expect(DMIData).toBe(undefined)
  })

  it('test getTRIXData', () => {
    let TRIXData = getTRIXData(data.candleData.values)
    expect(TRIXData).not.toBeNull()
  })

  it('test getTRIXData if data is null', () => {
    let TRIXData = getTRIXData(null)
    expect(TRIXData).toBe(undefined)
  })

  it('test getRSIData', () => {
    let RSIData = getRSIData(data.candleData.values, 6)
    expect(RSIData).not.toBeNull()
  })

  it('test getRSIData if data is null', () => {
    let RSIData = getRSIData(null)
    expect(RSIData).toBe(undefined)
  })

  it('test getBollData', () => {
    let bollData = getBollData(data.candleData, 20)
    expect(bollData).not.toBeNull()
  })

  it('test getBollData if data is null', () => {
    let bollData = getBollData(null, 20)
    expect(bollData).toBe(undefined)
  })

})