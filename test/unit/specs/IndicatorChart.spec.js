import IndicatorChart from 'js/IndicatorChart'
import { getKDJData } from 'js/processData'
import testData from '../../testData/testData.json'

let KDJData = getKDJData(9, testData.candleData.values)
KDJData.categoryData = testData.candleData.categoryData
KDJData.precision = {
    price: 'a'
}
let StochasticConfig = {
    chartType: 'stochastic',
    platform: 'pc',
    defaultSize: false
}
let size = {
    height: 1080,
    width: 1920
}

describe('test IndicatorChart', () => {
    it('test IndicatorChart', () => {
        let indicator = new IndicatorChart(StochasticConfig);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })
    
    it('test initStochasticChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(StochasticConfig);
        indicator.initStochasticChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setStochasticOption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(StochasticConfig);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    it('test setStochasticOption if platform is mobile', () => {
        const element = document.createElement('div');
        StochasticConfig.platform = 'mobile'
        let indicator = new IndicatorChart(StochasticConfig);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption', () => {
        const element = document.createElement('div');
        StochasticConfig.platform = 'pc'
        let indicator = new IndicatorChart(StochasticConfig);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'day')
        indicator.updateStochasticOption(KDJData, 'week')
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(StochasticConfig);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'day')
        let tipData = indicator.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test getStochasticEchart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(StochasticConfig);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'day')
        let IindicatorEchart = indicator.getStochasticEchart()
        expect(IindicatorEchart).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(StochasticConfig);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        indicator.resizeStochasticChart(element, false, size)
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    it('test clearStochasticEcharts', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(StochasticConfig);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        indicator.clearStochasticEcharts()
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    it('test disposeStochasticEChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(StochasticConfig);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        indicator.disposeStochasticEChart()
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })
})