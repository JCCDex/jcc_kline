import SetBollChart from 'js/SetBollChart'
import { getBollData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

let BollData = getBollData(testData.candleData)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'Boll',
    indicatorData: BollData
}
let size = {
    height: 1080,
    width: 1920
}

describe('test SetBollChart', () => {
    it('test SetBollChart', () => {
        let Boll = new SetBollChart(StochasticOption);
        expect(Boll).toBeInstanceOf(SetBollChart)
    })

    it('test initBollECharts', () => {
        const element = document.createElement('div');
        let Boll = new SetBollChart(StochasticOption);
        Boll.initBollECharts(element)
        Boll.initBollECharts(element, true)
        expect(Boll).not.toBeNull();
    })

    it('test setBollOption', () => {
        const element = document.createElement('div');
        let Boll = new SetBollChart(StochasticOption);
        Boll.initBollECharts(element, false, 'init')
        Boll.setBollOption(indicatorData, 'hour')
        expect(Boll.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let Boll = new SetBollChart(StochasticOption);
        Boll.initBollECharts(element, false, 'init')
        Boll.setBollOption(indicatorData, 'hour')
        Boll.changeDataZoom('leftShift')
        expect(Boll.indicator.getOption().dataZoom[0].start).toBe(43);
        expect(Boll.indicator.getOption().dataZoom[0].end).toBe(98);
        Boll.changeDataZoom('rightShift')
        expect(Boll.indicator.getOption().dataZoom[0].start).toBe(45);
        expect(Boll.indicator.getOption().dataZoom[0].end).toBe(100);
        Boll.changeDataZoom('enlarge')
        expect(Boll.indicator.getOption().dataZoom[0].start).toBe(50);
        Boll.changeDataZoom('refresh')
        expect(Boll.indicator.getOption().dataZoom[0].start).toBe(45);
        Boll.changeDataZoom('narrow')
        expect(Boll.indicator.getOption().dataZoom[0].start).toBe(40);
        Boll.changeDataZoom('test')
        expect(Boll.indicator.getOption().dataZoom[0].start).toBe(40);
    })

    it('test setBollOption if data is null', () => {
        const element = document.createElement('div');
        let Boll = new SetBollChart(StochasticOption);
        Boll.initBollECharts(element, false, 'init')
        Boll.setBollOption(null, 'hour')
        expect(Boll.indicator.getOption()).not.toBeNull();
    })

    it('test updateBollOption', () => {
        const element = document.createElement('div');
        let Boll = new SetBollChart(StochasticOption);
        Boll.initBollECharts(element, false, 'init')
        Boll.setBollOption(indicatorData, 'hour')
        Boll.updateBollOption(indicatorData, 'week')
        expect(Boll.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let Boll = new SetBollChart(StochasticOption);
        Boll.initBollECharts(element, false, 'init')
        Boll.setBollOption(indicatorData, 'hour')
        let tipData = Boll.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeBollECharts', () => {
        const element = document.createElement('div');
        let Boll = new SetBollChart(StochasticOption);
        Boll.initBollECharts(element, false, 'init')
        Boll.setBollOption(indicatorData, 'hour')
        Boll.resizeBollECharts(element, false, size)
        expect(Boll.indicator.getOption()).not.toBeNull();
    })

    it('test resizeBollECharts if DOM is null', () => {
        const element = document.createElement('div');
        let Boll = new SetBollChart(StochasticOption);
        Boll.initBollECharts(element, false, 'init')
        Boll.setBollOption(indicatorData, 'aa')
        Boll.resizeBollECharts(null, false, size)
        expect(Boll.indicator.getOption()).not.toBeNull();
    })

    it('test resizeBollECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let Boll = new SetBollChart(StochasticOption);
        Boll.initBollECharts(element, false, 'init')
        Boll.setBollOption(indicatorData, '5minute')
        Boll.resizeBollECharts(element, true, size)
        expect(Boll.indicator.getOption()).not.toBeNull();
    })

    it('test disposeBollEChart', () => {
        const element = document.createElement('div');
        let Boll = new SetBollChart(StochasticOption);
        Boll.initBollECharts(element, false, 'init')
        Boll.setBollOption(indicatorData, 'hour')
        Boll.disposeBollEChart()
        expect(Boll.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let Boll = new SetBollChart(StochasticOption);
        Boll.initBollECharts(element, false, 'init')
        Boll.setBollOption(indicatorData, 'week')
        expect(Boll).not.toBeNull();
    })
})