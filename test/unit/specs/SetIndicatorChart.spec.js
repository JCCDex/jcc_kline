import SetIndicatorChart from 'js/SetIndicatorChart'
import { getOBVData } from 'js/processData'
import { StochasticOption } from 'js/IndicatorsLineOption'
import data from '../../testData/data.json'
import testData from '../../testData/testData.json'

let OBVData = getOBVData(data.klineData)
OBVData.categoryData = testData.candleData.categoryData
OBVData.indicator = 'OBV'
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
        indicator.setIndicatorOption(OBVData, 'hour')
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test setIndicatorOption if OBVData is null', () => {
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
        indicator.setIndicatorOption(OBVData, 'day')
        indicator.updateIndicatorOption(OBVData, 'week')
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(OBVData, 'day')
        let tipData = indicator.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test getIndicatorEchart', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(OBVData, 'day')
        let indicatorEchart = indicator.getIndicatorEchart()
        expect(indicatorEchart).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(OBVData, 'hour')
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
        indicator.setIndicatorOption(OBVData, 'hour')
        indicator.resizeECharts(null, false, size)
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(OBVData, 'hour')
        indicator.resizeECharts(element, true, size)
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test clearIndicatorEcharts', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(OBVData, 'month')
        indicator.clearIndicatorEcharts()
        expect(indicator.indicator.getOption().series).toEqual(new Array);
    })

    it('test disposeIndicatorEChart', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(OBVData, 'hour')
        indicator.disposeIndicatorEChart()
        expect(indicator.indicator.getOption()).not.toBeNull();
    })

    it('test disposeIndicatorEChart if indicator is null', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.setIndicatorOption(OBVData, 'hour')
        indicator.indicator = null
        indicator.disposeIndicatorEChart()
        expect(indicator.indicator).toBeNull();
    })

    it('test updateIndicatorOption if indicator getOption is null', () => {
        const element = document.createElement('div');
        let indicator = new SetIndicatorChart(StochasticOption);
        indicator.initIndicatorECharts(element)
        indicator.updateIndicatorOption(OBVData, 'week')
        expect(indicator).not.toBeNull();
    })

})