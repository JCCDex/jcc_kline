import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import merge from 'lodash.merge';
import { getLanguage, getDefaultChartSize } from './utils';

var MACDOption;
var oldMACDData;
var toolTipIndex;

class MACDChart {

    constructor(configs) {
        this.macdConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, resizeSize) {
        let size = getDefaultChartSize();
        if (!isFullScreen) {
            if (!this.macdConfig.defaultSize) {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = resizeSize.height * 0.25 + 'px';
                        DOM.style.width = resizeSize.width + 'px';
                    }
                };
                resizeContainer(this);
                this.macd.resize();
            } else {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = size.height * 0.25 + 'px';
                        DOM.style.width = size.width + 'px';
                    }
                };
                resizeContainer(this);
                this.macd.resize();
            }
        } else {
            let resizeContainer = () => {
                DOM.style.height = size.clientHeight * 0.25 + 'px';
                DOM.style.width = size.clientWidth + 'px';
            };
            resizeContainer(this);
            this.macd.resize();
        }
        if (oldMACDData) {
            this.updateMACDOption(oldMACDData);
        }
    }

    getMacdchart() {
        return this.macd;
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
                tooltip: this.getMACDToolTip(),
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
                tooltip: this.getMACDToolTip(),
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
                                colorList = '#ee4b4b';
                            } else {
                                colorList = '#09e988';
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

    getToolTipData() {
        return toolTipIndex;
    }

    getMACDToolTip() {
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
}

export default MACDChart;