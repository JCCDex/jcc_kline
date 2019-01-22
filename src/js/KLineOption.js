var option = {
    backgroundColor: '#161b21', // K线图背景色，默认'#161b21'
    animation: true, // 是否开启动画。
    axisPointer: { // 坐标轴指示器（axisPointer）的全局公用设置，坐标轴指示器是指示坐标轴当前刻度的工具。
        link: { // 不同轴的 axisPointer 可以进行联动，在这里设置。联动表示轴能同步一起活动。轴依据他们的 axisPointer 当前对应的值来联动。
            xAxisIndex: [0, 1] //// 表示所有 xAxisIndex 为 0、1 的坐标轴联动。
        },
        label: { //坐标轴指示器的文本标签。
        }
    },
    tooltip: { // 提示框组件。
        trigger: 'axis', //触发类型。当前为坐标轴触发
        animation: false,
        axisPointer: { // 坐标轴指示器配置项。
            type: 'cross', // 指示器类型。当前为十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
            link: { xAxisIndex: 'all' }
        },
        backgroundColor: 'rgba(245, 245, 245, 0.5)', // 提示框浮层的背景颜色。
        borderWidth: 1, // 提示框浮层的边框宽。
        borderColor: '#ccc', // 提示框浮层的边框颜色。
        padding: 10, // 提示框浮层内边距，单位px
        textStyle: { // 提示框浮层的文本样式。
            color: '#000' // 文字的颜色。
        },
        extraCssText: 'background:#252332;border:0;color:#ffffff;opacity: 0.7;font-size:12px;' // 额外附加到浮层的 css 样式,例如浮层阴影
    },
    grid: [ // 直角坐标系内绘图网格
        {
            top: 60, // grid 组件离容器上侧的距离。
            left: 5, // grid 组件离容器左侧的距离。
            right: '5%', // grid 组件离容器右侧的距离。
        },
        {
            left: 5,
            right: '5%',
            bottom: 10, // grid 组件离容器下侧的距离。
            // backgroundColor: "#1b2229", // 网格背景色
            borderColor: '#1b2229', // 网格的边框颜色
            show: true // 是否显示直角坐标系网格。
        }
    ],
    xAxis: [ // 直角坐标系 grid 中的 x 轴
        {
            type: 'category', // 坐标轴类型。当前为类目轴，适用于离散的类目数据
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
            axisPointer: {
                z: 100,
                label: {
                    show: false
                }
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
                show: false,
                lineStyle: {
                    color: '#37404b'
                }
            },
            axisLabel: {
                show: true,
                margin: 0,
                color: '#9aa4ac',
                fontSize: 12,
                verticalAlign: 'middle'
            }
        },
        {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            position: 'right',
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
                margin: 0,
                color: '#9aa4ac',
                fontSize: 12,
                verticalAlign: 'middle'
            }
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
    ],
    series: [
        {
            type: 'candlestick',
            barMaxWidth: 10,
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
            symbol: 'none',
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
            symbol: 'none',
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
            symbol: 'none',
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
            symbol: 'none',
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
            symbol: 'none',
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
            barMaxWidth: 10,
            itemStyle: {
                normal: {
                    color: function(param) {
                        return param.value[2] <= 0 ? '#ee4b4b' : '#3ee99f';
                    }
                }
            },
            xAxisIndex: 1,
            yAxisIndex: 1,
        }
    ]
};
  
export default option;
  