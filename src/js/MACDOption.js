var macdOption = {
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
        // type: 'category',
        gridIndex: 0,
        // data: data.times,
        axisLabel: {show: false}
        }
    ],
    yAxis: [ // 直角坐标系 grid 中的y轴
        {
            gridIndex: 0,
            splitNumber: 4,
            axisLine: {onZero: false},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: true}
        }
    ],
    dataZoom: [{
        show: false,
        type: 'slider',
        start: 20,
        end: 100
    }],
    series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
        {
            name: 'MACD',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            // data: data.macds,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList;
                        if (params.data >= 0) {
                            colorList = '#ef232a';
                        } else {
                            colorList = '#14b143';
                        }
                        return colorList;
                    },
                }
            }
        },{
            name: 'DIF',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            // data: data.difs
        },{
            name: 'DEA',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            // data: data.deas
        }
    ]
};

export default macdOption;