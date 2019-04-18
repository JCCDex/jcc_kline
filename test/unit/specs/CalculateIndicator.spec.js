import { splitData, getDepthData } from 'js/processData'
import { calculateMA, getOBVData, getKDJData, getDMIData, getRSIData, getTRIXData, getBollData, getMTMData } from 'js/CalculateIndicator'
import testData from '../../testData/data.json'
import data from '../../testData/testData.json'

let precision = {
  price: 6,
  amount: 2
}

describe('test CalculateIndicator', () => {
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

  it('test getMTMData', () => {
    let MTMData = getMTMData(testData.klineData)
    expect(MTMData).not.toBeNull()
  })

  it('test getMTMData if data is null', () => {
    let MTMData = getMTMData(null)
    expect(MTMData).toBe(undefined)
  })

})