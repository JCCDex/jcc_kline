import { StochasticOption, mobileIndicatorsLine } from './IndicatorsLineOption';
import StochasticChartController from './SetStochasticChart';
import RSIChart from './SetRSIChart';
import MTMChart from './SetMTMChart';
import WRChart from './SetWRChart';
import VRChart from './SetVRChart';
import OBVChart from './SetOBVChart';
import TRIXChart from './SetTRIXChart';
import DMIChart from './SetDMIChart';
import PSYChart from './SetPSYChart';
import ROCChart from './SetROCChart';
import BRARChart from './SetBRARChart';
import DMAChart from './SetDMAChart';
import BollChart from './SetBollChart';
import SARChart from './SetSARChart';

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
        } else if (chartsConfig.chartType === 'psy') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setPSYChart = new PSYChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setPSYChart = new PSYChart(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === 'roc') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setROCChart = new ROCChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setROCChart = new ROCChart(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === 'brar') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setBRARChart = new BRARChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setBRARChart = new BRARChart(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === 'dma') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setDMAChart = new DMAChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setDMAChart = new DMAChart(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === 'Boll') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setBollChart = new BollChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setBollChart = new BollChart(mobileIndicatorsLine);
            }
        } else if (chartsConfig.chartType === 'sar') {
            if (chartsConfig.platform === 'pc') {
                merge(StochasticOption, chartsConfig);
                this.setSARChart = new SARChart(StochasticOption);
            } else {
                merge(mobileIndicatorsLine, chartsConfig);
                this.setSARChart = new SARChart(mobileIndicatorsLine);
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

    /* 绘制PSY指标线 */
    initPSYChart(DOM, clear) {
        this.setPSYChart.initPSYECharts(DOM, clear);
    }

    resizePSYChart(DOM, isFullScreen, size) {
        this.setPSYChart.resizePSYECharts(DOM, isFullScreen, size);
    }

    getPSYTipData() {
        return this.setPSYChart.getToolTipData();
    }

    changePSYDataZoom(type) {
        this.setPSYChart.changeDataZoom(type);
    }

    setPSYOption(data, cycle) {
        this.setPSYChart.setPSYOption(data, cycle);
    }

    updatePSYOption(data, cycle) {
        this.setPSYChart.updatePSYOption(data, cycle);
    }

    disposePSYEChart() {
        this.setPSYChart.disposePSYEChart();
    }

    /* 绘制ROC指标线 */
    initROCChart(DOM, clear) {
        this.setROCChart.initROCECharts(DOM, clear);
    }

    resizeROCChart(DOM, isFullScreen, size) {
        this.setROCChart.resizeROCECharts(DOM, isFullScreen, size);
    }

    getROCTipData() {
        return this.setROCChart.getToolTipData();
    }

    changeROCDataZoom(type) {
        this.setROCChart.changeDataZoom(type);
    }

    setROCOption(data, cycle) {
        this.setROCChart.setROCOption(data, cycle);
    }

    updateROCOption(data, cycle) {
        this.setROCChart.updateROCOption(data, cycle);
    }

    disposeROCEChart() {
        this.setROCChart.disposeROCEChart();
    }

    /* 绘制BRAR指标线 */
    initBRARChart(DOM, clear) {
        this.setBRARChart.initBRARECharts(DOM, clear);
    }

    resizeBRARChart(DOM, isFullScreen, size) {
        this.setBRARChart.resizeBRARECharts(DOM, isFullScreen, size);
    }

    getBRARTipData() {
        return this.setBRARChart.getToolTipData();
    }

    changeBRARDataZoom(type) {
        this.setBRARChart.changeDataZoom(type);
    }

    setBRAROption(data, cycle) {
        this.setBRARChart.setBRAROption(data, cycle);
    }

    updateBRAROption(data, cycle) {
        this.setBRARChart.updateBRAROption(data, cycle);
    }

    disposeBRAREChart() {
        this.setBRARChart.disposeBRAREChart();
    }

    /* 绘制DMA指标线 */
    initDMAChart(DOM, clear) {
        this.setDMAChart.initDMAECharts(DOM, clear);
    }

    resizeDMAChart(DOM, isFullScreen, size) {
        this.setDMAChart.resizeDMAECharts(DOM, isFullScreen, size);
    }

    getDMATipData() {
        return this.setDMAChart.getToolTipData();
    }

    changeDMADataZoom(type) {
        this.setDMAChart.changeDataZoom(type);
    }

    setDMAOption(data, cycle) {
        this.setDMAChart.setDMAOption(data, cycle);
    }

    updateDMAOption(data, cycle) {
        this.setDMAChart.updateDMAOption(data, cycle);
    }

    disposeDMAEChart() {
        this.setDMAChart.disposeDMAEChart();
    }

    /* 绘制Boll指标线 */
    initBollChart(DOM, clear) {
        this.setBollChart.initBollECharts(DOM, clear);
    }

    resizeBollChart(DOM, isFullScreen, size) {
        this.setBollChart.resizeBollECharts(DOM, isFullScreen, size);
    }

    getBollTipData() {
        return this.setBollChart.getToolTipData();
    }

    changeBollDataZoom(type) {
        this.setBollChart.changeDataZoom(type);
    }

    setBollOption(data, cycle) {
        this.setBollChart.setBollOption(data, cycle);
    }

    updateBollOption(data, cycle) {
        this.setBollChart.updateBollOption(data, cycle);
    }

    disposeBollEChart() {
        this.setBollChart.disposeBollEChart();
    }

    /* 绘制SAR指标线 */
    initSARChart(DOM, clear) {
        this.setSARChart.initSARECharts(DOM, clear);
    }

    resizeSARChart(DOM, isFullScreen, size) {
        this.setSARChart.resizeSARECharts(DOM, isFullScreen, size);
    }

    getSARTipData() {
        return this.setSARChart.getToolTipData();
    }

    changeSARDataZoom(type) {
        this.setSARChart.changeDataZoom(type);
    }

    setSAROption(data, cycle) {
        this.setSARChart.setSAROption(data, cycle);
    }

    updateSAROption(data, cycle) {
        this.setSARChart.updateSAROption(data, cycle);
    }

    disposeSAREChart() {
        this.setSARChart.disposeSAREChart();
    }


}

export default IndicatorChartController;
