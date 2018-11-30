import KLineSetChartController from './KLineSetChart';
import KLineMobileSetChartController from './KLineMobileSetChart'
import { indicatorsOption, mobileIndicatorsOption } from './processData'

class KLineController {
  constructor(platform, klineConfig, showIndicators) {
    var merge = require('lodash.merge');
    var config
    if (platform === 'pc') {
      let klineOption = indicatorsOption(showIndicators)
      config = merge(klineOption, klineConfig)
      this.setKLineChart = new KLineSetChartController(config, showIndicators);
    } else {
      let klineMobileOption = mobileIndicatorsOption(showIndicators)
      config = merge(klineMobileOption, klineConfig)
      this.setMobileKLineChart = new KLineMobileSetChartController(config, showIndicators);
    }
  }

  initChart(DOM) {
    this.setKLineChart.initECharts(DOM)
  }

  resizeChart(DOM) {
    this.setKLineChart.resizeECharts(DOM)
  }

  clearChart() {
    this.setKLineChart.clearEcharts()
  }

  disposeChart() {
    this.setKLineChart.disposeEChart()
  }

  setOption(data, cycle) {
    return this.setKLineChart.setOption(data, cycle)
  }

  getToolTipData() {
    return this.setKLineChart.getToolTipData()
  }

  changeDataZoom(type) {
    this.setKLineChart.changeDataZoom(type)
  }

  updateOption(data, cycle) {
    this.setKLineChart.updateOption(data, cycle)
  }

  initMobileChart(DOM) {
    this.setMobileKLineChart.initMobileECharts(DOM)
  }

  showMobileLoading() {
    this.setMobileKLineChart.showLoading()
  }

  getMobileToolTipData() {
    return this.setMobileKLineChart.getToolTipData()
  }

  hideMobileLoading() {
    this.setMobileKLineChart.hideLoading()
  }

  setMobileOption(size) {
    this.setMobileKLineChart.setOption(size)
  }

  setTimeDivisionsOption(size) {
    this.setMobileKLineChart.setTimeDivisionsOption(size)
  }

  changeMobileDataZoom(type) {
    this.setMobileKLineChart.changeDataZoom(type)
  }

  updateMobileOption(data) {
    return this.setMobileKLineChart.updateOption(data)
  }

  updateTimeDivisionOption(timeDivisionData, divisionData) {
    return this.setMobileKLineChart.updateTimeDivisionOption(timeDivisionData, divisionData)
  }

  disposeMobileChart() {
    this.setMobileKLineChart.disposeMobileEChart()
  }

  clearMobileChart() {
    this.setMobileKLineChart.clearMobileEcharts();
  }
}

export default KLineController;

