import KLineSetChartController from './KLineSetChart';
import KLineMobileSetChartController from './KLineMobileSetChart';
import option from './KLineOption';
import mobileOption from './KLineMobileOption';

class KLineController {
    constructor(platform, klineConfig) {
        var merge = require('lodash.merge');
        var config;
        if (platform === 'pc') {
            config = merge(option, klineConfig);
            this.setKLineChart = new KLineSetChartController(config);
        } else {
            config = merge(mobileOption, klineConfig);
            this.setMobileKLineChart = new KLineMobileSetChartController(config);
        }
    }

    initChart(DOM) {
        this.setKLineChart.initECharts(DOM);
    }

    showLoading() {
        this.setKLineChart.showLoading();
    }

    resizeChart(DOM, isFullScreen, size) {
        this.setKLineChart.resizeECharts(DOM, isFullScreen, size);
    }

    setOption(data, cycle) {
        return this.setKLineChart.setOption(data, cycle);
    }

    updateOption(data, cycle) {
        this.setKLineChart.updateOption(data, cycle);
    }

    getToolTipData() {
        return this.setKLineChart.getToolTipData();
    }

    changeDataZoom(type) {
        this.setKLineChart.changeDataZoom(type);
    }

    clearChart() {
        this.setKLineChart.clearEcharts();
    }

    disposeChart() {
        this.setKLineChart.disposeEChart();
    }

    initMobileChart(DOM) {
        this.setMobileKLineChart.initMobileECharts(DOM);
    }

    showMobileLoading() {
        this.setMobileKLineChart.showLoading();
    }

    hideMobileLoading() {
        this.setMobileKLineChart.hideLoading();
    }

    getMobileToolTipData() {
        return this.setMobileKLineChart.getToolTipData();
    }

    setMobileOption(size, cycle) {
        this.setMobileKLineChart.setOption(size, cycle);
    }

    setTimeDivisionsOption(size) {
        this.setMobileKLineChart.setTimeDivisionsOption(size);
    }

    updateMobileOption(data) {
        return this.setMobileKLineChart.updateOption(data);
    }

    updateTimeDivisionOption(timeDivisionData, divisionData) {
        return this.setMobileKLineChart.updateTimeDivisionOption(timeDivisionData, divisionData);
    }

    changeMobileDataZoom(type) {
        this.setMobileKLineChart.changeDataZoom(type);
    }

    disposeMobileChart() {
        this.setMobileKLineChart.disposeMobileEChart();
    }

    clearMobileChart() {
        this.setMobileKLineChart.clearMobileEcharts();
    }
}

export default KLineController;

