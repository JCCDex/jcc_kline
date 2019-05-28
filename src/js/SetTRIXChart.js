import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { saveIndicator } from './linkageCharts';
import { getLanguage, getDefaultChartSize } from './utils';

var toolTipIndex;
var oldIndicatorData;
var indicatorOption;

class TRIXChartController {
    constructor(configs) {
        this.indicatorConfig = configs;
    }

    resizeTRIXECharts(DOM, isFullScreen, resizeSize) {
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
            this.updateTRIXOption(oldIndicatorData.data, oldIndicatorData.cycle);
        }
    }

    initTRIXECharts(DOM, clear) {
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
    setTRIXOption(data, cycle) {
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

    updateTRIXOption(data, cycle) {
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
        if (data.indicator === 'TRIX' && data.indicatorData) {
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
        }
        return series;
    }

    getDataZoom(data) {
        let start = 0;
        let len = 0;
        if (data.indicator === 'TRIX') {
            len = data.indicatorData.TRIX.length;
        }
        if (this.indicatorConfig.platform === 'mobile') {
            if (len > 40) {
                start = 60;
            }
            if (len > 100) {
                start = 80;
            }
        } else {
            if (len > 80) {
                start = 20;
            }
            if (len > 120) {
                start = 30;
            }
            if (len > 160) {
                start = 50;
            }
            if (len > 200) {
                start = 60;
            }
        }
        var dataZoom = [
            {
                id: 'dataZoomX',
                type: 'inside',
                filterMode: 'filter',
                start: start,
                end: 100,
                minSpan: 5
            }
        ];
        this.indicatorConfig.dataZoom = dataZoom;
        return dataZoom;
    }

    disposeTRIXEChart() {
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
            }else if (dataZoom[0].end > 95) {
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

export default TRIXChartController;
