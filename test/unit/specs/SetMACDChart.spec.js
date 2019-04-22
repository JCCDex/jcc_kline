import SetMACDChart from 'js/SetMACDChart'
import { macdOption } from 'js/MACDOption'
import macdData from '../../testData/macdData.json'

macdOption.platform = 'pc'
macdOption.chartType = 'macd'
macdOption.defaultSize = true
// let depthData = getDepthData(testData.depthData, testData.coinType)
// let pcData = splitData(testData.klineData)
// let data = Object.assign({}, pcData, depthData);

describe('test SetMACDChart', () => {

    it('test SetMACDChart', () => {
        let macd = new SetMACDChart(macdOption);
        expect(macd).toBeInstanceOf(SetMACDChart)
    })

    it('test getMACDSeries', () => {
        let macd = new SetMACDChart(macdOption);
        expect(macd.getMACDSeries(macdData)).not.toBeNull()
    })

    it('test getMACDXAxis', () => {
        let macd = new SetMACDChart(macdOption);
        expect(macd.getMACDXAxis(macdData)).not.toBeNull()
    })

    it('test initMACD', () => {
        const element = document.createElement('div');
        let macd = new SetMACDChart(macdOption);
        macd.initMACD(element)
        macd.initMACD(element, true)
        expect(macd).not.toBeNull();
    })

    it('test showLoading', () => {
        const element = document.createElement('div');
        let macd = new SetMACDChart(macdOption);
        macd.initMACD(element)
        macd.showLoading()
        expect(macd).not.toBeNull();
    })

    // it('test setMACDOption', () => {
    //     const element = document.createElement('div');
    //     let macdChart = new SetMACDChart(macdOption);
    //     macdChart.initMACD(element)
    //     macdChart.setMACDOption(macdData)
    //     expect(macdChart.macd.getOption()).not.toBeNull();
    // })
    
    it('test setMACDOption if data is null', () => {
        const element = document.createElement('div');
        let macdChart = new SetMACDChart(macdOption);
        macdChart.initMACD(element)
        macdChart.setMACDOption(null)
        expect(macdChart.macd.getOption()).not.toBeNull();
    })

    // it('test updateMACDOption', () => {
    //     const element = document.createElement('div');
    //     let macdChart = new SetMACDChart(macdOption);
    //     macdChart.initMACD(element)
    //     macdChart.setMACDOption(macdData)
    //     macdChart.updateMACDOption(macdData)
    //     expect(macdChart.macd.getOption()).not.toBeNull();
    // })
})
