var macdOption = {
    backgroundColor: '#161b21', // K线图背景色，默认'#161b21'
    animation: false, // 是否开启动画。
    // tooltip: { // 提示框组件。
    //     trigger: 'axis', //触发类型。当前为坐标轴触发
    //     animation: false,
    //     axisPointer: { // 坐标轴指示器配置项。
    //         type: 'cross', // 指示器类型。当前为十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
    //         link: { xAxisIndex: 'all' }
    //     },
    //     backgroundColor: 'rgba(245, 245, 245, 0.5)', // 提示框浮层的背景颜色。
    //     borderWidth: 1, // 提示框浮层的边框宽。
    //     borderColor: '#ccc', // 提示框浮层的边框颜色。
    //     padding: 10, // 提示框浮层内边距，单位px
    //     textStyle: { // 提示框浮层的文本样式
    //         // fontSize: '0.1rem', // 文字的字体大小
    //         color: '#ffffff', // 文字的颜色
    //         fontFamily: 'Avenir, Helvetica, Arial, sans-serif' // 文字的字体系列
    //     },
    //     extraCssText: 'background:#252332;border:0;opacity: 1;fontSize: 18px', // 文字本身的描边颜色
    // },
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
            axisTick: {show: false},
            splitLine: {show: false},
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
            lineStyle: { // 线的样式
                normal: {
                    width: 1 // 线宽
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
            lineStyle: { // 线的样式
                normal: {
                    width: 1 // 线宽
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
    // tooltip: { // 提示框组件。
    //     // show: false,
    //     trigger: 'axis', //触发类型。当前为坐标轴触发
    //     animation: false,
    //     axisPointer: { // 坐标轴指示器配置项。
    //         type: 'cross', // 指示器类型。当前为十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
    //         link: { xAxisIndex: 'all' }
    //     },
    //     backgroundColor: 'rgba(245, 245, 245, 0.5)', // 提示框浮层的背景颜色。
    //     borderWidth: 1, // 提示框浮层的边框宽。
    //     borderColor: '#ccc', // 提示框浮层的边框颜色。
    //     padding: 10, // 提示框浮层内边距，单位px
    //     textStyle: { // 提示框浮层的文本样式
    //         // fontSize: '0.1rem', // 文字的字体大小
    //         color: '#ffffff', // 文字的颜色
    //         fontFamily: 'Avenir, Helvetica, Arial, sans-serif' // 文字的字体系列
    //     },
    //     extraCssText: 'background:#252332;border:0;opacity: 1;fontSize: 18px', // 文字本身的描边颜色
    // },
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
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {
                show: true,
                inside: true,
                margin: 0,
                color: '#9aa4ac',
                fontSize: 22,
                verticalAlign: 'bottom'
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
        },{
            name: 'DIF',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
        },{
            name: 'DEA',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
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