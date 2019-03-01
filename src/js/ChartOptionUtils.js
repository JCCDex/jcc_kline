import { getClientWidth, getClientHeight } from './utils';

export const getCandleOptionByMA = (candleOption) => {
    if (candleOption.defaultMA !== false) {
        return candleOption;
    } else {
        let MAIndex;
        for (var i = 0; i < candleOption.series.length; i++) {
            if (candleOption.series[i].name.indexOf('MA') !== -1) {
                MAIndex = i;
                candleOption.MAIndex = i;
                break;
            }
        }
        let MASeries = candleOption.series[1];
        candleOption.series.splice(1, 5);
        for (let MA of candleOption.MA) {
            candleOption.series.splice(MAIndex, 0, JSON.parse(JSON.stringify(MASeries)));
            candleOption.series[MAIndex].name = MA.name;
            candleOption.series[MAIndex].lineStyle.normal.color = MA.color;
            MAIndex++;
        }
        return candleOption;
    }
};

export const getDefaultChartSize = () => {
    let chartSize = {};
    let clientWidth = getClientWidth();
    let clientHeight = getClientHeight();
    chartSize.clientWidth = clientWidth;
    chartSize.clientHeight = clientHeight;
    let width;
    let height;
    if (clientWidth <= 1024) {
        width = 1000 * 0.7;
        height = 1000 * 0.44 * 0.8;
    } else if (clientWidth <= 1280) {
        width = 1203 * 0.7;
        height = 1203 * 0.37 * 0.8;
    } else if (clientWidth <= 1366) {
        width = 1284 * 0.7;
        height = 1284 * 0.44 * 0.8;
    } else if (clientWidth <= 1440) {
        width = 1354 * 0.7;
        height = 1354 * 0.4 * 0.8;
    } else if (clientWidth <= 1680) {
        width = 1504 * 0.7;
        height = 1504 * 0.36 * 0.8;
    } else if (clientWidth <= 1920) {
        width = 1804 * 0.7;
        height = 1804 * 0.37 * 0.8;
    } else if (clientWidth <= 2180) {
        width = 2048 * 0.7;
        height = 2048 * 0.37 * 0.8;
    } else if (clientWidth <= 2560) {
        width = 2560 * 0.7;
        height = 1385 * 0.37 * 0.8;
    } else if (clientWidth <= 3440) {
        width = 3440 * 0.7;
        height = 1426 * 0.37 * 0.8;
    } else if (clientWidth <= 3840) {
        width = 3840 * 0.7;
        height = 1426 * 0.37 * 0.8;
    }
    chartSize.width = width;
    chartSize.height = height;
    return chartSize;
};
