import SetVRChart from 'js/SetVRChart'
import { getVRData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/data.json'

let VRData = getVRData(testData.klineData)
let indicatorData = {
    categoryData: testData.candleData.categoryData,
    indicator: 'VR',
    indicatorData: VRData
}
let size = {
    height: 1080,
    width: 1920
}

describe('test SetVRChart', () => {
    it('test SetVRChart', () => {
        let VR = new SetVRChart(StochasticOption);
        expect(VR).toBeInstanceOf(SetVRChart)
    })

    it('test initIndicatorECharts', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element)
        VR.initIndicatorECharts(element, true)
        expect(VR).not.toBeNull();
    })

    it('test setIndicatorOption', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(indicatorData, 'hour')
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(indicatorData, 'hour')
        VR.changeDataZoom('leftShift')
        expect(VR.indicator.getOption().dataZoom[0].start).toBe(28);
        expect(VR.indicator.getOption().dataZoom[0].end).toBe(98);
        VR.changeDataZoom('rightShift')
        expect(VR.indicator.getOption().dataZoom[0].start).toBe(30);
        expect(VR.indicator.getOption().dataZoom[0].end).toBe(100);
        VR.changeDataZoom('enlarge')
        expect(VR.indicator.getOption().dataZoom[0].start).toBe(35);
        VR.changeDataZoom('refresh')
        expect(VR.indicator.getOption().dataZoom[0].start).toBe(30);
        VR.changeDataZoom('narrow')
        expect(VR.indicator.getOption().dataZoom[0].start).toBe(25);
        VR.changeDataZoom('test')
        expect(VR.indicator.getOption().dataZoom[0].start).toBe(25);
    })

    it('test setIndicatorOption if data is null', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(null, 'hour')
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test updateIndicatorOption', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(indicatorData, 'hour')
        VR.updateIndicatorOption(indicatorData, 'week')
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(indicatorData, 'hour')
        let tipData = VR.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(indicatorData, 'hour')
        VR.resizeECharts(element, false, size)
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if DOM is null', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(indicatorData, 'aa')
        VR.resizeECharts(null, false, size)
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(indicatorData, '5minute')
        VR.resizeECharts(element, true, size)
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test disposeIndicatorEChart', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(indicatorData, 'hour')
        VR.disposeIndicatorEChart()
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(indicatorData, 'week')
        expect(VR).not.toBeNull();
    })
})