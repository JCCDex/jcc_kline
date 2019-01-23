var depthOption = {
    backgroundColor: '#161b21',
    animation: true,
    color: [
        '#ee4b4b',
        '#09e988'
    ],
    legend: [
        {
            show: true,
            top: 30,
            itemGap: 20,
            itemWidth: 14,
            itemHeight: 14,
            data: [{
                name: 'buy',
                icon: 'rect',
                textStyle: {
                    color: '#ee4b4b',
                    fontSize: 14,
                    fontFamily: 'Microsoft YaHei'
                }

            }, {
                name: 'sell',
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
    grid: [
        {
            top: 60,
            left: 10,
            right: 10,
            bottom: 20,
            containLabel: true
        }
    ],
    xAxis: [
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
                lineStyle: {
                    type: 'dotted'
                }
            },
            axisTick: {
                show: true,
                alignWithLabel: true
            },
            axisLabel: {
                show: true,
                color: '#b9cadd',
                fontSize: 10
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            gridIndex: 0,
            position: 'right',
            splitNumber: 6,
            splitLine: {
                show: false
            },
            axisLabel: {
                show: true,
                onZero: false,
                margin: 0,
                color: '#9aa4ac',
                fontSize: 12,
            },
            splitArea: {
                show: false
            },
            axisPointer: {
                show: false
            }
        }
    ],
    series: [
        {
            name: 'buy',
            type: 'line',
            showSymbol: false,
            lineStyle: {
                color: '#ee4b4b',
                width: 2
            },
            areaStyle: {
                normal: {
                    color: 'rgba(238,75,75,0.3)'
                }
            }
        },
        {
            name: 'sell',
            type: 'line',
            showSymbol: false,
            lineStyle: {
                color: '#09e988',
                width: 2
            },
            areaStyle: {
                normal: {
                    color: 'rgba(9,233,136,0.3)'
                }
            }
        }
    ]
};
var mobileDepthOption = {
    backgroundColor: '#161b21',
    animation: true,
    color: [
        '#ee4b4b',
        '#09e988'
    ],
    legend: [
        {
            show: true,
            top: 30,
            itemGap: 20,
            itemWidth: 14,
            itemHeight: 14,
            data: [{
                name: 'buy',
                icon: 'rect',
                textStyle: {
                    color: '#ee4b4b',
                    fontSize: 14,
                    fontFamily: 'Microsoft YaHei'
                }

            }, {
                name: 'sell',
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
    grid: [
        {
            top: 48,
            left: 10,
            right: 10,
            bottom: 40,
            containLabel: true
        }
    ],
    xAxis: [
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
    ],
    yAxis: [
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
                fontSize: 22
            },
            splitArea: {
                show: false
            },
            axisPointer: {
                show: false
            }
        }
    ],
    series: [
        {
            name: 'buy',
            type: 'line',
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
            name: 'sell',
            type: 'line',
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
    ]
}

export { depthOption, mobileDepthOption };
