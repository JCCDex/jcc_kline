var macdOption = {
    backgroundColor: '#161b21', // K线图背景色，默认'#161b21'
    animation: false, // 是否开启动画。
    tooltip: { // 提示框组件。
        trigger: 'axis', //触发类型。当前为坐标轴触发
        animation: false,
        axisPointer: { // 坐标轴指示器配置项。
            type: 'cross', // 指示器类型。当前为十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
            link: { xAxisIndex: 'all' }
        }
    },
    grid: [ // 直角坐标系内绘图网格
        {
            top: 20,
            left: 5,
            right: 65,
            bottom: 5, // grid 组件离容器下侧的距离。
            // backgroundColor: "#1b2229", // 网格背景色
            borderColor: '#1b2229', // 网格的边框颜色
            show: true // 是否显示直角坐标系网格。
        }
    ],
    xAxis: [ // 直角坐标系 grid 中的 x 轴
        {
            type: 'category',
            gridIndex: 0,
            axisPointer: {
                z: 100,
                label: {
                    show: false
                }
            },
            // data: data.times,
            axisLabel: {show: false}
        }
    ],
    yAxis: [ // 直角坐标系 grid 中的y轴
        {
            gridIndex: 0,
            splitNumber: 4,
            position: 'right', // y 轴的位置
            axisLine: {
                show: false,
                onZero: false,
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                lineStyle: {
                    color: '#37404b', // 分隔线颜色
                    type: 'dashed' // 分隔线线的类型,dotted是点虚线
                }
            },
            axisTick: {show: false},
            axisLabel: {
                show: true, // 是否显示刻度标签
                margin: 0, // 刻度标签与轴线之间的距离
                color: '#9aa4ac', // 刻度标签文字的颜色
                fontSize: 12, // 刻度标签文字的字体大小
                verticalAlign: 'middle' // 文字垂直对齐方式，默认自动
            }
        }
    ],
    series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
        {
            name: 'MACD',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            barWidth: 2,
            // data: data.macds,
        },{
            name: 'DIF',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            symbol: 'none', // 
            smooth: true, //  是否平滑显示 
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
            lineStyle: {
                normal: {
                    color: '#fd1d57',
                    opacity: 1,
                    width: 1
                }
            }
        },{
            name: 'DEA',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            symbol: 'none', // 
            smooth: true, //  是否平滑显示 
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
            lineStyle: {
                normal: {
                    color: '#ffd801',
                    opacity: 1,
                    width: 1
                }
            }
        }
    ],
    dataZoom: [ // 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响
        {
            id: 'dataZoomX',
            throttle: 0,
            type: 'inside',
            filterMode: 'filter', // 当前数据窗口外的数据，被 过滤掉。即会影响其他轴的数据范围。每个数据项，只要有一个维度在数据窗口外，整个数据项就会被过滤掉
            start: 60,  // 数据窗口范围的起始百分比
            end: 100, // 数据窗口范围的结束百分比
            minSpan: 5 // 用于限制窗口大小的最小值（百分比值）
        }
    ]
};

var macdMobileOption = {
    backgroundColor: '#161b21', // K线图背景色，默认'#161b21'
    animation: false, // 是否开启动画。
    axisPointer: { // 坐标轴指示器（axisPointer）的全局公用设置,坐标轴指示器是指示坐标轴当前刻度的工具
        link: { xAxisIndex: 'all' },
        label: { // 坐标轴指示器的文本标签
            backgroundColor: '#232b34', // 背景色
            fontSize: 22, // 字体大小
        }
    },
    tooltip: { // 提示框组件。
        trigger: 'axis', //触发类型。当前为坐标轴触发
        animation: false,
        axisPointer: { // 坐标轴指示器配置项。
            type: 'cross', // 指示器类型。当前为十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
            link: { xAxisIndex: 'all' }
        }
    },
    grid: [ // 直角坐标系内绘图网格
        {
            top: 30,
            left: 20,
            right: 10,
            bottom: 10, // grid 组件离容器下侧的距离。
            // backgroundColor: "#1b2229", // 网格背景色
            borderColor: '#1b2229', // 网格的边框颜色
            show: true // 是否显示直角坐标系网格。
        }
    ],
    xAxis: [ // 直角坐标系 grid 中的 x 轴
        {
            type: 'category',
            gridIndex: 0,
            axisPointer: {
                z: 100,
                label: {
                    show: false
                }
            },
            // data: data.times,
            axisLabel: {show: false}
        }
    ],
    yAxis: [ // 直角坐标系 grid 中的y轴
        {
            gridIndex: 0,
            splitNumber: 4,
            position: 'right', // y 轴的位置
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#37404b'
                }
            },
            axisTick: {show: false},
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                lineStyle: {
                    color: '#37404b', // 分隔线颜色
                    type: 'dashed' // 分隔线线的类型,dotted是点虚线
                }
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: true, // 是否显示刻度标签
                margin: 0, // 刻度标签与轴线之间的距离
                color: '#b7c2ce', // 刻度标签文字的颜色
                fontSize: 22, // 文字的字体大小
                verticalAlign: 'bottom',
                inside: true
            }
        }
    ],
    series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
        {
            name: 'MACD',
            type: 'bar', // 柱状/条形图
            xAxisIndex: 0,
            yAxisIndex: 0,
            barWidth: 2, // 柱条的宽度，不设时自适应。支持设置成相对于类目宽度的百分比。
        },{
            name: 'DIF',
            type: 'line', // 折线图
            symbol: 'none',
            xAxisIndex: 0,
            yAxisIndex: 0,
            lineStyle: {
                normal: {
                    color: '#fd1d57',
                    opacity: 1,
                    width: 1
                }
            }
        },{
            name: 'DEA',
            type: 'line',
            symbol: 'none',
            xAxisIndex: 0,
            yAxisIndex: 0,
            lineStyle: {
                normal: {
                    color: '#ffd801',
                    opacity: 1,
                    width: 1
                }
            }
        }
    ],
    dataZoom: [ // 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响
        {
            id: 'dataZoomX',
            throttle: 0,
            type: 'inside',
            filterMode: 'filter', // 当前数据窗口外的数据，被 过滤掉。即会影响其他轴的数据范围。每个数据项，只要有一个维度在数据窗口外，整个数据项就会被过滤掉
            start: 80,  // 数据窗口范围的起始百分比
            end: 100, // 数据窗口范围的结束百分比
            minSpan: 5 // 用于限制窗口大小的最小值（百分比值）
        }
    ]
};

export {macdOption, macdMobileOption};