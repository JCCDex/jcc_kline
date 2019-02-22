import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import merge from 'lodash.merge';
import { getClientWidth, getLanguage } from './utils';

var volumeOption;
var oldVolumeData;

class VolumeChart {
    constructor(configs) {
        this.volumeConfig = configs;
    }

    resizeECharts(DOM, isFullScreen, resizeSize) {
        if (!isFullScreen) {
            if (!this.volumeConfig.defaultSize) {
                let resizeContainer = () => {
                    if (DOM) {
                        DOM.style.height = resizeSize.height + 'px';
                        DOM.style.width = resizeSize.width + 'px';
                        klineSize.width = resizeSize.width;
                        klineSize.height = resizeSize.height;
                    }
                };
                resizeContainer(this);
                this.kline.resize();
            } else {
                let size = getClientWidth();
                let resizeContainer = () => {
                    let width;
                    let height;
                    if (DOM) {
                        if (size <= 1024) {
                            width = 1000 * 0.7;
                            height = 1000 * 0.44 * 0.8;
                        } else if (size <= 1280) {
                            width = 1203 * 0.7;
                            height = 1203 * 0.37 * 0.8;
                        } else if (size <= 1366) {
                            width = 1284 * 0.7;
                            height = 1284 * 0.44 * 0.8;
                        } else if (size <= 1440) {
                            width = 1354 * 0.7;
                            height = 1354 * 0.4 * 0.8;
                        } else if (size <= 1680) {
                            width = 1504 * 0.7;
                            height = 1504 * 0.36 * 0.8;
                        } else if (size <= 1920) {
                            width = 1804 * 0.7;
                            height = 1804 * 0.37 * 0.8;
                        } else if (size <= 2180) {
                            width = 2048 * 0.7;
                            height = 2048 * 0.37 * 0.8;
                        } else if (size <= 2560) {
                            width = 2560 * 0.7;
                            height = 1385 * 0.37 * 0.8;
                        } else if (size <= 3440) {
                            width = 3440 * 0.7;
                            height = 1426 * 0.37 * 0.8;
                        } else if (size <= 3840) {
                            width = 3840 * 0.7;
                            height = 1426 * 0.37 * 0.8;
                        }
                        DOM.style.height = height + 'px';
                        DOM.style.width = width + 'px';
                    }
                };
                resizeContainer(this);
                this.volume.resize();
            }
        } else {
            let resizeContainer = () => {
                DOM.style.height = getClientHeight() + 'px';
                DOM.style.width = getClientWidth() + 'px';
            };
            resizeContainer(this);
            this.kline.resize();
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
    setVolumeOption(data) {
        oldVolumeData = data
        if (data) {
            volumeOption = JSON.parse(JSON.stringify(this.volumeConfig));
            this.volume.hideLoading();
            let option = {
                xAxis: this.getVolumeXAxis(data),
                yAxis: this.getVolumeYAxis(),
                // tooltip: this.getVolumeToolTip(data),
                series: this.getVolumeSeries(data)
            };
            merge(volumeOption, option);
            this.volume.setOption(volumeOption, true);
        }
    }

    updateVolumeOption(data) {
        oldVolumeData = data
        if (this.volume.getOption()) {
            let volumeConfig = {
                xAxis: this.getVolumeXAxis(data),
                yAxis: this.getVolumeYAxis(),
                // tooltip: this.getVolumeToolTip(data),
                series: this.getVolumeSeries(data)
            };
            merge(volumeOption, volumeConfig);
            volumeOption.dataZoom = this.volume.getOption().dataZoom;
            this.volume.setOption(volumeOption);
        }
    }

    getVolumeXAxis(data) {
        return [{
            gridIndex: 0,
            data: data.categoryData
        }];
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
        oldKlineData = null;
        this.volume.clear();
    }

    disposeVolumeEChart() {
        if (this.volume) {
            this.volume.dispose();
        }
    }

}

export default VolumeChart;