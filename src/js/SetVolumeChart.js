import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import merge from 'lodash.merge';
import { getLanguage, getDefaultChartSize } from './utils';

var volumeOption;
var oldVolumeData;
var toolTipData;

class VolumeChart {
    constructor(configs) {
        this.volumeConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, resizeSize) {
        let size = getDefaultChartSize();
        if (!isFullScreen) {
            if (!this.volumeConfig.defaultSize) {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = resizeSize.height * 0.25 + 'px';
                        DOM.style.width = resizeSize.width + 'px';
                    }
                };
                resizeContainer(this);
                this.volume.resize();
            } else {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = size.height * 0.25 + 'px';
                        DOM.style.width = size.width + 'px';
                    }
                };
                resizeContainer(this);
                this.volume.resize();
            }
        } else {
            let resizeContainer = () => {
                DOM.style.height = size.clientHeight * 0.25 + 'px';
                DOM.style.width = size.clientWidth + 'px';
            };
            resizeContainer(this);
            this.volume.resize();
        }
        if (oldVolumeData) {
            this.updateVolumeOption(oldVolumeData);
        }
    }

    initVolumeECharts(DOM) {
        this.volume = echarts.init(DOM);
        this.showLoading();
    }

    showLoading() {
        let message = getLanguage();
        this.volume.showLoading(
            {
                text: message.loading,
                color: '#fff',
                textColor: '#fff',
                maskColor: 'rgba(22, 27, 33, 0.5)',
                zlevel: 1
            }
        );
    }

    /* 绘制VolumeChart开始 */
    setVolumeOption(data, cycle) {
        oldVolumeData = data;
        if (data) {
            volumeOption = JSON.parse(JSON.stringify(this.volumeConfig));
            this.volume.hideLoading();
            let option = {
                xAxis: this.getVolumeXAxis(data, cycle),
                yAxis: this.getVolumeYAxis(),
                tooltip: this.getVolumeToolTip(data),
                series: this.getVolumeSeries(data)
            };
            merge(volumeOption, option);
            this.volume.setOption(volumeOption, true);
            return toolTipData;
        }
    }

    updateVolumeOption(data, cycle) {
        oldVolumeData = data;
        if (this.volume.getOption()) {
            let volumeConfig = {
                xAxis: this.getVolumeXAxis(data, cycle),
                yAxis: this.getVolumeYAxis(),
                tooltip: this.getVolumeToolTip(data),
                series: this.getVolumeSeries(data)
            };
            merge(volumeOption, volumeConfig);
            volumeOption.dataZoom = this.volume.getOption().dataZoom;
            this.volume.setOption(volumeOption);
        }
    }

    getVolumeEchart() {
        return this.volume;
    }

    getVolumeXAxis(data, cycle) {
        var x = [{
            gridIndex: 0,
            data: data.categoryData,
            axisLabel: {
                formatter(value) {
                    if (cycle === 'hour') {
                        return value.substring(5);
                    }
                    if (cycle === 'day') {
                        return value.substring(0, 12);
                    }
                    if (cycle === 'week') {
                        return value.substring(0, 12);
                    }
                    if (cycle === 'month') {
                        return value.substring(0, 7);
                    }
                }
            }
        }];
        return x;
    }

    getVolumeYAxis() {
        if (this.volumeConfig.platform === 'pc') {
            return [
                {
                    gridIndex: 0,
                    axisLabel: {
                        formatter: function (value) {
                            if (value >= 1000 && value < 1000000) {
                                return (value / 1000) + 'K';
                            } else if (value >= 1000000) {
                                return (value / 1000000) + 'M';
                            } else {
                                return value;
                            }
                        }
                    }
                }
            ];
        }
    }

    getVolumeToolTip(data) {
        return {
            formatter: function (param) {
                param = param[0];
                if (param) {
                    var index = param.data[0];
                    toolTipData = {
                        seriesName: param.seriesName,
                        time: param.name,
                        volume: data.values[index][5],
                        opening: data.values[index][0],
                        closing: data.values[index][1],
                        max: data.values[index][3],
                        min: data.values[index][2],
                        color: data.volumes[index][2]
                    };
                }
            }
        };
    }

    getVolumeSeries(data) {
        return [
            {
                name: 'Volume',
                data: data.volumes,
                barMaxWidth: 10,
                itemStyle: {
                    normal: {
                        color: function (param) {
                            return param.value[2] <= 0 ? '#ee4b4b' : '#3ee99f';
                        }
                    }
                }
            }
        ];
    }

    clearVolumeEcharts() {
        oldVolumeData = null;
        this.volume.clear();
    }

    disposeVolumeEChart() {
        if (this.volume) {
            this.volume.dispose();
        }
    }

}

export default VolumeChart;