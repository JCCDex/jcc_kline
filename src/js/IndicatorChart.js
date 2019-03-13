import { StochasticOption } from './IndicatorsLineOption';
import StochasticChartController from './SetStochasticChart';
class IndicatorChartController {
    constructor(chartsConfig) {
        var merge = require('lodash.merge');
        if (chartsConfig.chartType === 'stochastic') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setStochasticChart = new StochasticChartController(StochasticOption);
            }
        }
    }

    /* 绘制随机指标（KDJ） */
    initStochasticChart(DOM) {
        this.setStochasticChart.initStochasticECharts(DOM);
    }

    resizeStochasticChart(DOM, isFullScreen, size) {
        this.setStochasticChart.resizeECharts(DOM, isFullScreen, size);
    }

    getStochasticEchart() {
        return this.setStochasticChart.getStochasticEchart();
    }

    getToolTipData() {
        return this.setStochasticChart.getToolTipData();
    }

    setStochasticOption(data, cycle) {
        this.setStochasticChart.setStochasticOption(data, cycle);
    }

    updateStochasticOption(data, cycle) {
        this.setStochasticChart.updateStochasticOption(data, cycle);
    }

    clearStochasticEcharts() {
        this.setStochasticChart.clearStochasticEcharts();
    }

    disposeStochasticEChart() {
        this.setStochasticChart.disposeStochasticEChart();
    }

}

export default IndicatorChartController;
