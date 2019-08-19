import SetOBVChart from 'js/SetOBVChart'
import { getOBVData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

StochasticOption.platform = 'pc'
let OBVData = getOBVData(testData.klineData)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'OBV',
    indicatorData: OBVData
}
let size = {
    height: 1080,
    width: 1920
}

describe('test SetOBVChart', () => {
    it('test SetOBVChart', () => {
        let obv = new SetOBVChart(StochasticOption);
        expect(obv).toBeInstanceOf(SetOBVChart)
    })

    it('test initOBVECharts', () => {
        const element = document.createElement('div');
        let obv = new SetOBVChart(StochasticOption);
        obv.initOBVECharts(element)
        obv.initOBVECharts(element, true)
        expect(obv).not.toBeNull();
    })

    it('test setOBVOption', () => {
        const element = document.createElement('div');
        let obv = new SetOBVChart(StochasticOption);
        obv.initOBVECharts(element, false, 'init')
        obv.setOBVOption(indicatorData, 'hour')
        expect(obv.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let obv = new SetOBVChart(StochasticOption);
        obv.initOBVECharts(element, false, 'init')
        obv.setOBVOption(indicatorData, 'hour')
        obv.changeDataZoom('leftShift')
        expect(obv.indicator.getOption().dataZoom[0].start).toBe(13);
        expect(obv.indicator.getOption().dataZoom[0].end).toBe(98);
        obv.changeDataZoom('rightShift')
        expect(obv.indicator.getOption().dataZoom[0].start).toBe(15);
        expect(obv.indicator.getOption().dataZoom[0].end).toBe(100);
        obv.changeDataZoom('enlarge')
        expect(obv.indicator.getOption().dataZoom[0].start).toBe(20);
        obv.changeDataZoom('refresh')
        expect(obv.indicator.getOption().dataZoom[0].start).toBe(15);
        obv.changeDataZoom('narrow')
        expect(obv.indicator.getOption().dataZoom[0].start).toBe(10);
        obv.changeDataZoom('test')
        expect(obv.indicator.getOption().dataZoom[0].start).toBe(10);
    })

    it('test setOBVOption if data is null', () => {
        const element = document.createElement('div');
        let obv = new SetOBVChart(StochasticOption);
        obv.initOBVECharts(element, false, 'init')
        obv.setOBVOption(null, 'hour')
        expect(obv.indicator.getOption()).not.toBeNull();
    })

    it('test updateOBVOption', () => {
        const element = document.createElement('div');
        let obv = new SetOBVChart(StochasticOption);
        obv.initOBVECharts(element, false, 'init')
        obv.setOBVOption(indicatorData, 'hour')
        obv.updateOBVOption(indicatorData, 'week')
        expect(obv.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let obv = new SetOBVChart(StochasticOption);
        obv.initOBVECharts(element, false, 'init')
        obv.setOBVOption(indicatorData, 'hour')
        let tipData = obv.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeOBVECharts', () => {
        const element = document.createElement('div');
        let obv = new SetOBVChart(StochasticOption);
        obv.initOBVECharts(element, false, 'init')
        obv.setOBVOption(indicatorData, 'hour')
        obv.resizeOBVECharts(element, false, size)
        expect(obv.indicator.getOption()).not.toBeNull();
    })

    it('test resizeOBVECharts if DOM is null', () => {
        const element = document.createElement('div');
        let obv = new SetOBVChart(StochasticOption);
        obv.initOBVECharts(element, false, 'init')
        obv.setOBVOption(indicatorData, 'aa')
        obv.resizeOBVECharts(null, false, size)
        expect(obv.indicator.getOption()).not.toBeNull();
    })

    it('test resizeOBVECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let obv = new SetOBVChart(StochasticOption);
        obv.initOBVECharts(element, false, 'init')
        obv.setOBVOption(indicatorData, '5minute')
        obv.resizeOBVECharts(element, true, size)
        expect(obv.indicator.getOption()).not.toBeNull();
    })

    it('test disposeOBVEChart', () => {
        const element = document.createElement('div');
        let obv = new SetOBVChart(StochasticOption);
        obv.initOBVECharts(element, false, 'init')
        obv.setOBVOption(indicatorData, 'hour')
        obv.disposeOBVEChart()
        expect(obv.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let obv = new SetOBVChart(StochasticOption);
        obv.initOBVECharts(element, false, 'init')
        obv.setOBVOption(indicatorData, 'week')
        expect(obv).not.toBeNull();
    })
})