import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import merge from 'lodash.merge';
import { getClientWidth, getLanguage, getClientHeight } from './utils';

var depthSize = {
    width: 0,
    height: 0
};
var depthOption;
var oldDepthData;

class DepthChart {
    constructor(configs) {
        this.depthConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, resizeSize) {
        if (this.depthConfig.platform === 'pc') {
            if (!isFullScreen) {
                if (!this.depthConfig.defaultSize) {
                    let resizeContainer = () => {
                        if (DOM) {
                            DOM.style.height = resizeSize.height + 'px';
                            DOM.style.width = resizeSize.width + 'px';
                            depthSize.width = resizeSize.width;
                            depthSize.height = resizeSize.height;
                        }
                    };
                    resizeContainer(this);
                    this.depth.resize();
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
                            depthSize.width = width;
                            depthSize.height = height;
                        }
                    };
                    resizeContainer(this);
                    this.depth.resize();
                }
            } else {
                let resizeContainer = () => {
                    DOM.style.height = getClientHeight() + 'px';
                    DOM.style.width = getClientWidth() + 'px';
                    depthSize.width = getClientWidth();
                    depthSize.height = getClientHeight();
                };
                resizeContainer(this);
                this.depth.resize();
            }
            if (oldDepthData) {
                this.updateDepthOption(oldDepthData);
            }
        }
    }

    initDepthECharts(DOM) {
        this.depth = echarts.init(DOM);
        this.showLoading();
    }

    showLoading() {
        let message = getLanguage();
        this.depth.showLoading(
            {
                text: message.loading,
                color: '#fff',
                textColor: '#fff',
                maskColor: 'rgba(22, 27, 33, 0.5)',
                zlevel: 1
            }
        );
    }

    clearDepthEcharts() {
        this.depth.clear();
    }

    disposeDepthEChart() {
        if (this.depth) {
            this.depth.dispose();
        }
    }

    /* 绘制marketDepth开始 */
    setDepthOption(data) {
        oldDepthData = data;
        if (data) {
            depthOption = JSON.parse(JSON.stringify(this.depthConfig));
            let message = getLanguage();
            let buy = message.buy;
            let sell = message.sell;
            this.depth.hideLoading();
            let option = {
                legend: [
                    {
                        data: [{
                            name: buy
                        }, {
                            name: sell
                        }
                        ]
                    }
                ],
                yAxis: this.getDepthYAxis(),
                tooltip: this.getDepthToolTip(data),
                series: this.getDepthSeries(data)
            };
            merge(depthOption, option);
            this.depth.setOption(depthOption, true);
        }
    }

    updateDepthOption(data) {
        let message = getLanguage();
        let buy = message.buy;
        let sell = message.sell;
        oldDepthData = data;
        if (this.depth.getOption()) {
            let option = {
                legend: [
                    {
                        data: [{
                            name: buy
                        }, {
                            name: sell
                        }
                        ]
                    }
                ],
                yAxis: this.getDepthYAxis(),
                tooltip: this.getDepthToolTip(data),
                series: this.getDepthSeries(data)
            };
            merge(depthOption, option);
            this.depth.setOption(depthOption);
        }
    }

    getDepthYAxis() {
        if (this.depthConfig.platform === 'mobile') {
            return [
                {
                    gridIndex: 0,
                    axisLabel: {
                        formatter: function (value) {
                            if (value >= 1000) {
                                return (value / 1000) + 'K';
                            } else {
                                return value;
                            }
                        }
                    }
                }
            ];
        }
    }

    getDepthToolTip() {
        let message = getLanguage();
        var fontSize = '';
        if (this.depthConfig.platform === 'mobile') {
            fontSize = 'font-size:20px'
        }
        var toolTip = {
            formatter: function (param) {
                param = param[0];
                if (param) {
                    if (param.seriesName === 'Sell' || param.seriesName === '卖出') {
                        return [
                            '<div style="text-align:left; '+fontSize+'">',
                            '<div style="width:10px;height:10px;background:#28b869;border-radius:4px;float:left;margin-top:7px;margin-right:2px;"></div>' +
                            message.sellPrice +
                            param.data[0] +
                            '<br/>',
                            '<div style="width:10px;height:10px;background:#28b869;border-radius:4px;float:left;margin-top:7px;margin-right:2px;"></div>' +
                            message.sellTotal +
                            param.data[1] +
                            '<br/>',
                            '</div>'
                        ].join('');
                    } else if (param.seriesName === 'Buy' || param.seriesName === '买入') {
                        return [
                            '<div style="text-align:left; '+fontSize+'">',
                            '<div style="width:6px;height:6px;background:#ee4b4b;border-radius:4px;float:left;margin-top:7px;margin-right:2px;"></div>' +
                            message.buyPrice +
                            param.data[0] +
                            '<br/>',
                            '<div style="width:6px;height:6px;background:#ee4b4b;border-radius:4px;float:left;margin-top:7px;margin-right:2px;"></div>' +
                            message.buyTotal +
                            param.data[1] +
                            '<br/>',
                            '</div>'
                        ].join('');
                    }
                }
            }
        };
        if (this.depthConfig.platform === 'mobile') {
            toolTip.hideDelay = 5000;
        }
        return toolTip;
    }

    getDepthSeries(data) {
        let message = getLanguage();
        let buy = message.buy;
        let sell = message.sell;
        return [
            {
                name: buy,
                data: data.buyData
            },
            {
                name: sell,
                data: data.sellData
            }
        ];
    }
}

export default DepthChart;
