import SetIndicatorChart from 'js/SetIndicatorChart'
import { getOBVData } from 'js/processData'
import { StochasticOption } from 'js/IndicatorsLineOption'
import data from '../../testData/data.json'
import testData from '../../testData/testData.json'


let OBVData = getOBVData(data.klineData)
let indicatorsData = {
    indicator: "OBV",
    categoryData: testData.candleData.categoryData,
    indicatorData: OBVData
};
let size = {
    height: 1080,
    width: 1920
}

describe('test SetIndicatorChart', () => {
    it('test SetIndicatorChart', () => {
        let indicator = new SetIndicatorChart(StochasticOption);
        expect(indicator).toBeInstanceOf(SetIndicatorChart)
    })

    it('test initIndicatorECharts', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        expect(indicator).not.toBeNull();
    })

    it('test setIndicatorOption', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'hour')
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test setIndicatorOption if indicator is DMI', () => {
        indicatorsData.indicator = 'DMI'
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'hour')
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test setIndicatorOption if indicator is null', () => {
        indicatorsData.indicator = null
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'hour')
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test setIndicatorOption if indicatorsData is null', () => {
        indicatorsData.indicator = 'OBV'
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(null, 'hour')
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test updateIndicatorOption', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'day')
        indicator.updateIndicatorOption(indicatorsData, 'week')
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'day')
        let tipData = indicator.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test getIndicatorEchart', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'day')
        let indicatorEchart = indicator.getIndicatorEchart()
        expect(indicatorEchart).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'hour')
        indicator.resizeECharts(element, false, size)
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if oldIndicatorData is null', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.clearIndicatorEcharts()
        indicator.resizeECharts(element, false, size)
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if DOM is null', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'hour')
        indicator.resizeECharts(null, false, size)
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'hour')
        indicator.resizeECharts(element, true, size)
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test clearIndicatorEcharts', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'month')
        indicator.clearIndicatorEcharts()
        expect(indicator.indicator.getOption().series).toEqual(new Array);
    })

    it('test disposeIndicatorEChart', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'hour')
        indicator.disposeIndicatorEChart()
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test disposeIndicatorEChart if indicator is null', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(indicatorsData, 'hour')
        indicator.indicator = null
        indicator.disposeIndicatorEChart()
        expect(indicator.indicator).toBeNull();
    })

    it('test updateIndicatorOption if indicator getOption is null', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.updateIndicatorOption(indicatorsData, 'week')
        expect(indicator).not.toBeNull();
    })

})