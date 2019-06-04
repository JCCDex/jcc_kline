import SetROCChart from 'js/SetROCChart'
import { getROCData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

let ROCData = getROCData(testData.klineData)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'ROC',
    indicatorData: ROCData
}
let size = {
    height: 1080,
    width: 1920
}

describe('test SetROCChart', () => {
    it('test SetROCChart', () => {
        let roc = new SetROCChart(StochasticOption);
        expect(roc).toBeInstanceOf(SetROCChart)
    })

    it('test initROCECharts', () => {
        const element = document.createElement('div');
        let roc = new SetROCChart(StochasticOption);
        roc.initROCECharts(element)
        roc.initROCECharts(element, true)
        expect(roc).not.toBeNull();
    })

    it('test setROCOption', () => {
        const element = document.createElement('div');
        let roc = new SetROCChart(StochasticOption);
        roc.initROCECharts(element, false, 'init')
        roc.setROCOption(indicatorData, 'hour')
        expect(roc.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let roc = new SetROCChart(StochasticOption);
        roc.initROCECharts(element, false, 'init')
        roc.setROCOption(indicatorData, 'hour')
        roc.changeDataZoom('leftShift')
        expect(roc.indicator.getOption().dataZoom[0].start).toBe(28);
        expect(roc.indicator.getOption().dataZoom[0].end).toBe(98);
        roc.changeDataZoom('rightShift')
        expect(roc.indicator.getOption().dataZoom[0].start).toBe(30);
        expect(roc.indicator.getOption().dataZoom[0].end).toBe(100);
        roc.changeDataZoom('enlarge')
        expect(roc.indicator.getOption().dataZoom[0].start).toBe(35);
        roc.changeDataZoom('refresh')
        expect(roc.indicator.getOption().dataZoom[0].start).toBe(30);
        roc.changeDataZoom('narrow')
        expect(roc.indicator.getOption().dataZoom[0].start).toBe(25);
        roc.changeDataZoom('test')
        expect(roc.indicator.getOption().dataZoom[0].start).toBe(25);
    })

    it('test setROCOption if data is null', () => {
        const element = document.createElement('div');
        let roc = new SetROCChart(StochasticOption);
        roc.initROCECharts(element, false, 'init')
        roc.setROCOption(null, 'hour')
        expect(roc.indicator.getOption()).not.toBeNull();
    })

    it('test updateROCOption', () => {
        const element = document.createElement('div');
        let roc = new SetROCChart(StochasticOption);
        roc.initROCECharts(element, false, 'init')
        roc.setROCOption(indicatorData, 'hour')
        roc.updateROCOption(indicatorData, 'week')
        expect(roc.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let roc = new SetROCChart(StochasticOption);
        roc.initROCECharts(element, false, 'init')
        roc.setROCOption(indicatorData, 'hour')
        let tipData = roc.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeROCECharts', () => {
        const element = document.createElement('div');
        let roc = new SetROCChart(StochasticOption);
        roc.initROCECharts(element, false, 'init')
        roc.setROCOption(indicatorData, 'hour')
        roc.resizeROCECharts(element, false, size)
        expect(roc.indicator.getOption()).not.toBeNull();
    })

    it('test resizeROCECharts if DOM is null', () => {
        const element = document.createElement('div');
        let roc = new SetROCChart(StochasticOption);
        roc.initROCECharts(element, false, 'init')
        roc.setROCOption(indicatorData, 'aa')
        roc.resizeROCECharts(null, false, size)
        expect(roc.indicator.getOption()).not.toBeNull();
    })

    it('test resizeROCECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let roc = new SetROCChart(StochasticOption);
        roc.initROCECharts(element, false, 'init')
        roc.setROCOption(indicatorData, '5minute')
        roc.resizeROCECharts(element, true, size)
        expect(roc.indicator.getOption()).not.toBeNull();
    })

    it('test disposeROCEChart', () => {
        const element = document.createElement('div');
        let roc = new SetROCChart(StochasticOption);
        roc.initROCECharts(element, false, 'init')
        roc.setROCOption(indicatorData, 'hour')
        roc.disposeROCEChart()
        expect(roc.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let roc = new SetROCChart(StochasticOption);
        roc.initROCECharts(element, false, 'init')
        roc.setROCOption(indicatorData, 'week')
        expect(roc).not.toBeNull();
    })
})