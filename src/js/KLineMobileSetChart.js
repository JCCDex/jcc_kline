import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import { saveCandle } from './linkageCharts';
import merge from 'lodash.merge';
import { getLanguage } from './utils';
import { calculateMA } from './processData';

var cycle;
var config;
var timeDivisionconfig;
var toolTipIndex;
var tipsLastLength = true;
var isTimeDivisionsDataZoom = false;


class KLineMobileSetChartController {
    constructor(configs) {
        this.klineConfig = configs;
    }

    initMobileECharts(DOM, clear) {
        if (this.kline && clear) {
            this.kline.dispose();
        }
        if (!this.kline || this.kline.isDisposed()) {
            this.kline = echarts.init(DOM);
            this.showLoading();
        }
    }

    showLoading(noData) {
        let message = getLanguage();
        if (noData) {
            this.kline.showLoading({
                text: message.noData,
                color: '#161b21',
                textColor: '#fff',
                maskColor: 'rgba(22, 27, 33, 0.5)',
                zlevel: 1
            });
        } else {
            this.kline.showLoading({
                text: message.loading,
                color: '#fff',
                textColor: '#fff',
                maskColor: 'rgba(22, 27, 33, 0.5)',
                zlevel: 1
            });
        }
    }

    hideLoading() {
        this.kline.hideLoading();
    }

    setOption(size, data) {
        config = JSON.parse(JSON.stringify(this.klineConfig));
        let option = {
            grid: this.getGrid(size),
            dataZoom: this.getDataZoom(data)
        };
        toolTipIndex = null;
        merge(config, option);
        cycle = 'normal';
        this.kline.hideLoading();
        this.kline.setOption(config, true);
        saveCandle(this.kline);
    }

    updateOption(data, cycle) {
        let length = data.values.length - 1;
        if (!toolTipIndex) {
            toolTipIndex = length;
        }
        let updateOption = {
            xAxis: this.getXAxis(data, cycle),
            tooltip: this.getToolTip(),
            series: this.getSeries(data)
        };
        merge(config, updateOption);
        config.dataZoom = this.kline.getOption().dataZoom;
        this.kline.setOption(config);
        return toolTipIndex;
    }

    setTimeDivisionsOption(size) {
        isTimeDivisionsDataZoom = false;
        timeDivisionconfig = JSON.parse(JSON.stringify(this.klineConfig));
        toolTipIndex = null;
        tipsLastLength = true;
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
        saveCandle(this.kline);
    }

    updateTimeDivisionOption(data) {
        let { times, averages, prices } = data;
        let length = times.length - 1;
        if (tipsLastLength) {
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
            },
            dataZoom: this.getTimeDivisionDataZoom(data)
        };
        merge(timeDivisionconfig, updateTimeOption);
        if (this.kline.getOption() && isTimeDivisionsDataZoom) {
            timeDivisionconfig.dataZoom = this.kline.getOption().dataZoom;
        }
        isTimeDivisionsDataZoom = true;
        this.kline.hideLoading();
        this.kline.setOption(timeDivisionconfig);
        saveCandle(this.kline);
        return toolTipIndex;
    }

    getXAxis(data, cycle) {
        return [
            {
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
            }
        ];
    }

    getSeries(data) {
        let barWidth;
        if (data.values.length > 40) {
            barWidth = '70%';
        } else if (data.values.length <= 40 && data.values.length > 0) {
            barWidth = 18;
        }
        var s = [
            {
                type: 'candlestick',
                largeThreshold: 300,
                barWidth: barWidth,
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
        tipsLastLength = false;
        return toolTipIndex;
    }

    getKlineDataZoom() {
        if (this.kline.getOption() && this.kline.getOption().dataZoom) {
            return this.kline.getOption().dataZoom;
        }
    }

    disposeMobileEChart() {
        this.kline.dispose();
    }

    getGrid(size) {
        let g = [{
            height: `${size.height * 0.6}px`
        }];
        return g;
    }

    getTimeDivisionDataZoom(data) {
        if (!data) { return; }
        let start = 0;
        if (data.volumes.length > 60) {
            start = 50;
        }
        if (data.volumes.length > 120) {
            start = 75;
        }
        if (data.volumes.length > 200) {
            start = 80;
        }
        if (data.volumes.length > 300) {
            start = 85;
        }
        if (data.volumes.length > 400) {
            start = 90;
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
        return dataZoom;
    }

    getDataZoom(data) {
        if (!data) { return; }
        let start = 0;
        if (data.values.length > 60) {
            start = 50;
        }
        if (data.values.length > 120) {
            start = 75;
        }
        if (data.values.length > 200) {
            start = 80;
        }
        if (data.values.length > 300) {
            start = 85;
        }
        if (data.values.length > 400) {
            start = 90;
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

        this.klineConfig.dataZoom = dataZoom;
        return dataZoom;
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