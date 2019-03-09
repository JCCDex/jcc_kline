import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import merge from 'lodash.merge';
import { getLanguage } from './utils';
import { calculateMA } from './processData';

var cycle;
var config;
var timeDivisionconfig;
var toolTipIndex;


class KLineMobileSetChartController {
    constructor(configs) {
        this.klineConfig = configs;
    }

    initMobileECharts(DOM) {
        toolTipIndex = null;
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
            grid: this.getGrid(size)
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
                }
            ]
        };
        merge(timeDivisionconfig, option);
        cycle = 'everyhour';
        this.kline.setOption(timeDivisionconfig, true);
    }

    updateOption(data, cycle) {
        let length = data.values.length - 1;
        let MAConfig = this.klineConfig.MA;
        if (!toolTipIndex) {
            toolTipIndex = length;
        }
        let updateOption = {
            xAxis: this.getXAxis(data, cycle),
            tooltip: this.getToolTip(data, MAConfig),
            series: this.getSeries(data)
        };
        merge(config, updateOption);
        config.dataZoom = this.kline.getOption().dataZoom;
        this.kline.setOption(config);
        return toolTipIndex;
    }

    getMobileEchart() {
        return this.kline;
    }

    updateTimeDivisionOption(data) {
        let { times, averages, prices } = data;
        let length = times.length - 1;
        if (!toolTipIndex) {
            toolTipIndex = length;
        }
        let updateTimeOption = {
            xAxis: [
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
                }
            ],
            tooltip: {
                formatter: param => {
                    let dataIndex = param[0].dataIndex;
                    toolTipIndex = dataIndex;
                }
            }
        };
        merge(timeDivisionconfig, updateTimeOption);
        timeDivisionconfig.dataZoom = this.kline.getOption().dataZoom;
        this.kline.hideLoading();
        this.kline.setOption(timeDivisionconfig);
        return toolTipIndex;
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

    getToolTip() {
        return {
            formatter: function (param) {
                param = param[0];
                var index = param.data[0];
                toolTipIndex = index;
            }
        };
    }

    getToolTipIndex() {
        return toolTipIndex;
    }

    disposeMobileEChart() {
        this.kline.dispose();
    }

    clearMobileEcharts() {
        toolTipIndex = null;
        this.kline.clear();
    }


    getGrid(size) {
        let g = [{
            height: `${size.height * 0.6}px`
        }];
        return g;
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