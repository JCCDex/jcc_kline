import DepthChart from './SetDepthChart';
import { depthOption, mobileDepthOption } from './DepthOption';
import { timeSharingOption, mobileTimeSharingOption } from './TimeSharingOption';
import { volumeOption, volumeMoobileOption } from './VolumeChartOption';
import TimeSharingChart from './SetTimeSharingChart';
import VolumeChart from './SetVolumeChart.js';

class ChartController {
    constructor(chartsConfig) {
        var merge = require('lodash.merge');
        if (chartsConfig.chartType === 'depth') {
            if (chartsConfig.platform === 'pc') {
                merge(depthOption, chartsConfig);
                this.setDepthChart = new DepthChart(depthOption);
            } else {
                merge(mobileDepthOption, chartsConfig);
                this.setDepthChart = new DepthChart(mobileDepthOption);
            }
        } else if (chartsConfig.chartType === 'timeSharing') {
            if (chartsConfig.platform === 'pc') {
                merge(timeSharingOption, chartsConfig);
                this.setTimeSharing = new TimeSharingChart(timeSharingOption);
            } else {
                merge(mobileTimeSharingOption, chartsConfig);
                this.setTimeSharing = new TimeSharingChart(mobileTimeSharingOption);
            }
        } else if (chartsConfig.chartType === 'volume') {
            if (chartsConfig.platform === 'pc') {
                merge(volumeOption, chartsConfig);
                this.setVolumeChart = new VolumeChart(volumeOption);
            } else {
                merge(volumeMoobileOption, chartsConfig);
                this.setVolumeChart = new VolumeChart(volumeMoobileOption);
            }
        }
    }
    /* 绘制深度图 */
    initDepth(DOM, clear) {
        this.setDepthChart.initDepthECharts(DOM, clear);
    }

    resizeDepthChart(DOM, isFullScreen, size) {
        this.setDepthChart.resizeECharts(DOM, isFullScreen, size);
    }

    setDepthOption(data) {
        this.setDepthChart.setDepthOption(data);
    }

    updateDepthOption(data) {
        this.setDepthChart.updateDepthOption(data);
    }

    getMobileTipsData() {
        return this.setDepthChart.getMobileTipsData();
    }

    showDepthLoading(noData) {
        this.setDepthChart.showLoading(noData);
    }

    disposeDepthEChart() {
        this.setDepthChart.disposeDepthEChart();
    }

    /* 绘制分时图 */

    initTimeSharingChart(DOM, clear) {
        this.setTimeSharing.initTimeSharingECharts(DOM, clear);
    }

    resizeTimeSharingChart(DOM, isFullScreen, size) {
        this.setTimeSharing.resizeECharts(DOM, isFullScreen, size);
    }

    setTimeSharingOption(divisionData) {
        return this.setTimeSharing.setTimeSharingOption(divisionData);
    }

    changeTimeSharingDataZoom(type) {
        this.setTimeSharing.changeDataZoom(type);
    }

    updateTimeSharingOption(divisionData) {
        this.setTimeSharing.updateTimeSharingOption(divisionData);
    }

    showTimeSharingLoading(noData) {
        this.setTimeSharing.showLoading(noData);
    }

    getTimeSharingTipIndex() {
        return this.setTimeSharing.getTimeSharingTipIndex();
    }

    disposeTimeSharingEChart() {
        this.setTimeSharing.disposeTimeSharingEChart();
    }

    /* 绘制交易量柱状图 */

    initVolumeChart(DOM, clear) {
        this.setVolumeChart.initVolumeECharts(DOM, clear);
    }

    resizeVolumeChart(DOM, isFullScreen, isCloseIndicator, size) {
        this.setVolumeChart.resizeECharts(DOM, isFullScreen, isCloseIndicator, size);
    }

    setVolumeOption(data, cycle) {
        this.setVolumeChart.setVolumeOption(data, cycle);
    }

    getToolTipIndex() {
        return this.setVolumeChart.getToolTipIndex();
    }

    showVolumeLoading(noData) {
        this.setVolumeChart.showLoading(noData);
    }

    updateVolumeOption(data, cycle) {
        this.setVolumeChart.updateVolumeOption(data, cycle);
    }

    disposeVolumeEcharts() {
        this.setVolumeChart.disposeVolumeEChart();
    }

    changeDataZoom(type) {
        this.setVolumeChart.changeDataZoom(type);
    }

}

export default ChartController;
