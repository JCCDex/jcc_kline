import setIndicatorChart from "js/SetIndicatorChart";
import { indicatorOption } from 'js/IndicatorOption'
import indicatorData from '../../testData/indicatorData.json'

indicatorOption.size = {
    clientHeight: 884,
    clientWidth: 1920,
    height: 533.984,
    width: 1262.8
}
indicatorOption.platform = "pc"
indicatorOption.defaultMA = true
indicatorOption.defaultSize = true

describe('test SetIndicatorChart', () => {
    it('test SetIndicatorChart', () => {
        let indicatorChart = new setIndicatorChart(indicatorOption);
        expect(indicatorChart).toBeInstanceOf(setIndicatorChart)
    })

    it('test initIndicatorECharts', () => {
        const element = document.createElement('div');
        let indicatorChart = new setIndicatorChart(indicatorOption);
        indicatorChart.initIndicatorECharts(element, false)
        expect(indicatorChart).not.toBeNull();
    })

    it('test setIndicatorOption if indicatorType is MACD', () => {
        indicatorData.indicator = 'MACD'
        indicatorData.indicatorData = indicatorData.MACDData
        const element = document.createElement('div');
        let indicatorChart = new setIndicatorChart(indicatorOption);
        indicatorChart.initIndicatorECharts(element, false)
        indicatorChart.setIndicatorOption(indicatorData, 'hour')
        expect(indicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test updateIndicatorOption if indicatorType is KDJ', () => {
        indicatorData.indicator = 'KDJ'
        indicatorData.indicatorData = indicatorData.KDJData
        const element = document.createElement('div');
        let indicatorChart = new setIndicatorChart(indicatorOption);
        indicatorChart.initIndicatorECharts(element, false)
        indicatorChart.setIndicatorOption(indicatorData, '4hour')
        indicatorChart.updateIndicatorOption(indicatorData, 'week')
        expect(indicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test initIndicatorECharts if have chart and indicatorType is RSI', () => {
        indicatorData.indicator = 'RSI'
        indicatorData.indicatorData = indicatorData.RSIData
        const element = document.createElement('div');
        let indicatorChart = new setIndicatorChart(indicatorOption);
        indicatorChart.initIndicatorECharts(element, false)
        indicatorChart.setIndicatorOption(indicatorData, '5minute')
        indicatorChart.initIndicatorECharts(element, true)
        expect(indicatorChart).not.toBeNull();
    })

    it('test resizeIndicatorECharts if not fullScreen and indicatorType is MTM', () => {
        indicatorData.indicator = 'MTM'
        indicatorData.indicatorData = indicatorData.MTMData
        window.innerWidth = 1360;
        const element = document.createElement('div');
        let size = {
            width: 600,
            height: 500
        }
        let indicatorChart = new setIndicatorChart(indicatorOption);
        indicatorChart.initIndicatorECharts(element, false)
        indicatorChart.setIndicatorOption(indicatorData, 'month')
        indicatorChart.resizeIndicatorECharts(element, false, size)
        expect(indicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test resizeIndicatorECharts if is fullScreen and defaultSize is true and indicatorType is VR', () => {
        indicatorData.indicator = 'VR'
        indicatorData.indicatorData = indicatorData.VRData
        window.innerWidth = 1440;
        const element = document.createElement('div');
        let indicatorChart = new setIndicatorChart(indicatorOption);
        indicatorChart.initIndicatorECharts(element, false)
        indicatorChart.setIndicatorOption(indicatorData, 'month')
        indicatorChart.resizeIndicatorECharts(element, true)
        expect(indicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test resizeIndicatorECharts if not fullScreen and indicatorType is OBV', () => {
        indicatorData.indicator = 'OBV'
        indicatorData.indicatorData = indicatorData.OBVData
        window.innerWidth = 1360;
        const element = document.createElement('div');
        let indicatorChart = new setIndicatorChart(indicatorOption);
        indicatorChart.initIndicatorECharts(element, false)
        indicatorChart.setIndicatorOption(indicatorData, 'month')
        indicatorChart.resizeIndicatorECharts(element, false)
        expect(indicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test resizeIndicatorECharts if DOM is null and indicatorType is TRIX', () => {
        indicatorData.indicator = 'TRIX'
        indicatorData.indicatorData = indicatorData.TRIXData
        window.innerWidth = 1360;
        const element = document.createElement('div');
        let indicatorChart = new setIndicatorChart(indicatorOption);
        indicatorChart.initIndicatorECharts(element, false)
        indicatorChart.setIndicatorOption(indicatorData, 'day')
        indicatorChart.resizeIndicatorECharts(null, false)
        expect(indicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test getToolTipData if indicatorType is DMI', () => {
        indicatorData.indicator = 'DMI'
        indicatorData.indicatorData = indicatorData.DMIData
        const element = document.createElement('div');
        let indicatorChart = new setIndicatorChart(indicatorOption);
        indicatorChart.initIndicatorECharts(element, false)
        indicatorChart.setIndicatorOption(indicatorData, 'hour')
        let tips = indicatorChart.getToolTipData()
        expect(tips).not.toBeNull();
    })

    it('test disposeIndicatorEChart if indicatorType is SAR', () => {
        indicatorData.indicator = 'SAR'
        indicatorData.indicatorData = indicatorData.SARData
        const element = document.createElement('div');
        let indicatorChart = new setIndicatorChart(indicatorOption);
        indicatorChart.initIndicatorECharts(element, false)
        indicatorChart.setIndicatorOption(indicatorData, 'hour')
        indicatorChart.disposeIndicatorEChart()
        expect(indicatorChart.indicator.getOption()).not.toBeNull();
    })

    it('test changeDataZoom if indicatorType is Boll', () => {
        indicatorData.indicator = 'Boll'
        indicatorData.indicatorData = indicatorData.BollData
        const element = document.createElement('div');
        let indicatorChart = new setIndicatorChart(indicatorOption);
        indicatorChart.initIndicatorECharts(element, false)
        indicatorChart.setIndicatorOption(indicatorData, 'hour')
        indicatorChart.changeDataZoom('leftShift')
        expect(indicatorChart.indicator.getOption().dataZoom[0].start).toBe(43)
        expect(indicatorChart.indicator.getOption().dataZoom[0].end).toBe(98)
        indicatorChart.changeDataZoom('enlarge')
        expect(indicatorChart.indicator.getOption().dataZoom[0].start).toBe(48)
        expect(indicatorChart.indicator.getOption().dataZoom[0].end).toBe(98)
        indicatorChart.changeDataZoom('rightShift')
        expect(indicatorChart.indicator.getOption().dataZoom[0].start).toBe(50)
        expect(indicatorChart.indicator.getOption().dataZoom[0].end).toBe(100)
        indicatorChart.changeDataZoom('refresh')
        expect(indicatorChart.indicator.getOption().dataZoom[0].start).toBe(45)
        expect(indicatorChart.indicator.getOption().dataZoom[0].end).toBe(100)
        indicatorChart.changeDataZoom('narrow')
        expect(indicatorChart.indicator.getOption().dataZoom[0].start).toBe(40)
        expect(indicatorChart.indicator.getOption().dataZoom[0].end).toBe(100)
    })
})