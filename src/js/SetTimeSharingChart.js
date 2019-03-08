import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { getClientWidth, getLanguage, getClientHeight, formatDecimal } from './utils';

var timeSharingSize = {
    width: 0,
    height: 0
};
var timeSharingOption;
var oldTimeSharingData;
var toolTipData;
var amountsPrecision = 2;
var pricePrecision = 6;

class TimeSharingChart {
    constructor(configs) {
        this.timeSharingConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, resizeSize) {
        if (this.timeSharingConfig.platform === 'pc') {
            if (!isFullScreen) {
                if (!this.timeSharingConfig.defaultSize) {
                    let resizeContainer = () => {
                        if (DOM) {
                            DOM.style.height = resizeSize.height + 'px';
                            DOM.style.width = resizeSize.width + 'px';
                            timeSharingSize.width = resizeSize.width;
                            timeSharingSize.height = resizeSize.height;
                        }
                    };
                    resizeContainer(this);
                    this.timeSharing.resize();
                } else {
                    let size = getClientWidth();
                    let resizeContainer = () => {
                        let width;
                        let height;
                        if (DOM) {
                            if (size <= 1024) {
                                width = 1000 * 0.7;
                                height = 1000 * 0.44 * 0.8;
                            } else if (size <= 1280) {
                                width = 1203 * 0.7;
                                height = 1203 * 0.37 * 0.8;
                            } else if (size <= 1366) {
                                width = 1284 * 0.7;
                                height = 1284 * 0.44 * 0.8;
                            } else if (size <= 1440) {
                                width = 1354 * 0.7;
                                height = 1354 * 0.4 * 0.8;
                            } else if (size <= 1680) {
                                width = 1504 * 0.7;
                                height = 1504 * 0.36 * 0.8;
                            } else if (size <= 1920) {
                                width = 1804 * 0.7;
                                height = 1804 * 0.37 * 0.8;
                            } else if (size <= 2180) {
                                width = 2048 * 0.7;
                                height = 2048 * 0.37 * 0.8;
                            } else if (size <= 2560) {
                                width = 2560 * 0.7;
                                height = 1385 * 0.37 * 0.8;
                            } else if (size <= 3440) {
                                width = 3440 * 0.7;
                                height = 1426 * 0.37 * 0.8;
                            } else if (size <= 3840) {
                                width = 3840 * 0.7;
                                height = 1426 * 0.37 * 0.8;
                            }
                            DOM.style.height = height + 'px';
                            DOM.style.width = width + 'px';
                            timeSharingSize.width = width;
                            timeSharingSize.height = height;
                        }
                    };
                    resizeContainer(this);
                    this.timeSharing.resize();
                }
            } else {
                let resizeContainer = () => {
                    DOM.style.height = getClientHeight() + 'px';
                    DOM.style.width = getClientWidth() + 'px';
                    timeSharingSize.width = getClientWidth();
                    timeSharingSize.height = getClientHeight();
                };
                resizeContainer(this);
                this.timeSharing.resize();
            }
            if (oldTimeSharingData) {
                this.updateTimeSharingOption(oldTimeSharingData.timeDivisionData, oldTimeSharingData.data);
            }
        }
    }

    initTimeSharingECharts(DOM) {
        toolTipData = null;
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
        toolTipData = null;
        oldTimeSharingData = null;
        this.timeSharing.clear();
    }

    disposeTimeSharingEChart() {
        if (this.timeSharing) {
            this.timeSharing.dispose();
        }
    }

    setTimeSharingOption(timeDivisionData, data) {
        pricePrecision = !isNaN(data.precision.price) ? data.precision.price : pricePrecision;
        amountsPrecision = !isNaN(data.precision.amount) ? data.precision.amount : amountsPrecision;
        timeSharingOption = JSON.parse(JSON.stringify(this.timeSharingConfig));
        oldTimeSharingData = {
            timeDivisionData: timeDivisionData,
            data: data
        };
        let { times, averages, prices, volumes } = data;
        let length = timeDivisionData.length - 1;
        toolTipData = {
            time: times[length][3],
            volume: formatDecimal(volumes[length][1], amountsPrecision, true),
            price: formatDecimal(prices[length], pricePrecision, true),
            averagePrice: formatDecimal(averages[length], pricePrecision, true),
            color: volumes[length][2]
        };
        let option = {
            xAxis: this.getTimeSharingXAxis(times),
            tooltip: this.getTimeSharingToolTip(data),
            series: this.getTimeSharingSeries(prices, averages, volumes),
            dataZoom: this.getTimeSharingDataZoom()
        };
        merge(timeSharingOption, option);
        this.timeSharing.hideLoading();
        this.timeSharing.setOption(timeSharingOption, true);
        return toolTipData;
    }

    updateTimeSharingOption(timeDivisionData, data) {
        pricePrecision = !isNaN(data.precision.price) ? data.precision.price : pricePrecision;
        amountsPrecision = !isNaN(data.precision.amount) ? data.precision.amount : amountsPrecision;
        let { times, averages, prices, volumes } = data;
        let option = {
            xAxis: this.getTimeSharingXAxis(times),
            tooltip: this.getTimeSharingToolTip(data),
            series: this.getTimeSharingSeries(prices, averages, volumes)
        };
        merge(timeSharingOption, option);
        timeSharingOption.dataZoom = this.timeSharing.getOption().dataZoom;
        this.timeSharing.setOption(timeSharingOption);
    }

    getTimeSharingTipData() {
        return toolTipData;
    }

    getTimeSharingXAxis(times) {
        return [{
            gridIndex: 0,
            data: times
        }
        ];
    }

    getTimeSharingToolTip(data) {
        var toolTip = {
            formatter: function (param) {
                let dataIndex = param[0].dataIndex;
                toolTipData = {
                    time: data.times[dataIndex],
                    volume: formatDecimal(data.volumes[dataIndex][1], amountsPrecision, true),
                    price: formatDecimal(data.prices[dataIndex], pricePrecision, true),
                    averagePrice: formatDecimal(data.averages[dataIndex], pricePrecision, true),
                    color: data.volumes[dataIndex][2]
                };
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
