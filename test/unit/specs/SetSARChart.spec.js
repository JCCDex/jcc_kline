import SetSARChart from 'js/SetSARChart'
import { getSARData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

StochasticOption.platform = 'pc'
let SARData = getSARData(testData.candleData)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'SAR',
    indicatorData: SARData,
    candlestickData: testData.candleData.values,
    volumes: testData.candleData.volumes
}
let size = {
    height: 1080,
    width: 1920
}

describe('test SetSARChart', () => {
    it('test SetSARChart', () => {
        let SAR = new SetSARChart(StochasticOption);
        expect(SAR).toBeInstanceOf(SetSARChart)
    })

    it('test initSARECharts', () => {
        const element = document.createElement('div');
        let SAR = new SetSARChart(StochasticOption);
        SAR.initSARECharts(element)
        SAR.initSARECharts(element, true)
        expect(SAR).not.toBeNull();
    })

    it('test setSAROption', () => {
        const element = document.createElement('div');
        let SAR = new SetSARChart(StochasticOption);
        SAR.initSARECharts(element, false, 'init')
        SAR.setSAROption(indicatorData, 'hour')
        expect(SAR.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let SAR = new SetSARChart(StochasticOption);
        SAR.initSARECharts(element, false, 'init')
        SAR.setSAROption(indicatorData, 'hour')
        SAR.changeDataZoom('leftShift')
        expect(SAR.indicator.getOption().dataZoom[0].start).toBe(43);
        expect(SAR.indicator.getOption().dataZoom[0].end).toBe(98);
        SAR.changeDataZoom('rightShift')
        expect(SAR.indicator.getOption().dataZoom[0].start).toBe(45);
        expect(SAR.indicator.getOption().dataZoom[0].end).toBe(100);
        SAR.changeDataZoom('enlarge')
        expect(SAR.indicator.getOption().dataZoom[0].start).toBe(50);
        SAR.changeDataZoom('refresh')
        expect(SAR.indicator.getOption().dataZoom[0].start).toBe(45);
        SAR.changeDataZoom('narrow')
        expect(SAR.indicator.getOption().dataZoom[0].start).toBe(40);
        SAR.changeDataZoom('test')
        expect(SAR.indicator.getOption().dataZoom[0].start).toBe(40);
    })

    it('test setSAROption if data is null', () => {
        const element = document.createElement('div');
        let SAR = new SetSARChart(StochasticOption);
        SAR.initSARECharts(element, false, 'init')
        SAR.setSAROption(null, 'hour')
        expect(SAR.indicator.getOption()).not.toBeNull();
    })

    it('test updateSAROption', () => {
        const element = document.createElement('div');
        let SAR = new SetSARChart(StochasticOption);
        SAR.initSARECharts(element, false, 'init')
        SAR.setSAROption(indicatorData, 'hour')
        SAR.updateSAROption(indicatorData, 'week')
        expect(SAR.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let SAR = new SetSARChart(StochasticOption);
        SAR.initSARECharts(element, false, 'init')
        SAR.setSAROption(indicatorData, 'hour')
        let tipData = SAR.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeSARECharts', () => {
        const element = document.createElement('div');
        let SAR = new SetSARChart(StochasticOption);
        SAR.initSARECharts(element, false, 'init')
        SAR.setSAROption(indicatorData, 'hour')
        SAR.resizeSARECharts(element, false, size)
        expect(SAR.indicator.getOption()).not.toBeNull();
    })

    it('test resizeSARECharts if DOM is null', () => {
        const element = document.createElement('div');
        let SAR = new SetSARChart(StochasticOption);
        SAR.initSARECharts(element, false, 'init')
        SAR.setSAROption(indicatorData, 'aa')
        SAR.resizeSARECharts(null, false, size)
        expect(SAR.indicator.getOption()).not.toBeNull();
    })

    it('test resizeSARECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let SAR = new SetSARChart(StochasticOption);
        SAR.initSARECharts(element, false, 'init')
        SAR.setSAROption(indicatorData, '5minute')
        SAR.resizeSARECharts(element, true, size)
        expect(SAR.indicator.getOption()).not.toBeNull();
    })

    it('test disposeSAREChart', () => {
        const element = document.createElement('div');
        let SAR = new SetSARChart(StochasticOption);
        SAR.initSARECharts(element, false, 'init')
        SAR.setSAROption(indicatorData, 'hour')
        SAR.disposeSAREChart()
        expect(SAR.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let SAR = new SetSARChart(StochasticOption);
        SAR.initSARECharts(element, false, 'init')
        SAR.setSAROption(indicatorData, 'week')
        expect(SAR).not.toBeNull();
    })
})