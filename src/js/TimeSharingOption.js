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
            left: 10,
            top: 50,
            right: 100
        },
        {
            left: 10,
            right: 100,
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
                color: '#f3f7f6',
                algin: 'right',
                verticalAlign: 'top'
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
                color: '#f3f7f6',
                algin: 'right',
                verticalAlign: 'top'
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

export default timeSharingOption;
