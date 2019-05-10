import SetRSIChart from 'js/SetRSIChart'
import { getRSIData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

let RSIData = getRSIData(testData.candleData.values, 6)
RSIData.categoryData = testData.candleData.categoryData
RSIData.precision = testData.precision
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
        rsi.setIndicatorOption(RSIData, 'hour')
        expect(rsi.indicator.getOption()).not.toBeNull();
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
        rsi.setIndicatorOption(RSIData, 'hour')
        rsi.updateIndicatorOption(RSIData, 'week')
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(RSIData, 'hour')
        let tipData = rsi.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(RSIData, 'hour')
        rsi.resizeECharts(element, false, size)
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if DOM is null', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(RSIData, 'aa')
        rsi.resizeECharts(null, false, size)
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(RSIData, '5minute')
        rsi.resizeECharts(element, true, size)
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test disposeIndicatorEChart', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(RSIData, 'hour')
        rsi.disposeIndicatorEChart()
        expect(rsi.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let rsi = new SetRSIChart(StochasticOption);
        rsi.initIndicatorECharts(element, false, 'init')
        rsi.setIndicatorOption(RSIData, 'week')
        expect(rsi).not.toBeNull();
    })
})