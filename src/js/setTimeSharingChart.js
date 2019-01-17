import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { getClientWidth, getLanguage, getClientHeight, formatTime, formatDecimal } from './utils';

var klineSize = {
    width: 0,
    height: 0
};
var timeDivisionconfig;
var oldTimeSharingData;
var toolTipData;

class TimeSharingChart {
    constructor(configs) {
        this.klineConfig = configs;
    }

    resizeECharts(DOM, isFullScreen) {
        if (this.klineConfig.platform === 'pc') {
            if (!isFullScreen) {
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
                        }
                        DOM.style.height = height + 'px';
                        DOM.style.width = width + 'px';
                        klineSize.width = width;
                        klineSize.height = height;
                    }
                };
                resizeContainer(this);
                this.timeSharing.resize();
            } else {
                let resizeContainer = () => {
                    DOM.style.height = getClientHeight() + 'px';
                    DOM.style.width = getClientWidth() + 'px';
                    klineSize.width = getClientWidth();
                    klineSize.height = getClientHeight();
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
        timeDivisionconfig = null;
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

    setTimeSharingOption() {
        let option = {
            backgroundColor: '#161b21',
            animation: true,
            grid: this.getTimeSharingGrid(),
            xAxis: this.getTimeSharingXAxis(),
            yAxis: this.getTimeSharingYAxis(),
            tooltip: this.getTimeSharingToolTip(),
            series: this.getTimeSharingSeries(),
            dataZoom: this.getTimeSharingDataZoom()
        };
        timeDivisionconfig = option;
        this.timeSharing.setOption(option, true);
    }

    updateTimeSharingOption(timeDivisionData, data) {
        oldTimeSharingData = {
            timeDivisionData: timeDivisionData,
            data: data
        };
        this.timeSharing.hideLoading();
        let { times, averages, prices, volumes } = data;
        let length = timeDivisionData.length - 1;
        if (!toolTipData) {
            toolTipData = {
                time: formatTime(timeDivisionData[length][3]),
                volume: formatDecimal(timeDivisionData[length][1], 0, 5),
                price: timeDivisionData[length][2].toFixed(6),
                averagePrice: averages[length].toFixed(6),
                color: volumes[length][2]
            };
        }
        let updateTimeOption = {
            grid: [{
                height: klineSize.height / 600 * 360 + 'px'
            },{
                height: klineSize.height / 600 * 100 + 'px'
            }],
            xAxis: [
                {
                    data: times
                }
            ],
            series: [
                {
                    name: 'White',
                    data: prices
                },
                {
                    name: 'Yellow',
                    data: averages
                }
            ],
            tooltip: {
                formatter: param => {
                    let dataIndex = param[0].dataIndex;
                    let data = timeDivisionData[dataIndex];
                    toolTipData = {
                        time: formatTime(data[3]),
                        volume: formatDecimal(data[1], 0, 5),
                        price: data[2].toFixed(6),
                        averagePrice: averages[dataIndex].toFixed(6),
                        color: volumes[dataIndex][2]
                    };


                }
            }
        };
        updateTimeOption.xAxis.push({
            data: times
        });
        updateTimeOption.series.push({
            name: 'Volume',
            data: volumes
        });
        merge(timeDivisionconfig, updateTimeOption);
        // if (this.showIndicators.indexOf('Volume') === -1) {
        //     timeDivisionconfig.dataZoom[0].xAxisIndex = [0];
        // }
        timeDivisionconfig.dataZoom = this.timeSharing.getOption().dataZoom;
        this.timeSharing.setOption(timeDivisionconfig);
        return toolTipData;
    }

    getTimeSharingTipData() {
        return toolTipData;
    }

    getTimeSharingGrid() {
        return [
            {
                left: 10,
                top: 50,
                right: 100
            },
            {
                left: 10,
                right: 100,
                bottom: 10,
                backgroundColor: '#1b2229',
                borderColor: '#1b2229',
                show: true
            }
        ];
    }

    getTimeSharingXAxis() {
        return [{
            type: 'category',
            gridIndex: 0,
            scale: true,
            boundaryGap: true,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#37404b'
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                z: 100,
                label: {
                    show: false
                }
            }
        },
        {
            type: 'category',
            gridIndex: 1,
            scale: true,
            boundaryGap: true,
            axisLine: {
                onZero: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }
        ];
    }

    getTimeSharingYAxis() {
        return [{
            scale: true,
            gridIndex: 0,
            position: 'right',
            splitArea: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#37404b',
                    type: 'dotted'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#37404b'
                }
            },
            axisLabel: {
                show: true,
                color: '#f3f7f6',
                algin: 'right',
                verticalAlign: 'top'
            }
        },
        {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            position: 'right',
            splitArea: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#37404b',
                    type: 'dotted'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#37404b'
                }
            },
            axisLabel: {
                show: true,
                color: '#f3f7f6',
                algin: 'right',
                verticalAlign: 'top'
            }
        }
        ];
    }

    getTimeSharingToolTip() {
        return {
            trigger: 'axis',
            animation: false,
            axisPointer: {
                type: 'cross',
                link: { xAxisIndex: 'all' }
            },
            backgroundColor: 'rgba(245, 245, 245, 0.5)',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                color: '#ffffff',
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif'
            },
            extraCssText: 'background:#252332;border:0;opacity: 0.7;'
        };
    }

    getTimeSharingSeries() {
        return [{
            name: 'White',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#fff',
                    opacity: 1,
                    width: 2
                }
            }
        },
        {
            name: 'Yellow',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: 'yellow',
                    opacity: 1,
                    width: 2
                }
            }
        },
        {
            name: 'Volume',
            type: 'bar',
            barMaxWidth: 20,
            itemStyle: {
                normal: {
                    color: function (param) {
                        return param.value[2] <= 0 ? '#ee4b4b' : '#3ee99f';
                    }
                }
            },
            xAxisIndex: 1,
            yAxisIndex: 1
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
