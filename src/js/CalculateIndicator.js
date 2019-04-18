import { calculateMA } from './processData';

// KDJ（随机指标）数据计算
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

// OBV（能量潮）数据计算
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

// DMI（动向指标）数据计算
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
    var PDM14 = getMADataByDetailData(14, JSON.parse(JSON.stringify(PDM)));
    var MDM14 = getMADataByDetailData(14, JSON.parse(JSON.stringify(MDM)));
    var TR14 = getMADataByDetailData(14, JSON.parse(JSON.stringify(TR)));
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
    ADX = getMADataByDetailData(13 + 6, DX);

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

// TRIX（三重指数平滑平均线）数据计算
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
    var MATRIX = getMADataByDetailData(20, TRIX);
    return {
        TRIX: TRIX,
        MATRIX: MATRIX
    };
};

// RSI（相对强弱指标）数据计算
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

// Boll（布林线）数据计算
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

// MTM（动量指标）数据计算
export const getMTMData = (data) => {
    if (!data) {
        return;
    }
    var MTM = [];
    var MTMTmp = '';
    for (var i=0; i<data.length; i++) {
        if(i<6){
            MTM.push('-');
        } else {
            MTMTmp = data[i][1] - data[i-6][1];
            MTM.push(MTMTmp);
        }
    }
    return MTM;
};

// EMA（指数移动平均值）数据计算
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

export const getMADataByDetailData = (periodic, data) => {
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


