import { formatTime } from './utils';

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
        MACD =  (2 * (DIFF-DEA)).toFixed(8);
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
        return (0.153846154*closingPrice + 0.846153846*oldEMA12).toFixed(8);
    }
};

export const getEMA26 = (i, oldEMA26, closingPrice) => {
    if (i === 0) {
        return closingPrice;
    } else {
        return (0.074074074*closingPrice + 0.925925926*oldEMA26).toFixed(8);
    }
};

export const getDEA = (i, DIFF, oldDEA) => {
    if (i === 0) {
        return 0;
    } else {
        return (0.2 * DIFF + 0.8 * oldDEA).toFixed(8);
    }
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
        MACD =  (2 * (DIFF-DEA)).toFixed(8);
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
    if (!data) { return; }
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
    return { OBV: OBV };
};

export const getDMIData = (data) => {
    if (!data) { return; }
    let datas = JSON.parse(JSON.stringify(data));
    var PDM = []; //上升动向
    var MDM = []; //下降动向
    var TR = []; //真实波动
    for (let i = 0; i < datas.length; i++) {
        let TRa;
        let TRb;
        let TRc;
        if (i === 0) {
            PDM.push(0);
            MDM.push(0);
            TRb = 0;
            TRc = 0;
        } else {
            PDM.push(datas[i][3] - datas[i - 1][3] <= 0 ? 0 : datas[i][3] - datas[i - 1][3]);
            MDM.push(datas[i - 1][2] - datas[i][2] <= 0 ? 0 : datas[i - 1][2] - datas[i][2]);
            TRb = datas[i][3] - datas[i - 1][1];
            TRc = datas[i][2] - datas[i - 1][1];
        }
        TRa = datas[i][3] - datas[i][2];
        TR.push(Math.max(Math.abs(TRa), Math.abs(TRb), Math.abs(TRc)));
    }

    var PDI = []; //上升方向指标线
    var MDI = []; //下降方向指标线
    var PDM14 = getMAData(14, JSON.parse(JSON.stringify(PDM)));
    var MDM14 = getMAData(14, JSON.parse(JSON.stringify(MDM)));
    var TR14 = getMAData(14, JSON.parse(JSON.stringify(TR)));
    for (let j = 0; j < PDM.length; j++) {
        if (isNaN(PDM14[j]) || isNaN(TR14[j])) {
            PDI.push('-');
        } else {
            PDI.push((PDM14[j] / TR14[j]) * 100);
        }
        if (isNaN(MDM14[j]) || isNaN(TR14[j])) {
            MDI.push('-');
        } else {
            MDI.push((MDM14[j] / TR14[j]) * 100);
        }
    }

    var DX = []; //动向指数
    var ADX = []; //动向平均数
    for (let i = 0; i < PDI.length; i++) {
        if (isNaN(PDI[i]) || isNaN(MDI[i])) {
            DX.push('-');
        } else {
            DX.push((Math.abs(MDI[i] - PDI[i]) / (MDI[i] + PDI[i])) * 100);
        }
    }
    ADX = getMAData(13 + 6, DX);

    var ADXR = []; //评估数值 ADXR=（当日的ADX+前6日的ADX）÷2
    for (let i = 0; i < ADX.length; i++) {
        if (i < 5 || isNaN(ADX[i]) || isNaN(ADX[i - 5])) {
            ADXR.push('-');
        } else {
            ADXR.push((ADX[i] + ADX[i - 5]) / 2);
        }
    }
    return {
        PDI: PDI,
        MDI: MDI,
        ADX: ADX,
        ADXR: ADXR
    };
};

