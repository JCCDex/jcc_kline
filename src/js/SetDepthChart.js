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
                grid: this.getDepthGrid(),
                yAxis: this.getDepthYAxis(),
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
        let grid = [{
            top: 60,
            left: 20,
            right: 5,
            bottom: 20,
            width: depthSize.width / 2
        }, {
            top: 60,
            left: 20 + depthSize.width / 2,
            right: 5,
            bottom: 20,
            width: depthSize.width / 2,
            containLabel: true
        }];
        return grid;
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
                },
                {
                    gridIndex: 1,
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
                                formatDecimal(param.data[0], pricePrecision, true) +
                                '<br/>',
                                '<div style="width:10px;height:10px;background:#28b869;border-radius:4px;float:left;margin-top:7px;margin-right:2px;"></div>' +
                                message.sellTotal +
                                formatDecimal(param.data[1], amountsPrecision, true) +
                                '<br/>',
                                '</div>'
                            ].join('');
                        } else if (param.seriesName === 'Buy' || param.seriesName === '买入') {
                            return [
                                '<div style="text-align:left; ' + fontSize + '">',
                                '<div style="width:10px;height:10px;6px;background:#ee4b4b;border-radius:4px;float:left;margin-top:7px;margin-right:2px;"></div>' +
                                message.buyPrice +
                                formatDecimal(param.data[0], pricePrecision, true) +
                                '<br/>',
                                '<div style="width:10px;height:10px;6px;background:#ee4b4b;border-radius:4px;float:left;margin-top:7px;margin-right:2px;"></div>' +
                                message.buyTotal +
                                formatDecimal(param.data[1], amountsPrecision, true) +
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
                                price: formatDecimal(param.data[0], pricePrecision, true),
                                total: formatDecimal(param.data[1], amountsPrecision, true),
                                type: 'Sell'
                            };
                        } else if (param.seriesName === 'Buy' || param.seriesName === '买入') {
                            mobileToolTipData = {
                                price: formatDecimal(param.data[0], pricePrecision, true),
                                total: formatDecimal(param.data[1], amountsPrecision, true),
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
                data: data.buyData,
                xAxisIndex: 0,
                yAxisIndex: 0
            },
            {
                name: sell,
                data: data.sellData,
                xAxisIndex: 1,
                yAxisIndex: 1
            }
        ];
    }
}

export default DepthChart;
