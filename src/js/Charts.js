// import KLineSetChartController from './KLineSetChart';
import DepthChart from './SetDepthChart';
import depthOption from './DepthOption';
import timeSharingOption from './TimeSharingOption';
import TimeSharingChart from './setTimeSharingChart';
// import { indicatorsOption } from './processData';

class ChartController {
    constructor(chartsConfig) {
        var merge = require('lodash.merge');
        if (chartsConfig.platform === 'pc') {
            if (chartsConfig.chartType === 'depth') {
                merge(depthOption, chartsConfig);
                this.setDepthChart = new DepthChart(depthOption);
            } else if (chartsConfig.chartType === 'timeSharing') {
                merge(timeSharingOption, chartsConfig);
                this.setTimeSharing = new TimeSharingChart(timeSharingOption);
            }
        }
    }

    /* 绘制深度图 */
    initDepth(DOM) {
        this.setDepthChart.initDepthECharts(DOM);
    }

    resizeDepthChart(DOM, isFullScreen) {
        this.setDepthChart.resizeECharts(DOM, isFullScreen);
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

    resizeTimeSharingChart(DOM, isFullScreen) {
        this.setTimeSharing.resizeECharts(DOM, isFullScreen);
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

}

export default ChartController;
