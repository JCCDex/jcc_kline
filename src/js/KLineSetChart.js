import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { calculateMA } from './processData';
import { formatDecimal, getLanguage, getDefaultChartSize } from './utils';

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
        let size = getDefaultChartSize();
        if (!isFullScreen) {
            if (!this.klineConfig.defaultSize) {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = resizeSize.height * 0.75 + 'px';
                        DOM.style.width = resizeSize.width + 'px';
                    }
                };
                resizeContainer(this);
                this.kline.resize();
            } else {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = size.height * 0.75 + 'px';
                        DOM.style.width = size.width + 'px';
                    }
                };
                resizeContainer(this);
                this.kline.resize();
            }
        } else {
            let resizeContainer = () => {
                DOM.style.height = size.clientHeight * 0.75 + 'px';
                DOM.style.width = size.clientWidth + 'px';
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
            pricePrecision = !isNaN(data.precision.price) ? data.precision.price : pricePrecision;
            amountsPrecision = !isNaN(data.precision.amount) ? data.precision.amount : amountsPrecision;
            let length = data.values.length - 1;
            toolTipData = {
                time: data.categoryData[length],
                volume: formatDecimal(data.values[length][5], amountsPrecision, true),
                opening: formatDecimal(data.values[length][0], pricePrecision, true),
                closing: formatDecimal(data.values[length][1], pricePrecision, true),
                max: formatDecimal(data.values[length][3], pricePrecision, true),
                min: formatDecimal(data.values[length][2], pricePrecision, true),
                MAData: [],
                color: data.volumes[length][2]
            };
            let MAConfig = this.klineConfig.MA;
            for (var i = 0; i < MAConfig.length; i++) {
                toolTipData.MAData[i] = {
                    name: MAConfig[i].name,
                    data: formatDecimal(calculateMA(MAConfig[i].name.substring(2) * 1, data)[length], pricePrecision, true),
                };
            }
            this.kline.hideLoading();
            let klineOption = {
                tooltip: this.getToolTip(data, MAConfig),
                xAxis: this.getXAxis(data, cycle),
                series: this.getSeries(data)
            };
            merge(config, klineOption);
            this.kline.setOption(config, true);
            return toolTipData;
        }
    }

    updateOption(data, cycle) {
        pricePrecision = !isNaN(data.precision.price) ? data.precision.price : pricePrecision;
        amountsPrecision = !isNaN(data.precision.amount) ? data.precision.amount : amountsPrecision;
        oldKlineData = {
            oldData: data,
            oldCycle: cycle
        };
        let MAConfig = this.klineConfig.MA;
        if (this.kline.getOption()) {
            let klineOption = {
                tooltip: this.getToolTip(data, MAConfig),
                xAxis: this.getXAxis(data, cycle),
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

    getEchart() {
        return this.kline;
    }

    getToolTip(data, MAConfig) {
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
                        MAData: [],
                        color: data.volumes[index][2]
                    };
                    for (var i = 0; i < MAConfig.length; i++) {
                        toolTipData.MAData[i] = {
                            name: MAConfig[i].name,
                            data: formatDecimal(calculateMA(MAConfig[i].name.substring(2) * 1, data)[index], pricePrecision, true)
                        };
                    }
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
        }];
        return x;
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

    getDataZoom() {
        return [
            {
                id: 'dataZoomX',
                type: 'inside',
                filterMode: 'filter',
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
