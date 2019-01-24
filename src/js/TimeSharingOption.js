var timeSharingOption = {
    backgroundColor: '#161b21',
    animation: true,
    axisPointer: {
        link: {
            xAxisIndex: [0, 1]
        },
        label: {
        }
    },
    tooltip: {
        trigger: 'axis',
        animation: false,
        axisPointer: {
            type: 'cross',
            link: { xAxisIndex: 'all' }
        },
        backgroundColor: 'rgba(245, 245, 245, 0.5)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
            color: '#ffffff',
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif'
        },
        extraCssText: 'background:#252332;border:0;opacity: 0.7;'
    },
    grid: [
        {
            top: 60,
            left: 10,
            right: '5%'
        },
        {
            left: 10,
            right: '5%',
            bottom: 10,
            borderColor: '#1b2229',
            show: true
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
            splitLine: {
                show: false
            },
            axisLabel: {
                show: true,
                color: '#9aa4ac',
                showMinLabel: false
            },
            axisTick: {
                show: true,
                alignWithLabel: true
            },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                z: 100
            }
        },
        {
            type: 'category',
            gridIndex: 1,
            scale: true,
            boundaryGap: true,
            axisLine: {
                onZero: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }
    ],
    yAxis: [
        {
            scale: true,
            gridIndex: 0,
            position: 'right',
            splitArea: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#37404b',
                    type: 'dotted'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#37404b'
                }
            },
            axisLabel: {
                show: true,
                color: '#9aa4ac',
                algin: 'right',
                verticalAlign: 'middle'
            }
        },
        {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            position: 'right',
            splitArea: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#37404b',
                    type: 'dotted'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#37404b'
                }
            },
            axisLabel: {
                show: true,
                color: '#9aa4ac',
                algin: 'right',
                verticalAlign: 'middle'
            }
        }
    ],
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
        },
        {
            name: 'Volume',
            type: 'bar',
            barMaxWidth: 20,
            xAxisIndex: 1,
            yAxisIndex: 1
        }
    ],
    dataZoom: [
        {
            id: 'dataZoomX',
            type: 'inside',
            filterMode: 'filter',
            xAxisIndex: [0, 1],
            start: 60,
            end: 100,
            minSpan: 5
        }
    ]
};

var mobileTimeSharingOption = {
    backgroundColor: '#161b21',
    animation: true,
    axisPointer: {
        link: {
            xAxisIndex: [0, 1]
        },
        label: {
        }
    },
    tooltip: {
        trigger: 'axis',
        animation: false,
        axisPointer: {
            type: 'cross',
            link: { xAxisIndex: 'all' }
        },
        backgroundColor: 'rgba(245, 245, 245, 0.5)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
            color: '#ffffff',
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif'
        },
        extraCssText: 'background:#252332;border:0;opacity: 0.7;'
    },
    grid: [
        {
            top: 60,
            left: 20,
            right: 20
        },
        {
            left: 20,
            right: 20,
            bottom: 10,
            backgroundColor: '#161b21',
            borderColor: '#161b21',
            show: true
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
            splitLine: {
                show: false
            },
            axisLabel: {
                show: true,
                color: '#b7c2ce',
                fontSize: 22,
                algin: 'right',
                verticalAlign: 'top'
            },
            axisTick: {
                show: true,
                alignWithLabel: true
            },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                z: 100
            }
        },
        {
            type: 'category',
            gridIndex: 1,
            scale: true,
            boundaryGap: true,
            axisLine: {
                onZero: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }
    ],
    yAxis: [
        {
            scale: true,
            gridIndex: 0,
            position: 'right',
            splitArea: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#37404b',
                    type: 'dotted'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#37404b'
                }
            },
            axisLabel: {
                show: true,
                inside: true,
                color: '#9aa4ac',
                algin: 'right',
                fontSize: 22,
                verticalAlign: 'middle'
            }
        },
        {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        }
    ],
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
        },
        {
            name: 'Volume',
            type: 'bar',
            barMaxWidth: 20,
            xAxisIndex: 1,
            yAxisIndex: 1
        }
    ],
    dataZoom: [
        {
            id: 'dataZoomX',
            type: 'inside',
            filterMode: 'filter',
            xAxisIndex: [0, 1],
            start: 60,
            end: 100,
            minSpan: 5
        }
    ]
};

export { timeSharingOption, mobileTimeSharingOption };