export const getTRIXData = (datas) => {
    if (!datas) { return; }
    var TR = [];
    let TRa = calculateEMAByCandleData(datas, 12);
    let TRb = getEMAData(TRa, 12);
    TR = getEMAData(TRb, 12);
    var TRIX = [];
    for (let i = 0; i < TR.length; i++) {
        if (i === 0) {
            TRIX.push('-');
        } else {
            TRIX.push((TR[i] - TR[i - 1]) / TR[i - 1] * 100);
        }
    }
    var MATRIX = getMAData(20, TRIX);
    return {
        TRIX: TRIX,
        MATRIX: MATRIX
    };
};

export const getRSIData = (datas, periodic) => {
    if (!datas) { return; }
    let RSI = [];
    let upsAndDowns = [];
    for (let i = 0; i < datas.length; i++) {
        if (i === 0) {
            upsAndDowns.push(0);
        } else {
            upsAndDowns.push((datas[i][1] - datas[i - 1][1]) / datas[i - 1][1]);
        }
    }
    // N日RSI =N日内收盘涨幅的平均值/(N日内收盘涨幅均值+N日内收盘跌幅均值) ×100

    for (let i = 0; i < upsAndDowns.length; i++) {
        if (i < periodic - 1) {
            RSI.push('-');
        } else {
            let gains = 0; //涨幅
            let gainsNumber = 0; //涨幅天数 
            let drop = 0; //跌幅
            let dropNumber = 0; //跌幅天数
            for (let j = i - periodic + 1; j < i + 1; j++) {
                if (upsAndDowns[j] >= 0) {
                    gains = gains + upsAndDowns[j];
                    gainsNumber = gainsNumber + 1;
                } else {
                    drop = drop + upsAndDowns[j];
                    dropNumber = dropNumber + 1;
                }
            }
            let gainsAverage = gains / gainsNumber;
            let dropAverage = drop / dropNumber;
            let RSIValue = (gainsAverage / (gainsAverage + Math.abs(dropAverage))) * 100;
            if (isNaN(RSIValue)) {
                RSI.push(0);
            } else {
                RSI.push(RSIValue);
            }
        }
    }
    return RSI;
};

export const getBollData = (datas, periodic) => {
    if (!datas) return;
    let UB = []; //上轨线
    let MB = []; //中轨线
    let LB = []; //下轨线
    let MD = []; //标准差
    let MAData = calculateMA(periodic, datas);
    for (let i = 0; i < MAData.length; i++) {
        if (isNaN(MAData[i - 1])) {
            UB.push('-');
            MB.push('-');
            LB.push('-');
            MD.push('-');
        } else {
            MB.push(MAData[i - 1]);
            let MDValues = 0;
            for (let j = i - periodic; j < i; j++) {
                if (isNaN(MAData[j])) {
                    MDValues = MDValues + Math.pow((datas.values[j][1]), 2);
                } else {
                    MDValues = MDValues + Math.pow((datas.values[j][1] - MAData[j]), 2);
                }
            }
            MD.push(Math.sqrt(MDValues) / periodic);
            UB.push(MB[i] + 2 * MD[i]);
            LB.push(MB[i] - 2 * MD[i]);
        }
    }
    return {
        UB: UB,
        MB: MB,
        LB: LB
    };
};

export const getMAData = (periodic, data) => {
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
        if (i < periodic - 1) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < periodic - 1; j++) {
            let item = parseFloat(data[i - j]);
            if (isNaN(item)) {
                sum += 0;
            } else {
                sum += item;
            }
        }
        result.push((sum / periodic));
    }
    return result;
};

export const calculateEMAByCandleData = (data, periodic) => {
    var EMA = [];
    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            EMA.push(data[i][1]);
        } else {
            let value = (2 * data[i][1] + (periodic - 1) * EMA[i - 1]) / (periodic + 1);
            EMA.push(value);
        }
    }
    return EMA;
};

export const getEMAData = (data, periodic) => {
    var EMA = [];
    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            EMA.push(data[i]);
        } else {
            EMA.push((2 * data[i] + (periodic - 1) * EMA[i - 1]) / (periodic + 1));
        }
    }
    return EMA;
};

