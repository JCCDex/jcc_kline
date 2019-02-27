import DepthChart from './SetDepthChart';
import { depthOption, mobileDepthOption } from './DepthOption';
import { timeSharingOption, mobileTimeSharingOption} from './TimeSharingOption';
import volumeOption from './VolumeChartOption';
import TimeSharingChart from './SetTimeSharingChart';
import VolumeChart from './SetVolumeChart.js';
import MACDChart from './MACDOption';

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
            }
        } else if (chartsConfig.chartType === 'MACD') {
            if (chartsConfig.platform === 'pc') {
                merge(MACDChart, chartsConfig);
                this.setMACD = new MACDChart(MACDChart);
            }
        }
    }
    /* 绘制深度图 */
    initDepth(DOM) {
        this.setDepthChart.initDepthECharts(DOM);
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

    clearDepthEcharts() {
        this.setDepthChart.clearDepthEcharts();
    }

    disposeDepthEChart() {
        this.setDepthChart.disposeDepthEChart();
    }

    /* 绘制分时图 */

    initTimeSharingChart(DOM) {
        this.setTimeSharing.initTimeSharingECharts(DOM);
    }

    resizeTimeSharingChart(DOM, isFullScreen, size) {
        this.setTimeSharing.resizeECharts(DOM, isFullScreen, size);
    }

    setTimeSharingOption(timeDivisionData, divisionData) {
        return this.setTimeSharing.setTimeSharingOption(timeDivisionData, divisionData);
    }

    updateTimeSharingOption(timeDivisionData, divisionData) {
        this.setTimeSharing.updateTimeSharingOption(timeDivisionData, divisionData);
    }

    getTimeSharingTipData() {
        return this.setTimeSharing.getTimeSharingTipData();
    }

    clearTimeSharingEcharts() {
        this.setTimeSharing.clearTimeSharingEcharts();
    }

    disposeTimeSharingEChart() {
        this.setTimeSharing.disposeTimeSharingEChart();
    }

    initVolumeChart(DOM) {
        this.setVolumeChart.initVolumeECharts(DOM);
    }

    resizeVolumeChart(DOM, isFullScreen, size) {
        this.setVolumeChart.resizeECharts(DOM, isFullScreen, size);
    }

    setVolumeOption(data) {
        this.setVolumeChart.setVolumeOption(data);
    }

    updateVolumeOption(data) {
        this.setVolumeChart.updateVolumeOption(data);
    }

    clearVolumeEcharts() {
        this.setVolumeChart.clearVolumeEcharts();
    }

    disposeVolumeEcharts() {
        this.setVolumeChart.disposeVolumeEChart();
    }

}

export default ChartController;
