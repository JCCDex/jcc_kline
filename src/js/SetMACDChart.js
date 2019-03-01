import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import merge from 'lodash.merge';
import { getClientWidth, getLanguage, getClientHeight } from './utils';

var MACDOption;
var oldMACDData;

class MACDChart {
    constructor(configs) {
        this.macdConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, resizeSize) {
        if (!isFullScreen) {
            if (!this.macdConfig.defaultSize) {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = resizeSize.height + 'px';
                        DOM.style.width = resizeSize.width + 'px';
                    }
                };
                resizeContainer(this);
                this.macd.resize();
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
                    }
                };
                resizeContainer(this);
                this.macd.resize();
            }
        } else {
            let resizeContainer = () => {
                DOM.style.height = getClientHeight() + 'px';
                DOM.style.width = getClientWidth() + 'px';
            };
            resizeContainer(this);
            this.macd.resize();
        }
        if (oldMACDData) {
            this.updateMACDOption(oldMACDData);
        }
    }

    initMACD(DOM) {
        this.macd = echarts.init(DOM);
        this.showLoading();
    }

    showLoading() {
        let message = getLanguage();
        this.macd.showLoading(
            {
                text: message.loading,
                color: '#fff',
                textColor: '#fff',
                maskColor: 'rgba(22, 27, 33, 0.5)',
                zlevel: 1
            }
        );
    }

    /* 绘制MACDChart开始 */
    setMACDOption(data) {
        oldMACDData = data;
        if (data) {
            MACDOption = JSON.parse(JSON.stringify(this.macdConfig));
            this.macd.hideLoading();
            let option = {
                xAxis: this.getMACDXAxis(data),
                yAxis: this.getMACDYAxis(),
                series: this.getMACDSeries(data)
            };
            merge(MACDOption, option);
            this.macd.setOption(MACDOption, true);
        }
    }

    updateMACDOption(data) {
        oldMACDData = data;
        if (this.macd.getOption()) {
            let macdConfig = {
                xAxis: this.getMACDXAxis(data),
                yAxis: this.getMACDYAxis(),
                series: this.getMACDSeries(data)
            };
            merge(MACDOption, macdConfig);
            MACDOption.dataZoom = this.macd.getOption().dataZoom;
            this.macd.setOption(MACDOption);
        }
    }

    getMACDXAxis(data) {
        return [{
            data: data.times
        }];
    }

    getMACDYAxis() {
        // if (this.macdConfig.platform === 'pc') {
            return [
                {
                    gridIndex: 0,
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
                }
            ];
        // }
    }

    getMACDSeries(data) {
        return [
            {
                data: data.macds,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList;
                            if (params.data >= 0) {
                                colorList = '#ef232a';
                            } else {
                                colorList = '#14b143';
                            }
                            return colorList;
                        },
                    }
                }
            },{
                data: data.difs
            },{
                data: data.deas
            }
        ];
    }

    clearMACDEcharts() {
        oldMACDData = null;
        this.macd.clear();
    }

    disposeMACDEChart() {
        if (this.macd) {
            this.macd.dispose();
        }
    }

}

export default MACDChart;