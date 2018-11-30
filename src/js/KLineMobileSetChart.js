import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom'
import merge from 'lodash.merge' 
import { formatDecimal, getLanguage, formatTime } from './utils'
import { calculateMA } from './processData'

var cycle;
var config;
var timeDivisionconfig;
var toolTipData;


class KLineMobileSetChartController {
  constructor(configs, showIndicators) {
    this.klineConfig = configs,
    this.showIndicators = showIndicators
  }
  
  initMobileECharts(DOM) {
    toolTipData = null;
    timeDivisionconfig = null;
    this.kline = echarts.init(DOM);
    this.showLoading();
  }

  showLoading(){
    let message = getLanguage();
    this.kline.showLoading({
      text: message.loading,
      color: "#fff",
      textColor: "#fff",
      maskColor: "rgba(22, 27, 33, 0.5)",
      zlevel: 1
    });
  }

  hideLoading() {
    this.kline.hideLoading();
  }

  getFormatDecimal(num) {
    return formatDecimal(num, 0, 5);
  }

  setOption(size) {
    config = JSON.parse(JSON.stringify(this.klineConfig))
    let option = {
      grid: this.getGrid(size),
      yAxis: this.getYAxis(size)
    }
    merge(config, option)
    cycle = 'normal'
    if (this.showIndicators.indexOf('Volume') === -1) {
      config.dataZoom[0].xAxisIndex = [0]
    }
    this.kline.setOption(config, true);
  }

