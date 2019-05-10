var depthOption = {
    backgroundColor: '#161b21', // 背景色
    animation: false, // 是否开启动画
    color: [ // 调色盘颜色列表,如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。
        '#ee4b4b',
        '#09e988'
    ],
    legend: [ // 图例组件
        {
            show: true, // 是否显示
            top: 30, // 图例组件离容器上侧的距离,30代表30像素
            itemGap: 20, // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
            itemWidth: 14, // 图例标记的图形宽度
            itemHeight: 14, // 图例标记的图形高度
            selectedMode: false, // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭
            data: [{ // 图例的数据数组
                name: 'buy', // 图例项的名称，应等于某系列的name值
                icon: 'rect', // 标记类型,rect代表矩形
                textStyle: { // 图例项的文本样式
                    color: '#ee4b4b',
                    fontSize: 14,
                    fontFamily: 'Microsoft YaHei'
                }

            }, {
                name: 'sell', // 图例项的名称，应等于某系列的name值
                icon: 'rect', // 标记类型,rect代表矩形
                textStyle: { // 图例项的文本样式
                    color: '#09e988',
                    fontSize: 14,
                    fontFamily: 'Microsoft YaHei'

                }
            }
            ]
        }
    ],
    grid: [ // 直角坐标系内绘图网格
        {
            top: 60, // grid 组件离容器顶部的距离,60代表60px
            left: 20, // grid 组件离容器左侧的距离,20代表20px
            right: 5, // grid 组件离容器右侧的距离,20代表20px
            bottom: 20, // grid 组件离容器底部的距离,20代表20px
            containLabel: true // grid 区域是否包含坐标轴的刻度标签
        }
    ],
    xAxis: [ // 直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠
        {
            type: 'category', // 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
            gridIndex: 0, // x 轴所在的 grid 的索引，默认位于第一个 grid。
            // scale: true, // 
            boundaryGap: true, // 坐标轴两边留白策略，类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间
            axisLine: { // 坐标轴轴线相关设置
                onZero: false, // X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效
                lineStyle: { // 坐标轴线线的样式
                    color: '#37404b'
                }
            },
            splitArea: { // 坐标轴在 grid 区域中的分隔区域
                show: false
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                show: false
            },
            axisPointer: { //  坐标轴指示器配置项
                show: true,
                lineStyle: { // 线的类型
                    type: 'dotted' // 分隔线线的类型，dotted表示点虚线
                }
            },
            axisTick: { // 坐标轴刻度相关设置
                show: true, // 是否显示
                alignWithLabel: true // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: true, // 是否显示
                color: '#9aa4ac', // 刻度标签文字的颜色
                fontSize: 12 // 刻度标签文字的字体大小
            }
        }
    ],
    yAxis: [ // 直角坐标系 grid 中的y轴
        {
            type: 'value', // 数值轴，适用于连续数据
            gridIndex: 0, // y 轴所在的 grid 的索引，默认位于第一个 grid
            position: 'right', // y 轴的位置
            splitNumber: 6, // 坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                show: false
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: true, // 是否显示刻度标签
                color: '#9aa4ac', // 刻度标签文字的颜色
                fontSize: 12, // 文字的字体大小
            },
            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示
                show: false
            },
            axisPointer: { // 坐标轴指示器配置项
                show: false
            }
        }
    ],
    series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
        {
            name: 'buy', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
            type: 'line', // 折线/面积图
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
            lineStyle: { // 线条样式
                color: '#ee4b4b', // 线的颜色
                width: 2 // 线宽
            },
            areaStyle: { // 区域填充样式
                normal: {
                    color: 'rgba(238,75,75,0.3)' // 填充区颜色
                }
            }
        },
        {
            name: 'sell', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
            type: 'line', // 折线/面积图
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
            lineStyle: { // 线条样式
                color: '#09e988', // 线的颜色
                width: 2 // 线宽
            },
            areaStyle: { // 区域填充样式
                normal: {
                    color: 'rgba(9,233,136,0.3)' // 填充区颜色
                }
            }
        }
    ]
};
var mobileDepthOption = {
    backgroundColor: '#161b21', // 背景色
    animation: false, // 是否开启动画
    color: [ // 调色盘颜色列表,如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。
        '#ee4b4b',
        '#09e988'
    ],
    legend: [ // 图例组件
        {
            show: true, // 是否显示
            top: 30, // 图例组件离容器上侧的距离,30代表30像素
            itemGap: 20, // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
            itemWidth: 22, // 图例标记的图形宽度
            itemHeight: 22, // 图例标记的图形高度
            selectedMode: false, // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭
            data: [{ // 图例的数据数组
                name: 'buy', // 图例项的名称，应等于某系列的name值
                icon: 'rect', // 标记类型,rect代表矩形
                textStyle: { // 图例项的文本样式
                    color: '#ee4b4b',
                    fontSize: 22,
                    fontFamily: 'Microsoft YaHei'
                }

            }, {
                name: 'sell', // 图例项的名称，应等于某系列的name值
                icon: 'rect', // 标记类型,rect代表矩形
                textStyle: { // 图例项的文本样式
                    color: '#09e988',
                    fontSize: 22,
                    fontFamily: 'Microsoft YaHei'

                }
            }
            ]
        }
    ],
    grid: [ // 直角坐标系内绘图网格
        {
            top: 48, // grid 组件离容器顶部的距离,48代表48px
            left: 0, // grid 组件离容器左侧的距离,0代表0px
            right: 0, // grid 组件离容器右侧的距离,0代表0px
            bottom: 40, // grid 组件离容器底部的距离,40代表40px
            containLabel: true // grid 区域是否包含坐标轴的刻度标签
        }
    ],
    xAxis: [ // 直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠    
        {
            type: 'category', // 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
            gridIndex: 0, // x 轴所在的 grid 的索引，默认位于第一个 grid。
            // scale: true,
            boundaryGap: true, // 坐标轴两边留白策略，类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间
            axisLine: { // 坐标轴轴线相关设置
                onZero: false, // X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效
                lineStyle: { // 坐标轴线线的样式
                    color: '#37404b'
                }
            },
            splitArea: { // 坐标轴在 grid 区域中的分隔区域
                show: false
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                show: false
            },
            axisPointer: { //  坐标轴指示器配置项
                show: true,
                label: { // 指示器样式
                    backgroundColor: '#232b34', // 背景色
                    fontSize:22, // 字体大小
                }
            },
            axisTick: { // 坐标轴刻度相关设置
                show: true,  // 是否显示
                alignWithLabel: true, // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                show: true, // 是否显示
                color: '#b9cadd', // 刻度标签文字的颜色
                fontSize: 22, // 刻度标签文字的字体大小
            }
        }
    ],
    yAxis: [ // 直角坐标系 grid 中的y轴
        {
            type: 'value', // 数值轴，适用于连续数据
            gridIndex: 0, // y 轴所在的 grid 的索引，默认位于第一个 grid
            position: 'right', // y 轴的位置
            z:2, // Y 轴组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖
            splitNumber: 4, // 坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整
            splitLine: { // 坐标轴在 grid 区域中的分隔线
                show: false,
                type: 'shadow'
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
                inside:true, // 刻度标签是否朝内，true表示朝内
                show: true, // 是否显示刻度标签
                onZero: false,
                margin: 0, // 刻度标签与轴线之间的距离
                color: '#b7c2ce', // 刻度标签文字的颜色
                fontSize: 22 // 刻度标签文字字体大小
            },
            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示
                show: false
            },
            axisPointer: { // 坐标轴指示器配置项
                show: false
            }
        }
    ],
    series: [ // 系列列表。每个系列通过 type 决定自己的图表类型
        {
            name: 'buy', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
            type: 'line', // 折线/面积图
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
            lineStyle: { // 线条样式
                color: '#ee4b4b', // 线的颜色
                width: 2 // 线宽
            },
            areaStyle: { // 区域填充样式
                normal: {
                    color: 'rgba(238,75,75,0.3)' // 填充区颜色
                }
            }
        },
        {
            name: 'sell', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
            type: 'line', // 折线/面积图
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
            lineStyle: { // 线条样式
                color: '#09e988',
                width: 2 // 线宽
            },
            areaStyle: { // 区域填充样式
                normal: {
                    color: 'rgba(9,233,136,0.3)' // 填充区颜色
                }
            }
        }
    ]
};

export { depthOption, mobileDepthOption };
