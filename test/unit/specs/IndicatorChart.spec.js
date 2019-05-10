import IndicatorChart from 'js/IndicatorChart'
import { getKDJData, getRSIData, getMTMData, getWRData, getVRData } from 'js/CalculateIndicator'
import testData from '../../testData/testData.json'

let KDJData = getKDJData(9, testData.candleData.values)
KDJData.categoryData = testData.candleData.categoryData

let Config = {
    chartType: 'stochastic',
    platform: 'pc',
    defaultSize: false
}

let RSIData = getRSIData(testData.candleData.values, 6)
RSIData.categoryData = testData.candleData.categoryData

let rsiConfig = {
    chartType: 'rsi',
    platform: 'pc',
    defaultSize: false
}

let MTMData = getMTMData(testData.candleData.values)
MTMData.categoryData = testData.candleData.categoryData

let MTMConfig = {
    chartType: 'mtm',
    platform: 'pc',
    defaultSize: false
}

let WRData = getWRData(testData.candleData.values)
WRData.categoryData = testData.candleData.categoryData

let WRConfig = {
    chartType: 'wr',
    platform: 'pc',
    defaultSize: false
}

let VRData = getVRData(testData.candleData.values)
VRData.categoryData = testData.candleData.categoryData

let VRConfig = {
    chartType: 'vr',
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

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initStochasticChart(element)
        indicator.setStochasticOption(KDJData, 'hour')
        indicator.resizeStochasticChart(element, false, size)
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

    /* 测试RSI指标线的方法 */
    it('test IndicatorChart', () => {
        let indicator = new IndicatorChart(rsiConfig);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })

    it('test initRSIChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(rsiConfig);
        indicator.initRSIChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setRSIOption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(rsiConfig);
        indicator.initRSIChart(element)
        indicator.setRSIOption(RSIData, 'hour')
        expect(indicator.setRSIChart.indicator.getOption()).not.toBeNull();
    })

    it('test setRSIOption if platform is mobile', () => {
        const element = document.createElement('div');
        Config.platform = 'mobile'
        let indicator = new IndicatorChart(rsiConfig);
        indicator.initRSIChart(element)
        indicator.setRSIOption(RSIData, 'hour')
        expect(indicator.setRSIChart.indicator.getOption()).not.toBeNull();
    })

    it('test updateRSIOption', () => {
        const element = document.createElement('div');
        Config.platform = 'pc'
        let indicator = new IndicatorChart(rsiConfig);
        indicator.initRSIChart(element)
        indicator.setRSIOption(RSIData, 'day')
        indicator.updateRSIOption(RSIData, 'week')
        expect(indicator.setRSIChart.indicator.getOption()).not.toBeNull();
    })

    it('test getRSITipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(rsiConfig);
        indicator.initRSIChart(element)
        indicator.setRSIOption(RSIData, 'day')
        let tipData = indicator.getRSITipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(rsiConfig);
        indicator.initRSIChart(element)
        indicator.setRSIOption(RSIData, 'hour')
        indicator.resizeRSIChart(element, false, size)
        expect(indicator.setRSIChart.indicator.getOption()).not.toBeNull();
    })

    it('test disposeRSIEChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(rsiConfig);
        indicator.initRSIChart(element)
        indicator.setRSIOption(RSIData, 'hour')
        indicator.disposeRSIEChart()
        expect(indicator.setRSIChart.indicator.getOption()).not.toBeNull();
    })

    /* 测试MTM指标线的方法 */
    it('test IndicatorChart', () => {
        let indicator = new IndicatorChart(MTMConfig);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })

    it('test initMTMChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(MTMConfig);
        indicator.initMTMChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setMTMOption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(MTMConfig);
        indicator.initMTMChart(element)
        indicator.setMTMOption(MTMData, 'hour')
        expect(indicator.setMTMChart.indicator.getOption()).not.toBeNull();
    })

    it('test setMTMOption if platform is mobile', () => {
        const element = document.createElement('div');
        Config.platform = 'mobile'
        let indicator = new IndicatorChart(MTMConfig);
        indicator.initMTMChart(element)
        indicator.setMTMOption(MTMData, 'hour')
        expect(indicator.setMTMChart.indicator.getOption()).not.toBeNull();
    })

    it('test updateMTMOption', () => {
        const element = document.createElement('div');
        Config.platform = 'pc'
        let indicator = new IndicatorChart(MTMConfig);
        indicator.initMTMChart(element)
        indicator.setMTMOption(MTMData, 'day')
        indicator.updateMTMOption(MTMData, 'week')
        expect(indicator.setMTMChart.indicator.getOption()).not.toBeNull();
    })

    it('test getMTMTipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(MTMConfig);
        indicator.initMTMChart(element)
        indicator.setMTMOption(MTMData, 'day')
        let tipData = indicator.getMTMTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(MTMConfig);
        indicator.initMTMChart(element)
        indicator.setMTMOption(MTMData, 'hour')
        indicator.resizeMTMChart(element, false, size)
        expect(indicator.setMTMChart.indicator.getOption()).not.toBeNull();
    })

    it('test disposeMTMEChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(MTMConfig);
        indicator.initMTMChart(element)
        indicator.setMTMOption(MTMData, 'hour')
        indicator.disposeMTMEChart()
        expect(indicator.setMTMChart.indicator.getOption()).not.toBeNull();
    })

    /* 测试WR指标线的方法 */
    it('test IndicatorChart', () => {
        let indicator = new IndicatorChart(WRConfig);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })

    it('test initWRChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(WRConfig);
        indicator.initWRChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setWROption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(WRConfig);
        indicator.initWRChart(element)
        indicator.setWROption(WRData, 'hour')
        expect(indicator.setWRChart.indicator.getOption()).not.toBeNull();
    })

    it('test setWROption if platform is mobile', () => {
        const element = document.createElement('div');
        Config.platform = 'mobile'
        let indicator = new IndicatorChart(WRConfig);
        indicator.initWRChart(element)
        indicator.setWROption(WRData, 'hour')
        expect(indicator.setWRChart.indicator.getOption()).not.toBeNull();
    })

    it('test updateWROption', () => {
        const element = document.createElement('div');
        Config.platform = 'pc'
        let indicator = new IndicatorChart(WRConfig);
        indicator.initWRChart(element)
        indicator.setWROption(WRData, 'day')
        indicator.updateWROption(WRData, 'week')
        expect(indicator.setWRChart.indicator.getOption()).not.toBeNull();
    })

    it('test getWRTipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(WRConfig);
        indicator.initWRChart(element)
        indicator.setWROption(WRData, 'day')
        let tipData = indicator.getWRTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(WRConfig);
        indicator.initWRChart(element)
        indicator.setWROption(WRData, 'hour')
        indicator.resizeWRChart(element, false, size)
        expect(indicator.setWRChart.indicator.getOption()).not.toBeNull();
    })

    it('test disposeWREChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(WRConfig);
        indicator.initWRChart(element)
        indicator.setWROption(WRData, 'hour')
        indicator.disposeWREChart()
        expect(indicator.setWRChart.indicator.getOption()).not.toBeNull();
    })

     /* 测试VR指标线的方法 */
     it('test IndicatorChart', () => {
        let indicator = new IndicatorChart(VRConfig);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })

    it('test initVRChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(VRConfig);
        indicator.initVRChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setVROption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(VRConfig);
        indicator.initVRChart(element)
        indicator.setVROption(VRData, 'hour')
        expect(indicator.setVRChart.indicator.getOption()).not.toBeNull();
    })

    it('test setVROption if platform is mobile', () => {
        const element = document.createElement('div');
        Config.platform = 'mobile'
        let indicator = new IndicatorChart(VRConfig);
        indicator.initVRChart(element)
        indicator.setVROption(VRData, 'hour')
        expect(indicator.setVRChart.indicator.getOption()).not.toBeNull();
    })

    it('test updateVROption', () => {
        const element = document.createElement('div');
        Config.platform = 'pc'
        let indicator = new IndicatorChart(VRConfig);
        indicator.initVRChart(element)
        indicator.setVROption(VRData, 'day')
        indicator.updateVROption(VRData, 'week')
        expect(indicator.setVRChart.indicator.getOption()).not.toBeNull();
    })

    it('test getVRTipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(VRConfig);
        indicator.initVRChart(element)
        indicator.setVROption(VRData, 'day')
        let tipData = indicator.getVRTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(VRConfig);
        indicator.initVRChart(element)
        indicator.setVROption(VRData, 'hour')
        indicator.resizeVRChart(element, false, size)
        expect(indicator.setVRChart.indicator.getOption()).not.toBeNull();
    })

    it('test disposeVREChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(VRConfig);
        indicator.initVRChart(element)
        indicator.setVROption(VRData, 'hour')
        indicator.disposeVREChart()
        expect(indicator.setVRChart.indicator.getOption()).not.toBeNull();
    })
})