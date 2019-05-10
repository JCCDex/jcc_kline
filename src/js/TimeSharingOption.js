var timeSharingOption = {
    backgroundColor: '#161b21', // 背景色
    animation: false, // 是否开启动画
    axisPointer: { // 坐标轴指示器（axisPointer）的全局公用设置,坐标轴指示器是指示坐标轴当前刻度的工具
        link: {
        },
        label: { // 坐标轴指示器的文本标签
        }
    },
    tooltip: { // 提示框组件
        trigger: 'axis', // 触发类型,坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        animation: false, // 是否开启动画
        axisPointer: { // 坐标轴指示器配置项
            type: 'cross', // 指示器类型,十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
            link: { xAxisIndex: 'all' }
        },
        backgroundColor: 'rgba(245, 245, 245, 0.5)', // 提示框浮层的背景颜色
        borderWidth: 1, // 提示框浮层的边框宽。
        borderColor: '#ccc', // 提示框浮层的边框颜色
        padding: 10, // 提示框浮层内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。
        textStyle: { // 提示框浮层的文本样式
            color: '#ffffff', // 文字的颜色
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif' // 文字的字体系列
        },
        extraCssText: 'background:#252332;border:0;opacity: 0.7;' // 额外附加到浮层的 css 样式
    },
    grid: [ // 直角坐标系内绘图网格
        { // 第一个grid网格
            left: 5, // grid 组件离容器左侧的距离
            top: 60, // grid 组件离容器上侧的距离
            right: 65, // grid 组件离容器右侧的距离
            bottom: 20
        }
    ],
    xAxis: [ // 直角坐标系 grid 中的 x 轴
        {
            type: 'category', // 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
            gridIndex: 0, // x 轴所在的 grid 的索引，默认位于第一个 grid。
            scale: true, // 
            boundaryGap: true, // 类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
            axisLine: { // 坐标轴轴线相关设置
                onZero: false, // X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效
                lineStyle: { // 坐标轴线样式
                    color: '#37404b'
                }
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                show: false
            },
            axisLabel: { //  坐标轴刻度标签的相关设置
                show: true, // 是否显示刻度标签
                color: '#9aa4ac', // 刻度标签文字的颜色
                showMinLabel: false // 是否显示最小 tick 的 labe
            },
            axisTick: { // 坐标轴刻度相关设置
                show: true, // 是否显示坐标轴刻度
                alignWithLabel: true // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
            },
            splitNumber: 20,
            min: 'dataMin', // 坐标轴刻度最小值,设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度
            max: 'dataMax', // 坐标轴刻度最大值,可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度
            axisPointer: { // 坐标轴指示器
                z: 100 // 控制图形的前后顺序。z值小的图形会被z值大的图形覆盖

            }
        }
    ],
    yAxis: [ // 直角坐标系 grid 中的 y 轴
        {
            scale: true, //  只在数值轴中（type: 'value'）有效
            gridIndex: 0, // y 轴所在的 grid 的索引，默认位于第一个 grid。
            position: 'right', // y 轴的位置
            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示
                show: false
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                lineStyle: { // 分隔线样式
                    color: '#37404b', 
                    type: 'dotted' // 分隔线线的类型，dotted表示点虚线
                }
            },
            axisLine: { // 坐标轴轴线相关设置
                lineStyle: { // 轴线样式
                    color: '#37404b'
                }
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: true, // 是否显示刻度标签。
                color: '#9aa4ac', // 刻度标签文字的颜色
                algin: 'right', // 文字水平对齐方式
                verticalAlign: 'middle' // 文字垂直对齐方式
            }
        }
    ],
    series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
        {
            name: 'White', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            type: 'line', // 折线/面积图
            smooth: true, // 是否平滑曲线显示
            showSymbol: false, // 是否显示 symbol, false 则只有在 tooltip hover 的时候显示
            lineStyle: { // 线条样式
                normal: {
                    color: '#fff', // 线的颜色
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
                    width: 2 // 线宽
                }
            }
        },
        {
            name: 'Yellow',  // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            type: 'line', // 折线/面积图
            smooth: true, // 是否平滑曲线显示
            showSymbol: false,  // 是否显示 symbol, false 则只有在 tooltip hover 的时候显示
            lineStyle: { // 线条样式
                normal: {
                    color: 'yellow',  // 线的颜色
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
                    width: 2 // 线宽
                }
            }
        }
    ],
    dataZoom: [ // 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响
        {
            id: 'dataZoomX', // 默认不指定。指定则可用于在 option 或者 API 中引用组件
            throttle: 0,
            type: 'inside', // 内置型数据区域缩放组件
            filterMode: 'filter', // 当前数据窗口外的数据，被 过滤掉。即 会 影响其他轴的数据范围。每个数据项，只要有一个维度在数据窗口外，整个数据项就会被过滤掉。
            start: 60, // 数据窗口范围的起始百分比
            end: 100, // 数据窗口范围的结束百分比
            minSpan: 5 // 用于限制窗口大小的最小值（百分比值）
        }
    ]
};

