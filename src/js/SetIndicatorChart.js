import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { getLanguage, getDefaultChartSize } from './utils';

var toolTipIndex;
var oldIndicatorData;
var indicatorOption;

class IndicatorChartController {
    constructor(configs) {
        this.indicatorConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, resizeSize) {
        let size = getDefaultChartSize();
        if (!isFullScreen) {
            if (this.indicatorConfig.defaultSize === false) {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = resizeSize.height * 0.25 + 'px';
                        DOM.style.width = resizeSize.width + 'px';
                    }
                };
                resizeContainer(this);
                this.indicator.resize();
            } else {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = size.height * 0.25 + 'px';
                        DOM.style.width = size.width + 'px';
                    }
                };
                resizeContainer(this);
                this.indicator.resize();
            }
        } else {
            let resizeContainer = () => {
                DOM.style.height = size.clientHeight * 0.25 + 'px';
                DOM.style.width = size.clientWidth + 'px';
            };
            resizeContainer(this);
            this.indicator.resize();
        }
        if (oldIndicatorData) {
            this.updateIndicatorOption(oldIndicatorData);
        }
    }

    initIndicatorECharts(DOM) {
        this.indicator = echarts.init(DOM);
        this.showLoading();
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
    setIndicatorOption(data, cycle) {
        oldIndicatorData = data;
        if (data) {
            indicatorOption = JSON.parse(JSON.stringify(this.indicatorConfig));
            this.indicator.hideLoading();
            let option = {
                xAxis: this.getIndicatorXAxis(data, cycle),
                tooltip: this.getIndicatorToolTip(),
                series: this.getIndicatorSeries(data)
            };
            merge(indicatorOption, option);
            this.indicator.setOption(indicatorOption, true);
        }
    }

    updateIndicatorOption(data, cycle) {
        oldIndicatorData = data;
        if (this.indicator.getOption()) {
            let indicatorConfig = {
                xAxis: this.getIndicatorXAxis(data, cycle),
                tooltip: this.getIndicatorToolTip(),
                series: this.getIndicatorSeries(data)
            };
            let option = JSON.parse(JSON.stringify(indicatorConfig));
            merge(indicatorOption, indicatorConfig);
            indicatorOption.series = JSON.parse(JSON.stringify(option.series));
            indicatorOption.dataZoom = this.indicator.getOption().dataZoom;
            this.indicator.setOption(indicatorOption);
        }
    }

    getToolTipData() {
        return toolTipIndex;
    }

    getIndicatorEchart() {
        return this.indicator;
    }

    getIndicatorXAxis(data, cycle) {
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
        if (data.indicator === 'OBV' && data.indicatorData.OBV) {
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
                    }
                }
            ];
        } else if (data.indicator === 'DMI' && data.indicatorData.PDI) {
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
                    }
                }, {
                    name: 'ADXR',
                    data: data.indicatorData.ADXR,
                    type: 'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#67ff7c'
                        }
                    }
                }
            ];
        }
        return series;
    }

    clearIndicatorEcharts() {
        oldIndicatorData = null;
        this.indicator.clear();
    }

    disposeIndicatorEChart() {
        if (this.indicator) {
            this.indicator.dispose();
        }
    }

}

export default IndicatorChartController;
