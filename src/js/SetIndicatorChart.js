import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/custom';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { saveIndicator } from './linkageCharts';
import { getLanguage, getDefaultChartSize } from './utils';

var toolTipIndex;
var oldIndicatorData;
var indicatorOption;
var indicatorType;
var indicatorDataZoom;
var loadingTimes = 0;

class IndicatorChartController {
    constructor(configs) {
        this.indicatorConfig = configs;
    }

    resizeIndicatorECharts(DOM, isFullScreen, resizeSize) {
        let size = getDefaultChartSize();
        if (!isFullScreen) {
            if (this.indicatorConfig.defaultSize === false) {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = resizeSize.height * 0.2 + 'px';
                        DOM.style.width = resizeSize.width + 'px';
                    }
                };
                resizeContainer(this);
                this.indicator.resize();
            } else {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = size.height * 0.2 + 'px';
                        DOM.style.width = size.width + 'px';
                    }
                };
                resizeContainer(this);
                this.indicator.resize();
            }
        } else {
            let resizeContainer = () => {
                DOM.style.height = size.clientHeight * 0.2 + 'px';
                DOM.style.width = size.clientWidth + 'px';
            };
            resizeContainer(this);
            this.indicator.resize();
        }
        if (oldIndicatorData) {
            this.updateIndicatorOption(oldIndicatorData.data, oldIndicatorData.cycle);
        }
    }

    initIndicatorECharts(DOM, clear) {
        if (this.indicator && clear) {
            oldIndicatorData = null;
            indicatorType = null;
            this.indicator.dispose();
        }
        if (!this.indicator || this.indicator.isDisposed()) {
            this.indicator = echarts.init(DOM);
            this.showLoading();
        }
    }

    showLoading() {
        loadingTimes = loadingTimes + 1
        let message = getLanguage();
        if (loadingTimes < 6) {
            this.indicator.showLoading(
                {
                    text: message.loading,
                    color: '#fff',
                    textColor: '#fff',
                    maskColor: 'rgba(22, 27, 33, 0.5)',
                    zlevel: 1
                }
            );
        } else {
            this.indicator.showLoading(
                {
                    text: message.noData,
                    color: '#161b21',
                    textColor: '#fff',
                    maskColor: 'rgba(22, 27, 33, 0.5)',
                    zlevel: 1
                }
            );
        }
    }

    /* 绘制IndicatorChart开始 */
    setIndicatorOption(data, cycle) {
        indicatorType = data.indicator;
        oldIndicatorData = {
            data: data,
            cycle: cycle
        };
        if (data) {
            indicatorOption = JSON.parse(JSON.stringify(this.indicatorConfig));
            this.indicator.hideLoading();
            let option = {
                xAxis: this.getIndicatorXAxis(data, cycle),
                tooltip: this.getIndicatorToolTip(),
                series: this.getIndicatorSeries(data),
                dataZoom: this.getDataZoom(data)
            };
            merge(indicatorOption, option);
            this.indicator.setOption(indicatorOption, true);
            saveIndicator(this.indicator);
        }
    }

    updateIndicatorOption(data, cycle) {
        indicatorDataZoom = this.indicator.getOption().dataZoom;
        this.indicator.clear();
        oldIndicatorData = {
            data: data,
            cycle: cycle
        };
        if (this.indicator.getOption()) {
            this.indicator.hideLoading();
            let indicatorConfig = {
                xAxis: this.getIndicatorXAxis(data, cycle),
                tooltip: this.getIndicatorToolTip(),
                series: this.getIndicatorSeries(data),
                dataZoom: this.getDataZoom(data)
            };
            if (indicatorType != data.indicator) {
                indicatorOption.series = [];
            }
            merge(indicatorOption, indicatorConfig);
            indicatorOption.dataZoom = indicatorDataZoom;
            this.indicator.setOption(indicatorOption, false);
            saveIndicator(this.indicator);
        }
    }

    getToolTipData() {
        return toolTipIndex;
    }

    getIndicatorXAxis(data, cycle) {
        var x = [{
            gridIndex: 0,
            data: data.categoryData,
            axisLabel: {
                formatter(value) {
                    if (cycle.indexOf('minute') !== -1) {
                        return value.substring(5);
                    }
                    if (cycle.indexOf('hour') !== -1) {
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
        }];
        return x;
    }

    getIndicatorToolTip() {
        return {
            formatter: function (param) {
                param = param[0];
                if (param) {
                    var index = param.dataIndex;
                    toolTipIndex = index;
                }
            }
        };
    }

    getIndicatorSeries(data) {
        var series = [];
        if (data.indicator === 'Boll') {
            let fixedWidth = false;
            let seriesData = JSON.parse(JSON.stringify(data));
            if (seriesData.candlestickData) {
                let len = seriesData.candlestickData.length;
                for (let i = 0; i < len; i++) {
                    seriesData.candlestickData[i].unshift(i);
                    seriesData.candlestickData[i].push(seriesData.volumes[i][2]);
                }
            }
            if (seriesData.candlestickData.length > 40) {
                fixedWidth = false;
            } else if (seriesData.candlestickData.length <= 40 && seriesData.candlestickData.length > 0) {
                fixedWidth = true;
            }
            if (seriesData.indicatorData) {
                series = [
                    {
                        name: 'Dow-Jones index',
                        type: 'custom',
                        renderItem: function (params, api) {
                            var xValue = api.value(0);
                            var openPoint = api.coord([xValue, api.value(1)]);
                            var closePoint = api.coord([xValue, api.value(2)]);
                            var lowPoint = api.coord([xValue, api.value(3)]);
                            var highPoint = api.coord([xValue, api.value(4)]);
                            var halfWidth = 0;
                            if (fixedWidth) {
                                halfWidth = 15;
                            } else {
                                halfWidth = api.size([1, 0])[0] * 0.35;
                            }
                            var style = api.style({
                                stroke: api.visual('color')
                            });

                            return {
                                type: 'group',
                                children: [{
                                    type: 'line',
                                    shape: {
                                        x1: lowPoint[0], y1: lowPoint[1],
                                        x2: highPoint[0], y2: highPoint[1]
                                    },
                                    style: style
                                }, {
                                    type: 'line',
                                    shape: {
                                        x1: openPoint[0], y1: openPoint[1],
                                        x2: openPoint[0] - halfWidth, y2: openPoint[1]
                                    },
                                    style: style
                                }, {
                                    type: 'line',
                                    shape: {
                                        x1: closePoint[0], y1: closePoint[1],
                                        x2: closePoint[0] + halfWidth, y2: closePoint[1]
                                    },
                                    style: style
                                }]
                            };
                        },
                        dimensions: [null, 'open', 'close', 'lowest', 'highest'],
                        encode: {
                            x: 0,
                            y: [1, 2, 3, 4],
                            tooltip: [1, 2, 3, 4]
                        },
                        data: seriesData.candlestickData,
                        itemStyle: {
                            normal: {
                                color: function (param) {
                                    return param.value[8] <= 0 ? '#ee4b4b' : '#3ee99f';
                                }
                            }
                        }
                    },
                    {
                        name: 'UB',
                        data: seriesData.indicatorData.UB,
                        type: 'line',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: '#e6e6e6'
                            }
                        },
                        lineStyle: {
                            width: 1
                        }
                    },
                    {
                        name: 'MB',
                        data: seriesData.indicatorData.MB,
                        type: 'line',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: '#f6d026'
                            }
                        },
                        lineStyle: {
                            width: 1
                        }
                    },
                    {
                        name: 'LB',
                        data: seriesData.indicatorData.LB,
                        type: 'line',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: '#e03bfa'
                            }
                        },
                        lineStyle: {
                            width: 1
                        }
                    }
                ];
            }
        } else if (data.indicator === 'BRAR' && data.indicatorData) {
            series = [
                {
                    name: 'BR',
                    data: data.indicatorData.BR,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#e6e6e6'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }, {
                    name: 'AR',
                    data: data.indicatorData.AR,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#f6d026'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        } else if (data.indicator === 'DMA' && data.indicatorData) {
            series = [
                {
                    name: 'DMA',
                    data: data.indicatorData.DMA,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#e6e6e6'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'AMA',
                    data: data.indicatorData.AMA,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#f6d026'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        } else if (data.indicator === 'DMI' && data.indicatorData) {
            series = [
                {
                    name: 'PDI',
                    data: data.indicatorData.PDI,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#e6e6e6'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'MDI',
                    data: data.indicatorData.MDI,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#f6d026'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'ADX',
                    data: data.indicatorData.ADX,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#e03bfa'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'ADXR',
                    data: data.indicatorData.ADXR,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#67ff7c'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        } else if (data.indicator === 'KDJ' && data.indicatorData) {
            series = [
                {
                    name: 'K',
                    data: data.indicatorData.K,
                    type: 'line',
                    barMaxWidth: 10,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#67ff7c'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'D',
                    data: data.indicatorData.D,
                    type: 'line',
                    barMaxWidth: 10,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#ff4d71'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'J',
                    data: data.indicatorData.J,
                    type: 'line',
                    barMaxWidth: 10,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#f6d026'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        } else if (data.indicator === 'MACD' && data.indicatorData) {
            series = [
                {
                    name: 'MACD',
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    barWidth: 2,
                    data: data.indicatorData.macds,
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList;
                                if (params.data >= 0) {
                                    colorList = '#ee4b4b';
                                } else {
                                    colorList = '#09e988';
                                }
                                return colorList;
                            },
                        }
                    }
                }, {
                    name: 'DIF',
                    type: 'line',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    symbol: 'none', // 
                    smooth: true, //  是否平滑显示 
                    showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
                    lineStyle: {
                        normal: {
                            color: '#fd1d57',
                            opacity: 1,
                            width: 1
                        }
                    },
                    data: data.indicatorData.difs
                }, {
                    name: 'DEA',
                    type: 'line',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    symbol: 'none', // 
                    smooth: true, //  是否平滑显示 
                    showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
                    lineStyle: {
                        normal: {
                            color: '#ffd801',
                            opacity: 1,
                            width: 1
                        }
                    },
                    data: data.indicatorData.deas
                }
            ];
        } else if (data.indicator === 'MTM' && data.indicatorData) {
            series = [
                {
                    name: 'MTM',
                    data: data.indicatorData.MTM,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#67ff7c'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'MAMTM',
                    data: data.indicatorData.MAMTM,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#f6d026'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        } else if (data.indicator === 'OBV' && data.indicatorData) {
            series = [
                {
                    name: 'OBV',
                    data: data.indicatorData.OBV,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#67ff7c'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        } else if (data.indicator === 'PSY' && data.indicatorData) {
            series = [
                {
                    name: 'PSY',
                    data: data.indicatorData,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#67ff7c'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        } else if (data.indicator === 'ROC' && data.indicatorData) {
            series = [
                {
                    name: 'ROC',
                    data: data.indicatorData,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#67ff7c'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        } else if (data.indicator === 'RSI' && data.indicatorData) {
            series = [
                {
                    name: 'RSI6',
                    data: data.indicatorData.RSI6,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#67ff7c'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'RSI12',
                    data: data.indicatorData.RSI12,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#16c5ff'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'RSI24',
                    data: data.indicatorData.RSI24,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#e03bfa'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        } else if (data.indicator === 'SAR') {
            let fixedWidth = false;
            let seriesData = JSON.parse(JSON.stringify(data));
            if (seriesData.candlestickData) {
                let len = seriesData.candlestickData.length;
                for (let i = 0; i < len; i++) {
                    seriesData.candlestickData[i].unshift(i);
                    seriesData.candlestickData[i].push(seriesData.volumes[i][2]);
                }
            }
            if (seriesData.candlestickData.length > 40) {
                fixedWidth = false;
            } else if (seriesData.candlestickData.length <= 40 && seriesData.candlestickData.length > 0) {
                fixedWidth = true;
            }
            if (seriesData.indicatorData) {
                series = [
                    {
                        name: 'Dow-Jones index',
                        type: 'custom',
                        renderItem: function (params, api) {
                            var xValue = api.value(0);
                            var openPoint = api.coord([xValue, api.value(1)]);
                            var closePoint = api.coord([xValue, api.value(2)]);
                            var lowPoint = api.coord([xValue, api.value(3)]);
                            var highPoint = api.coord([xValue, api.value(4)]);
                            var halfWidth = 0;
                            if (fixedWidth) {
                                halfWidth = 15;
                            } else {
                                halfWidth = api.size([1, 0])[0] * 0.35;
                            }
                            var style = api.style({
                                stroke: api.visual('color')
                            });

                            return {
                                type: 'group',
                                children: [{
                                    type: 'line',
                                    shape: {
                                        x1: lowPoint[0], y1: lowPoint[1],
                                        x2: highPoint[0], y2: highPoint[1]
                                    },
                                    style: style
                                }, {
                                    type: 'line',
                                    shape: {
                                        x1: openPoint[0], y1: openPoint[1],
                                        x2: openPoint[0] - halfWidth, y2: openPoint[1]
                                    },
                                    style: style
                                }, {
                                    type: 'line',
                                    shape: {
                                        x1: closePoint[0], y1: closePoint[1],
                                        x2: closePoint[0] + halfWidth, y2: closePoint[1]
                                    },
                                    style: style
                                }]
                            };
                        },
                        dimensions: [null, 'open', 'close', 'lowest', 'highest'],
                        encode: {
                            x: 0,
                            y: [1, 2, 3, 4],
                            tooltip: [1, 2, 3, 4]
                        },
                        data: seriesData.candlestickData,
                        itemStyle: {
                            normal: {
                                color: function (param) {
                                    return param.value[8] <= 0 ? '#ee4b4b' : '#3ee99f';
                                }
                            }
                        }
                    },
                    {
                        name: 'SAR',
                        data: seriesData.indicatorData,
                        type: 'scatter',
                        symbolSize: 4,
                        itemStyle: {
                            normal: {
                                borderWidth: 0.1,
                                color: '#357ce1'
                            }
                        }
                    }
                ];
            }
        } else if (data.indicator === 'TRIX' && data.indicatorData) {
            series = [
                {
                    name: 'TRIX',
                    data: data.indicatorData.TRIX,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#e6e6e6'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'MATRIX',
                    data: data.indicatorData.MATRIX,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#f6d026'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        } else if (data.indicator === 'VR' && data.indicatorData) {
            series = [
                {
                    name: 'VR',
                    data: data.indicatorData.VR,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#67ff7c'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'MAVR',
                    data: data.indicatorData.MAVR,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#f6d026'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        } else {
            series = [
                {
                    name: 'WR1',
                    data: data.indicatorData.WR1,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#e6e6e6'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'WR2',
                    data: data.indicatorData.WR2,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#f6d026'
                        }
                    },
                    lineStyle: {
                        width: 1
                    }
                }
            ];
        }
        return series;
    }

    getDataZoom(data) {
        let start = 0;
        let end = 100;
        let len = 0;
        if (data.indicator === 'Boll') {
            len = data.indicatorData.LB.length;
        } else if (data.indicator === 'BRAR') {
            len = data.indicatorData.AR.length;
        } else if (data.indicator === 'DMA') {
            len = data.indicatorData.DMA.length;
        } else if (data.indicator === 'DMI') {
            len = data.indicatorData.PDI.length;
        } else if (data.indicator === 'KDJ') {
            len = data.indicatorData.K.length;
        } else if (data.indicator === 'MACD') {
            len = data.indicatorData.macds.length;
        } else if (data.indicator === 'MTM') {
            len = data.indicatorData.MTM.length;
        } else if (data.indicator === 'OBV') {
            len = data.indicatorData.OBV.length;
        } else if (data.indicator === 'PSY') {
            len = data.indicatorData.length;
        } else if (data.indicator === 'ROC') {
            len = data.indicatorData.length;
        } else if (data.indicator === 'RSI') {
            len = data.indicatorData.RSI6.length;
        } else if (data.indicator === 'SAR') {
            len = data.indicatorData.length;
        } else if (data.indicator === 'TRIX') {
            len = data.indicatorData.TRIX.length;
        } else if (data.indicator === 'VR') {
            len = data.indicatorData.VR.length;
        } else {
            len = data.indicatorData.WR1.length;
        }
        if (data.dataZoomData) {
            start = data.dataZoomData[0].start;
            end = data.dataZoomData[0].end;
        } else if (this.indicatorConfig.platform === 'mobile') {
            if (len > 60) {
                start = 50;
            }
            if (len > 120) {
                start = 75;
            }
            if (len > 200) {
                start = 80;
            }
            if (len > 300) {
                start = 85;
            }
            if (len > 400) {
                start = 90;
            }
        } else if (this.indicatorConfig.platform === 'pc') {
            if (len > 80) {
                start = 0;
            }
            if (len > 120) {
                start = 15;
            }
            if (len > 160) {
                start = 30;
            }
            if (len > 200) {
                start = 45;
            }
            if (len > 300) {
                start = 60;
            }
            if (len > 400) {
                start = 75;
            }
        }
        var dataZoom = [
            {
                id: 'dataZoomX',
                type: 'inside',
                filterMode: 'filter',
                start: start,
                end: end,
                minSpan: 5
            }
        ];
        this.indicatorConfig.dataZoom = dataZoom;
        return dataZoom;
    }

    disposeIndicatorEChart() {
        if (this.indicator) {
            this.indicator.dispose();
        }
    }

    changeDataZoom(type) {
        let dataZoom = JSON.parse(JSON.stringify(this.indicator.getOption().dataZoom));
        if (type === 'leftShift' && dataZoom[0].start >= 2) {
            dataZoom[0].start = dataZoom[0].start - 2;
            dataZoom[0].end = dataZoom[0].end - 2;
        } else if (type === 'enlarge' && dataZoom[0].start < 95) {
            dataZoom[0].start = dataZoom[0].start + 5;
        } else if (type === 'refresh') {
            dataZoom[0].start = this.indicatorConfig.dataZoom[0].start;
            dataZoom[0].end = this.indicatorConfig.dataZoom[0].end;
        } else if (type === 'narrow') {
            if (dataZoom[0].start >= 5) {
                dataZoom[0].start = dataZoom[0].start - 5;
            } else if (dataZoom[0].start > 0) {
                dataZoom[0].start = 0;
            } else if (dataZoom[0].end <= 95) {
                dataZoom[0].end = dataZoom[0].end + 5;
            } else if (dataZoom[0].end > 95) {
                dataZoom[0].end = 100;
            }
        } else if (type === 'rightShift' && dataZoom[0].end <= 98) {
            dataZoom[0].start = dataZoom[0].start + 2;
            dataZoom[0].end = dataZoom[0].end + 2;
        }
        indicatorOption.dataZoom = dataZoom;
        this.indicator.setOption(indicatorOption);
    }
}

export default IndicatorChartController;
