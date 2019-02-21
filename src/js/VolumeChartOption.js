var volumeOption = {
    backgroundColor: '#161b21', // K线图背景色，默认'#161b21'
    animation: false, // 是否开启动画。
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
            type: 'category',
            gridIndex: 0,
            // scale: true,
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
    yAxis: [ // 直角坐标系 grid 中的y轴
        {
            scale: true,
            gridIndex: 0,
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
    ],
    series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
        {
            name: 'Volume',
            type: 'bar',  // 柱状/条形图
            barMaxWidth: 10, // 柱条的最大宽度，不设时自适应。支持设置成相对于类目宽度的百分比。
            itemStyle: {
                normal: {
                    color: function (param) { // 柱条的颜色
                        return param.value[2] <= 0 ? '#ee4b4b' : '#3ee99f';
                    }
                }
            }
        }
    ]
};

export default volumeOption;