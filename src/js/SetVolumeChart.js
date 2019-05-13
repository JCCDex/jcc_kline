import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import merge from 'lodash.merge';
import { saveVolume } from './linkageCharts';
import { getLanguage, getDefaultChartSize } from './utils';

var volumeOption;
var oldVolumeData;
var toolTipIndex;

class VolumeChart {
    constructor(configs) {
        this.volumeConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, isCloseIndicator, resizeSize) {
        let size = getDefaultChartSize();
        let csale = isCloseIndicator === false ? 0.2 : 0.3;
        if (!isFullScreen) {
            if (!this.volumeConfig.defaultSize) {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = resizeSize.height * csale + 'px';
                        DOM.style.width = resizeSize.width + 'px';
                    }
                };
                resizeContainer(this);
                this.volume.resize();
            } else {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = size.height * csale + 'px';
                        DOM.style.width = size.width + 'px';
                    }
                };
                resizeContainer(this);
                this.volume.resize();
            }
        } else {
            let resizeContainer = () => {
                DOM.style.height = size.clientHeight * csale + 'px';
                DOM.style.width = size.clientWidth + 'px';
            };
            resizeContainer(this);
            this.volume.resize();
        }
        if (oldVolumeData) {
            this.updateVolumeOption(oldVolumeData.data, oldVolumeData.cycle);
        }
    }

    initVolumeECharts(DOM, clear) {
        if (this.volume && clear) {
            oldVolumeData = null;
            this.volume.dispose();
        }
        if (!this.volume || this.volume.isDisposed()) {
            this.volume = echarts.init(DOM);
            this.showLoading();
        }
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
        oldVolumeData = {
            data: data,
            cycle: cycle
        };
        if (data) {
            volumeOption = JSON.parse(JSON.stringify(this.volumeConfig));
            this.volume.hideLoading();
            let option = {
                xAxis: this.getVolumeXAxis(data, cycle),
                yAxis: this.getVolumeYAxis(),
                tooltip: this.getVolumeToolTip(),
                series: this.getVolumeSeries(data),
                dataZoom: this.getDataZoom(data)
            };
            merge(volumeOption, option);
            this.volume.setOption(volumeOption, true);
            saveVolume(this.volume);
        }
    }

    updateVolumeOption(data, cycle) {
        oldVolumeData = {
            data: data,
            cycle: cycle
        };
        if (data) {
            this.volume.hideLoading();
            let volumeConfig = {
                xAxis: this.getVolumeXAxis(data, cycle),
                series: this.getVolumeSeries(data)
            };
            merge(volumeOption, volumeConfig);
            volumeOption.dataZoom = this.volume.getOption().dataZoom;
            this.volume.setOption(volumeOption);
            saveVolume(this.volume);
        }
    }

    getToolTipIndex() {
        return toolTipIndex;
    }

    getVolumeXAxis(data, cycle) {
        var x;
        if (cycle !== 'everyhour') {
            x = [{
                gridIndex: 0,
                data: data.categoryData,
                axisLabel: {
                    formatter(value) {
                        if (cycle.indexOf('minute') !== -1) {
                            return value.substring(5);
                        }
                        if (cycle.indexOf('hour') !== -1) {
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
        } else {
            x = [{
                gridIndex: 0,
                data: data.times
            }];
        }
        return x;
    }

    getVolumeYAxis() {
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

    getVolumeToolTip() {
        return {
            formatter: function (param) {
                param = param[0];
                if (param) {
                    var index = param.data[0];
                    toolTipIndex = index;
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

    getDataZoom(data) {
        let start = 0;
        if (this.volumeConfig.platform === 'mobile') {
            if (data.volumes.length > 40) {
                start = 60;
            }
            if (data.volumes.length > 100) {
                start = 80;
            }
        } else {
            if (data.volumes.length > 80) {
                start = 20;
            }
            if (data.volumes.length > 120) {
                start = 30;
            }
            if (data.volumes.length > 160) {
                start = 50;
            }
            if (data.volumes.length > 200) {
                start = 60;
            }
        }
        var dataZoom = [
            {
                id: 'dataZoomX',
                type: 'inside',
                filterMode: 'filter',
                start: start,
                end: 100,
                minSpan: 5
            }
        ];
        this.volumeConfig.dataZoom = dataZoom;
        return dataZoom;
    }

    disposeVolumeEChart() {
        if (this.volume) {
            this.volume.dispose();
        }
    }

    changeDataZoom(type) {
        let dataZoom = JSON.parse(JSON.stringify(this.volume.getOption().dataZoom));
        if (type === 'leftShift' && dataZoom[0].start >= 2) {
            dataZoom[0].start = dataZoom[0].start - 2;
            dataZoom[0].end = dataZoom[0].end - 2;
        } else if (type === 'enlarge' && dataZoom[0].start < 95) {
            dataZoom[0].start = dataZoom[0].start + 5;
        } else if (type === 'refresh') {
            dataZoom[0].start = this.volumeConfig.dataZoom[0].start;
            dataZoom[0].end = this.volumeConfig.dataZoom[0].end;
        } else if (type === 'narrow' && dataZoom[0].start >= 5) {
            dataZoom[0].start = dataZoom[0].start - 5;
        } else if (type === 'rightShift' && dataZoom[0].end <= 98) {
            dataZoom[0].start = dataZoom[0].start + 2;
            dataZoom[0].end = dataZoom[0].end + 2;
        }
        volumeOption.dataZoom = dataZoom;
        this.volume.setOption(volumeOption);
    }

}

export default VolumeChart;