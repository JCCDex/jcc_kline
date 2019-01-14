import DepthMapMobileSetChartController from './DepthMapMobileSetChart';

class DepthMapController {
    constructor(depthMapConfig) {
        this.setDepthMapChart = new DepthMapMobileSetChartController(depthMapConfig);
    }

    initMobileChart(DOM) {
        this.setDepthMapChart.initMobileECharts(DOM);
    }

    setDepthoption(data) {
        return this.setDepthMapChart.setDepthoption(data);
    }

    hideDepthLoading() {
        this.setDepthMapChart.hideLoading();
    }

}
export default DepthMapController;