import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';

let candleChart;
let volumeChart;
let macdChart;
let indicatorChart;
let stochasticChart;

export const saveCandle = (candle) => {
    candleChart = candle;
    linkageChart(candle, volumeChart);
    linkageChart(candle, indicatorChart)
};

export const saveVolume = (volume) => {
    volumeChart = volume;
    linkageChart(candleChart, volume);
};

export const saveMacd = (macd) => {
    macdChart = macd;
    linkageChart(candleChart, macdChart);
};

export const saveIndicator = (indicator) => {
    indicatorChart = indicator;
    linkageChart(candleChart, indicator);
}

export const saveStochastic = (stochastic) => {
    stochasticChart = stochastic;
    linkageChart(candleChart, stochastic)
}

export const linkageChart = (chart1, chart2) => {
    if (chart1 && chart2) {
        echarts.connect([chart1, chart2]);
        // bindAction([candle, volume]);
    }
};

export const bindAction = (chartList) => { //echart多图联动后，axisPoiner显示label的问题(会出现跳线的现象)
    echarts.util.each(chartList, function (fromChart) {
        echarts.util.each(chartList, function (toChart) {
            if (fromChart === toChart) {
                return;
            }
            // fromChart.on('updateAxisPointer', function (params) {
            //     var payload = toChart.makeActionFromEvent(params);

            //     // Remove y info from payload.axesInfo.
            //     var axesInfo = payload.axesInfo || [];
            //     for (var i = axesInfo.length - 1; i >= 0; i--) {
            //         if (axesInfo[i].axisDim === 'y') {
            //             axesInfo.splice(i, 1);
            //         }
            //     }

            //     toChart.dispatchAction(payload, true);
            // });

            // fromChart.on('dataZoom', function (params) {
            //     toChart.dispatchAction({
            //         type: 'dataZoom',
            //         dataZoomIndex: params.batch[0].dataZoomIndex,
            //         start: params.batch[0].start,
            //         end: params.batch[0].end
            //     }, true);
            // });
        });
    });
};