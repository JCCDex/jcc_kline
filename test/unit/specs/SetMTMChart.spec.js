import SetMTMChart from 'js/SetMTMChart'
import { getMTMData } from 'js/CalculateIndicator'
import { StochasticOption } from 'js/IndicatorsLineOption'
import testData from '../../testData/testData.json'

let MTMData = getMTMData(testData.candleData.values, 6)
MTMData.categoryData = testData.candleData.categoryData
MTMData.precision = testData.precision
let size = {
    height: 1080,
    width: 1920
}

describe('test SetMTMChart', () => {
    it('test SetMTMChart', () => {
        let MTM = new SetMTMChart(StochasticOption);
        expect(MTM).toBeInstanceOf(SetMTMChart)
    })
    
    it('test initIndicatorECharts', () => {
        const element = document.createElement('div');
        let MTM = new SetMTMChart(StochasticOption);
        MTM.initIndicatorECharts(element)
        MTM.initIndicatorECharts(element, true)
        expect(MTM).not.toBeNull();
    })

    it('test setIndicatorOption', () => {
        const element = document.createElement('div');
        let MTM = new SetMTMChart(StochasticOption);
        MTM.initIndicatorECharts(element, false, 'init')
        MTM.setIndicatorOption(MTMData, 'hour')
        expect(MTM.indicator.getOption()).not.toBeNull();
    })

    it('test setIndicatorOption if data is null', () => {
        const element = document.createElement('div');
        let MTM = new SetMTMChart(StochasticOption);
        MTM.initIndicatorECharts(element, false, 'init')
        MTM.setIndicatorOption(null, 'hour')
        expect(MTM.indicator.getOption()).not.toBeNull();
    })

    it('test updateIndicatorOption', () => {
        const element = document.createElement('div');
        let MTM = new SetMTMChart(StochasticOption);
        MTM.initIndicatorECharts(element, false, 'init')
        MTM.setIndicatorOption(MTMData, 'hour')
        MTM.updateIndicatorOption(MTMData, 'week')
        expect(MTM.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData', () => {
        const element = document.createElement('div');
        let MTM = new SetMTMChart(StochasticOption);
        MTM.initIndicatorECharts(element, false, 'init')
        MTM.setIndicatorOption(MTMData, 'hour')
        let tipData = MTM.getToolTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let MTM = new SetMTMChart(StochasticOption);
        MTM.initIndicatorECharts(element, false, 'init')
        MTM.setIndicatorOption(MTMData, 'hour')
        MTM.resizeECharts(element, false, size)
        expect(MTM.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if DOM is null', () => {
        const element = document.createElement('div');
        let MTM = new SetMTMChart(StochasticOption);
        MTM.initIndicatorECharts(element, false, 'init')
        MTM.setIndicatorOption(MTMData, 'aa')
        MTM.resizeECharts(null, false, size)
        expect(MTM.indicator.getOption()).not.toBeNull();
    })

    it('test resizeECharts if isFullScreen is true', () => {
        const element = document.createElement('div');
        let MTM = new SetMTMChart(StochasticOption);
        MTM.initIndicatorECharts(element, false, 'init')
        MTM.setIndicatorOption(MTMData, '5minute')
        MTM.resizeECharts(element, true, size)
        expect(MTM.indicator.getOption()).not.toBeNull();
    })

    it('test disposeIndicatorEChart', () => {
        const element = document.createElement('div');
        let MTM = new SetMTMChart(StochasticOption);
        MTM.initIndicatorECharts(element, false, 'init')
        MTM.setIndicatorOption(MTMData, 'hour')
        MTM.disposeIndicatorEChart()
        expect(MTM.indicator.getOption()).not.toBeNull();
    })

    it('test updateStochasticOption if getOption is null', () => {
        const element = document.createElement('div');
        let MTM = new SetMTMChart(StochasticOption);
        MTM.initIndicatorECharts(element, false, 'init')
        MTM.setIndicatorOption(MTMData, 'week')
        expect(MTM).not.toBeNull();
    })
})