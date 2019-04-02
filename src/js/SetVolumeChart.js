import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import merge from 'lodash.merge';
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
        let csale = isCloseIndicator===false ? 0.2 : 0.3;
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
                series: this.getVolumeSeries(data)
            };
            merge(volumeOption, option);
            this.volume.setOption(volumeOption, true);
            return toolTipIndex;
        }
    }

    updateVolumeOption(data, cycle) {
        oldVolumeData = {
            data: data,
            cycle: cycle
        };
        if (this.volume.getOption()) {
            let volumeConfig = {
                xAxis: this.getVolumeXAxis(data, cycle),
                yAxis: this.getVolumeYAxis(),
                tooltip: this.getVolumeToolTip(),
                series: this.getVolumeSeries(data)
            };
            merge(volumeOption, volumeConfig);
            volumeOption.dataZoom = this.volume.getOption().dataZoom;
            this.volume.setOption(volumeOption);
        }
    }

    getToolTipIndex() {
        return toolTipIndex;
    }

    getVolumeEchart() {
        return this.volume;
    }

    getVolumeXAxis(data, cycle) {
        var x;
        if (cycle !== 'everyhour') {
            x = [{
                gridIndex: 0,
                data: data.categoryData,
                axisLabel: {
                    formatter(value) {
                        if(cycle.indexOf('minute') !== -1) {
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