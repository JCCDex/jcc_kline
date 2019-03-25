import IndicatorChart from 'js/IndicatorChart'
import { getKDJData } from 'js/processData'
import testData from '../../testData/testData.json'

let KDJData = getKDJData(9, testData.candleData.values)
KDJData.categoryData = testData.candleData.categoryData

let Config = {
    chartType: 'stochastic',
    platform: 'pc',
    defaultSize: false
}
let size = {
    height: 1080,
    width: 1920
}

describe('test IndicatorChart', () => {

    /* 测试绘制KDJ方法 */
    it('test IndicatorChart', () => {
        let indicator = new IndicatorChart(Config);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })

    it('test initStochasticChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initStochasticChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setStochasticOption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    it('test showStochasticLoading', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        indicator.showStochasticLoading()
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    it('test setStochasticOption if platform is mobile', () => {
        const element = document.createElement('div');
        Config.platform = 'mobile'
        let indicator = new IndicatorChart(Config);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption', () => {
        const element = document.createElement('div');
        Config.platform = 'pc'
        let indicator = new IndicatorChart(Config);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'day')
        indicator.updateStochasticOption(KDJData, 'week')
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    it('test getStochasticTipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'day')
        let tipData = indicator.getStochasticTipData()
        expect(tipData).not.toBeNull();
    })

    it('test getStochasticEchart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'day')
        let IindicatorEchart = indicator.getStochasticEchart()
        expect(IindicatorEchart).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        indicator.resizeStochasticChart(element, false, size)
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    it('test clearStochasticEcharts', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        indicator.clearStochasticEcharts()
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    it('test disposeStochasticEChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        indicator.disposeStochasticEChart()
        expect(indicator.setStochasticChart.stochastic.getOption()).not.toBeNull();
    })

    /* 测试绘制指标线的方法 */

    it('test initIndicatorChart', () => {
        Config.chartType = 'indicator'
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initIndicatorChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setIndicatorOption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initIndicatorChart(element)
        indicator.setIndicatorOption(KDJData, 'hour')
        expect(indicator.setIndicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test showLoading', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initIndicatorChart(element)
        indicator.showLoading(KDJData, 'hour')
        expect(indicator.setIndicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test setIndicatorOption if platform is mobile', () => {
        const element = document.createElement('div');
        Config.platform = "mobile"
        let indicator = new IndicatorChart(Config);
        indicator.initIndicatorChart(element)
        indicator.setIndicatorOption(KDJData, 'hour')
        expect(indicator.setIndicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test updateIndicatorOption', () => {
        const element = document.createElement('div');
        Config.platform = 'pc'
        let indicator = new IndicatorChart(Config);
        indicator.initIndicatorChart(element)
        indicator.setIndicatorOption(KDJData, 'day')
        indicator.updateIndicatorOption(KDJData, 'week')
        expect(indicator.setIndicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test getIndicatorTipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initIndicatorChart(element)
        indicator.setIndicatorOption(KDJData, 'day')
        let tipData = indicator.getIndicatorTipData()
        expect(tipData).not.toBeNull();
    })

    it('test getIndicatorEchart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initIndicatorChart(element)
        indicator.setIndicatorOption(KDJData, 'day')
        let IindicatorEchart = indicator.getIndicatorEchart()
        expect(IindicatorEchart).not.toBeNull();
    })

    it('test resizeIndicatorChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initIndicatorChart(element)
        indicator.setIndicatorOption(KDJData, 'hour')
        indicator.resizeIndicatorChart(element, false, size)
        expect(indicator.setIndicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test resizeIndicatorChart if DOM is null', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initIndicatorChart(element)
        indicator.setIndicatorOption(KDJData, 'hour')
        indicator.resizeIndicatorChart(null, false, size)
        expect(indicator.setIndicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test clearIndicatorEcharts', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initIndicatorChart(element)
        indicator.setIndicatorOption(KDJData, 'hour')
        indicator.clearIndicatorEcharts()
        expect(indicator.setIndicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test disposeIndicatorEChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initIndicatorChart(element)
        indicator.setIndicatorOption(KDJData, 'hour')
        indicator.disposeIndicatorEChart()
        expect(indicator.setIndicatorChart.indicator.getOption()).not.toBeNull();
    })

})