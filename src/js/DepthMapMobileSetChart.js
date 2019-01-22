import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import {getLanguage} from './utils';

class DepthMapMobileSetChartController {
    constructor(depthMapConfig) {
        this.depthMapConfig = depthMapConfig;
    // this.showIndicators = showIndicators
    }
  
    initMobileECharts(DOM) {
    // timeDivisionconfig = null;
        this.depth = echarts.init(DOM);
        this.showLoading();
    }

    showLoading(){
        let message = getLanguage();
        this.depth.showLoading({
            text: message.loading,
            color: '#fff',
            textColor: '#fff',
            maskColor: 'rgba(22, 27, 33, 0.5)',
            zlevel: 1
        });
    }

    hideLoading(){
        this.depth.hideLoading();
    }

    setDepthoption(data) {
        if (data) {
            let message = getLanguage();
            let buy = message.buy;
            let sell = message.sell;
            let depthOption = {
                title: {
                    text: "深度图",
                    x:'left',
                    y:'top',
                    textStyle: {
                        color: '#ee4b4b',
                        fontSize: 14,
                        fontFamily: 'Microsoft YaHei'
                    }
                },
                color: [
                    '#ee4b4b',
                    '#09e988'
                ],
                
                backgroundColor: '#161b21',
                animation: true,
                legend: [
                    {
                        show: true,
                        top: 60,
                        itemGap: 20,
                        itemWidth: 14,
                        itemHeight: 14,
                        'data': [{
                            name: buy,
                            icon: 'rect',
                            textStyle: {
                                color: '#ee4b4b',
                                fontSize: 14,
                                fontFamily: 'Microsoft YaHei'
                            }

                        }, {
                            name: sell,
                            icon: 'rect',
                            textStyle: {
                                color: '#09e988',
                                fontSize: 14,
                                fontFamily: 'Microsoft YaHei'

                            }
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
            this.depth.setOption(depthOption, true);
        }
    }

    getDepthGrid() {
        return [{
            top: 48,
            left: 10,
            right: 10,
            bottom: 40,
            containLabel: true
        }];
    }

    getDepthXAxis() {
        return [
            {
                type: 'category',
                gridIndex: 0,
                scale: true,
                boundaryGap: true,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#37404b'
                    }
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisPointer: {
                    show: true,
                    label: {
                        backgroundColor: '#232b34',
                        fontSize:16,
                    }
                },
                axisTick: {
                    show: true,
                    alignWithLabel: true,
                },
                axisLabel: {
                    show: true,
                    color: '#b9cadd',
                    fontSize: 22
                }
            }
        ];
    }

    getDepthYAxis() {
        return [
            {
                type: 'value',
                gridIndex: 0,
                position: 'right',
                z:1,
                splitNumber: 4,
                splitLine: {
                    show: false,
                    type: 'shadow'
                },
                axisLabel: {
                    inside:true,
                    show: true,
                    onZero: false,
                    margin: 0,
                    color: '#b7c2ce',
                    fontSize: 22,
                    formatter: function (value) {
                        if (value > 1000) {
                            return (value / 1000) + 'K';
                        }
                    }
                },
                splitArea: {
                    show: false
                },
                axisPointer: {
                    show: true,
                    label: {
                        backgroundColor: '#232b34',
                        fontSize:16,
                    }
                },
            }
        ];
    }

    getDepthToolTip() {
        let message = getLanguage();
        return {
            formatter: function (param) {
                param = param[0];
                if(param) {
                    if (param.seriesName === 'sell') {
                        return [
                            '<div style="text-align:left;">',
                            '<div style="width:6px;height:6px;background:#28b869;border-radius:4px;float:left;margin-top:8px;margin-right:2px;"></div>' +
          message.sellPrice +
          param.data[0] +
          '<br/>',
                            '<div style="width:6px;height:6px;background:#28b869;border-radius:4px;float:left;margin-top:8px;margin-right:2px;"></div>' +
          message.sellTotal +
          param.data[1] +
          '<br/>',
                            '</div>'
                        ].join('');
                    } else if (param.seriesName === 'buy') {
                        return [
                            '<div style="text-align:left;">',
                            '<div style="width:6px;height:6px;background:#ee4b4b;border-radius:4px;float:left;margin-top:8px;margin-right:2px;"></div>' +
          message.buyPrice +
          param.data[0] +
          '<br/>',
                            '<div style="width:6px;height:6px;background:#ee4b4b;border-radius:4px;float:left;margin-top:8px;margin-right:2px;"></div>' +
          message.buyTotal +
          param.data[1] +
          '<br/>',
                            '</div>'
                        ].join('');
                    }
                }
            }
        };
    }

    getDepthSeries(data) {
        let message = getLanguage();
        let buy = message.buy;
        let sell = message.sell;
        return [
            {
                name: buy,
                type: 'line',
                data: data.buyData,
                showSymbol: false,
                lineStyle: {
                    color: '#ee3523',
                },
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 1,
                            x2: 0,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#2d1d23'
                                },
                                {
                                    offset: 1,
                                    color: '#ee4a4a'
                                }
                            ]
                        }
                    }
                }
            },
            {
                name: sell,
                type: 'line',
                data: data.sellData,
                showSymbol: false,
                lineStyle: {
                    color: '#008c00',
                },
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 1,
                            x2: 0,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#14322d'
                                },
                                {
                                    offset: 1,
                                    color: '#28b869'
                                }
                            ]
                        }
                    }
                }
            }
        ];
    }
}
export default DepthMapMobileSetChartController;