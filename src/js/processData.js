import { formatTime, formatDecimal, getNextMonthDay, getNextMaxYValue } from './utils';

export const supplementKlineData = (datas, cycle, pricePrecision) => {
    if (!datas) { return; }
    let timeInterval = 0;
    if (cycle === 'minute') {
        timeInterval = 60000;
    } else if (cycle === '5minute') {
        timeInterval = 300000;
    } else if (cycle === '15minute') {
        timeInterval = 900000;
    } else if (cycle === '30minute') {
        timeInterval = 1800000;
    } else if (cycle === 'hour') {
        timeInterval = 3600000;
    } else if (cycle === '4hour') {
        timeInterval = 14400000;
    } else if (cycle === 'day') {
        timeInterval = 86400000;
    } else if (cycle === 'week') {
        timeInterval = 604800000;
    } else if (cycle === 'month') {
        timeInterval = 2592000000;
    } else {
        return;
    }
    if (!pricePrecision) {
        pricePrecision = 6;
    }
    let currentTime = Date.parse(new Date());
    let klineData = JSON.parse(JSON.stringify(datas));
    let len = klineData.length;
    if (len <= 0) {
        return;
    }
    if (klineData[len - 1][0] + timeInterval < currentTime) {
        klineData.push([currentTime, klineData[len - 1][2], klineData[len - 1][2], klineData[len - 1][2], klineData[len - 1][2], 0, 0, 0]);
        len = klineData.length;
    }
    let index = 0;
    for (let i = 0; i < len; i++) {
        if (i < len - 1) {
            let num = (klineData[i + 1][0] - klineData[i][0]) / timeInterval - 1;
            if (num >= 1) {
                for (let j = 0; j < num; j++) {
                    let splice = i + index + 1;
                    let tradingHours = 0;
                    if (cycle === 'month') {
                        tradingHours = getNextMonthDay(klineData[i][0]);
                    } else {
                        tradingHours = klineData[i][0] + timeInterval * (j + 1);
                    }
                    let allPrice = parseFloat(klineData[i][2]).toFixed(pricePrecision);
                    datas.splice(splice, 0, [tradingHours, allPrice, allPrice, allPrice, allPrice, 0, 0, 0]);
                    index = index + 1;
                }
            }
        }
    }
    let supplementData = [];
    if (datas.length > 500) {
        let splceIndex = datas.length - 500;
        supplementData = datas.splice(splceIndex, 500);
    } else {
        supplementData = datas;
    }
    return supplementData;
};

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
        if (parseFloat(data[i][1]) > parseFloat(data[i][2])) {
            status = 1;
        } else if (parseFloat(data[i][1]) < parseFloat(data[i][2])) {
            status = -1;
        } else if (parseFloat(data[i][1]) === parseFloat(data[i][2]) && i !== 0) {
            if (parseFloat(data[i][1]) >= parseFloat(data[i - 1][2])) {
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
    let buyPrice = []; //买入价格
    let buyTotal = []; //买入总计
    let sellPrice = []; //卖出价格
    let sellTotal = []; //卖出总计
    let bids = data.bids;
    let asks = data.asks;
    if (Array.isArray(bids) && bids.length > 0) {
        for (let bid of bids) {
            buyData.push([formatDecimal(bid.price, pricePrecision, false), bid.total]);
            buyPrice.push(formatDecimal(bid.price, pricePrecision, false));
            buyTotal.push(bid.total);
        }
        for (let ask of asks) {
            sellData.push([formatDecimal(ask.price, pricePrecision, false), ask.total]);
            sellPrice.push(formatDecimal(ask.price, pricePrecision, false));
            sellTotal.push(ask.total);
        }
    }
    let sellLen = sellData.length;
    let sellMax = 0;
    if (sellLen > 0) {
        sellMax = sellData[sellLen - 1][1];
    }
    let buyLen = buyData.length;
    let buyMax = 0;
    if (buyLen > 0) {
        buyMax = buyData[buyLen - 1][1];
    }
    let maxAmount = parseFloat(buyMax) > parseFloat(sellMax) ? buyMax : sellMax;
    maxAmount = getNextMaxYValue(maxAmount);
    buyData = buyData.reverse();
    buyPrice = buyPrice.reverse();
    buyTotal = buyTotal.reverse();
    if (sellLen == 1) {
        sellData.push(sellData[0]);
        sellPrice.push(sellPrice[0]);
        sellTotal.push(sellTotal[0]);
    }
    if (buyLen == 1) {
        buyData.push(buyData[0]);
        buyPrice.push(buyPrice[0]);
        buyTotal.push(buyTotal[0]);
    }
    return {
        sellData,
        sellPrice,
        sellTotal,
        buyData,
        buyPrice,
        buyTotal,
        maxAmount: maxAmount
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
