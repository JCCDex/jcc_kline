import SetVRChart from 'js/SetVRChart'
import { getVRData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

let VRData = getVRData(testData.candleData.values, 6)
VRData.categoryData = testData.candleData.categoryData
VRData.precision = testData.precision
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
        VR.setIndicatorOption(VRData, 'hour')
        expect(VR.indicator.getOption()).not.toBeNull();
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
        VR.setIndicatorOption(VRData, 'hour')
        VR.updateIndicatorOption(VRData, 'week')
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(VRData, 'hour')
        let tipData = VR.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(VRData, 'hour')
        VR.resizeECharts(element, false, size)
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if DOM is null', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(VRData, 'aa')
        VR.resizeECharts(null, false, size)
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(VRData, '5minute')
        VR.resizeECharts(element, true, size)
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test disposeIndicatorEChart', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(VRData, 'hour')
        VR.disposeIndicatorEChart()
        expect(VR.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let VR = new SetVRChart(StochasticOption);
        VR.initIndicatorECharts(element, false, 'init')
        VR.setIndicatorOption(VRData, 'week')
        expect(VR).not.toBeNull();
    })
})