import SetVolumeChart from 'js/SetVolumeChart'
import { volumeOption } from 'js/VolumeChartOption'
import testData from '../../testData/data.json'

volumeOption.platform = 'pc'
volumeOption.chartType = 'volume'
volumeOption.defaultSize = true
let data = testData.candleData
const element = document.createElement('div');

describe('test SetVolumeChart', () => {

    it('test volumeSetChart', () => {
        let volume = new SetVolumeChart(volumeOption);
        expect(volume).toBeInstanceOf(SetVolumeChart)
    })

    it('test getVolumeSeries', () => {
        let volume = new SetVolumeChart(volumeOption);
        expect(volume.getVolumeSeries(data)).not.toBeNull()
    })

    it('test getVolumeXAxis', () => {
        let volume = new SetVolumeChart(volumeOption);
        expect(volume.getVolumeXAxis(data, 'everyhour')).not.toBeNull()
    })

    it('test initVolumeECharts', () => {
        let volume = new SetVolumeChart(volumeOption);
        volume.initVolumeECharts(element)
        volume.initVolumeECharts(element, true)
        expect(volume).not.toBeNull();
    })

    it('test showLoading', () => {
        let volume = new SetVolumeChart(volumeOption);
        volume.initVolumeECharts(element)
        volume.showLoading()
        expect(volume).not.toBeNull();
    })

    it('test setVolumeOption', () => {
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        data.volume = data.volumes.slice(0, 90)
        volumeChart.setVolumeOption(data, 'minute')
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test setVolumeOption if data is null', () => {
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(null, 'hour')
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test updateVolumeOption', () => {
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        data.volume = data.volumes.slice(0, 50)
        volumeChart.setVolumeOption(data, 'day')
        volumeChart.updateVolumeOption(data, 'day')
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts', () => {
        volumeOption.platform = 'mobile'
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, 'week')
        volumeChart.resizeECharts(element, true)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if defaultSize is true', () => {
        volumeOption.defaultSize = false
        let size = {
            width: 600,
            height: 560
        }
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, 'month')
        volumeChart.resizeECharts(element, false, false, size)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if not DOM', () => {
        volumeOption.defaultSize = true
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, '')
        volumeChart.resizeECharts(null, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test disposeVolumeEChart', () => {
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, 'hour')
        volumeChart.disposeVolumeEChart()
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test disposeVolumeEChart if volume is null', () => {
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, 'week')
        volumeChart.volume = null;
        volumeChart.disposeVolumeEChart()
        expect(volumeChart.volume).toBeNull();
    })

    it('test updateVolumeOption if volume getOption is null', () => {
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.updateVolumeOption(data, 'day')
        expect(volumeChart).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        volumeOption.platform = 'pc'
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, 'hour')
        volumeChart.changeDataZoom('leftShift')
        expect(volumeChart.volume.getOption().dataZoom[0].start).toBe(43)
        expect(volumeChart.volume.getOption().dataZoom[0].end).toBe(98)
        volumeChart.changeDataZoom('enlarge')
        expect(volumeChart.volume.getOption().dataZoom[0].start).toBe(48)
        expect(volumeChart.volume.getOption().dataZoom[0].end).toBe(98)
        volumeChart.changeDataZoom('rightShift')
        expect(volumeChart.volume.getOption().dataZoom[0].start).toBe(50)
        expect(volumeChart.volume.getOption().dataZoom[0].end).toBe(100)
        volumeChart.changeDataZoom('refresh')
        expect(volumeChart.volume.getOption().dataZoom[0].start).toBe(45)
        expect(volumeChart.volume.getOption().dataZoom[0].end).toBe(100)
        volumeChart.changeDataZoom('narrow')
        expect(volumeChart.volume.getOption().dataZoom[0].start).toBe(40)
        expect(volumeChart.volume.getOption().dataZoom[0].end).toBe(100)
        volumeChart.changeDataZoom('test')
        expect(volumeChart.volume.getOption().dataZoom[0].start).toBe(40)
    })
})
