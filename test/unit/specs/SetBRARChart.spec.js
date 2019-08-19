import SetBRARChart from 'js/SetBRARChart'
import { getBRARData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

StochasticOption.platform = 'pc'
let BRARData = getBRARData(testData.klineData)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'BRAR',
    indicatorData: BRARData
}
let size = {
    height: 1080,
    width: 1920
}

describe('test SetBRARChart', () => {
    it('test SetBRARChart', () => {
        let brar = new SetBRARChart(StochasticOption);
        expect(brar).toBeInstanceOf(SetBRARChart)
    })

    it('test initBRARECharts', () => {
        const element = document.createElement('div');
        let brar = new SetBRARChart(StochasticOption);
        brar.initBRARECharts(element)
        brar.initBRARECharts(element, true)
        expect(brar).not.toBeNull();
    })

    it('test setBRAROption', () => {
        const element = document.createElement('div');
        let brar = new SetBRARChart(StochasticOption);
        brar.initBRARECharts(element, false, 'init')
        brar.setBRAROption(indicatorData, 'hour')
        expect(brar.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let brar = new SetBRARChart(StochasticOption);
        brar.initBRARECharts(element, false, 'init')
        brar.setBRAROption(indicatorData, 'hour')
        brar.changeDataZoom('leftShift')
        expect(brar.indicator.getOption().dataZoom[0].start).toBe(13);
        expect(brar.indicator.getOption().dataZoom[0].end).toBe(98);
        brar.changeDataZoom('rightShift')
        expect(brar.indicator.getOption().dataZoom[0].start).toBe(15);
        expect(brar.indicator.getOption().dataZoom[0].end).toBe(100);
        brar.changeDataZoom('enlarge')
        expect(brar.indicator.getOption().dataZoom[0].start).toBe(20);
        brar.changeDataZoom('refresh')
        expect(brar.indicator.getOption().dataZoom[0].start).toBe(15);
        brar.changeDataZoom('narrow')
        expect(brar.indicator.getOption().dataZoom[0].start).toBe(10);
        brar.changeDataZoom('test')
        expect(brar.indicator.getOption().dataZoom[0].start).toBe(10);
    })

    it('test setBRAROption if data is null', () => {
        const element = document.createElement('div');
        let brar = new SetBRARChart(StochasticOption);
        brar.initBRARECharts(element, false, 'init')
        brar.setBRAROption(null, 'hour')
        expect(brar.indicator.getOption()).not.toBeNull();
    })

    it('test updateBRAROption', () => {
        const element = document.createElement('div');
        let brar = new SetBRARChart(StochasticOption);
        brar.initBRARECharts(element, false, 'init')
        brar.setBRAROption(indicatorData, 'hour')
        brar.updateBRAROption(indicatorData, 'week')
        expect(brar.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let brar = new SetBRARChart(StochasticOption);
        brar.initBRARECharts(element, false, 'init')
        brar.setBRAROption(indicatorData, 'hour')
        let tipData = brar.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeBRARECharts', () => {
        const element = document.createElement('div');
        let brar = new SetBRARChart(StochasticOption);
        brar.initBRARECharts(element, false, 'init')
        brar.setBRAROption(indicatorData, 'hour')
        brar.resizeBRARECharts(element, false, size)
        expect(brar.indicator.getOption()).not.toBeNull();
    })

    it('test resizeBRARECharts if DOM is null', () => {
        const element = document.createElement('div');
        let brar = new SetBRARChart(StochasticOption);
        brar.initBRARECharts(element, false, 'init')
        brar.setBRAROption(indicatorData, 'aa')
        brar.resizeBRARECharts(null, false, size)
        expect(brar.indicator.getOption()).not.toBeNull();
    })

    it('test resizeBRARECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let brar = new SetBRARChart(StochasticOption);
        brar.initBRARECharts(element, false, 'init')
        brar.setBRAROption(indicatorData, '5minute')
        brar.resizeBRARECharts(element, true, size)
        expect(brar.indicator.getOption()).not.toBeNull();
    })

    it('test disposeBRAREChart', () => {
        const element = document.createElement('div');
        let brar = new SetBRARChart(StochasticOption);
        brar.initBRARECharts(element, false, 'init')
        brar.setBRAROption(indicatorData, 'hour')
        brar.disposeBRAREChart()
        expect(brar.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let brar = new SetBRARChart(StochasticOption);
        brar.initBRARECharts(element, false, 'init')
        brar.setBRAROption(indicatorData, 'week')
        expect(brar).not.toBeNull();
    })
})