import SetPSYChart from 'js/SetPSYChart'
import { getPSYData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

StochasticOption.platform = 'pc'
let PSYData = getPSYData(testData.klineData)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'PSY',
    indicatorData: PSYData
}
let size = {
    height: 1080,
    width: 1920
}

describe('test SetPSYChart', () => {
    it('test SetPSYChart', () => {
        let psy = new SetPSYChart(StochasticOption);
        expect(psy).toBeInstanceOf(SetPSYChart)
    })

    it('test initPSYECharts', () => {
        const element = document.createElement('div');
        let psy = new SetPSYChart(StochasticOption);
        psy.initPSYECharts(element)
        psy.initPSYECharts(element, true)
        expect(psy).not.toBeNull();
    })

    it('test setPSYOption', () => {
        const element = document.createElement('div');
        let psy = new SetPSYChart(StochasticOption);
        psy.initPSYECharts(element, false, 'init')
        psy.setPSYOption(indicatorData, 'hour')
        expect(psy.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let psy = new SetPSYChart(StochasticOption);
        psy.initPSYECharts(element, false, 'init')
        psy.setPSYOption(indicatorData, 'hour')
        psy.changeDataZoom('leftShift')
        expect(psy.indicator.getOption().dataZoom[0].start).toBe(13);
        expect(psy.indicator.getOption().dataZoom[0].end).toBe(98);
        psy.changeDataZoom('rightShift')
        expect(psy.indicator.getOption().dataZoom[0].start).toBe(15);
        expect(psy.indicator.getOption().dataZoom[0].end).toBe(100);
        psy.changeDataZoom('enlarge')
        expect(psy.indicator.getOption().dataZoom[0].start).toBe(20);
        psy.changeDataZoom('refresh')
        expect(psy.indicator.getOption().dataZoom[0].start).toBe(15);
        psy.changeDataZoom('narrow')
        expect(psy.indicator.getOption().dataZoom[0].start).toBe(10);
        psy.changeDataZoom('test')
        expect(psy.indicator.getOption().dataZoom[0].start).toBe(10);
    })

    it('test setPSYOption if data is null', () => {
        const element = document.createElement('div');
        let psy = new SetPSYChart(StochasticOption);
        psy.initPSYECharts(element, false, 'init')
        psy.setPSYOption(null, 'hour')
        expect(psy.indicator.getOption()).not.toBeNull();
    })

    it('test updatePSYOption', () => {
        const element = document.createElement('div');
        let psy = new SetPSYChart(StochasticOption);
        psy.initPSYECharts(element, false, 'init')
        psy.setPSYOption(indicatorData, 'hour')
        psy.updatePSYOption(indicatorData, 'week')
        expect(psy.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let psy = new SetPSYChart(StochasticOption);
        psy.initPSYECharts(element, false, 'init')
        psy.setPSYOption(indicatorData, 'hour')
        let tipData = psy.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizePSYECharts', () => {
        const element = document.createElement('div');
        let psy = new SetPSYChart(StochasticOption);
        psy.initPSYECharts(element, false, 'init')
        psy.setPSYOption(indicatorData, 'hour')
        psy.resizePSYECharts(element, false, size)
        expect(psy.indicator.getOption()).not.toBeNull();
    })

    it('test resizePSYECharts if DOM is null', () => {
        const element = document.createElement('div');
        let psy = new SetPSYChart(StochasticOption);
        psy.initPSYECharts(element, false, 'init')
        psy.setPSYOption(indicatorData, 'aa')
        psy.resizePSYECharts(null, false, size)
        expect(psy.indicator.getOption()).not.toBeNull();
    })

    it('test resizePSYECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let psy = new SetPSYChart(StochasticOption);
        psy.initPSYECharts(element, false, 'init')
        psy.setPSYOption(indicatorData, '5minute')
        psy.resizePSYECharts(element, true, size)
        expect(psy.indicator.getOption()).not.toBeNull();
    })

    it('test disposePSYEChart', () => {
        const element = document.createElement('div');
        let psy = new SetPSYChart(StochasticOption);
        psy.initPSYECharts(element, false, 'init')
        psy.setPSYOption(indicatorData, 'hour')
        psy.disposePSYEChart()
        expect(psy.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let psy = new SetPSYChart(StochasticOption);
        psy.initPSYECharts(element, false, 'init')
        psy.setPSYOption(indicatorData, 'week')
        expect(psy).not.toBeNull();
    })
})