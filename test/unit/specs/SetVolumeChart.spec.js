import SetVolumeChart from 'js/SetVolumeChart'
import { volumeOption } from 'js/VolumeChartOption'
import testData from '../../testData/testData.json'

volumeOption.platform = 'pc'
volumeOption.chartType = 'volume'
volumeOption.defaultSize = true
let data = testData.candleData

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
        const element = document.createElement('div');
        let volume = new SetVolumeChart(volumeOption);
        volume.initVolumeECharts(element)
        volume.initVolumeECharts(element, true)
        expect(volume).not.toBeNull();
    })

    it('test showLoading', () => {
        const element = document.createElement('div');
        let volume = new SetVolumeChart(volumeOption);
        volume.initVolumeECharts(element)
        volume.showLoading()
        expect(volume).not.toBeNull();
    })

    it('test setVolumeOption', () => {
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, 'hour')
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test setVolumeOption if data is null', () => {
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(null, 'hour')
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test updateVolumeOption', () => {
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, 'day')
        volumeChart.updateVolumeOption(data, 'day')
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
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
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, 'month')
        volumeChart.resizeECharts(element, false, false, size)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if not DOM', () => {
        volumeOption.defaultSize = true
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, '')
        volumeChart.resizeECharts(null, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test disposeVolumeEChart', () => {
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, 'hour')
        volumeChart.disposeVolumeEChart()
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test disposeVolumeEChart if volume is null', () => {
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data, 'hour')
        volumeChart.volume = null;
        volumeChart.disposeVolumeEChart()
        expect(volumeChart.volume).toBeNull();
    })

    it('test updateVolumeOption if volume getOption is null', () => {
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.updateVolumeOption(data, 'day')
        expect(volumeChart).not.toBeNull();
    })

    it('test changeDataZoom', () => {
        const element = document.createElement('div');
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
