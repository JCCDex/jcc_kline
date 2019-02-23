import { formatDecimal, formatTime } from './utils';

export const splitData = (data, platform) => {
    if (!data) return;
    var categoryData = [];
    var values = [];
    var volumes = [];
    if(platform === 'mobile') {
        data =
    data.length > 100
        ? data.slice(data.length - 100, data.length)
        : data;
    }
    for (var i = 0; i < data.length; i++) {
        categoryData.push(formatTime(data[i].splice(0, 1)[0]));
        values.push(data[i]);
        let status;
        if (data[i][0] > data[i][1]) {
            status = 1;
        } else if (data[i][0] === data[i][1] && i !== 0) {
            if (data[i][0] >= data[i - 1][1]) {
                status = -1;
            } else {
                status = 1;
            }
        } else {
            status = -1;
        }
        volumes.push([
            i,
            data[i][5],
            status
        ]);
    }
    return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
    };
};

export const getDepthData = (data, coinType, precision) => {
    if (!data || !coinType) return;
    let bids = data.bids;
    let bidsTotal = 0;
    let maxBuyPrice = 0;
    let minBuyPrice = 0;
    let maxSellPrice = 0;
    let minSellPrice = 0;
    let buyAmounts = [];
    let sellAmounts = [];
    let buyPrices = [];
    let sellPrices = [];
    let sellData = [];
    let buyData = [];
    let amountsPrecision = precision.amount ? precision.amount : 2;
    let pricePrecision = precision.price ? precision.price : 6;
    if (Array.isArray(bids) && bids.length > 0) {
        let datas = bids.slice(0, 50);
        let amounts = [];
        let prices = [];
        for (let data of datas) {
            bidsTotal = bidsTotal + parseFloat(data.amount);
            amounts.push(bidsTotal);
            prices.push(formatDecimal(data.price, pricePrecision));
        }
        maxBuyPrice = Math.max.apply(null, prices);
        minBuyPrice = Math.min.apply(null, prices);
        buyAmounts = amounts;
        buyPrices = prices;
    }
    let asks = data.asks;
    let asksTotal = 0;
    if (Array.isArray(asks) && asks.length > 0) {
        let datas = asks.slice(0, 50);
        let amounts = [];
        let prices = [];
        for (let data of datas) {
            asksTotal = asksTotal + parseFloat(data.amount);
            amounts.push(asksTotal);
            prices.push(formatDecimal(data.price, pricePrecision));
        }
        maxSellPrice = Math.max.apply(null, prices);
        minSellPrice = Math.min.apply(null, prices);
        sellAmounts = amounts;
        sellPrices = prices;
    }
    let priceGap = maxSellPrice - minBuyPrice;
    let buyPriceGap = maxBuyPrice - minBuyPrice;
    let buyPercent =
    buyPriceGap / priceGap < 0.25 ? 0.25 : buyPriceGap / priceGap;
    let sellPercent = 1 - buyPercent;
    let maxAmount = Math.max(bidsTotal, asksTotal);
    for (let index = 0; index < sellPrices.length; index++) {
        sellData.push([formatDecimal(sellPrices[index], pricePrecision), formatDecimal(sellAmounts[index], amountsPrecision)]);
    }
    for (let index = 0; index < buyPrices.length; index++) {
        buyData.push([formatDecimal(buyPrices[index], pricePrecision), formatDecimal(buyAmounts[index], amountsPrecision)]);
    }
    buyData = buyData.reverse();
    return {
        maxAmount,
        maxBuyPrice,
        minBuyPrice,
        maxSellPrice,
        minSellPrice,
        buyAmounts,
        buyPrices,
        sellData,
        buyData,
        sellPrices,
        sellAmounts,
        buyPercent,
        sellPercent
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
    for (var index = 0; index < len; index++) {
        let data = datas[index];
        prices.push(data[2]);
        if (index === len - 1) {
            divisionTime = data[3];
        }
        let t = data[0];
        let a = data[1];
        totalMoney += t;
        totalAmount += a;
        averages.push(totalMoney / totalAmount);
        times.push(formatTime(data[3]));
        volumes.push([index, a, data[4] === 0 ? -1 : 1]);
    }
    return {
        prices,
        averages,
        times,
        volumes,
        divisionTime
    };
};

export const calculateMA = (dayCount, data) => {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
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
