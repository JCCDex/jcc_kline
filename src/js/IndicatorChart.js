import { StochasticOption, mobileIndicatorsLine } from './IndicatorsLineOption';
import StochasticChartController from './SetStochasticChart';
import RSIChart from './SetRSIChart';
import MTMChart from './SetMTMChart';
import WRChart from './SetWRChart';
import VRChart from './SetVRChart';
import OBVChart from './SetOBVChart';
import TRIXChart from './SetTRIXChart';
import DMIChart from './SetDMIChart';

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
        } else if (chartsConfig.chartType === 'rsi') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setRSIChart = new RSIChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setRSIChart = new RSIChart(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === 'mtm') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setMTMChart = new MTMChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setMTMChart = new MTMChart(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === 'wr') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setWRChart = new WRChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setWRChart = new WRChart(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === 'vr') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setVRChart = new VRChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setVRChart = new VRChart(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === 'obv') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setOBVChart = new OBVChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setOBVChart = new OBVChart(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === 'trix') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setTRIXChart = new TRIXChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setTRIXChart = new TRIXChart(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === 'dmi') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setDMIChart = new DMIChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setDMIChart = new DMIChart(mobileIndicatorsLine);
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

    changeStochasticDataZoom(type) {
        this.setStochasticChart.changeDataZoom(type);
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

    /* 绘制指标线(RSI) */
    initRSIChart(DOM, clear) {
        this.setRSIChart.initIndicatorECharts(DOM, clear);
    }

    resizeRSIChart(DOM, isFullScreen, size) {
        this.setRSIChart.resizeECharts(DOM, isFullScreen, size);
    }

    getRSITipData() {
        return this.setRSIChart.getToolTipData();
    }

    changeRSIDataZoom(type) {
        this.setRSIChart.changeDataZoom(type);
    }

    setRSIOption(data, cycle) {
        this.setRSIChart.setIndicatorOption(data, cycle);
    }

    updateRSIOption(data, cycle) {
        this.setRSIChart.updateIndicatorOption(data, cycle);
    }

    disposeRSIEChart() {
        this.setRSIChart.disposeIndicatorEChart();
    }

    /* 绘制指标线(MTM) */
    initMTMChart(DOM, clear) {
        this.setMTMChart.initIndicatorECharts(DOM, clear);
    }

    resizeMTMChart(DOM, isFullScreen, size) {
        this.setMTMChart.resizeECharts(DOM, isFullScreen, size);
    }

    getMTMTipData() {
        return this.setMTMChart.getToolTipData();
    }

    changeMTMDataZoom(type) {
        this.setMTMChart.changeDataZoom(type);
    }

    setMTMOption(data, cycle) {
        this.setMTMChart.setIndicatorOption(data, cycle);
    }

    updateMTMOption(data, cycle) {
        this.setMTMChart.updateIndicatorOption(data, cycle);
    }

    disposeMTMEChart() {
        this.setMTMChart.disposeIndicatorEChart();
    }

    /* 绘制指标线(WR) */
    initWRChart(DOM, clear) {
        this.setWRChart.initIndicatorECharts(DOM, clear);
    }

    resizeWRChart(DOM, isFullScreen, size) {
        this.setWRChart.resizeECharts(DOM, isFullScreen, size);
    }

    getWRTipData() {
        return this.setWRChart.getToolTipData();
    }

    changeWRDataZoom(type) {
        this.setWRChart.changeDataZoom(type);
    }

    setWROption(data, cycle) {
        this.setWRChart.setIndicatorOption(data, cycle);
    }

    updateWROption(data, cycle) {
        this.setWRChart.updateIndicatorOption(data, cycle);
    }

    disposeWREChart() {
        this.setWRChart.disposeIndicatorEChart();
    }

    /* 绘制指标线(VR) */
    initVRChart(DOM, clear) {
        this.setVRChart.initIndicatorECharts(DOM, clear);
    }

    resizeVRChart(DOM, isFullScreen, size) {
        this.setVRChart.resizeECharts(DOM, isFullScreen, size);
    }

    getVRTipData() {
        return this.setVRChart.getToolTipData();
    }

    changeVRDataZoom(type) {
        this.setVRChart.changeDataZoom(type);
    }

    setVROption(data, cycle) {
        this.setVRChart.setIndicatorOption(data, cycle);
    }

    updateVROption(data, cycle) {
        this.setVRChart.updateIndicatorOption(data, cycle);
    }

    disposeVREChart() {
        this.setVRChart.disposeIndicatorEChart();
    }

    /* 绘制OBV指标线 */
    initOBVChart(DOM, clear) {
        this.setOBVChart.initOBVECharts(DOM, clear);
    }

    resizeOBVChart(DOM, isFullScreen, size) {
        this.setOBVChart.resizeOBVECharts(DOM, isFullScreen, size);
    }

    getOBVTipData() {
        return this.setOBVChart.getToolTipData();
    }

    changeOBVDataZoom(type) {
        this.setOBVChart.changeDataZoom(type);
    }

    setOBVOption(data, cycle) {
        this.setOBVChart.setOBVOption(data, cycle);
    }

    updateOBVOption(data, cycle) {
        this.setOBVChart.updateOBVOption(data, cycle);
    }

    disposeOBVEChart() {
        this.setOBVChart.disposeOBVEChart();
    }

    /* 绘制TRIX指标线 */
    initTRIXChart(DOM, clear) {
        this.setTRIXChart.initTRIXECharts(DOM, clear);
    }

    resizeTRIXChart(DOM, isFullScreen, size) {
        this.setTRIXChart.resizeTRIXECharts(DOM, isFullScreen, size);
    }

    getTRIXTipData() {
        return this.setTRIXChart.getToolTipData();
    }

    changeTRIXDataZoom(type) {
        this.setTRIXChart.changeDataZoom(type);
    }

    setTRIXOption(data, cycle) {
        this.setTRIXChart.setTRIXOption(data, cycle);
    }

    updateTRIXOption(data, cycle) {
        this.setTRIXChart.updateTRIXOption(data, cycle);
    }

    disposeTRIXEChart() {
        this.setTRIXChart.disposeTRIXEChart();
    }

    /* 绘制DMI指标线 */
    initDMIChart(DOM, clear) {
        this.setDMIChart.initDMIECharts(DOM, clear);
    }

    resizeDMIChart(DOM, isFullScreen, size) {
        this.setDMIChart.resizeDMIECharts(DOM, isFullScreen, size);
    }

    getDMITipData() {
        return this.setDMIChart.getToolTipData();
    }

    changeDMIDataZoom(type) {
        this.setDMIChart.changeDataZoom(type);
    }

    setDMIOption(data, cycle) {
        this.setDMIChart.setDMIOption(data, cycle);
    }

    updateDMIOption(data, cycle) {
        this.setDMIChart.updateDMIOption(data, cycle);
    }

    disposeDMIEChart() {
        this.setDMIChart.disposeDMIEChart();
    }

}

export default IndicatorChartController;
