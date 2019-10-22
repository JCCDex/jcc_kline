import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import merge from 'lodash.merge';
import { getLanguage, formatDecimal, getDefaultChartSize } from './utils';

var depthSize = {
    width: 0,
    height: 0
};
var depthOption;
var oldDepthData;
var mobileToolTipData;
var amountsPrecision = 2;
var pricePrecision = 6;

class DepthChart {
    constructor(configs) {
        this.depthConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, resizeSize) {
        let size = getDefaultChartSize();
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
                    let resizeContainer = () => {
                        if (DOM) {
                            DOM.style.height = size.height + 'px';
                            DOM.style.width = size.width + 'px';
                            depthSize.width = size.width;
                            depthSize.height = size.height;
                        }
                    };
                    resizeContainer(this);
                    this.depth.resize();
                }
            } else {
                let resizeContainer = () => {
                    DOM.style.height = size.clientHeight + 'px';
                    DOM.style.width = size.clientWidth + 'px';
                    depthSize.width = size.clientWidth;
                    depthSize.height = size.clientHeight;
                };
                resizeContainer(this);
                this.depth.resize();
            }
            if (oldDepthData) {
                this.updateDepthOption(oldDepthData);
            }
        }
    }

    initDepthECharts(DOM, clear) {
        if (this.depth && clear) {
            oldDepthData = null;
            this.depth.dispose();
        }
        if (!this.depth || this.depth.isDisposed()) {
            this.depth = echarts.init(DOM);
            this.showLoading();
        }
    }

    showLoading(noData) {
        let message = getLanguage();
        if (noData) {
            this.depth.showLoading(
                {
                    text: message.noData,
                    color: '#161b21',
                    textColor: '#fff',
                    maskColor: 'rgba(22, 27, 33, 0.5)',
                    zlevel: 1
                }
            );
        } else {
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
            pricePrecision = !isNaN(data.precision.price) ? data.precision.price : pricePrecision;
            amountsPrecision = !isNaN(data.precision.amount) ? data.precision.amount : amountsPrecision;
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
                grid: this.getDepthGrid(data),
                xAxis: this.getDepthXAxis(data),
                yAxis: this.getDepthYAxis(data),
                tooltip: this.getDepthToolTip(data),
                series: this.getDepthSeries(data)
            };
            merge(depthOption, option);
            this.depth.setOption(depthOption, true);
        }
    }

    updateDepthOption(data) {
        pricePrecision = !isNaN(data.precision.price) ? data.precision.price : pricePrecision;
        amountsPrecision = !isNaN(data.precision.amount) ? data.precision.amount : amountsPrecision;
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
                grid: this.getDepthGrid(),
                xAxis: this.getDepthXAxis(data),
                yAxis: this.getDepthYAxis(data),
                tooltip: this.getDepthToolTip(data),
                series: this.getDepthSeries(data)
            };
            merge(depthOption, option);
            this.depth.setOption(depthOption);
        }
    }

    getMobileTipsData() {
        return mobileToolTipData;
    }

    getDepthGrid() {
        let grid = [];
        if (this.depthConfig.platform === 'mobile') {
            let depthWidth = this.depthConfig.size.width;
            grid = [{
                top: 48,
                left: 0,
                right: 0,
                bottom: 40,
                width: depthWidth / 2 - 15
            }, {
                top: 48,
                left: depthWidth / 2 + 10,
                right: 5,
                bottom: 40,
                width: depthWidth / 2 - 10
            }];
        } else {
            grid = [{
                top: 60,
                left: 0,
                right: 20,
                bottom: 30,
                width: depthSize.width / 2 - 25
            }, {
                top: 60,
                left: depthSize.width / 2 - 20,
                right: 80,
                bottom: 30,
                width: depthSize.width / 2 - 50
            }];
        }
        return grid;
    }

    getDepthXAxis(data) {
        let sellLength = data.sellPrice.length;
        let buyLength = data.buyPrice.length;
        let xAxis = [{
            type: 'category',
            boundaryGap: false,
            data: data.buyPrice,
            gridIndex: 0,
            axisLabel: {
                formatter: function (value, index) {
                    if (index == 0 && buyLength != 1) {
                        return '';
                    }
                    return value;
                }
            }
        }, {
            type: 'category',
            boundaryGap: false,
            data: data.sellPrice,
            gridIndex: 1,
            axisLabel: {
                formatter: function (value, index) {
                    if (index == 0 && buyLength != 1 && sellLength != 1) {
                        return '';
                    }
                    return value;
                }
            }
        }];
        return xAxis;
    }

    getDepthYAxis(data) {
        return [
            {
                gridIndex: 0,
                axisLabel: {
                    formatter: function (value) {
                        if (value >= 1000 && value < 1000000) {
                            return (value / 1000).toFixed(1) + 'K';
                        } else if (value >= 1000000) {
                            return (value / 1000000).toFixed(1) + 'M';
                        } else {
                            return value;
                        }
                    }
                },
                min: 0,
                max: data.maxAmount
            },
            {
                gridIndex: 1,
                axisLabel: {
                    formatter: function (value) {
                        if (value >= 1000 && value < 1000000) {
                            return (value / 1000).toFixed(1) + 'K';
                        } else if (value >= 1000000) {
                            return (value / 1000000).toFixed(1) + 'M';
                        } else {
                            return value;
                        }
                    }
                },
                min: 0,
                max: data.maxAmount
            }
        ];
    }

    getDepthToolTip() {
        var toolTip = {};
        let message = getLanguage();
        var fontSize = '';
        if (this.depthConfig.platform === 'pc') {
            toolTip = {
                formatter: function (param) {
                    param = param[0];
                    if (param) {
                        if (param.seriesName === 'Sell' || param.seriesName === '卖出') {
                            return [
                                '<div style="text-align:left; ' + fontSize + '">',
                                '<div style="width:10px;height:10px;background:#28b869;border-radius:4px;float:left;margin-top:7px;margin-right:2px;"></div>' +
                                message.sellPrice +
                                formatDecimal(param.name, pricePrecision, true) +
                                '<br/>',
                                '<div style="width:10px;height:10px;background:#28b869;border-radius:4px;float:left;margin-top:7px;margin-right:2px;"></div>' +
                                message.sellTotal +
                                formatDecimal(param.data, amountsPrecision, true) +
                                '<br/>',
                                '</div>'
                            ].join('');
                        } else if (param.seriesName === 'Buy' || param.seriesName === '买入') {
                            return [
                                '<div style="text-align:left; ' + fontSize + '">',
                                '<div style="width:10px;height:10px;6px;background:#ee4b4b;border-radius:4px;float:left;margin-top:7px;margin-right:2px;"></div>' +
                                message.buyPrice +
                                formatDecimal(param.name, pricePrecision, true) +
                                '<br/>',
                                '<div style="width:10px;height:10px;6px;background:#ee4b4b;border-radius:4px;float:left;margin-top:7px;margin-right:2px;"></div>' +
                                message.buyTotal +
                                formatDecimal(param.data, amountsPrecision, true) +
                                '<br/>',
                                '</div>'
                            ].join('');
                        }
                    }
                }
            };
        } else if (this.depthConfig.platform === 'mobile') {
            fontSize = 'font-size:20px';
            toolTip = {
                formatter: function (param) {
                    param = param[0];
                    if (param) {
                        if (param.seriesName === 'Sell' || param.seriesName === '卖出') {
                            mobileToolTipData = {
                                price: formatDecimal(param.name, pricePrecision, true),
                                total: formatDecimal(param.data, amountsPrecision, true),
                                type: 'Sell'
                            };
                        } else if (param.seriesName === 'Buy' || param.seriesName === '买入') {
                            mobileToolTipData = {
                                price: formatDecimal(param.name, pricePrecision, true),
                                total: formatDecimal(param.data, amountsPrecision, true),
                                type: 'Buy'
                            };
                        }
                    }
                }
            };
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
                data: data.buyTotal,
                xAxisIndex: 0,
                yAxisIndex: 0
            },
            {
                name: sell,
                data: data.sellTotal,
                xAxisIndex: 1,
                yAxisIndex: 1
            }
        ];
    }
}

export default DepthChart;
