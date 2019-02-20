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