  setTimeDivisionsOption(size) {
    timeDivisionconfig = JSON.parse(JSON.stringify(this.klineConfig))
    let option = {
      grid: this.getGrid(size),
      yAxis: this.getYAxis(size),
      series: [
        {
          name: "White",
          type: "line",
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: "#fff",
              opacity: 1,
              width: 2
            }
          }
        },
        {
          name: "Yellow",
          type: "line",
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: "yellow",
              opacity: 1,
              width: 2
            }
          }
        },
        {
          name: "Volume",
          type: "bar",
          barMaxWidth: 20,
          itemStyle: {
            normal: {
              color: function(param) {
                return param.value[2] <= 0 ? "#ee4b4b" : "#3ee99f";
              }
            }
          },
          xAxisIndex: 1,
          yAxisIndex: 1
        }
      ]
    }
    merge(timeDivisionconfig, option)
    cycle = 'everyhour'
    this.kline.setOption(timeDivisionconfig, true);
  }

  updateOption(data) {
    let self = this;
    let message = getLanguage();
    this.kline.hideLoading();
    let length = data.values.length - 1
    if (!toolTipData) {
      toolTipData = {
        time: data.categoryData[length],
        volume: this.getFormatDecimal(data.values[length][5]),
        opening: data.values[length][0].toFixed(6),
        closing: data.values[length][1].toFixed(6),
        max: data.values[length][3].toFixed(6),
        min: data.values[length][2].toFixed(6),
        MA5: calculateMA(5, data)[length],
        MA10: calculateMA(10, data)[length],
        MA20: calculateMA(20, data)[length],
        MA30: calculateMA(30, data)[length],
        MA60: calculateMA(60, data)[length],
        color: data.volumes[length][2],
        type: 'normal'
      }
    }
    let updateOption = {
      xAxis: [
        {
          data: data.categoryData
        }
      ],
      tooltip: {
        formatter: function(param) {
          param = param[0];
          var index = param.data[0];
          toolTipData = {
            time: param.name,
            volume: self.getFormatDecimal(data.values[index][5]),
            opening: data.values[index][0].toFixed(6),
            closing: data.values[index][1].toFixed(6),
            max: data.values[index][3].toFixed(6),
            min: data.values[index][2].toFixed(6),
            color: data.volumes[index][2],
            type: 'normal'
          }
        }
      },
      series: [
        {
          type: "candlestick",
          data: data.values
        }
      ]
    }
    if (this.showIndicators.indexOf('MA') !== -1) {
      updateOption.tooltip = {
        formatter: function(param) {
          param = param[0];
          var index = param.data[0];
          toolTipData = {
            time: param.name,
            volume: self.getFormatDecimal(data.values[index][5]),
            opening: data.values[index][0].toFixed(6),
            closing: data.values[index][1].toFixed(6),
            max: data.values[index][3].toFixed(6),
            min: data.values[index][2].toFixed(6),
            MA5: calculateMA(5, data)[index],
            MA10: calculateMA(10, data)[index],
            MA20: calculateMA(20, data)[index],
            MA30: calculateMA(30, data)[index],
            MA60: calculateMA(60, data)[index],
            color: data.volumes[index][2],
            type: 'normal'
          }
          return [
            '<div style="text-align:left;">',
            '<div style="width:10px;height:10px;background:#fd1d57;border-radius:4px;float:left;margin-top:6px;margin-right:2px;"></div>' +
              "MA5: " +
              calculateMA(5, data)[index] +
              "<br/>",
            '<div style="width:10px;height:10px;background:#4df561;border-radius:4px;float:left;margin-top:6px;margin-right:2px;"></div>' +
              "MA10: " +
              calculateMA(10, data)[index] +
              "<br/>",
            '<div style="width:10px;height:10px;background:#2bdaff;border-radius:4px;float:left;margin-top:6px;margin-right:2px;"></div>' +
              "MA20: " +
              calculateMA(20, data)[index] +
              "<br/>",
            '<div style="width:10px;height:10px;background:#ffd801;border-radius:4px;float:left;margin-top:6px;margin-right:2px;"></div>' +
              "MA30: " +
              calculateMA(30, data)[index] +
              "<br/>",
            '<div style="width:10px;height:10px;background:#f721ff;border-radius:4px;float:left;margin-top:6px;margin-right:2px;"></div>' +
              "MA60: " +
              calculateMA(60, data)[index] +
              "<br/>",
            "</div>"
          ].join("");
        }
      }
      updateOption.series.push(
        {
          name: "MA5",
          data: calculateMA(5, data)
        },
        {
          name: "MA10",
          data: calculateMA(10, data)
        },
        {
          name: "MA20",
          data: calculateMA(20, data)
        },
        {
          name: "MA30",
          data: calculateMA(30, data)
        },
        {
          name: "MA60",
          data: calculateMA(60, data)
        }
      )
    }
    if (this.showIndicators.indexOf('Volume') !== -1) {
      updateOption.xAxis.push(
        {
          data: data.categoryData
        }
      )
      updateOption.series.push(
        {
          name: "Volume",
          data: data.volumes,
          type: "bar",
          barMaxWidth: 20,
          itemStyle: {
            normal: {
              color: function(param) {
                return param.value[2] <= 0 ? "#ee4b4b" : "#3ee99f";
              }
            }
          },
          xAxisIndex: 1,
          yAxisIndex: 1
        }
      )
    }
    merge(config, updateOption)
    config.dataZoom = this.kline.getOption().dataZoom
    this.kline.setOption(config);
    return toolTipData
  }

  updateTimeDivisionOption(timeDivisionData, data) {
    let message = getLanguage();
    let { times, averages, prices, volumes } = data;
    let length = timeDivisionData.length - 1
    if (!toolTipData) {
      toolTipData = {
        time: formatTime(timeDivisionData[length][3]),
        volume: this.getFormatDecimal(timeDivisionData[length][1]),
        price: timeDivisionData[length][2].toFixed(6),
        averagePrice: averages[length].toFixed(6),
        color: volumes[length][2]
      }
    }
    let updateTimeOption = {
      xAxis: [
        {
          data: times
        }
      ],
      series: [
        {
          name: "White",
          data: prices
        },
        {
          name: "Yellow",
          data: averages
        }
      ],
      tooltip: {
        formatter: param => {
          let dataIndex = param[0].dataIndex;
          let data = timeDivisionData[dataIndex];
          toolTipData = {
            time: formatTime(data[3]),
            volume: this.getFormatDecimal(data[1]),
            price: data[2].toFixed(6),
            averagePrice: averages[dataIndex].toFixed(6),
            color: volumes[dataIndex][2]
          }
         
          
        }
      }
    }
    if (this.showIndicators.indexOf('Volume') !== -1) {
      updateTimeOption.xAxis.push({
        data: times
      })
      updateTimeOption.series.push({
        name: "Volume",
        data: volumes
      })
    }
    merge(timeDivisionconfig, updateTimeOption)
    if (this.showIndicators.indexOf('Volume') === -1) {
      timeDivisionconfig.dataZoom[0].xAxisIndex = [0]
    }
    timeDivisionconfig.dataZoom = this.kline.getOption().dataZoom
    this.kline.setOption(timeDivisionconfig);
    return toolTipData
  }

  getToolTipData() {
    return toolTipData
  }

  disposeMobileEChart() {
    this.kline.dispose()
  }

  clearMobileEcharts() {
    toolTipData = null;
    this.kline.clear()
  }


  getGrid(size) {
    let g = [{
      height: `${size.height * 0.9}px`
    }]
    if (this.showIndicators.indexOf('Volume') !== -1) {
      g = [{
        height: `${size.height * 0.6}px`
      },
      {
        height: `${size.height * 0.2}px`
      }]
    }
    return g
  }

  getYAxis(size) {
    return [
      {
        axisLabel: {
          margin: -(size.width - 45)
        }
      }
    ];
  }

  changeDataZoom(type) {
    let dataZoom = JSON.parse(JSON.stringify(this.kline.getOption().dataZoom))
    if (type === 'leftShift' && dataZoom[0].start >= 2) {
      dataZoom[0].start = dataZoom[0].start - 2,
      dataZoom[0].end = dataZoom[0].end - 2
    } else if (type === 'enlarge' && dataZoom[0].start < 95) {
      dataZoom[0].start = dataZoom[0].start + 5
    } else if (type === 'refresh') {
      dataZoom[0].start = this.klineConfig.dataZoom[0].start
      dataZoom[0].end = this.klineConfig.dataZoom[0].end
    } else if(type === 'narrow' && dataZoom[0].start >= 5) {
      dataZoom[0].start = dataZoom[0].start - 5
    } else if (type === 'rightShift' && dataZoom[0].end <= 98) {
      dataZoom[0].start = dataZoom[0].start + 2,
      dataZoom[0].end = dataZoom[0].end + 2
    }
    if (cycle === 'normal') {
      config.dataZoom = dataZoom
      this.kline.setOption(config)
    } else {
      timeDivisionconfig.dataZoom = dataZoom
      this.kline.setOption(timeDivisionconfig)
    }
  }
  
};

export default KLineMobileSetChartController;
