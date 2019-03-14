import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { getLanguage, getDefaultChartSize, formatDecimal } from './utils';

var toolTipData;
var oldStochasticData;
var stochasticOption;

class StochasticChartController {
    constructor(configs) {
        this.stochasticConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, resizeSize) {
        let size = getDefaultChartSize();
        if (!isFullScreen) {
            if (this.stochasticConfig.defaultSize === false) {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = resizeSize.height * 0.25 + 'px';
                        DOM.style.width = resizeSize.width + 'px';
                    }
                };
                resizeContainer(this);
                this.stochastic.resize();
            } else {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = size.height * 0.25 + 'px';
                        DOM.style.width = size.width + 'px';
                    }
                };
                resizeContainer(this);
                this.stochastic.resize();
            }
        } else {
            let resizeContainer = () => {
                DOM.style.height = size.clientHeight * 0.25 + 'px';
                DOM.style.width = size.clientWidth + 'px';
            };
            resizeContainer(this);
            this.stochastic.resize();
        }
        if (oldStochasticData) {
            this.updateStochasticOption(oldStochasticData);
        }
    }

    initStochasticECharts(DOM) {
        this.stochastic = echarts.init(DOM);
        this.showLoading();
    }

    showLoading() {
        let message = getLanguage();
        this.stochastic.showLoading(
            {
                text: message.loading,
                color: '#fff',
                textColor: '#fff',
                maskColor: 'rgba(22, 27, 33, 0.5)',
                zlevel: 1
            }
        );
    }

    /* 绘制StochasticChart开始 */
    setStochasticOption(data, cycle) {
        oldStochasticData = data;
        if (data) {
            let pricePrecision = !isNaN(data.precision.price) ? data.precision.price : 6
            stochasticOption = JSON.parse(JSON.stringify(this.stochasticConfig));
            this.stochastic.hideLoading();
            let option = {
                xAxis: this.getStochasticXAxis(data, cycle),
                tooltip: this.getStochasticToolTip(data),
                series: this.getStochasticSeries(data)
            };
            let length = data.K.length - 1;
            toolTipData = {
                K: formatDecimal(data.K[length], pricePrecision, true),
                D: formatDecimal(data.D[length], pricePrecision, true),
                J: formatDecimal(data.J[length], pricePrecision, true)
            };
            merge(stochasticOption, option);
            this.stochastic.setOption(stochasticOption, true);
            return toolTipData;
        }
    }

    updateStochasticOption(data, cycle) {
        oldStochasticData = data;
        if (this.stochastic.getOption()) {
            let stochasticConfig = {
                xAxis: this.getStochasticXAxis(data, cycle),
                tooltip: this.getStochasticToolTip(data),
                series: this.getStochasticSeries(data)
            };
            merge(stochasticOption, stochasticConfig);
            stochasticOption.dataZoom = this.stochastic.getOption().dataZoom;
            this.stochastic.setOption(stochasticOption);
        }
    }

    getToolTipData() {
        return toolTipData;
    }

    getStochasticEchart() {
        return this.stochastic;
    }

    getStochasticXAxis(data, cycle) {
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

    getStochasticToolTip(data) {
        return {
            formatter: function (param) {
                let pricePrecision = !isNaN(data.precision.price) ? data.precision.price : 6
                param = param[0];
                if (param) {
                    var index = param.dataIndex;
                    toolTipData = {
                        K: formatDecimal(data.K[index], pricePrecision, true),
                        D: formatDecimal(data.D[index], pricePrecision, true),
                        J: formatDecimal(data.J[index], pricePrecision, true)
                    };
                }
            }
        };
    }

    getStochasticSeries(data) {
        return [
            {
                name: 'K',
                data: data.K,
                type: 'line',
                barMaxWidth: 10,
                itemStyle: {
                    normal: {
                        color: '#67ff7c'
                    }
                }
            },
            {
                name: 'D',
                data: data.D,
                type: 'line',
                barMaxWidth: 10,
                itemStyle: {
                    normal: {
                        color: '#ff4d71'
                    }
                }
            },
            {
                name: 'J',
                data: data.J,
                type: 'line',
                barMaxWidth: 10,
                itemStyle: {
                    normal: {
                        color: '#f6d026'
                    }
                }
            }
        ];
    }

    clearStochasticEcharts() {
        oldStochasticData = null;
        this.stochastic.clear();
    }

    disposeStochasticEChart() {
        if (this.stochastic) {
            this.stochastic.dispose();
        }
    }

}

export default StochasticChartController;
