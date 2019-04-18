import { formatTime, formatDecimal } from './utils';

export const splitData = (data) => {
    if (!data) return;
    var categoryData = [];
    var values = [];
    var volumes = [];
    var MACDData = [];
    let EMA12;
    let EMA26;
    let DIFF;
    let DEA;
    let MACD;
    for (var i = 0; i < data.length; i++) {
        categoryData.push(formatTime(data[i][0]));
        values.push(JSON.parse(JSON.stringify(data[i])));
        values[i].splice(0, 1);
        let status;
        if (data[i][1] > data[i][2]) {
            status = 1;
        } else if (data[i][1] === data[i][2] && i !== 0) {
            if (data[i][1] >= data[i - 1][2]) {
                status = -1;
            } else {
                status = 1;
            }
        } else {
            status = -1;
        }
        volumes.push([
            i,
            data[i][6],
            status
        ]);
        EMA12 = getEMA12(i, EMA12, values[i][1]);
        EMA26 = getEMA26(i, EMA26, values[i][1]);
        DIFF = (EMA12 - EMA26).toFixed(8);
        DEA = getDEA(i, DIFF, DEA);
        MACD = (2 * (DIFF - DEA)).toFixed(8);
        MACDData.push([
            formatTime(data[i][0]),
            DIFF,
            DEA,
            MACD
        ]);
    }
    return {
        categoryData: categoryData,
        values: values,
        volumes: volumes,
        MACDData: MACDData
    };
};

export const getEMA12 = (i, oldEMA12, closingPrice) => {
    if (i === 0) {
        return closingPrice;
    } else {
        return (0.153846154 * closingPrice + 0.846153846 * oldEMA12).toFixed(8);
    }
};

export const getEMA26 = (i, oldEMA26, closingPrice) => {
    if (i === 0) {
        return closingPrice;
    } else {
        return (0.074074074 * closingPrice + 0.925925926 * oldEMA26).toFixed(8);
    }
};

export const getDEA = (i, DIFF, oldDEA) => {
    if (i === 0) {
        return 0;
    } else {
        return (0.2 * DIFF + 0.8 * oldDEA).toFixed(8);
    }
};

export const getDepthData = (data, precision) => {
    if (!data) return;
    let pricePrecision = !isNaN(precision.price) ? precision.price : 6;
    let buyData = []; //买入数据
    let sellData = []; //卖出数据
    let bids = data.bids;
    let asks = data.asks;
    if (Array.isArray(bids) && bids.length > 0) {
        for (let bid of bids) {
            buyData.push([formatDecimal(bid.price, pricePrecision, false), bid.total]);
        }
        for (let ask of asks) {
            sellData.push([formatDecimal(ask.price, pricePrecision, false), ask.total]);
        }
    }
    buyData = buyData.reverse();
    return {
        sellData,
        buyData
    };
};

export const handleDivisionData = (datas) => {
    let prices = [];
    let averages = [];
    let times = [];
    let volumes = [];
    let totalAmount = 0;
    let totalMoney = 0;
    let divisionTime = 0;
    let len = datas.length;
    var MACDData = [];
    let EMA12;
    let EMA26;
    let DIFF;
    let DEA;
    let MACD;

    for (var index = 0; index < len; index++) {
        let data = datas[index];
        prices.push(data[2]);
        if (index === len - 1) {
            divisionTime = data[3];
        }
        let t = data[0] * 1;
        let a = data[1] * 1;
        totalMoney += t;
        totalAmount += a;
        averages.push(totalMoney / totalAmount);
        times.push(formatTime(data[3]));
        volumes.push([index, a, data[4] === 0 ? -1 : 1]);

        EMA12 = getEMA12(index, EMA12, data[2]);
        EMA26 = getEMA26(index, EMA26, data[2]);
        DIFF = (EMA12 - EMA26).toFixed(8);
        DEA = getDEA(index, DIFF, DEA);
        MACD = (2 * (DIFF - DEA)).toFixed(8);
        MACDData.push([
            formatTime(data[3]),
            DIFF,
            DEA,
            MACD
        ]);

    }
    return {
        prices,
        averages,
        times,
        volumes,
        divisionTime,
        MACDData
    };
};

// MA（移动平均线）数据计算
export const calculateMA = (dayCount, data) => {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount - 1) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            let item = parseFloat(data.values[i - j][1]);
            if (isNaN(item)) {
                sum += 0;
            } else {
                sum += item;
            }
        }
        result.push(+(sum / dayCount));
    }
    return result;
};