var macdMobileOption = {
    legend: {
        data: ['KLine', 'MA5']
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line'
        }
    },
    grid: [{
        left: '3%',
        right: '1%',
        height: '60%'
    },{
        left: '3%',
        right: '1%',
        top: '71%',
        height: '10%'
    },{
        left: '3%',
        right: '1%',
        top: '82%',
        height: '14%'
    }],
    xAxis: [{
        type: 'category',
        data: data.times,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
    },{
        type: 'category',
        gridIndex: 1,
        data: data.times,
        axisLabel: {show: false}
    },{
        type: 'category',
        gridIndex: 2,
        data: data.times,
        axisLabel: {show: false}
    }],
    yAxis: [{
        scale: true,
        splitArea: {
            show: false
        }
    },{
        gridIndex: 1,
        splitNumber: 3,
        axisLine: {onZero: false},
        axisTick: {show: false},
        splitLine: {show: false},
        axisLabel: {show: true}
    },{
        gridIndex: 2,
        splitNumber: 4,
        axisLine: {onZero: false},
        axisTick: {show: false},
        splitLine: {show: false},
        axisLabel: {show: true}
    }],
    dataZoom: [{
            type: 'inside',
            xAxisIndex: [0, 0],
            start: 20,
            end: 100
        },{
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '97%',
            start: 20,
            end: 100
        },{
        show: false,
        xAxisIndex: [0, 2],
        type: 'slider',
        start: 20,
        end: 100
    }],
    series: [
        {
            name: 'MACD',
            type: 'bar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: data.macds,
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
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: data.difs
        },{
            name: 'DEA',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: data.deas
        }
    ]
}

export {macdMobileOption}