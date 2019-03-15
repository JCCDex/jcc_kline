import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { getLanguage, getDefaultChartSize } from './utils';

var timeSharingOption;
var oldTimeSharingData;
var toolTipIndex;

class TimeSharingChart {
    constructor(configs) {
        this.timeSharingConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, resizeSize) {
        let size = getDefaultChartSize();
        if (this.timeSharingConfig.platform === 'pc') {
            if (!isFullScreen) {
                if (!this.timeSharingConfig.defaultSize) {
                    let resizeContainer = () => {
                        if (DOM) {
                            DOM.style.height = resizeSize.height + 'px';
                            DOM.style.width = resizeSize.width + 'px';
                        }
                    };
                    resizeContainer(this);
                    this.timeSharing.resize();
                } else {
                    let resizeContainer = () => {
                        if (DOM) {
                            DOM.style.height = size.height * 0.75 + 'px';
                            DOM.style.width = size.width + 'px';
                        }
                    };
                    resizeContainer(this);
                    this.timeSharing.resize();
                }
            } else {
                let resizeContainer = () => {
                    DOM.style.height = size.clientHeight * 0.75 + 'px';
                    DOM.style.width = size.clientWidth + 'px';
                };
                resizeContainer(this);
                this.timeSharing.resize();
            }
            if (oldTimeSharingData) {
                this.updateTimeSharingOption(oldTimeSharingData);
            }
        }
    }

    initTimeSharingECharts(DOM) {
        toolTipIndex = null;
        timeSharingOption = null;
        oldTimeSharingData = null;
        this.timeSharing = echarts.init(DOM);
        this.showLoading();
    }

    showLoading() {
        let message = getLanguage();
        this.timeSharing.showLoading(
            {
                text: message.loading,
                color: '#fff',
                textColor: '#fff',
                maskColor: 'rgba(22, 27, 33, 0.5)',
                zlevel: 1
            }
        );
    }

    clearTimeSharingEcharts() {
        toolTipIndex = null;
        oldTimeSharingData = null;
        this.timeSharing.clear();
    }

    disposeTimeSharingEChart() {
        if (this.timeSharing) {
            this.timeSharing.dispose();
        }
    }

    setTimeSharingOption(data) {
        timeSharingOption = JSON.parse(JSON.stringify(this.timeSharingConfig));
        oldTimeSharingData = data;
        let { times, averages, prices, volumes } = data;
        let length = averages.length - 1;
        toolTipIndex = length;
        let option = {
            xAxis: this.getTimeSharingXAxis(times),
            tooltip: this.getTimeSharingToolTip(),
            series: this.getTimeSharingSeries(prices, averages, volumes),
            dataZoom: this.getTimeSharingDataZoom()
        };
        merge(timeSharingOption, option);
        this.timeSharing.hideLoading();
        this.timeSharing.setOption(timeSharingOption, true);
        return toolTipIndex;
    }

    updateTimeSharingOption(data) {
        let { times, averages, prices, volumes } = data;
        let option = {
            xAxis: this.getTimeSharingXAxis(times),
            tooltip: this.getTimeSharingToolTip(),
            series: this.getTimeSharingSeries(prices, averages, volumes)
        };
        merge(timeSharingOption, option);
        timeSharingOption.dataZoom = this.timeSharing.getOption().dataZoom;
        this.timeSharing.setOption(timeSharingOption);
    }

    getTimeSharingEchart() {
        return this.timeSharing;
    }

    getTimeSharingTipIndex() {
        return toolTipIndex;
    }

    getTimeSharingXAxis(times) {
        return [{
            gridIndex: 0,
            data: times
        }
        ];
    }

    getTimeSharingToolTip() {
        var toolTip = {
            formatter: function (param) {
                let dataIndex = param[0].dataIndex;
                toolTipIndex = dataIndex;
            }
        };
        return toolTip;
    }

    getTimeSharingSeries(prices, averages) {
        return [{
            name: 'White',
            data: prices
        },
        {
            name: 'Yellow',
            data: averages
        }
        ];
    }

    getTimeSharingDataZoom() {
        return [
            {
                id: 'dataZoomX',
                type: 'inside',
                filterMode: 'filter',
                start: 60,
                end: 100,
                minSpan: 5
            }
        ];
    }
}

export default TimeSharingChart;
