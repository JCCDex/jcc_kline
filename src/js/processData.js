import { formatTime } from './utils';

export const splitData = (data) => {
    if (!data) return;
    var categoryData = [];
    var values = [];
    var volumes = [];
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
    }
    return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
    };
};

export const getDepthData = (data) => {
    if (!data) return;
    let buyData = []; //买入数据
    let sellData = []; //卖出数据
    let bids = data.bids;
    let asks = data.asks;
    if (Array.isArray(bids) && bids.length > 0) {
        for (let bid of bids) {
            buyData.push([bid.price, bid.total]);
        }
        for (let ask of asks) {
            sellData.push([ask.price, ask.total]);
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


export const getKDJData = (dayCount, data) => {
    if (!data) { return; }
    var RSV = [];
    var KData = [];
    var DData = [];
    var JData = [];
    for (var i = 0; i < data.length; i++) {
        if (i < dayCount - 1) {
            RSV.push('-');
            KData.push('-');
            DData.push('-');
            JData.push('-');
        } else {
            var dayCountData = data.slice(i - dayCount + 1, i + 1);
            var lowestPriceData = [];
            var highestPriceData = [];
            for (var countData of dayCountData) {
                lowestPriceData.push(countData[2]);
                highestPriceData.push(countData[3]);
            }
            let smallToBigLowestPriceData = JSON.parse(JSON.stringify(lowestPriceData));
            smallToBigLowestPriceData = smallToBigLowestPriceData.sort(function (a, b) {
                return a - b;
            });
            let lowestPrice = smallToBigLowestPriceData[0];
            let bigToSmallHighestPriceData = JSON.parse(JSON.stringify(lowestPriceData));
            bigToSmallHighestPriceData = bigToSmallHighestPriceData.sort(function (a, b) {
                return b - a;
            });
            let highestPrice = bigToSmallHighestPriceData[0];
            let RSVData = (data[i][1] - lowestPrice) / (highestPrice - lowestPrice) * 100;
            RSV.push(RSVData);
            let KBeforeData;
            if (!isNaN(KData[i - 1])) {
                KBeforeData = KData[i - 1];
            } else {
                KBeforeData = 50;
            }
            let DBeforeData;
            if (!isNaN(DData[i - 1])) {
                DBeforeData = KData[i - 1];
            } else {
                DBeforeData = 50;
            }
            KData.push(2 / 3 * KBeforeData + 1 / 3 * RSV[i]);
            DData.push(2 / 3 * DBeforeData + 1 / 3 * KData[i]);
            JData.push(3 * KData[i] - 2 * DData[i]);
        }
    }
    return {
        RSV: RSV,
        K: KData,
        D: DData,
        J: JData
    };
};

export const getOBVData = (data) => {
    if (!data) { return }
    var OBV = [];
    var OnBalanceVolume;
    for (var i = 0; i < data.length; i++) {
        if (i === 0) {
            OBV.push('-');
            OnBalanceVolume = 0;
        } else {
            let oldValues = JSON.parse(JSON.stringify(data[i - 1]));
            let values = JSON.parse(JSON.stringify(data[i]));
            if (values[2] > oldValues[2]) {
                OnBalanceVolume = OnBalanceVolume + values[6];
            } else if (values[2] < oldValues[2]) {
                OnBalanceVolume = OnBalanceVolume - values[6];
            }
            OBV.push(OnBalanceVolume);
        }
    }
    return OBV;
};