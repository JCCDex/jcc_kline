// import KLineSetChartController from './KLineSetChart';
import DepthChart from './SetDepthChart';
import depthOption from './DepthOption';
import TimeSharingChart from './setTimeSharingChart';
// import { indicatorsOption } from './processData';

class ChartController {
    constructor(klineConfig) {
        var merge = require('lodash.merge');
        if (klineConfig.platform === 'pc') {
            if (klineConfig.chartType === 'depth') {
                merge(depthOption, klineConfig);
                this.setDepthChart = new DepthChart(depthOption);
            } else if (klineConfig.chartType === 'timeSharing') {
                this.setTimeSharing = new TimeSharingChart(klineConfig);
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

    setTimeSharingOption(data) {
        this.setTimeSharing.setTimeSharingOption(data);
    }

    updateTimeSharingOption(timeDivisionData, divisionData) {
        return this.setTimeSharing.updateTimeSharingOption(timeDivisionData, divisionData);
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
