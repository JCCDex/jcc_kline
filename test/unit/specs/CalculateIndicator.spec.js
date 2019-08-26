import { splitData, getDepthData, calculateMA } from 'js/processData'
import { getOBVData, getKDJData, getDMIData, getRSIData, getTRIXData, getBollData, getMTMData, getBRARData, getPSYData, getROCData, getWRData, getVRData, getDMAData, getSARData } from 'js/CalculateIndicator'
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

  it('test getBRARData', () => {
    let BRARData = getBRARData(data.candleData.values, 24)
    expect(BRARData).not.toBeNull()
  })

  it('test getBRARData if data is null', () => {
    let BRARData = getBRARData(null, 24)
    expect(BRARData).toBe(undefined)
  })

  it('test getPSYData', () => {
    let PSYData = getPSYData(testData.klineData)
    expect(PSYData).not.toBeNull()
  })

  it('test getPSYData if data is null', () => {
    let PSYData = getPSYData(null)
    expect(PSYData).toBe(undefined)
  })

  it('test getROCData', () => {
    let ROCData = getROCData(testData.klineData)
    expect(ROCData).not.toBeNull()
  })

  it('test getROCData if data is null', () => {
    let ROCData = getROCData(null)
    expect(ROCData).toBe(undefined)
  })

  it('test getWRData', () => {
    let WRData = getWRData(testData.klineData)
    expect(WRData).not.toBeNull()
  })

  it('test getWRData if data is null', () => {
    let WRData = getWRData(null)
    expect(WRData).toBe(undefined)
  })


  it('test getVRData', () => {
    let VRData = getVRData(testData.klineData)
    expect(VRData).not.toBeNull()
  })

  it('test getVRData if data is null', () => {
    let VRData = getVRData(null)
    expect(VRData).toBe(undefined)
  })

  it('test getDMAData', () => {
    let DMAData = getDMAData(data.candleData)
    expect(DMAData).not.toBeNull()
  })


  it('test getDMAData if data is null', () => {
    let DMAData = getDMAData(null)
    expect(DMAData).toBe(undefined)
  })

  it('test getSARData', () => {
    let SARData = getSARData(data.candleData)
    expect(SARData).not.toBeNull()
  })

  it('test getSARData  if data is null', () => {
    let SARData = getSARData(null)
    expect(SARData).toBe(undefined)
  })

})