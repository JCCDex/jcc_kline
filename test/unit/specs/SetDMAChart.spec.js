import SetDMAChart from 'js/SetDMAChart'
import { getDMAData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

let DMAData = getDMAData(testData.candleData)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'DMA',
    indicatorData: DMAData
}
let size = {
    height: 1080,
    width: 1920
}

describe('test SetDMAChart', () => {
    it('test SetDMAChart', () => {
        let DMA = new SetDMAChart(StochasticOption);
        expect(DMA).toBeInstanceOf(SetDMAChart)
    })

    it('test initDMAECharts', () => {
        const element = document.createElement('div');
        let DMA = new SetDMAChart(StochasticOption);
        DMA.initDMAECharts(element)
        DMA.initDMAECharts(element, true)
        expect(DMA).not.toBeNull();
    })

    it('test setDMAOption', () => {
        const element = document.createElement('div');
        let DMA = new SetDMAChart(StochasticOption);
        DMA.initDMAECharts(element, false, 'init')
        DMA.setDMAOption(indicatorData, 'hour')
        expect(DMA.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let DMA = new SetDMAChart(StochasticOption);
        DMA.initDMAECharts(element, false, 'init')
        DMA.setDMAOption(indicatorData, 'hour')
        DMA.changeDataZoom('leftShift')
        expect(DMA.indicator.getOption().dataZoom[0].start).toBe(58);
        expect(DMA.indicator.getOption().dataZoom[0].end).toBe(98);
        DMA.changeDataZoom('rightShift')
        expect(DMA.indicator.getOption().dataZoom[0].start).toBe(60);
        expect(DMA.indicator.getOption().dataZoom[0].end).toBe(100);
        DMA.changeDataZoom('enlarge')
        expect(DMA.indicator.getOption().dataZoom[0].start).toBe(65);
        DMA.changeDataZoom('refresh')
        expect(DMA.indicator.getOption().dataZoom[0].start).toBe(60);
        DMA.changeDataZoom('narrow')
        expect(DMA.indicator.getOption().dataZoom[0].start).toBe(55);
        DMA.changeDataZoom('test')
        expect(DMA.indicator.getOption().dataZoom[0].start).toBe(55);
    })

    it('test setDMAOption if data is null', () => {
        const element = document.createElement('div');
        let DMA = new SetDMAChart(StochasticOption);
        DMA.initDMAECharts(element, false, 'init')
        DMA.setDMAOption(null, 'hour')
        expect(DMA.indicator.getOption()).not.toBeNull();
    })

    it('test updateDMAOption', () => {
        const element = document.createElement('div');
        let DMA = new SetDMAChart(StochasticOption);
        DMA.initDMAECharts(element, false, 'init')
        DMA.setDMAOption(indicatorData, 'hour')
        DMA.updateDMAOption(indicatorData, 'week')
        expect(DMA.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let DMA = new SetDMAChart(StochasticOption);
        DMA.initDMAECharts(element, false, 'init')
        DMA.setDMAOption(indicatorData, 'hour')
        let tipData = DMA.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeDMAECharts', () => {
        const element = document.createElement('div');
        let DMA = new SetDMAChart(StochasticOption);
        DMA.initDMAECharts(element, false, 'init')
        DMA.setDMAOption(indicatorData, 'hour')
        DMA.resizeDMAECharts(element, false, size)
        expect(DMA.indicator.getOption()).not.toBeNull();
    })

    it('test resizeDMAECharts if DOM is null', () => {
        const element = document.createElement('div');
        let DMA = new SetDMAChart(StochasticOption);
        DMA.initDMAECharts(element, false, 'init')
        DMA.setDMAOption(indicatorData, 'aa')
        DMA.resizeDMAECharts(null, false, size)
        expect(DMA.indicator.getOption()).not.toBeNull();
    })

    it('test resizeDMAECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let DMA = new SetDMAChart(StochasticOption);
        DMA.initDMAECharts(element, false, 'init')
        DMA.setDMAOption(indicatorData, '5minute')
        DMA.resizeDMAECharts(element, true, size)
        expect(DMA.indicator.getOption()).not.toBeNull();
    })

    it('test disposeDMAEChart', () => {
        const element = document.createElement('div');
        let DMA = new SetDMAChart(StochasticOption);
        DMA.initDMAECharts(element, false, 'init')
        DMA.setDMAOption(indicatorData, 'hour')
        DMA.disposeDMAEChart()
        expect(DMA.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let DMA = new SetDMAChart(StochasticOption);
        DMA.initDMAECharts(element, false, 'init')
        DMA.setDMAOption(indicatorData, 'week')
        expect(DMA).not.toBeNull();
    })
})