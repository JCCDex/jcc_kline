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
var amountsPrecision = 2;
var pricePrecision = 6;


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

    setOption(size) {
        config = JSON.parse(JSON.stringify(this.klineConfig));
        let option = {
            grid: this.getGrid(size.klineSize),
            yAxis: this.getYAxis(size.klineSize)
        };
        merge(config, option);
        cycle = 'normal';
        this.kline.hideLoading();
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

    updateOption(data, cycle) {
        pricePrecision = !isNaN(data.precision.price) ? data.precision.price : pricePrecision;
        amountsPrecision = !isNaN(data.precision.amount) ? data.precision.amount : amountsPrecision;
        let length = data.values.length - 1;
        let MAConfig = this.klineConfig.MA;
        if (!toolTipData) {
            toolTipData = {
                time: data.categoryData[length],
                volume: formatDecimal(data.values[length][5], amountsPrecision, true),
                opening: formatDecimal(data.values[length][0], pricePrecision, true),
                closing: formatDecimal(data.values[length][1], pricePrecision, true),
                max: formatDecimal(data.values[length][3], pricePrecision, true),
                min: formatDecimal(data.values[length][2], pricePrecision, true),
                MAData: [],
                color: data.volumes[length][2],
                type: 'normal'
            };
            for (var i = 0; i < MAConfig.length; i++) {
                toolTipData.MAData[i] = {
                    name: MAConfig[i].name,
                    data: formatDecimal(calculateMA(MAConfig[i].name.substring(2) * 1, data)[length], pricePrecision, true),
                };
            }
        }
        let updateOption = {
            xAxis: this.getXAxis(data, cycle),
            tooltip: this.getToolTip(data, MAConfig),
            series: this.getSeries(data)
        };
        merge(config, updateOption);
        config.dataZoom = this.kline.getOption().dataZoom;
        this.kline.setOption(config);
        return toolTipData;
    }

    updateTimeDivisionOption(timeDivisionData, data, precision) {
        pricePrecision = !isNaN(precision.price) ? precision.price : pricePrecision;
        amountsPrecision = !isNaN(precision.amount) ? precision.amount : amountsPrecision;
        let { times, averages, prices, volumes } = data;
        let length = timeDivisionData.length - 1;
        if (!toolTipData) {
            toolTipData = {
                time: formatTime(timeDivisionData[length][3]),
                volume: formatDecimal(timeDivisionData[length][1], amountsPrecision, true),
                price: formatDecimal(timeDivisionData[length][2], pricePrecision, true),
                averagePrice: formatDecimal(averages[length], pricePrecision, true),
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
                        volume: formatDecimal(data[1], amountsPrecision, true),
                        price: formatDecimal(data[2], pricePrecision, true),
                        averagePrice: formatDecimal(averages[dataIndex], pricePrecision, true),
                        color: volumes[dataIndex][2]
                    };


                }
            }
        };
        merge(timeDivisionconfig, updateTimeOption);
        timeDivisionconfig.dataZoom = this.kline.getOption().dataZoom;
        this.kline.hideLoading();
        this.kline.setOption(timeDivisionconfig);
        return toolTipData;
    }

    getXAxis(data, cycle) {
        return [
            {
                data: data.categoryData,
                axisLabel: {
                    formatter(value) {
                        if (cycle === 'hour') {
                            return value.substring(5);
                        }
                        if (cycle === 'day') {
                            return value.substring(0, 12);
                        }
                        if (cycle === 'week') {
                            return value.substring(0, 12);
                        }
                        if (cycle === 'month') {
                            return value.substring(0, 7);
                        }
                    }
                }
            },
            {
                data: data.categoryData,
                axisLabel: {
                    formatter(value) {
                        if (cycle === 'hour') {
                            return value.substring(5);
                        }
                        if (cycle === 'day') {
                            return value.substring(0, 12);
                        }
                        if (cycle === 'week') {
                            return value.substring(0, 12);
                        }
                        if (cycle === 'month') {
                            return value.substring(0, 7);
                        }
                    }
                }
            }
        ];
    }

    getSeries(data) {
        var s = [
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
        ];
        if (this.klineConfig.defaultMA !== false) {
            return s;
        } else {
            let MASeries = s[1];
            let MAIndex = this.klineConfig.MAIndex;
            s.splice(1, 5);
            for (let MA of this.klineConfig.MA) {
                s.splice(MAIndex, 0, JSON.parse(JSON.stringify(MASeries)));
                s[MAIndex].name = MA.name;
                s[MAIndex].data = calculateMA(MA.name.substring(2) * 1, data);
                MAIndex++;
            }
            return s;
        }
    }

    getToolTip(data, MAConfig) {
        return {
            formatter: function (param) {
                param = param[0];
                var index = param.data[0];
                toolTipData = {
                    time: param.name,
                    volume: formatDecimal(data.values[index][5], amountsPrecision, true),
                opening: formatDecimal(data.values[index][0], pricePrecision, true),
                closing: formatDecimal(data.values[index][1], pricePrecision, true),
                max: formatDecimal(data.values[index][3], pricePrecision, true),
                min: formatDecimal(data.values[index][2], pricePrecision, true),
                    MAData: [],
                    color: data.volumes[index][2],
                    type: 'normal'
                };
                for (var i = 0; i < MAConfig.length; i++) {
                    toolTipData.MAData[i] = {
                        name: MAConfig[i].name,
                        data: formatDecimal(calculateMA(MAConfig[i].name.substring(2) * 1, data)[index], pricePrecision, true)
                    };
                }
            }
        };
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
            dataZoom[0].start = dataZoom[0].start - 2;
            dataZoom[0].end = dataZoom[0].end - 2;
        } else if (type === 'enlarge' && dataZoom[0].start < 95) {
            dataZoom[0].start = dataZoom[0].start + 5;
        } else if (type === 'refresh') {
            dataZoom[0].start = this.klineConfig.dataZoom[0].start;
            dataZoom[0].end = this.klineConfig.dataZoom[0].end;
        } else if (type === 'narrow' && dataZoom[0].start >= 5) {
            dataZoom[0].start = dataZoom[0].start - 5;
        } else if (type === 'rightShift' && dataZoom[0].end <= 98) {
            dataZoom[0].start = dataZoom[0].start + 2;
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