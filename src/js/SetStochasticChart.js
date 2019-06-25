import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { saveStochastic } from './linkageCharts';
import { getLanguage, getDefaultChartSize } from './utils';

var toolTipIndex;
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
                        DOM.style.height = resizeSize.height * 0.2 + 'px';
                        DOM.style.width = resizeSize.width + 'px';
                    }
                };
                resizeContainer(this);
                this.stochastic.resize();
            } else {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = size.height * 0.2 + 'px';
                        DOM.style.width = size.width + 'px';
                    }
                };
                resizeContainer(this);
                this.stochastic.resize();
            }
        } else {
            let resizeContainer = () => {
                DOM.style.height = size.clientHeight * 0.2 + 'px';
                DOM.style.width = size.clientWidth + 'px';
            };
            resizeContainer(this);
            this.stochastic.resize();
        }
        if (oldStochasticData) {
            this.updateStochasticOption(oldStochasticData.data, oldStochasticData.cycle);
        }
    }

    initStochasticECharts(DOM, clear) {
        if (this.stochastic && clear) {
            oldStochasticData = null;
            this.stochastic.dispose();

        }
        if (!this.stochastic || this.stochastic.isDisposed()) {
            this.stochastic = echarts.init(DOM);
            this.showLoading();
        }
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
        oldStochasticData = {
            data: data,
            cycle: cycle
        };
        if (data) {
            stochasticOption = JSON.parse(JSON.stringify(this.stochasticConfig));
            this.stochastic.hideLoading();
            let option = {
                xAxis: this.getStochasticXAxis(data, cycle),
                tooltip: this.getStochasticToolTip(),
                series: this.getStochasticSeries(data),
                dataZoom: this.getDataZoom(data)
            };
            merge(stochasticOption, option);
            this.stochastic.setOption(stochasticOption, true);
            saveStochastic(this.stochastic);
        }
    }

    updateStochasticOption(data, cycle) {
        oldStochasticData = {
            data: data,
            cycle: cycle
        };
        if (this.stochastic.getOption()) {
            this.stochastic.hideLoading();
            let stochasticConfig = {
                xAxis: this.getStochasticXAxis(data, cycle),
                series: this.getStochasticSeries(data)
            };
            merge(stochasticOption, stochasticConfig);
            stochasticOption.dataZoom = this.stochastic.getOption().dataZoom;
            this.stochastic.setOption(stochasticOption);
            saveStochastic(this.stochastic);
        }
    }

    getToolTipData() {
        return toolTipIndex;
    }

    getStochasticXAxis(data, cycle) {
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

    getStochasticToolTip() {
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

    getStochasticSeries(data) {
        return [
            {
                name: 'K',
                data: data.K,
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
                data: data.D,
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
                data: data.J,
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
    }

    getDataZoom(data) {
        let start = 0;
        let len = data.K.length;
        if (this.stochasticConfig.platform === 'mobile') {
            if (len > 40) {
                start = 60;
            }
            if (len > 100) {
                start = 80;
            }
        } else {
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
        this.stochasticConfig.dataZoom = dataZoom;
        return dataZoom;
    }

    disposeStochasticEChart() {
        if (this.stochastic) {
            this.stochastic.dispose();
        }
    }

    changeDataZoom(type) {
        let dataZoom = JSON.parse(JSON.stringify(this.stochastic.getOption().dataZoom));
        if (type === 'leftShift' && dataZoom[0].start >= 2) {
            dataZoom[0].start = dataZoom[0].start - 2;
            dataZoom[0].end = dataZoom[0].end - 2;
        } else if (type === 'enlarge' && dataZoom[0].start < 95) {
            dataZoom[0].start = dataZoom[0].start + 5;
        } else if (type === 'refresh') {
            dataZoom[0].start = this.stochasticConfig.dataZoom[0].start;
            dataZoom[0].end = this.stochasticConfig.dataZoom[0].end;
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
        stochasticOption.dataZoom = dataZoom;
        this.stochastic.setOption(stochasticOption);
    }

}

export default StochasticChartController;