var mobileTimeSharingOption = {
    backgroundColor: '#161b21', // 背景色
    animation: false,  // 是否开启动画
    axisPointer: { // 坐标轴指示器（axisPointer）的全局公用设置,坐标轴指示器是指示坐标轴当前刻度的工具
        link: {
        },
        label: {  // 坐标轴指示器的文本标签
        }
    },
    tooltip: { // 提示框组件
        trigger: 'axis', // 触发类型,坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        animation: false,  // 是否开启动画
        axisPointer: { // 坐标轴指示器配置项
            type: 'cross', // 指示器类型,十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
            link: { xAxisIndex: 'all' }
        },
        backgroundColor: 'rgba(245, 245, 245, 0.5)', // 提示框浮层的背景颜色
        borderWidth: 1, // 提示框浮层的边框宽。
        borderColor: '#ccc', // 提示框浮层的边框颜色
        padding: 10, // 提示框浮层内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
        textStyle: { // 提示框浮层的文本样式
            color: '#ffffff', // 文字的颜色
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif' // 文字的字体系列
        },
        extraCssText: 'background:#252332;border:0;opacity: 0.7;' // 额外附加到浮层的 css 样式
    },
    grid: [ // 直角坐标系内绘图网格
        { // 第一个grid网格
            top: 60, // grid 组件离容器左侧的距离
            left: 20, // grid 组件离容器上侧的距离
            right: 20 // grid 组件离容器右侧的距离
        }
    ],
    xAxis: [ // 直角坐标系 grid 中的 x 轴
        {
            type: 'category', // 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
            gridIndex: 0, // x 轴所在的 grid 的索引，默认位于第一个 grid。
            scale: true,
            boundaryGap: true, // 类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
            axisLine: { // 坐标轴轴线相关设置
                onZero: false, // X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效
                lineStyle: {  // 坐标轴线样式
                    color: '#37404b'
                }
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                show: false
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: true, // 是否显示刻度标签
                color: '#b7c2ce',  // 刻度标签文字的颜色
                fontSize: 22,  // 文字的字体大小
                algin: 'right', // 文字水平对齐方式，默认自动
                verticalAlign: 'top' // 文字垂直对齐方式，默认自动
            },
            axisTick: { // 坐标轴刻度相关设置
                show: true, // 是否显示坐标轴刻度
                alignWithLabel: true // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
            },
            splitNumber: 20, // 坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整,在类目轴中无效
            min: 'dataMin', // 坐标轴刻度最小值,成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度
            max: 'dataMax', // 坐标轴刻度最大值,置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度
            axisPointer: { // 指示器
                z: 100 // 坐标轴指示器的 z 值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖
            }
        }
    ],
    yAxis: [
        {
            scale: true, // 是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用
            gridIndex: 0, // y 轴所在的 grid 的索引，默认位于第一个 grid
            position: 'right', // y 轴的位置
            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示
                show: false
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                lineStyle: {
                    color: '#37404b', // 分隔线颜色
                    type: 'dotted' // 分隔线线的类型,dotted是点虚线
                }
            },
            axisLine: { // 坐标轴轴线相关设置
                lineStyle: {
                    color: '#37404b'
                }
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: true, // 是否显示刻度标签。
                inside: true, // 刻度标签是否朝内
                color: '#9aa4ac', // 刻度标签文字的颜色
                algin: 'right', // 文字水平对齐方式，默认自动
                fontSize: 22, // 文字的字体大小
                verticalAlign: 'middle' // 文字垂直对齐方式，默认自动
            }
        }
    ],
    series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
        {
            name: 'White', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
            type: 'line', // 折线图
            smooth: true,  // 是否平滑
            showSymbol: false, // 是否显示 symbol, false 则只有在 tooltip hover 的时候显示
            lineStyle: { // 线的样式
                normal: {
                    color: '#fff', // 颜色
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字
                    width: 2 // 线宽
                }
            }
        },
        {
            name: 'Yellow', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
            type: 'line', // 折线图
            smooth: true, // 是否平滑
            showSymbol: false, // 是否显示 symbol, false 则只有在 tooltip hover 的时候显示
            lineStyle: { // 线的样式
                normal: {
                    color: 'yellow',// 颜色
                    opacity: 1, // 图形透明度。支持从 0 到 1 的数字
                    width: 2  // 线宽
                }
            }
        }
    ],
    dataZoom: [ // ataZoom 组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。
        {
            id: 'dataZoomX', // 组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件
            throttle: 0,
            type: 'inside', // 内置型数据区域缩放组件
            filterMode: 'filter', // 当前数据窗口外的数据，被 过滤掉。即 会 影响其他轴的数据范围。每个数据项，只要有一个维度在数据窗口外，整个数据项就会被过滤掉。
            start: 60, // 数据窗口范围的起始百分比
            end: 100,  // 数据窗口范围的结束百分比
            minSpan: 5 // 用于限制窗口大小的最小值（百分比值）
        }
    ]
};

export { timeSharingOption, mobileTimeSharingOption };
