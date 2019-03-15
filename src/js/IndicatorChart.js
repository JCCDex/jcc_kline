import { StochasticOption, mobileIndicatorsLine } from './IndicatorsLineOption';
import StochasticChartController from './SetStochasticChart';
import IndicatorChart from './SetIndicatorChart'
class IndicatorChartController {
    constructor(chartsConfig) {
        var merge = require('lodash.merge');
        if (chartsConfig.chartType === "stochastic") {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setStochasticChart = new StochasticChartController(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setStochasticChart = new StochasticChartController(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === "indicator") {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setIndicatorChart = new IndicatorChart(StochasticOption);
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

    getStochasticTipData() {
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

    initIndicatorChart(DOM) {
        this.setIndicatorChart.initIndicatorECharts(DOM);
    }

    resizeIndicatorChart(DOM, isFullScreen, size) {
        this.setIndicatorChart.resizeECharts(DOM, isFullScreen, size);
    }

    getIndicatorEchart() {
        return this.setIndicatorChart.getIndicatorEchart();
    }

    getIndicatorTipData() {
        return this.setIndicatorChart.getToolTipData();
    }

    setIndicatorOption(data, cycle) {
        this.setIndicatorChart.setIndicatorOption(data, cycle);
    }

    updateIndicatorOption(data, cycle) {
        this.setIndicatorChart.updateIndicatorOption(data, cycle);
    }

    clearIndicatorEcharts() {
        this.setIndicatorChart.clearIndicatorEcharts();
    }

    disposeIndicatorEChart() {
        this.setIndicatorChart.disposeIndicatorEChart();
    }


}

export default IndicatorChartController;
