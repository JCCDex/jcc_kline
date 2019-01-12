// import KLineSetChartController from './KLineSetChart';
import DepthChart from './SetDepthChart';
// import { indicatorsOption } from './processData';

class ChartController {
    constructor(klineConfig) {
        // var merge = require('lodash.merge');
        var config;
        if (klineConfig.platform === 'pc') {
            if (klineConfig.chartType === 'candle') {
                return;
                // let klineOption = indicatorsOption(klineConfig.showIndicators);
                // config = merge(klineOption, klineConfig);
                // this.setKLineChart = new KLineSetChartController(config, klineConfig.showIndicators);
            } else if (klineConfig.chartType === 'depth') {
                this.setDepthChart = new DepthChart(config);
            }
        }
    }

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
}

export default ChartController;
