import SetTRIXChart from 'js/SetTRIXChart'
import { getTRIXData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

let TRIXData = getTRIXData(testData.candleData.values)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'TRIX',
    indicatorData: TRIXData
}
let size = {
    height: 1080,
    width: 1920
}

describe('test SetTRIXChart', () => {
    it('test SetTRIXChart', () => {
        let trix = new SetTRIXChart(StochasticOption);
        expect(trix).toBeInstanceOf(SetTRIXChart)
    })

    it('test initTRIXECharts', () => {
        const element = document.createElement('div');
        let trix = new SetTRIXChart(StochasticOption);
        trix.initTRIXECharts(element)
        trix.initTRIXECharts(element, true)
        expect(trix).not.toBeNull();
    })

    it('test setTRIXOption', () => {
        const element = document.createElement('div');
        let trix = new SetTRIXChart(StochasticOption);
        trix.initTRIXECharts(element, false, 'init')
        trix.setTRIXOption(indicatorData, 'hour')
        expect(trix.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let trix = new SetTRIXChart(StochasticOption);
        trix.initTRIXECharts(element, false, 'init')
        trix.setTRIXOption(indicatorData, 'hour')
        trix.changeDataZoom('leftShift')
        expect(trix.indicator.getOption().dataZoom[0].start).toBe(58);
        expect(trix.indicator.getOption().dataZoom[0].end).toBe(98);
        trix.changeDataZoom('rightShift')
        expect(trix.indicator.getOption().dataZoom[0].start).toBe(60);
        expect(trix.indicator.getOption().dataZoom[0].end).toBe(100);
        trix.changeDataZoom('enlarge')
        expect(trix.indicator.getOption().dataZoom[0].start).toBe(65);
        trix.changeDataZoom('refresh')
        expect(trix.indicator.getOption().dataZoom[0].start).toBe(60);
        trix.changeDataZoom('narrow')
        expect(trix.indicator.getOption().dataZoom[0].start).toBe(55);
        trix.changeDataZoom('test')
        expect(trix.indicator.getOption().dataZoom[0].start).toBe(55);
    })

    it('test setTRIXOption if data is null', () => {
        const element = document.createElement('div');
        let trix = new SetTRIXChart(StochasticOption);
        trix.initTRIXECharts(element, false, 'init')
        trix.setTRIXOption(null, 'hour')
        expect(trix.indicator.getOption()).not.toBeNull();
    })

    it('test updateTRIXOption', () => {
        const element = document.createElement('div');
        let trix = new SetTRIXChart(StochasticOption);
        trix.initTRIXECharts(element, false, 'init')
        trix.setTRIXOption(indicatorData, 'hour')
        trix.updateTRIXOption(indicatorData, 'week')
        expect(trix.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let trix = new SetTRIXChart(StochasticOption);
        trix.initTRIXECharts(element, false, 'init')
        trix.setTRIXOption(indicatorData, 'hour')
        let tipData = trix.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeTRIXECharts', () => {
        const element = document.createElement('div');
        let trix = new SetTRIXChart(StochasticOption);
        trix.initTRIXECharts(element, false, 'init')
        trix.setTRIXOption(indicatorData, 'hour')
        trix.resizeTRIXECharts(element, false, size)
        expect(trix.indicator.getOption()).not.toBeNull();
    })

    it('test resizeTRIXECharts if DOM is null', () => {
        const element = document.createElement('div');
        let trix = new SetTRIXChart(StochasticOption);
        trix.initTRIXECharts(element, false, 'init')
        trix.setTRIXOption(indicatorData, 'aa')
        trix.resizeTRIXECharts(null, false, size)
        expect(trix.indicator.getOption()).not.toBeNull();
    })

    it('test resizeTRIXECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let trix = new SetTRIXChart(StochasticOption);
        trix.initTRIXECharts(element, false, 'init')
        trix.setTRIXOption(indicatorData, '5minute')
        trix.resizeTRIXECharts(element, true, size)
        expect(trix.indicator.getOption()).not.toBeNull();
    })

    it('test disposeTRIXEChart', () => {
        const element = document.createElement('div');
        let trix = new SetTRIXChart(StochasticOption);
        trix.initTRIXECharts(element, false, 'init')
        trix.setTRIXOption(indicatorData, 'hour')
        trix.disposeTRIXEChart()
        expect(trix.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let trix = new SetTRIXChart(StochasticOption);
        trix.initTRIXECharts(element, false, 'init')
        trix.setTRIXOption(indicatorData, 'week')
        expect(trix).not.toBeNull();
    })
})