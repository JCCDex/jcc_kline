import SetDMIChart from 'js/SetDMIChart'
import { getDMIData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

let DMIData = getDMIData(testData.candleData.values)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'DMI',
    indicatorData: DMIData
}
let size = {
    height: 1080,
    width: 1920
}

describe('test SetDMIChart', () => {
    it('test SetDMIChart', () => {
        let dmi = new SetDMIChart(StochasticOption);
        expect(dmi).toBeInstanceOf(SetDMIChart)
    })

    it('test initDMIECharts', () => {
        const element = document.createElement('div');
        let dmi = new SetDMIChart(StochasticOption);
        dmi.initDMIECharts(element)
        dmi.initDMIECharts(element, true)
        expect(dmi).not.toBeNull();
    })

    it('test setDMIOption', () => {
        const element = document.createElement('div');
        let dmi = new SetDMIChart(StochasticOption);
        dmi.initDMIECharts(element, false, 'init')
        dmi.setDMIOption(indicatorData, 'hour')
        expect(dmi.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let dmi = new SetDMIChart(StochasticOption);
        dmi.initDMIECharts(element, false, 'init')
        dmi.setDMIOption(indicatorData, 'hour')
        dmi.changeDataZoom('leftShift')
        expect(dmi.indicator.getOption().dataZoom[0].start).toBe(58);
        expect(dmi.indicator.getOption().dataZoom[0].end).toBe(98);
        dmi.changeDataZoom('rightShift')
        expect(dmi.indicator.getOption().dataZoom[0].start).toBe(60);
        expect(dmi.indicator.getOption().dataZoom[0].end).toBe(100);
        dmi.changeDataZoom('enlarge')
        expect(dmi.indicator.getOption().dataZoom[0].start).toBe(65);
        dmi.changeDataZoom('refresh')
        expect(dmi.indicator.getOption().dataZoom[0].start).toBe(60);
        dmi.changeDataZoom('narrow')
        expect(dmi.indicator.getOption().dataZoom[0].start).toBe(55);
        dmi.changeDataZoom('test')
        expect(dmi.indicator.getOption().dataZoom[0].start).toBe(55);
    })

    it('test setDMIOption if data is null', () => {
        const element = document.createElement('div');
        let dmi = new SetDMIChart(StochasticOption);
        dmi.initDMIECharts(element, false, 'init')
        dmi.setDMIOption(null, 'hour')
        expect(dmi.indicator.getOption()).not.toBeNull();
    })

    it('test updateDMIOption', () => {
        const element = document.createElement('div');
        let dmi = new SetDMIChart(StochasticOption);
        dmi.initDMIECharts(element, false, 'init')
        dmi.setDMIOption(indicatorData, 'hour')
        dmi.updateDMIOption(indicatorData, 'week')
        expect(dmi.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let dmi = new SetDMIChart(StochasticOption);
        dmi.initDMIECharts(element, false, 'init')
        dmi.setDMIOption(indicatorData, 'hour')
        let tipData = dmi.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeDMIECharts', () => {
        const element = document.createElement('div');
        let dmi = new SetDMIChart(StochasticOption);
        dmi.initDMIECharts(element, false, 'init')
        dmi.setDMIOption(indicatorData, 'hour')
        dmi.resizeDMIECharts(element, false, size)
        expect(dmi.indicator.getOption()).not.toBeNull();
    })

    it('test resizeDMIECharts if DOM is null', () => {
        const element = document.createElement('div');
        let dmi = new SetDMIChart(StochasticOption);
        dmi.initDMIECharts(element, false, 'init')
        dmi.setDMIOption(indicatorData, 'aa')
        dmi.resizeDMIECharts(null, false, size)
        expect(dmi.indicator.getOption()).not.toBeNull();
    })

    it('test resizeDMIECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let dmi = new SetDMIChart(StochasticOption);
        dmi.initDMIECharts(element, false, 'init')
        dmi.setDMIOption(indicatorData, '5minute')
        dmi.resizeDMIECharts(element, true, size)
        expect(dmi.indicator.getOption()).not.toBeNull();
    })

    it('test disposeDMIEChart', () => {
        const element = document.createElement('div');
        let dmi = new SetDMIChart(StochasticOption);
        dmi.initDMIECharts(element, false, 'init')
        dmi.setDMIOption(indicatorData, 'hour')
        dmi.disposeDMIEChart()
        expect(dmi.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let dmi = new SetDMIChart(StochasticOption);
        dmi.initDMIECharts(element, false, 'init')
        dmi.setDMIOption(indicatorData, 'week')
        expect(dmi).not.toBeNull();
    })
})