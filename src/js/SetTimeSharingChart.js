import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { getClientWidth, getLanguage, getClientHeight, formatTime, formatDecimal } from './utils';

var timeSharingSize = {
    width: 0,
    height: 0
};
var timeSharingOption;
var oldTimeSharingData;
var toolTipData;

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
        timeSharingOption = JSON.parse(JSON.stringify(this.timeSharingConfig));
        oldTimeSharingData = {
            timeDivisionData: timeDivisionData,
            data: data
        };
        let { times, averages, prices, volumes } = data;
        let length = timeDivisionData.length - 1;
        toolTipData = {
            time: formatTime(timeDivisionData[length][3]),
            volume: formatDecimal(timeDivisionData[length][1], 2, 5),
            price: timeDivisionData[length][2].toFixed(6),
            averagePrice: averages[length].toFixed(6),
            color: volumes[length][2]
        };
        let option = {
            grid: this.getTimeSharingGrid(),
            xAxis: this.getTimeSharingXAxis(times),
            yAxis: this.getTimeSharingYAxis(),
            tooltip: this.getTimeSharingToolTip(timeDivisionData, averages, volumes),
            series: this.getTimeSharingSeries(prices, averages, volumes),
            dataZoom: this.getTimeSharingDataZoom()
        };
        merge(timeSharingOption, option);
        this.timeSharing.hideLoading();
        this.timeSharing.setOption(timeSharingOption, true);
        return toolTipData;
    }

    updateTimeSharingOption(timeDivisionData, data) {
        let { times, averages, prices, volumes } = data;
        let option = {
            grid: this.getTimeSharingGrid(),
            xAxis: this.getTimeSharingXAxis(times),
            yAxis: this.getTimeSharingYAxis(),
            tooltip: this.getTimeSharingToolTip(timeDivisionData, averages, volumes),
            series: this.getTimeSharingSeries(prices, averages, volumes)
        };
        merge(timeSharingOption, option);
        timeSharingOption.dataZoom = this.timeSharing.getOption().dataZoom;
        this.timeSharing.setOption(timeSharingOption);
    }

    getTimeSharingTipData() {
        return toolTipData;
    }

    getTimeSharingGrid() {
        if (this.timeSharingConfig.platform === 'pc') {
            return [
                {
                    height: timeSharingSize.height / 600 * 360 + 'px'
                }, {
                    height: timeSharingSize.height / 600 * 100 + 'px'
                }
            ];
        } else {
            return [
                {
                    height: `${this.timeSharingConfig.size.height * 0.6}px`
                }, {
                    height: `${this.timeSharingConfig.size.height * 0.2}px`
                }
            ];
        }
    }

    getTimeSharingXAxis(times) {
        return [{
            gridIndex: 0,
            data: times
        },
        {
            gridIndex: 1,
            data: times
        }
        ];
    }

    getTimeSharingYAxis() {
        var y = [{
            gridIndex: 0
        },
        {
            gridIndex: 1,
            axisLabel: {
                formatter: function (value) {
                    if (value >= 1000 && value < 1000000) {
                        return (value / 1000) + 'K';
                    } else if (value >= 1000000) {
                        return (value / 1000000) + 'M';
                    } else {
                        return value;
                    }
                }
            }
        }];
        return y;
    }

    getTimeSharingToolTip(timeDivisionData, averages, volumes) {
        return {
            formatter: param => {
                let dataIndex = param[0].dataIndex;
                let data = timeDivisionData[dataIndex];
                toolTipData = {
                    time: formatTime(data[3]),
                    volume: formatDecimal(data[1], 2, 5),
                    price: data[2].toFixed(6),
                    averagePrice: averages[dataIndex].toFixed(6),
                    color: volumes[dataIndex][2]
                };
            }
        };
    }

    getTimeSharingSeries(prices, averages, volumes) {
        return [{
            name: 'White',
            data: prices
        },
        {
            name: 'Yellow',
            data: averages
        }, {
            name: 'Volume',
            data: volumes,
            itemStyle: {
                normal: {
                    color: function (param) {
                        return param.value[2] <= 0 ? '#ee4b4b' : '#3ee99f';
                    }
                }
            }
        }
        ];
    }

    getTimeSharingDataZoom() {
        return [
            {
                id: 'dataZoomX',
                type: 'inside',
                filterMode: 'filter',
                xAxisIndex: [0, 1],
                start: 60,
                end: 100,
                minSpan: 5
            }
        ];
    }
}

export default TimeSharingChart;
