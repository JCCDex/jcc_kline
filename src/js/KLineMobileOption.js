var mobileOption = {
    backgroundColor: '#161b21', // K线图背景色，默认'#161b21'
    animation: false, //  是否开启动画
    axisPointer: { // 坐标轴指示器（axisPointer）的全局公用设置,坐标轴指示器是指示坐标轴当前刻度的工具
        link: { xAxisIndex: 'all' },
        label: { // 坐标轴指示器的文本标签
            backgroundColor: '#232b34', // 背景色
            fontSize:16, // 字体大小
        }
    },
    tooltip: { // 提示框组件
        trigger: 'axis', // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        animation: false, 
        hideDelay: 15000, // 浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效
        axisPointer: {  // 坐标轴指示器配置项。
            type: 'cross', // 十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer
            link: { xAxisIndex: 'all' }
        },
        backgroundColor: 'rgba(245, 245, 245, 0.5)', // 提示框浮层的背景颜色
        borderWidth: 1, // 提示框浮层的边框宽
        borderColor: '#ccc', // 提示框浮层的背景颜色
        padding: 10, // 提示框浮层内边距，单位px
        textStyle: { // 提示框浮层的文本样式
            fontSize: '0.2rem', // 文字的字体大小
            color: '#ffffff', // 文字的颜色
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif' // 文字的字体系列
        },
        extraCssText: 'background:#252332;border:0;opacity: 0.7;' // 文字本身的描边颜色
    },
    grid: [ // 直角坐标系内绘图网格
        {
            left: '20px', // grid 组件离容器左侧的距离。
            right: '10px' // grid 组件离容器右侧的距离。
        },
        {
            left: '20px', // grid 组件离容器左侧的距离。
            right: '10px', // grid 组件离容器右侧的距离。
            bottom: '20px', // grid 组件离容器下侧的距离
            backgroundColor: '#161b21', // 网格背景色，默认透明 注意：此配置项生效的前提是，设置了 show: true
            borderColor: '#161b21', // 网格的边框颜色，注意：此配置项生效的前提是，设置了 show: true
            show: true // 是否显示直角坐标系网格
        }
    ],
    xAxis: [ // 直角坐标系 grid 中的 x 轴
        {
            type: 'category', //  类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
            gridIndex: 0, // x 轴所在的 grid 的索引，默认位于第一个 grid
            // scale: true,
            boundaryGap: true, // 坐标轴两边留白策略，类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间
            axisLine: { // 坐标轴轴线相关设置
                onZero: false, // X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效
                lineStyle: { // 坐标轴线线的样式
                    color: '#37404b', // 坐标轴线线的颜色
                    width: 1.5 // 坐标轴线线宽
                }
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                show: false //  false代表不显示
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: true, // 是否显示刻度标签
                color: '#b7c2ce', // 刻度标签文字的颜色
                fontSize: 22, // 文字的字体大小
                algin: 'right', // 文字水平对齐方式，默认自动。
                verticalAlign: 'top' // 文字垂直对齐方式，默认自动
            },
            axisTick: { // 坐标轴刻度相关设置
                alignWithLabel: true // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
            },
            // splitNumber: 20, // 
            min: 'dataMin', // 坐标轴刻度最小值,设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度
            max: 'dataMax', // 坐标轴刻度最大值,设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度
        }, 
        {
            type: 'category',  //  类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
            gridIndex: 1,  // x 轴所在的 grid 的索引，默认位于第一个 grid
            // scale: true,
            boundaryGap: true, // 坐标轴两边留白策略，类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间
            axisLine: { // 坐标轴轴线相关设置
                onZero: false  // X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效
            },
            axisTick: {  // 坐标轴刻度相关设置
                show: false // false代表不显示
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                show: false // false代表不显示
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: false  // false代表不显示
            },
            // splitNumber: 20,
            min: 'dataMin',  // 坐标轴刻度最小值,设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度
            max: 'dataMax'  // 坐标轴刻度最大值,设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度
        }
    ],
    yAxis: [ // 直角坐标系 grid 中的y轴
        {
            scale: true, // 只在数值轴中（type: 'value'）有效
            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示
                show: false // false代表不显示
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                lineStyle: { // 分割线样式
                    color: '#37404b', // 分隔线颜色
                    type: 'dotted' // 分隔线线的类型，dotted表示点虚线
                }
            },
            axisLine: { // 坐标轴轴线相关设置
                show: false, // 是否显示坐标轴轴线是否显示坐标轴轴线
                lineStyle: { // 轴线样式
                    color: '#37404b'
                }
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: true, // 是否显示刻度标签
                margin: 0, // 刻度标签与轴线之间的距离
                padding:[7, -12, 0 , 0], // 文字块的内边距
                color: '#b7c2ce', // 刻度标签文字的颜色
                fontSize: 22, // 文字的字体大小
                algin: 'right', // 文字水平对齐方式，默认自动
                verticalAlign: 'middle' // 文字垂直对齐方式，默认自动
            }
        },
        {
            scale: true,  // 只在数值轴中（type: 'value'）有效
            gridIndex: 1, // y 轴所在的 grid 的索引，默认位于第一个 grid。
            splitNumber: 2, // 坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: false
            },
            axisLine: { // 坐标轴轴线相关设置
                show: false
            },
            axisTick: { // 坐标轴刻度相关设置
                show: false
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                show: false
            }
        }
    ],
    series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
        {
            type: 'candlestick', // K线图
            barMaxWidth: 20, // 指定柱最小宽度。可以使用绝对数值（如 10）或百分比（如 '20%'，表示 band width 的百分之多少）。默认自适应。
            itemStyle: { // K 线图的图形样式
                normal: {
                    color: '#ee4b4b', // 阳线 图形的颜色
                    color0: '#3ee99f', // 阴线 图形的颜色
                    borderColor: null, // 阳线 图形的描边颜色
                    borderColor0: null // 阴线 图形的描边颜色
                }
            }
        },
        {
            name: 'MA5', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            type: 'line', // 折线图
            smooth: true, // 是否平滑曲线显示
            showSymbol: false, // 是否显示 symbol, false只有在 tooltip hover 的时候显示
            lineStyle: { // 线条样式
                normal: {
                    color: '#fd1d57', // 线的颜色
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字
                    width: 1 // 线宽
                }
            }
        },
        {
            name: 'MA10', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            type: 'line', // 折线图
            smooth: true, // 是否平滑曲线显示
            showSymbol: false, // 是否显示 symbol, false只有在 tooltip hover 的时候显示
            lineStyle: { // 线条样式
                normal: {
                    color: '#4df561', // 线的颜色
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字
                    width: 1 // 线宽
                }
            }
        },
        {
            name: 'MA20', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            type: 'line', // 折线图
            smooth: true, // 是否平滑曲线显示
            showSymbol: false, // 是否显示 symbol, false只有在 tooltip hover 的时候显示
            lineStyle: { // 线条样式
                normal: {
                    color: '#2bdaff', // 线的颜色
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字
                    width: 1 // 线宽
                }
            }
        },
        {
            name: 'MA30', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            type: 'line', // 折线图
            smooth: true, // 是否平滑曲线显示
            showSymbol: false, // 是否显示 symbol, false只有在 tooltip hover 的时候显示
            lineStyle: { // 线条样式
                normal: {
                    color: '#ffd801', // 线的颜色
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字
                    width: 1 // 线宽
                }
            }
        },
        {
            name: 'MA60', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            type: 'line', // 折线图
            smooth: true, // 是否平滑曲线显示
            showSymbol: false, // 是否显示 symbol, false只有在 tooltip hover 的时候显示
            lineStyle: { // 线条样式
                normal: {
                    color: '#f721ff', // 线的颜色
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字
                    width: 1 // 线宽
                }
            }
        },
        {
            name: 'Volume', // 
            type: 'bar', // 柱状/条形图 通过 柱形的高度/条形的宽度 来表现数据的大小，用于有至少一个类目轴或时间轴的直角坐标系上
            barMaxWidth: 20, // 柱条的最大宽度，不设时自适应,支持设置成相对于类目宽度的百分比
            itemStyle: { // 图形样式
                normal: {
                    color: function(param) { // 柱条的颜色
                        return param.value[2] <= 0 ? '#ee4b4b' : '#3ee99f';
                    }
                }
            },
            xAxisIndex: 1, // 使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用
            yAxisIndex: 1 // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
        }
    ],
    dataZoom: [ // 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响
        {
            id: 'dataZoomX',
            throttle: 0,
            type: 'inside', // 内置型数据区域缩放组件
            filterMode: 'filter', // 当前数据窗口外的数据，被 过滤掉。即 会 影响其他轴的数据范围。每个数据项，只要有一个维度在数据窗口外，整个数据项就会被过滤掉。
            xAxisIndex: [0, 1], //  表示这个 dataZoom 组件控制 第一个 和 第二个 xAxis
            start: 60, // 数据窗口范围的起始百分比
            end: 100, // 数据窗口范围的结束百分比
            minSpan: 5 // 用于限制窗口大小的最小值（百分比值）
        }
    ]
};
export default mobileOption;
    