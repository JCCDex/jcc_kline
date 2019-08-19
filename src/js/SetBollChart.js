import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/custom';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { saveIndicator } from './linkageCharts';
import { getLanguage, getDefaultChartSize } from './utils';

var toolTipIndex;
var oldIndicatorData;
var indicatorOption;

class BollChartController {
    constructor(configs) {
        this.indicatorConfig = configs;
    }

    resizeBollECharts(DOM, isFullScreen, resizeSize) {
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
            this.updateBollOption(oldIndicatorData.data, oldIndicatorData.cycle);
        }
    }

    initBollECharts(DOM, clear) {
        if (this.indicator && clear) {
            oldIndicatorData = null;
            this.indicator.dispose();
        }
        if (!this.indicator || this.indicator.isDisposed()) {
            this.indicator = echarts.init(DOM);
            this.showLoading();
        }
    }

    showLoading() {
        let message = getLanguage();
        this.indicator.showLoading(
            {
                text: message.loading,
                color: '#fff',
                textColor: '#fff',
                maskColor: 'rgba(22, 27, 33, 0.5)',
                zlevel: 1
            }
        );
    }

    /* 绘制IndicatorChart开始 */
    setBollOption(data, cycle) {
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

    updateBollOption(data, cycle) {
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
            merge(indicatorOption, indicatorConfig);
            indicatorOption.dataZoom = this.indicator.getOption().dataZoom;
            this.indicator.setOption(indicatorOption);
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
        if (seriesData.indicator === 'Boll' && seriesData.indicatorData) {
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
        return series;
    }

    getDataZoom(data) {
        let start = 0;
        let end = 100;
        let len = 0;
        if (data.indicator === 'Boll') {
            len = data.indicatorData.LB.length;
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
        } else  if (this.indicatorConfig.platform === 'pc') {
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

    disposeBollEChart() {
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

export default BollChartController;
