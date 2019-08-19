import SetRSIChart from 'js/SetRSIChart'
import { getRSIData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

StochasticOption.platform = 'pc'
let RSIData = getRSIData(testData.candleData.values, 6)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'RSI',
    indicatorData: { RSI6: RSIData }
}
let size = {
    height: 1080,
    width: 1920
}

describe('test SetRSIChart', () => {
    it('test SetRSIChart', () => {
        let rsi = new SetRSIChart(StochasticOption);
        expect(rsi).toBeInstanceOf(SetRSIChart)
    })

    it('test initIndicatorECharts', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element)
        rsi.initIndicatorECharts(element, true)
        expect(rsi).not.toBeNull();
    })

    it('test setIndicatorOption', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(indicatorData, 'hour')
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(indicatorData, 'hour')
        rsi.changeDataZoom('leftShift')
        expect(rsi.indicator.getOption().dataZoom[0].start).toBe(43);
        expect(rsi.indicator.getOption().dataZoom[0].end).toBe(98);
        rsi.changeDataZoom('rightShift')
        expect(rsi.indicator.getOption().dataZoom[0].start).toBe(45);
        expect(rsi.indicator.getOption().dataZoom[0].end).toBe(100);
        rsi.changeDataZoom('enlarge')
        expect(rsi.indicator.getOption().dataZoom[0].start).toBe(50);
        rsi.changeDataZoom('refresh')
        expect(rsi.indicator.getOption().dataZoom[0].start).toBe(45);
        rsi.changeDataZoom('narrow')
        expect(rsi.indicator.getOption().dataZoom[0].start).toBe(40);
    })

    it('test setIndicatorOption if data is null', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(null, 'hour')
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test updateIndicatorOption', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(indicatorData, 'hour')
        rsi.updateIndicatorOption(indicatorData, 'week')
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(indicatorData, 'hour')
        let tipData = rsi.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(indicatorData, 'hour')
        rsi.resizeECharts(element, false, size)
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if DOM is null', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(indicatorData, 'aa')
        rsi.resizeECharts(null, false, size)
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(indicatorData, '5minute')
        rsi.resizeECharts(element, true, size)
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test disposeIndicatorEChart', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(indicatorData, 'hour')
        rsi.disposeIndicatorEChart()
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(indicatorData, 'week')
        expect(rsi).not.toBeNull();
    })
})