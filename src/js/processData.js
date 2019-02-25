import { formatTime } from './utils';

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

export const getDepthData = (data, coinType) => {
    if (!data || !coinType) return;
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
