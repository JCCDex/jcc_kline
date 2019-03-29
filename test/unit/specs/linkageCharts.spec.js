import ChartController from 'js/Charts.js'
import klineController from 'js/KLine.js'
import { linkageVolume, linkageMacd, bindAction } from 'js/linkageCharts'
import testData from '../../testData/testData.json'

let data = testData.candleData
let volumeConfig = {
    platform: 'pc',
    chartType: 'volume',
    defaultSize: true
  }
let macdConfig = {
    platform: 'pc',
    chartType: 'MACD',
    defaultSize: true
  }
let klineConfig = {
    backgroundColor: '#1ad2b4',
    defaultMA: false,
    MA: [
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
      ]
}

describe('test linkageCharts', () => {

    it('test getVolumeEchart', () => {
        let kline = new klineController('pc', klineConfig)
        const element = document.createElement('div');
        kline.initChart(element)
        kline.setOption(data, 'hour')
        let klineChart = kline.getEchart()
        let volume = new ChartController(volumeConfig)
        volume.initVolumeChart(element)
        volume.setVolumeOption(data)
        let volumeChart = volume.getVolumeEchart()
        linkageVolume(klineChart, volumeChart)
        expect(klineChart).not.toBeNull()
      })

    it('test getVolumeEchart if volumeChart is null', () => {
      let kline = new klineController('pc', klineConfig)
      const element = document.createElement('div');
      kline.initChart(element)
      kline.setOption(data, 'hour')
      let klineChart = kline.getEchart()
      let volumeChart = null
      linkageVolume(klineChart, volumeChart)
      expect(klineChart).not.toBeNull()

  })

  it('test bindAction', () => {
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(data, 'hour')
    let klineChart = kline.getEchart()
    let volume = new ChartController(volumeConfig)
    volume.initVolumeChart(element)
    volume.setVolumeOption(data)
    let volumeChart = volume.getVolumeEchart()
    bindAction(klineChart, volumeChart)
    expect(klineChart).not.toBeNull()
})


  it('test linkageMacd', () => {
    let kline = new klineController('pc', klineConfig)
    const element = document.createElement('div');
    kline.initChart(element)
    kline.setOption(data, 'hour')
    let klineChart = kline.getEchart()

    let macd = new ChartController(macdConfig)
    macd.initMACDECharts(element)
    macd.setMACDOption(data)

    linkageMacd(klineChart, macd)
})

})