import { indicatorOption, mobileIndicatorsOption } from './IndicatorOption';
import IndicatorChart from './SetIndicatorChart';

class IndicatorChartController {
    constructor(chartsConfig) {
        var merge = require('lodash.merge');
        if (chartsConfig.platform === 'pc') {
            merge(indicatorOption, chartsConfig);
            this.setIndicatorChart = new IndicatorChart(indicatorOption);
        } else {
            merge(mobileIndicatorsOption, chartsConfig);
            this.setIndicatorChart = new IndicatorChart(mobileIndicatorsOption);
        }
    }


    /* 绘制指标线 */
    initIndicatorChart(DOM, clear) {
        this.setIndicatorChart.initIndicatorECharts(DOM, clear);
    }

    resizeIndicatorChart(DOM, isFullScreen, size) {
        this.setIndicatorChart.resizeIndicatorECharts(DOM, isFullScreen, size);
    }

    getIndicatorTipData() {
        return this.setIndicatorChart.getToolTipData();
    }

    changeIndicatorDataZoom(type) {
        this.setIndicatorChart.changeDataZoom(type);
    }

    showIndicatorLoading(noData) {
        this.setIndicatorChart.showLoading(noData)
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
