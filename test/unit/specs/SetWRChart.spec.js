import SetWRChart from 'js/SetWRChart'
import { getWRData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

let WRData = getWRData(testData.candleData.values, 6)
WRData.categoryData = testData.candleData.categoryData
WRData.precision = testData.precision
let size = {
    height: 1080,
    width: 1920
}

describe('test SetWRChart', () => {
    it('test SetWRChart', () => {
        let WR = new SetWRChart(StochasticOption);
        expect(WR).toBeInstanceOf(SetWRChart)
    })
    
    it('test initIndicatorECharts', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element)
        WR.initIndicatorECharts(element, true)
        expect(WR).not.toBeNull();
    })

    it('test setIndicatorOption', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(WRData, 'hour')
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test setIndicatorOption if data is null', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(null, 'hour')
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test updateIndicatorOption', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(WRData, 'hour')
        WR.updateIndicatorOption(WRData, 'week')
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(WRData, 'hour')
        let tipData = WR.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(WRData, 'hour')
        WR.resizeECharts(element, false, size)
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if DOM is null', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(WRData, 'aa')
        WR.resizeECharts(null, false, size)
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(WRData, '5minute')
        WR.resizeECharts(element, true, size)
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test disposeIndicatorEChart', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(WRData, 'hour')
        WR.disposeIndicatorEChart()
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(WRData, 'week')
        expect(WR).not.toBeNull();
    })
})