import { StochasticOption, mobileIndicatorsLine } from './IndicatorsLineOption';
import StochasticChartController from './SetStochasticChart';
import IndicatorChart from './SetIndicatorChart';
class IndicatorChartController {
    constructor(chartsConfig) {
        var merge = require('lodash.merge');
        if (chartsConfig.chartType === 'stochastic') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setStochasticChart = new StochasticChartController(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setStochasticChart = new StochasticChartController(mobileIndicatorsLine);
            }
        } else {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setIndicatorChart = new IndicatorChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setIndicatorChart = new IndicatorChart(mobileIndicatorsLine);
            }
        }
    }

    /* 绘制随机指标（KDJ） */
    initStochasticChart(DOM, clear) {
        this.setStochasticChart.initStochasticECharts(DOM, clear);
    }

    resizeStochasticChart(DOM, isFullScreen, size) {
        this.setStochasticChart.resizeECharts(DOM, isFullScreen, size);
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

    disposeStochasticEChart() {
        this.setStochasticChart.disposeStochasticEChart();
    }

    /* 绘制指标线 */

    initIndicatorChart(DOM, clear) {
        this.setIndicatorChart.initIndicatorECharts(DOM, clear);
    }

    resizeIndicatorChart(DOM, isFullScreen, size) {
        this.setIndicatorChart.resizeECharts(DOM, isFullScreen, size);
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

    disposeIndicatorEChart() {
        this.setIndicatorChart.disposeIndicatorEChart();
    }

}

export default IndicatorChartController;
