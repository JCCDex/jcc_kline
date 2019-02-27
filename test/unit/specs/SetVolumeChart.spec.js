import SetVolumeChart from 'js/SetVolumeChart'
import volumeOption from 'js/VolumeChartOption'
import { splitData, getDepthData } from 'js/processData'
import testData from '../../testData/data.json'

volumeOption.platform = 'pc'
volumeOption.chartType = 'volume'
volumeOption.defaultSize = true
let depthData = getDepthData(testData.depthData, testData.coinType)
let pcData = splitData(testData.klineData, 'pc')
let data = Object.assign({}, pcData, depthData);

describe('test SetVolumeChart', () => {

    it('test volumeSetChart', () => {
        let volume = new SetVolumeChart(volumeOption);
        expect(volume).toBeInstanceOf(SetVolumeChart)
    })

    it('test getVolumeSeries', () => {
        let volume = new SetVolumeChart(volumeOption);
        expect(volume.getVolumeSeries(data)).not.toBeNull()
    })

    it('test initVolumeECharts', () => {
        const element = document.createElement('div');
        let volume = new SetVolumeChart(volumeOption);
        volume.initVolumeECharts(element)
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
        volumeChart.setVolumeOption(data)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test updateVolumeOption', () => {
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.updateVolumeOption(data)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts', () => {
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
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
        volumeChart.setVolumeOption(data)
        volumeChart.resizeECharts(element, false, size)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if not DOM', () => {
        volumeOption.defaultSize = true
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.resizeECharts(null, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if ClientWidth less than 1280', () => {
        window.innerWidth = 1260;
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.resizeECharts(element, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if ClientWidth is 1366', () => {
        window.innerWidth = 1366;
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.resizeECharts(element, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if ClientWidth is 1440', () => {
        window.innerWidth = 1440;
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.resizeECharts(element, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if ClientWidth is 1680', () => {
        window.innerWidth = 1680;
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.resizeECharts(element, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if ClientWidth is 1920', () => {
        window.innerWidth = 1920;
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.resizeECharts(element, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if ClientWidth is 2180', () => {
        window.innerWidth = 2180;
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.resizeECharts(element, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if ClientWidth is 2560', () => {
        window.innerWidth = 2560;
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.resizeECharts(element, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if ClientWidth is 3440', () => {
        window.innerWidth = 3440;
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.resizeECharts(element, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test resizeECharts if ClientWidth is 3840', () => {
        window.innerWidth = 3840;
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.resizeECharts(element, false)
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test clearVolumeEcharts', () => {
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.clearVolumeEcharts()
        expect(volumeChart.volume.getOption().series).toEqual(new Array);
    })

    it('test disposeVolumeEChart', () => {
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.disposeVolumeEChart()
        expect(volumeChart.volume.getOption()).not.toBeNull();
    })

    it('test disposeVolumeEChart if volume is null', () => {
        const element = document.createElement('div');
        let volumeChart = new SetVolumeChart(volumeOption);
        volumeChart.initVolumeECharts(element)
        volumeChart.setVolumeOption(data)
        volumeChart.volume = null;
        volumeChart.disposeVolumeEChart()
        expect(volumeChart.volume).toBeNull();
    })

})
