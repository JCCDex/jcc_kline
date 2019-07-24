import IndicatorChart from 'js/IndicatorChart'
import { getPSYData, getROCData, getBRARData, getDMAData, getBollData, getSARData } from 'js/CalculateIndicator'
import testData from '../../testData/testData.json'

let PSYData = getPSYData(testData.klineData)
PSYData.categoryData = testData.candleData.categoryData

let ROCData = getROCData(testData.klineData)
ROCData.categoryData = testData.candleData.categoryData

let BRARData = getBRARData(testData.candleData.values, 24);
BRARData.categoryData = testData.candleData.categoryData

let DMAData = getDMAData(testData.candleData)
DMAData.categoryData = testData.candleData.categoryData

let BollData = getBollData(testData.candleData, 20)
BollData.categoryData = testData.candleData.categoryData
BollData.candlestickData=testData.candleData.values
BollData.volumes = testData.candleData.volumes

let SARData = getSARData(testData.candleData)
SARData.categoryData = testData.candleData.categoryData
SARData.candlestickData=testData.candleData.values
SARData.volumes = testData.candleData.volumes

let Config = {
    chartType: 'psy',
    platform: 'pc',
    defaultSize: false
}

let size = {
    height: 1080,
    width: 1920
}

describe('test IndicatorChart', () => {

    /* 测试PSY指标线的方法 */
    it('test IndicatorChart if chartType is psy', () => {
        Config.chartType = 'psy'
        let indicator = new IndicatorChart(Config);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })


    it('test initPSYChart if chartType is psy', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initPSYChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setPSYOption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initPSYChart(element)
        indicator.setPSYOption(PSYData, 'hour')
        expect(indicator.setPSYChart.indicator.getOption()).not.toBeNull();
    })

    it('test changePSYDataZoom if chartType is psy', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initPSYChart(element)
        indicator.setPSYOption(PSYData, 'hour')
        indicator.changePSYDataZoom('refresh')
        expect(indicator.setPSYChart.indicator.getOption().dataZoom).not.toBeNull();
    })

    it('test setPSYOption if platform is mobile', () => {
        const element = document.createElement('div');
        Config.platform = 'mobile'
        let indicator = new IndicatorChart(Config);
        indicator.initPSYChart(element)
        indicator.setPSYOption(PSYData, 'hour')
        expect(indicator.setPSYChart.indicator.getOption()).not.toBeNull();
    })

    it('test updatePSYOption', () => {
        const element = document.createElement('div');
        Config.platform = 'pc'
        let indicator = new IndicatorChart(Config);
        indicator.initPSYChart(element)
        indicator.setPSYOption(PSYData, 'day')
        indicator.updatePSYOption(PSYData, 'week')
        expect(indicator.setPSYChart.indicator.getOption()).not.toBeNull();
    })

    it('test getPSYTipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initPSYChart(element)
        indicator.setPSYOption(PSYData, 'day')
        let tipData = indicator.getPSYTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizePSYChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initPSYChart(element)
        indicator.setPSYOption(PSYData, 'hour')
        indicator.resizePSYChart(element, false, size)
        expect(indicator.setPSYChart.indicator.getOption()).not.toBeNull();
    })

    it('test disposePSYEChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initPSYChart(element)
        indicator.setPSYOption(PSYData, 'hour')
        indicator.disposePSYEChart()
        expect(indicator.setPSYChart.indicator.getOption()).not.toBeNull();
    })

    /* 测试ROC指标线的方法 */
    it('test IndicatorChart if chartType is roc', () => {
        Config.chartType = 'roc'
        let indicator = new IndicatorChart(Config);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })

    it('test initROCChart if chartType is roc', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initROCChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setROCOption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initROCChart(element)
        indicator.setROCOption(ROCData, 'hour')
        expect(indicator.setROCChart.indicator.getOption()).not.toBeNull();
    })

    it('test changeROCDataZoom if chartType is roc', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initROCChart(element)
        indicator.setROCOption(ROCData, 'hour')
        indicator.changeROCDataZoom('refresh')
        expect(indicator.setROCChart.indicator.getOption().dataZoom).not.toBeNull();
    })

    it('test setROCOption if platform is mobile', () => {
        const element = document.createElement('div');
        Config.platform = 'mobile'
        let indicator = new IndicatorChart(Config);
        indicator.initROCChart(element)
        indicator.setROCOption(ROCData, 'hour')
        expect(indicator.setROCChart.indicator.getOption()).not.toBeNull();
    })

    it('test updateROCOption', () => {
        const element = document.createElement('div');
        Config.platform = 'pc'
        let indicator = new IndicatorChart(Config);
        indicator.initROCChart(element)
        indicator.setROCOption(ROCData, 'day')
        indicator.updateROCOption(ROCData, 'week')
        expect(indicator.setROCChart.indicator.getOption()).not.toBeNull();
    })

    it('test getROCTipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initROCChart(element)
        indicator.setROCOption(ROCData, 'day')
        let tipData = indicator.getROCTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeROCChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initROCChart(element)
        indicator.setROCOption(ROCData, 'hour')
        indicator.resizeROCChart(element, false, size)
        expect(indicator.setROCChart.indicator.getOption()).not.toBeNull();
    })

    it('test disposeROCEChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initROCChart(element)
        indicator.setROCOption(ROCData, 'hour')
        indicator.disposeROCEChart()
        expect(indicator.setROCChart.indicator.getOption()).not.toBeNull();
    })

    /* 测试BRAR指标线的方法 */
    it('test IndicatorChart if chartType is brar', () => {
        Config.chartType = 'brar'
        let indicator = new IndicatorChart(Config);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })

    it('test initBRARChart if chartType is brar', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBRARChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setBRAROption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBRARChart(element)
        indicator.setBRAROption(BRARData, 'hour')
        expect(indicator.setBRARChart.indicator.getOption()).not.toBeNull();
    })

    it('test changeBRARDataZoom if chartType is brar', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBRARChart(element)
        indicator.setBRAROption(BRARData, 'hour')
        indicator.changeBRARDataZoom('refresh')
        expect(indicator.setBRARChart.indicator.getOption().dataZoom).not.toBeNull();
    })

    it('test setBRAROption if platform is mobile', () => {
        const element = document.createElement('div');
        Config.platform = 'mobile'
        let indicator = new IndicatorChart(Config);
        indicator.initBRARChart(element)
        indicator.setBRAROption(BRARData, 'hour')
        expect(indicator.setBRARChart.indicator.getOption()).not.toBeNull();
    })

    it('test updateBRAROption', () => {
        const element = document.createElement('div');
        Config.platform = 'pc'
        let indicator = new IndicatorChart(Config);
        indicator.initBRARChart(element)
        indicator.setBRAROption(BRARData, 'day')
        indicator.updateBRAROption(BRARData, 'week')
        expect(indicator.setBRARChart.indicator.getOption()).not.toBeNull();
    })

    it('test getBRARTipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBRARChart(element)
        indicator.setBRAROption(BRARData, 'day')
        let tipData = indicator.getBRARTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeBRARChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBRARChart(element)
        indicator.setBRAROption(BRARData, 'hour')
        indicator.resizeBRARChart(element, false, size)
        expect(indicator.setBRARChart.indicator.getOption()).not.toBeNull();
    })

    it('test disposeBRAREChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBRARChart(element)
        indicator.setBRAROption(BRARData, 'hour')
        indicator.disposeBRAREChart()
        expect(indicator.setBRARChart.indicator.getOption()).not.toBeNull();
    })

    /* 测试DMA指标线的方法 */
    it('test IndicatorChart if chartType is dma', () => {
        Config.chartType = 'dma'
        let indicator = new IndicatorChart(Config);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })

    it('test initDMAChart if chartType is dma', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initDMAChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setDMAOption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initDMAChart(element)
        indicator.setDMAOption(DMAData, 'hour')
        expect(indicator.setDMAChart.indicator.getOption()).not.toBeNull();
    })

    it('test changeDMADataZoom if chartType is dma', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initDMAChart(element)
        indicator.setDMAOption(DMAData, 'hour')
        indicator.changeDMADataZoom('refresh')
        expect(indicator.setDMAChart.indicator.getOption().dataZoom).not.toBeNull();
    })

    it('test setDMAOption if platform is mobile', () => {
        const element = document.createElement('div');
        Config.platform = 'mobile'
        let indicator = new IndicatorChart(Config);
        indicator.initDMAChart(element)
        indicator.setDMAOption(DMAData, 'hour')
        expect(indicator.setDMAChart.indicator.getOption()).not.toBeNull();
    })

    it('test updateDMAOption', () => {
        const element = document.createElement('div');
        Config.platform = 'pc'
        let indicator = new IndicatorChart(Config);
        indicator.initDMAChart(element)
        indicator.setDMAOption(DMAData, 'day')
        indicator.updateDMAOption(DMAData, 'week')
        expect(indicator.setDMAChart.indicator.getOption()).not.toBeNull();
    })

    it('test getDMATipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initDMAChart(element)
        indicator.setDMAOption(DMAData, 'day')
        let tipData = indicator.getDMATipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeDMAChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initDMAChart(element)
        indicator.setDMAOption(DMAData, 'hour')
        indicator.resizeDMAChart(element, false, size)
        expect(indicator.setDMAChart.indicator.getOption()).not.toBeNull();
    })

    it('test disposeDMAEChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initDMAChart(element)
        indicator.setDMAOption(DMAData, 'hour')
        indicator.disposeDMAEChart()
        expect(indicator.setDMAChart.indicator.getOption()).not.toBeNull();
    })

    // /* 测试Boll指标线的方法 */
    it('test IndicatorChart if chartType is boll', () => {
        Config.chartType = 'Boll'
        let indicator = new IndicatorChart(Config);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })

    it('test initBollChart if chartType is boll', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBollChart(element)
        expect(indicator).not.toBeNull();
    })

    it('test setBollOption', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBollChart(element)
        indicator.setBollOption(BollData, 'hour')
        expect(indicator.setBollChart.indicator.getOption()).not.toBeNull();
    })

    it('test changeBollDataZoom if chartType is boll', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBollChart(element)
        indicator.setBollOption(BollData, 'hour')
        indicator.changeBollDataZoom('refresh')
        expect(indicator.setBollChart.indicator.getOption().dataZoom).not.toBeNull();
    })

    it('test setBollOption if platform is mobile', () => {
        const element = document.createElement('div');
        Config.platform = 'mobile'
        let indicator = new IndicatorChart(Config);
        indicator.initBollChart(element)
        indicator.setBollOption(BollData, 'hour')
        expect(indicator.setBollChart.indicator.getOption()).not.toBeNull();
    })

    it('test updateBollOption', () => {
        const element = document.createElement('div');
        Config.platform = 'pc'
        let indicator = new IndicatorChart(Config);
        indicator.initBollChart(element)
        indicator.setBollOption(BollData, 'day')
        indicator.updateBollOption(BollData, 'week')
        expect(indicator.setBollChart.indicator.getOption()).not.toBeNull();
    })

    it('test getBollTipData', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBollChart(element)
        indicator.setBollOption(BollData, 'day')
        let tipData = indicator.getBollTipData()
        expect(tipData).not.toBeNull();
    })

    it('test resizeBollChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBollChart(element)
        indicator.setBollOption(BollData, 'hour')
        indicator.resizeBollChart(element, false, size)
        expect(indicator.setBollChart.indicator.getOption()).not.toBeNull();
    })

    it('test disposeBollEChart', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initBollChart(element)
        indicator.setBollOption(BollData, 'hour')
        indicator.disposeBollEChart()
        expect(indicator.setBollChart.indicator.getOption()).not.toBeNull();
    })

    /* 测试SAR指标线的方法 */
    it('test IndicatorChart if chartType is sar', () => {
        Config.chartType = 'sar'
        let indicator = new IndicatorChart(Config);
        expect(indicator).toBeInstanceOf(IndicatorChart)
    })

    it('test initSARChart if chartType is sar', () => {
        const element = document.createElement('div');
        let indicator = new IndicatorChart(Config);
        indicator.initSARChart(element)
        expect(indicator).not.toBeNull();
    })

    // it('test setSAROption', () => {
    //     const element = document.createElement('div');
    //     let indicator = new IndicatorChart(Config);
    //     indicator.initSARChart(element)
    //     indicator.setSAROption(SARData, 'hour')
    //     expect(indicator.setSARChart.indicator.getOption()).not.toBeNull();
    // })

    // it('test changeSARDataZoom if chartType is sar', () => {
    //     const element = document.createElement('div');
    //     let indicator = new IndicatorChart(Config);
    //     indicator.initSARChart(element)
    //     indicator.setSAROption(SARData, 'hour')
    //     indicator.changeSARDataZoom('refresh')
    //     expect(indicator.setSARChart.indicator.getOption().dataZoom).not.toBeNull();
    // })

    // it('test setSAROption if platform is mobile', () => {
    //     const element = document.createElement('div');
    //     Config.platform = 'mobile'
    //     let indicator = new IndicatorChart(Config);
    //     indicator.initSARChart(element)
    //     indicator.setSAROption(SARData, 'hour')
    //     expect(indicator.setSARChart.indicator.getOption()).not.toBeNull();
    // })

    // it('test updateSAROption', () => {
    //     const element = document.createElement('div');
    //     Config.platform = 'pc'
    //     let indicator = new IndicatorChart(Config);
    //     indicator.initSARChart(element)
    //     indicator.setSAROption(SARData, 'day')
    //     indicator.updateSAROption(SARData, 'week')
    //     expect(indicator.setSARChart.indicator.getOption()).not.toBeNull();
    // })

    // it('test getSARTipData', () => {
    //     const element = document.createElement('div');
    //     let indicator = new IndicatorChart(Config);
    //     indicator.initSARChart(element)
    //     indicator.setSAROption(SARData, 'day')
    //     let tipData = indicator.getSARTipData()
    //     expect(tipData).not.toBeNull();
    // })

    // it('test resizeSARChart', () => {
    //     const element = document.createElement('div');
    //     let indicator = new IndicatorChart(Config);
    //     indicator.initSARChart(element)
    //     indicator.setSAROption(SARData, 'hour')
    //     indicator.resizeSARChart(element, false, size)
    //     expect(indicator.setSARChart.indicator.getOption()).not.toBeNull();
    // })

    // it('test disposeSAREChart', () => {
    //     const element = document.createElement('div');
    //     let indicator = new IndicatorChart(Config);
    //     indicator.initSARChart(element)
    //     indicator.setSAROption(SARData, 'hour')
    //     indicator.disposeSAREChart()
    //     expect(indicator.setSARChart.indicator.getOption()).not.toBeNull();
    // })

})