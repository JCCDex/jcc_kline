import SetWRChart from 'js/SetWRChart'
import { getWRData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

StochasticOption.platform = 'pc'
let WRData = getWRData(testData.candleData.values, 6)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'WR',
    indicatorData: WRData
}
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
        WR.setIndicatorOption(indicatorData, 'hour')
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(indicatorData, 'hour')
        WR.changeDataZoom('leftShift')
        expect(WR.indicator.getOption().dataZoom[0].start).toBe(43);
        expect(WR.indicator.getOption().dataZoom[0].end).toBe(98);
        WR.changeDataZoom('rightShift')
        expect(WR.indicator.getOption().dataZoom[0].start).toBe(45);
        expect(WR.indicator.getOption().dataZoom[0].end).toBe(100);
        WR.changeDataZoom('enlarge')
        expect(WR.indicator.getOption().dataZoom[0].start).toBe(50);
        WR.changeDataZoom('refresh')
        expect(WR.indicator.getOption().dataZoom[0].start).toBe(45);
        WR.changeDataZoom('narrow')
        expect(WR.indicator.getOption().dataZoom[0].start).toBe(40);
        WR.changeDataZoom('test')
        expect(WR.indicator.getOption().dataZoom[0].start).toBe(40);
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
        WR.setIndicatorOption(indicatorData, 'hour')
        WR.updateIndicatorOption(indicatorData, 'week')
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(indicatorData, 'hour')
        let tipData = WR.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(indicatorData, 'hour')
        WR.resizeECharts(element, false, size)
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if DOM is null', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(indicatorData, 'aa')
        WR.resizeECharts(null, false, size)
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(indicatorData, '5minute')
        WR.resizeECharts(element, true, size)
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test disposeIndicatorEChart', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(indicatorData, 'hour')
        WR.disposeIndicatorEChart()
        expect(WR.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let WR = new SetWRChart(StochasticOption);
        WR.initIndicatorECharts(element, false, 'init')
        WR.setIndicatorOption(indicatorData, 'week')
        expect(WR).not.toBeNull();
    })
})