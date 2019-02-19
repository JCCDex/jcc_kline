export const getCandleOptionByMA = (candleOption) => {
    if (candleOption.defaultMA) {
        return candleOption;
    } else {
        let MAIndex;
        for (var i = 0; i < candleOption.series.length; i++) {
            if (candleOption.series[i].name.indexOf('MA') !== -1) {
                MAIndex = i;
                break
            }
        }
        let MASeries = candleOption.series[1]
        candleOption.series.splice(1, 5)
        for (let i = 0; i < candleOption.MA.length; i++, MAIndex++) {
            candleOption.series.splice(MAIndex, 0, JSON.parse(JSON.stringify(MASeries)))
            candleOption.series[MAIndex].name = candleOption.MA[i].name
            candleOption.series[MAIndex].lineStyle.normal.color = candleOption.MA[i].color
        }
        return candleOption
    }
}