import IndicatorChart from "js/IndicatorChart";
import indicatorData from '../../testData/indicatorData.json'

var config = {
    platform: "pc",
    defaultSize: true,
    defaultMA: true,
    size: {
        clientWidth: 1920,
        clientHeight: 884,
        width: 1262.8,
        height: 533.984
    }
}

var mobileConfig = {
    size: {
        width: 850,
        height: 500
    },
    depthSize: {
        width: 850,
        height: 300
    },
    platform: "mobile",
    defaultMA: true,
}

describe('test IndicatorChart', () => {
    it('has a created hook', () => {
        expect(typeof IndicatorChart).toBe('function')
    })

    it('test IndicatorChart if platform is pc', () => {
        let indicatorChart = new IndicatorChart(config)
        expect(indicatorChart).toBeInstanceOf(IndicatorChart)
    })

    it('test IndicatorChart if platform is mobile', () => {
        let indicatorChart = new IndicatorChart(mobileConfig)
        expect(indicatorChart).toBeInstanceOf(IndicatorChart)
    })

    it('test initIndicatorChart', () => {
        let indicatorChart = new IndicatorChart(mobileConfig)
        const element = document.createElement('div');
        indicatorChart.initIndicatorChart(element, true)
        expect(indicatorChart).not.toBeNull()
    })

    it('test setIndicatorOption', () => {
        let indicatorChart = new IndicatorChart(mobileConfig)
        const element = document.createElement('div');
        indicatorChart.initIndicatorChart(element, true)
        indicatorChart.setIndicatorOption(indicatorData, 'hour')
        expect(indicatorChart).not.toBeNull()
    })

    it('test getIndicatorTipData', () => {
        let indicatorChart = new IndicatorChart(mobileConfig)
        const element = document.createElement('div');
        indicatorChart.initIndicatorChart(element, true)
        indicatorChart.setIndicatorOption(indicatorData, 'hour')
        let tips = indicatorChart.getIndicatorTipData()
        expect(tips).not.toBeNull()
    })

    it('test updateIndicatorOption', () => {
        let indicatorChart = new IndicatorChart(mobileConfig)
        const element = document.createElement('div');
        indicatorChart.initIndicatorChart(element, true)
        indicatorChart.setIndicatorOption(indicatorData, 'hour')
        indicatorChart.updateIndicatorOption(indicatorData, 'hour')
        expect(indicatorChart.setIndicatorChart.indicator.getOption()).not.toBeNull()
    })

    it('test resizeIndicatorChart if platform is mobile, not FullScreen', () => {
        let indicatorChart = new IndicatorChart(mobileConfig)
        let resizeSize = {
            width: 700,
            height: 500
        }
        const element = document.createElement('div');
        indicatorChart.initIndicatorChart(element, true)
        indicatorChart.setIndicatorOption(indicatorData, 'hour')
        indicatorChart.resizeIndicatorChart(element, false, resizeSize)
        expect(indicatorChart.setIndicatorChart.indicator.getOption()).not.toBeNull()
    })

    it('test changeIndicatorDataZoom', () => {
        let indicatorChart = new IndicatorChart(mobileConfig)
        const element = document.createElement('div');
        indicatorChart.initIndicatorChart(element, true)
        indicatorChart.setIndicatorOption(indicatorData, 'hour')
        indicatorChart.changeIndicatorDataZoom('leftShift')
        expect(indicatorChart.setIndicatorChart.indicator.getOption().dataZoom).not.toBeNull()
      })

    it('test disposeIndicatorEChart if platform is mobile', () => {
        let indicatorChart = new IndicatorChart(mobileConfig)
        const element = document.createElement('div');
        indicatorChart.initIndicatorChart(element, true)
        indicatorChart.setIndicatorOption(indicatorData, 'hour')
        indicatorChart.disposeIndicatorEChart()
        expect(indicatorChart.setIndicatorChart.indicator.getOption()).not.toBeNull()
    })
})