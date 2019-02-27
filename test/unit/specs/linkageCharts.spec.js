import ChartController from 'js/Charts.js'
import klineController from 'js/KLine.js'
import { linkageVolume } from 'js/linkageCharts'
import { splitData, getDepthData } from 'js/processData'
import testData from '../../testData/data.json'

let precision = {
    price: 6,
    amount: 2
}
let depthData = getDepthData(testData.depthData, testData.coinType, precision)
let pcData = splitData(testData.klineData, 'pc')
let data = Object.assign({}, pcData, depthData);
data.precision = precision
let volumeConfig = {
    platform: 'pc',
    chartType: 'volume',
    defaultSize: true
  }
let klineConfig = {
    backgroundColor: '#1ad2b4',
    defaultMA: false,
    MA: [
        {
            name: 'MA3',
            color: '#67ff7c'
        },
        {
            name: 'MA10',
            color: '#ff4d71'
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
    })

})