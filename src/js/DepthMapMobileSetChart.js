import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';
import {getLanguage} from './utils';

class DepthMapMobileSetChartController {
    constructor(depthMapConfig) {
        this.depthMapConfig = depthMapConfig;
    // this.showIndicators = showIndicators
    }
  
    initMobileECharts(DOM) {
    // timeDivisionconfig = null;
        this.depth = echarts.init(DOM);
        this.showLoading();
    }

    showLoading(){
      let message = getLanguage();
      this.depth.showLoading({
        text: message.loading,
        color: '#fff',
        textColor: '#fff',
        maskColor: 'rgba(22, 27, 33, 0.5)',
        zlevel: 1
      });
    }

    hideLoading(){
        this.depth.hideLoading();
    }

    setDepthoption(data) {
      if (data) {
        let depthOption = {
          backgroundColor: '#161b21',
          animation: true,
          grid: this.getDepthGrid(data),
          xAxis: this.getDepthXAxis(data),
          yAxis: this.getDepthYAxis(data),
          tooltip: this.getDepthToolTip(data),
          series: this.getDepthSeries(data)
        };
        this.depth.setOption(depthOption, true);
      }
    }

    getDepthGrid() {
      return [{
        top: 60,
        left: 10,
        right: 10,
        bottom: 20,
        containLabel: true
      }];
    }

    getDepthXAxis() {
      return [
        {
          type: 'category',
          gridIndex: 0,
          scale: true,
          boundaryGap: true,
          axisLine: {
            onZero: false,
            lineStyle: {
                color: '#37404b'
            }
          },
          splitArea: {
              show: false
          },
          splitLine: {
              show: false
          },
          axisPointer: {
              show: true
          },
          axisTick: {
              show: true,
              alignWithLabel: true,
          },
          axisLabel: {
              show: true,
              color: '#b9cadd',
              fontSize: 10
          }
        }
      ];
    }

    getDepthYAxis() {
      return [
        {
          type: 'value',
          gridIndex: 0,
          position: 'right',
          splitNumber: 6,
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            onZero: false,
            margin: 0,
            color: '#9aa4ac',
            fontSize: 12,
          },
          splitArea: {
            show: false
          },
          axisPointer: {
            show: false
          }
        }
      ];
    }

    getDepthToolTip() {
      let message = getLanguage();
      return {
          formatter: function (param) {
            param = param[0];
            if(param) {
                if (param.seriesName === 'sell') {
                    return [
                        '<div style="text-align:left;">',
                        '<div style="width:6px;height:6px;background:#28b869;border-radius:4px;float:left;margin-top:8px;margin-right:2px;"></div>' +
          message.sellPrice +
          param.data[0] +
          '<br/>',
                        '<div style="width:6px;height:6px;background:#28b869;border-radius:4px;float:left;margin-top:8px;margin-right:2px;"></div>' +
          message.sellTotal +
          param.data[1] +
          '<br/>',
                        '</div>'
                    ].join('');
                } else if (param.seriesName === 'buy') {
                    return [
                        '<div style="text-align:left;">',
                        '<div style="width:6px;height:6px;background:#ee4b4b;border-radius:4px;float:left;margin-top:8px;margin-right:2px;"></div>' +
          message.buyPrice +
          param.data[0] +
          '<br/>',
                        '<div style="width:6px;height:6px;background:#ee4b4b;border-radius:4px;float:left;margin-top:8px;margin-right:2px;"></div>' +
          message.buyTotal +
          param.data[1] +
          '<br/>',
                        '</div>'
                    ].join('');
                }
            }
          }
      };
    }

    getDepthSeries(data) {
      return [
        {
          name: 'buy',
          type: 'line',
          data: data.buyData,
          showSymbol: false,
          lineStyle: {
            color: '#ee3523',
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#2d1d23'
                  },
                  {
                    offset: 1,
                    color: '#ee4a4a'
                  }
                ]
              }
            }
          }
        },
        {
          name: 'sell',
          type: 'line',
          data: data.sellData,
          showSymbol: false,
          lineStyle: {
            color: '#008c00',
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#14322d'
                  },
                  {
                    offset: 1,
                    color: '#28b869'
                  }
                ]
              }
            }
          }
        }
      ];
    }
}
export default DepthMapMobileSetChartController;