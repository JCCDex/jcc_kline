import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { formatDecimal, getLanguage, formatTime } from './utils';
import { calculateMA } from './processData';

var cycle;
var config;
var timeDivisionconfig;
var toolTipData;


class KLineMobileSetChartController {
    constructor(configs) {
        this.klineConfig = configs;
    }

    initMobileECharts(DOM) {
        toolTipData = null;
        timeDivisionconfig = null;
        this.kline = echarts.init(DOM);
        this.showLoading();
    }

    showLoading() {
        let message = getLanguage();
        this.kline.showLoading({
            text: message.loading,
            color: '#fff',
            textColor: '#fff',
            maskColor: 'rgba(22, 27, 33, 0.5)',
            zlevel: 1
        });
    }

    hideLoading() {
        this.kline.hideLoading();
    }

    setOption(size, mobileCycle) {
        config = JSON.parse(JSON.stringify(this.klineConfig));
        let option = {
            grid: this.getGrid(size.klineSize),
            xAxis: this.getXAxis(size, mobileCycle),
            yAxis: this.getYAxis(size.klineSize)
        };
        merge(config, option);
        cycle = 'normal';
        this.kline.setOption(config, true);
    }

    setTimeDivisionsOption(size) {
        timeDivisionconfig = JSON.parse(JSON.stringify(this.klineConfig));
        let option = {
            grid: this.getGrid(size),
            yAxis: this.getYAxis(size),
            series: [
                {
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
            ]
        };
        merge(timeDivisionconfig, option);
        cycle = 'everyhour';
        this.kline.setOption(timeDivisionconfig, true);
    }

    updateOption(data) {
        this.kline.hideLoading();
        let length = data.values.length - 1;
        if (!toolTipData) {
            toolTipData = {
                time: data.categoryData[length],
                volume: formatDecimal(data.values[length][5], 0, 5),
                opening: data.values[length][0].toFixed(6),
                closing: data.values[length][1].toFixed(6),
                max: data.values[length][3].toFixed(6),
                min: data.values[length][2].toFixed(6),
                MA5: calculateMA(5, data)[length],
                MA10: calculateMA(10, data)[length],
                MA20: calculateMA(20, data)[length],
                MA30: calculateMA(30, data)[length],
                MA60: calculateMA(60, data)[length],
                color: data.volumes[length][2],
                type: 'normal'
            };
        }
        let updateOption = {
            xAxis: [
                {
                    data: data.categoryData
                },
                {
                    data: data.categoryData
                }
            ],
            tooltip: {
                formatter: function (param) {
                    param = param[0];
                    var index = param.data[0];
                    toolTipData = {
                        time: param.name,
                        volume: formatDecimal(data.values[index][5], 0, 5),
                        opening: data.values[index][0].toFixed(6),
                        closing: data.values[index][1].toFixed(6),
                        max: data.values[index][3].toFixed(6),
                        min: data.values[index][2].toFixed(6),
                        MA5: calculateMA(5, data)[index],
                        MA10: calculateMA(10, data)[index],
                        MA20: calculateMA(20, data)[index],
                        MA30: calculateMA(30, data)[index],
                        MA60: calculateMA(60, data)[index],
                        color: data.volumes[index][2],
                        type: 'normal'
                    };
                }
            },
            series: [
                {
                    type: 'candlestick',
                    data: data.values
                },
                {
                    name: 'MA5',
                    data: calculateMA(5, data)
                },
                {
                    name: 'MA10',
                    data: calculateMA(10, data)
                },
                {
                    name: 'MA20',
                    data: calculateMA(20, data)
                },
                {
                    name: 'MA30',
                    data: calculateMA(30, data)
                },
                {
                    name: 'MA60',
                    data: calculateMA(60, data)
                },
                {
                    name: 'Volume',
                    data: data.volumes,
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
            ]
        };
        merge(config, updateOption);
        config.dataZoom = this.kline.getOption().dataZoom;
        this.kline.setOption(config);
        return toolTipData;
    }

    updateTimeDivisionOption(timeDivisionData, data) {
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
            xAxis: [
                {
                    data: times
                },
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
                },
                {
                    name: 'Volume',
                    data: volumes
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
        merge(timeDivisionconfig, updateTimeOption);
        timeDivisionconfig.dataZoom = this.kline.getOption().dataZoom;
        this.kline.setOption(timeDivisionconfig);
        return toolTipData;
    }

    getToolTipData() {
        return toolTipData;
    }

    disposeMobileEChart() {
        this.kline.dispose();
    }

    clearMobileEcharts() {
        toolTipData = null;
        this.kline.clear();
    }


    getGrid(size) {
        let g = [{
            top: 5,
            height: `${size.height * 0.6}px`
        },
        {
            height: `${size.height * 0.2}px`
        }];
        return g;
    }

    getXAxis(data, mobileCycle) {
        var x = [{
            gridIndex: 0,
            data: data.categoryData,
            axisLabel: {
                formatter(value) {
                    if (mobileCycle === 'hour') {
                        return value.substring(5);
                    }
                    if (mobileCycle === 'day') {
                        return value.substring(0, 12);
                    }
                    if (mobileCycle === 'week') {
                        return value.substring(0, 12);
                    }
                    if (mobileCycle === 'month') {
                        return value.substring(0, 7);
                    }
                }
            }
        },
        {
            gridIndex: 1,
            data: data.categoryData
        }];
        return x;
    }

    getYAxis(size) {
        return [
            {
                axisLabel: {
                    margin: -(size.width - 45)
                }
            }
        ];
    }

    changeDataZoom(type) {
        let dataZoom = JSON.parse(JSON.stringify(this.kline.getOption().dataZoom));
        if (type === 'leftShift' && dataZoom[0].start >= 2) {
            dataZoom[0].start = dataZoom[0].start - 2,
            dataZoom[0].end = dataZoom[0].end - 2;
        } else if (type === 'enlarge' && dataZoom[0].start < 95) {
            dataZoom[0].start = dataZoom[0].start + 5;
        } else if (type === 'refresh') {
            dataZoom[0].start = this.klineConfig.dataZoom[0].start;
            dataZoom[0].end = this.klineConfig.dataZoom[0].end;
        } else if (type === 'narrow' && dataZoom[0].start >= 5) {
            dataZoom[0].start = dataZoom[0].start - 5;
        } else if (type === 'rightShift' && dataZoom[0].end <= 98) {
            dataZoom[0].start = dataZoom[0].start + 2,
            dataZoom[0].end = dataZoom[0].end + 2;
        }
        if (cycle === 'normal') {
            config.dataZoom = dataZoom;
            this.kline.setOption(config);
        } else {
            timeDivisionconfig.dataZoom = dataZoom;
            this.kline.setOption(timeDivisionconfig);
        }
    }

}

export default KLineMobileSetChartController;