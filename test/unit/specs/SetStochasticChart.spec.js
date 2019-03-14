import SetStochasticChart from 'js/SetStochasticChart'
import { getKDJData } from 'js/processData'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

let KDJData = getKDJData(9, testData.candleData.values)
KDJData.categoryData = testData.candleData.categoryData
KDJData.precision = testData.precision
let size = {
    height: 1080,
    width: 1920
}

describe('test SetStochasticChart', () => {
    it('test SetStochasticChart', () => {
        let stochastic = new SetStochasticChart(StochasticOption);
        expect(stochastic).toBeInstanceOf(SetStochasticChart)
    })
    
    it('test initStochasticECharts', () => {
        const element = document.createElement('div');
        let stochastic = new SetStochasticChart(StochasticOption);
        stochastic.initStochasticECharts(element)
        expect(stochastic).not.toBeNull();
    })

    it('test setStochasticOption', () => {
        const element = document.createElement('div');
        let stochastic = new SetStochasticChart(StochasticOption);
        stochastic.initStochasticECharts(element)
        stochastic.setStochasticOption(KDJData, 'hour')
        expect(stochastic.stochastic.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption', () => {
        const element = document.createElement('div');
        let stochastic = new SetStochasticChart(StochasticOption);
        stochastic.initStochasticECharts(element)
        stochastic.setStochasticOption(KDJData, 'day')
        stochastic.updateStochasticOption(KDJData, 'week')
        expect(stochastic.stochastic.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let stochastic = new SetStochasticChart(StochasticOption);
        stochastic.initStochasticECharts(element)
        stochastic.setStochasticOption(KDJData, 'day')
        let tipData = stochastic.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test getStochasticEchart', () => {
        const element = document.createElement('div');
        let stochastic = new SetStochasticChart(StochasticOption);
        stochastic.initStochasticECharts(element)
        stochastic.setStochasticOption(KDJData, 'day')
        let stochasticEchart = stochastic.getStochasticEchart()
        expect(stochasticEchart).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let stochastic = new SetStochasticChart(StochasticOption);
        stochastic.initStochasticECharts(element)
        stochastic.setStochasticOption(KDJData, 'hour')
        stochastic.resizeECharts(element, false, size)
        expect(stochastic.stochastic.getOption()).not.toBeNull();
    })

    it('test resizeECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let stochastic = new SetStochasticChart(StochasticOption);
        stochastic.initStochasticECharts(element)
        stochastic.setStochasticOption(KDJData, 'hour')
        stochastic.resizeECharts(element, true, size)
        expect(stochastic.stochastic.getOption()).not.toBeNull();
    })

    it('test clearStochasticEcharts', () => {
        const element = document.createElement('div');
        let stochastic = new SetStochasticChart(StochasticOption);
        stochastic.initStochasticECharts(element)
        stochastic.setStochasticOption(KDJData, 'month')
        stochastic.clearStochasticEcharts()
        expect(stochastic.stochastic.getOption().series).toEqual(new Array);
    })

    it('test disposeStochasticEChart', () => {
        const element = document.createElement('div');
        let stochastic = new SetStochasticChart(StochasticOption);
        stochastic.initStochasticECharts(element)
        stochastic.setStochasticOption(KDJData, 'hour')
        stochastic.disposeStochasticEChart()
        expect(stochastic.stochastic.getOption()).not.toBeNull();
    })
})