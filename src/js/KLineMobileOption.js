var mobileOption = {
    backgroundColor: '#161b21',
    animation: true,
    axisPointer: {
        link: { xAxisIndex: 'all' },
        label: {
            backgroundColor: '#232b34',
            fontSize:16,
        }
    },
    tooltip: {
        trigger: 'axis',
        animation: false,
        hideDelay: 15000,
        axisPointer: {
            type: 'cross',
            link: { xAxisIndex: 'all' }
        },
        backgroundColor: 'rgba(245, 245, 245, 0.5)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
            fontSize: '0.2rem',
            color: '#ffffff',
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif'
        },
        extraCssText: 'background:#252332;border:0;opacity: 0.7;'
    },
    grid: [
        {
            left: '20px',
            right: '20px'
        },
        {
            left: '20px',
            right: '20px',
            bottom: '20px',
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
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
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
                show: false,
                lineStyle: {
                    
                    color: '#37404b'
                }
            },
            axisLabel: {
                show: true,
                color: '#b7c2ce',
                fontSize: 22,
                algin: 'right',
                verticalAlign: 'top'
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
            type: 'candlestick',
            barMaxWidth: 20,
            itemStyle: {
                normal: {
                    color: '#ee4b4b',
                    color0: '#3ee99f',
                    borderColor: null,
                    borderColor0: null
                }
            }
        },
        {
            name: 'MA5',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#fd1d57',
                    opacity: 1,
                    width: 1
                }
            }
        },
        {
            name: 'MA10',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#4df561',
                    opacity: 1,
                    width: 1
                }
            }
        },
        {
            name: 'MA20',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#2bdaff',
                    opacity: 1,
                    width: 1
                }
            }
        },
        {
            name: 'MA30',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#ffd801',
                    opacity: 1,
                    width: 1
                }
            }
        },
        {
            name: 'MA60',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: '#f721ff',
                    opacity: 1,
                    width: 1
                }
            }
        },
        {
            name: 'Volume',
            type: 'bar',
            barMaxWidth: 20,
            itemStyle: {
                normal: {
                    color: function(param) {
                        return param.value[2] <= 0 ? '#ee4b4b' : '#3ee99f';
                    }
                }
            },
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
export default mobileOption;
    