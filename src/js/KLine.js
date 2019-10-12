import KLineSetChartController from './KLineSetChart';
import KLineMobileSetChartController from './KLineMobileSetChart';
import option from './KLineOption';
import mobileOption from './KLineMobileOption';
import { getCandleOptionByMA } from './ChartOptionUtils';

class KLineController {
    constructor(platform, klineConfig) {
        var merge = require('lodash.merge');
        var config;
        if (platform === 'pc') {
            config = merge(option, klineConfig);
            getCandleOptionByMA(config);
            this.setKLineChart = new KLineSetChartController(config);
        } else {
            config = merge(mobileOption, klineConfig);
            getCandleOptionByMA(config);
            this.setMobileKLineChart = new KLineMobileSetChartController(config);
        }
    }

    initChart(DOM, clear) {
        this.setKLineChart.initECharts(DOM, clear);
    }

    resizeChart(DOM, isFullScreen, isCloseIndicator, size) {
        this.setKLineChart.resizeECharts(DOM, isFullScreen, isCloseIndicator, size);
    }

    setOption(data, cycle) {
        return this.setKLineChart.setOption(data, cycle);
    }

    updateOption(data, cycle) {
        this.setKLineChart.updateOption(data, cycle);
    }

    // 绘制加载动画
    showKlineLoading(noData) {
        this.setKLineChart.showLoading(noData)
    }

    getToolTipIndex() {
        return this.setKLineChart.getToolTipIndex();
    }

    changeDataZoom(type) {
        this.setKLineChart.changeDataZoom(type);
    }

    disposeChart() {
        this.setKLineChart.disposeEChart();
    }

    initMobileChart(DOM, clear) {
        this.setMobileKLineChart.initMobileECharts(DOM, clear);
    }

    getMobileToolTipIndex() {
        return this.setMobileKLineChart.getToolTipIndex();
    }

    getMobileKlineDataZoom() {
        return this.setMobileKLineChart.getKlineDataZoom();
    }

    setMobileOption(size, data) {
        this.setMobileKLineChart.setOption(size, data);
    }

    setTimeDivisionsOption(size) {
        this.setMobileKLineChart.setTimeDivisionsOption(size);
    }

    updateMobileOption(data, cycle) {
        return this.setMobileKLineChart.updateOption(data, cycle);
    }

    updateTimeDivisionOption(divisionData, precision) {
        return this.setMobileKLineChart.updateTimeDivisionOption(divisionData, precision);
    }

    changeMobileDataZoom(type) {
        this.setMobileKLineChart.changeDataZoom(type);
    }

    disposeMobileChart() {
        this.setMobileKLineChart.disposeMobileEChart();
    }
}

export default KLineController;

