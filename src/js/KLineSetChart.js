import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { calculateMA } from './processData';
import { getClientWidth, formatDecimal, getLanguage, getClientHeight } from './utils';

var klineSize = {
    width: 0,
    height: 0
};

var config;
var toolTipData;
var oldKlineData;
var amountsPrecision = 2;
var pricePrecision = 6;

class KLineSetChartController {
    constructor(configs) {
        this.klineConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, resizeSize) {
        if (!isFullScreen) {
            if (!this.klineConfig.defaultSize) {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = resizeSize.height + 'px';
                        DOM.style.width = resizeSize.width + 'px';
                        klineSize.width = resizeSize.width;
                        klineSize.height = resizeSize.height;
                    }
                };
                resizeContainer(this);
                this.kline.resize();
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
                        klineSize.width = width;
                        klineSize.height = height;
                    }
                };
                resizeContainer(this);
                this.kline.resize();
            }
        } else {
            let resizeContainer = () => {
                DOM.style.height = getClientHeight() + 'px';
                DOM.style.width = getClientWidth() + 'px';
                klineSize.width = getClientWidth();
                klineSize.height = getClientHeight();
            };
            resizeContainer(this);
            this.kline.resize();
        }
        if (oldKlineData) {
            this.updateOption(oldKlineData.oldData, oldKlineData.oldCycle);
        }
    }

    initECharts(DOM) {
        this.kline = echarts.init(DOM);
        this.showLoading();
    }

    showLoading() {
        let message = getLanguage();
        this.kline.showLoading(
            {
                text: message.loading,
                color: '#fff',
                textColor: '#fff',
                maskColor: 'rgba(22, 27, 33, 0.5)',
                zlevel: 1
            }
        );
    }

    clearEcharts() {
        toolTipData = null;
        oldKlineData = null;
        this.kline.clear();
    }

    disposeEChart() {
        if (this.kline) {
            this.kline.dispose();
        }
    }

    /* 绘制kline开始 */

    setOption(data, cycle) {
        oldKlineData = {
            oldData: data,
            oldCycle: cycle
        };
        config = JSON.parse(JSON.stringify(this.klineConfig));
        if (data) {
            pricePrecision = data.precision.price ? data.precision.price : pricePrecision;
            amountsPrecision = data.precision.amount ? data.precision.amount : amountsPrecision;
            let length = data.values.length - 1;
            toolTipData = {
                time: data.categoryData[length],
                volume: formatDecimal(data.values[length][5], amountsPrecision, true),
                opening: formatDecimal(data.values[length][0], pricePrecision, true),
                closing: formatDecimal(data.values[length][1], pricePrecision, true),
                max: formatDecimal(data.values[length][3], pricePrecision, true),
                min: formatDecimal(data.values[length][2], pricePrecision, true),
                MA5: formatDecimal(calculateMA(5, data)[length], pricePrecision, true),
                MA10: formatDecimal(calculateMA(10, data)[length], pricePrecision, true),
                MA20: formatDecimal(calculateMA(20, data)[length], pricePrecision, true),
                MA30: formatDecimal(calculateMA(30, data)[length], pricePrecision, true),
                MA60: formatDecimal(calculateMA(60, data)[length], pricePrecision, true),
                color: data.volumes[length][2]
            };
            this.kline.hideLoading();
            let klineOption = {
                grid: this.getGrid(data),
                tooltip: this.getToolTip(data),
                xAxis: this.getXAxis(data, cycle),
                yAxis: this.getYAxis(data),
                series: this.getSeries(data)
            };
            merge(config, klineOption);
            this.kline.setOption(config, true);
            return toolTipData;
        }
    }

    updateOption(data, cycle) {
        pricePrecision = data.precision.price ? data.precision.price : pricePrecision;
        amountsPrecision = data.precision.amount ? data.precision.amount : amountsPrecision;
        oldKlineData = {
            oldData: data,
            oldCycle: cycle
        };
        if (this.kline.getOption()) {
            let klineOption = {
                grid: this.getGrid(data),
                tooltip: this.getToolTip(data),
                xAxis: this.getXAxis(data, cycle),
                yAxis: this.getYAxis(data),
                series: this.getSeries(data)
            };
            merge(config, klineOption);
            config.dataZoom = this.kline.getOption().dataZoom;
            this.kline.setOption(config);
        }
    }

    getToolTipData() {
        return toolTipData;
    }

    getGrid() {
        var g = [{
            height: klineSize.height / 600 * 360 + 'px'
        },
        {
            height: klineSize.height / 600 * 100 + 'px'
        }];
        return g;
    }

    getToolTip(data) {
        return {
            formatter: function (param) {
                param = param[0];
                if (param) {
                    var index = param.data[0];
                    toolTipData = {
                        seriesName: param.seriesName,
                        time: param.name,
                        volume: formatDecimal(data.values[index][5], amountsPrecision, true),
                        opening: formatDecimal(data.values[index][0], pricePrecision, true),
                        closing: formatDecimal(data.values[index][1], pricePrecision, true),
                        max: formatDecimal(data.values[index][3], pricePrecision, true),
                        min: formatDecimal(data.values[index][2], pricePrecision, true),
                        MA5: formatDecimal(calculateMA(5, data)[index], pricePrecision, true),
                        MA10: formatDecimal(calculateMA(10, data)[index], pricePrecision, true),
                        MA20: formatDecimal(calculateMA(20, data)[index], pricePrecision, true),
                        MA30: formatDecimal(calculateMA(30, data)[index], pricePrecision, true),
                        MA60: formatDecimal(calculateMA(60, data)[index], pricePrecision, true),
                        color: data.volumes[index][2]
                    };
                }
            }
        };
    }

    getXAxis(data, cycle) {
        var x = [{
            gridIndex: 0,
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
            gridIndex: 1,
            data: data.categoryData
        }];
        return x;
    }

    getYAxis() {
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

    getSeries(data) {
        var s = [
            {
                type: 'candlestick',
                data: data.values,
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
                data: calculateMA(20, data),
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
                barMaxWidth: 10,
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
        return s;
    }

    getDataZoom() {
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
        config.dataZoom = dataZoom;
        this.kline.setOption(config);
    }
}

export default KLineSetChartController;
