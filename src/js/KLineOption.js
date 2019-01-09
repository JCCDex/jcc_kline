var option = {
    backgroundColor: "#161b21",
    animation: true,
    axisPointer: {
      link: {
        xAxisIndex: [0, 1]
      },
      label: {
      }
    },
    tooltip: {
      trigger: "axis",
      animation: false,
      axisPointer: {
        type: "cross",
        link: { xAxisIndex: "all" }
      },
      backgroundColor: "rgba(245, 245, 245, 0.5)",
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      textStyle: {
        color: "#000"
      },
      extraCssText: "background:#252332;border:0;color:#ffffff;opacity: 0.7;font-size:12px;"
    },
    grid: [
      {
        top: 60,
        left: 5,
        right: '5%',
      },
      {
        left: 5,
        right: '5%',
        bottom: 10,
        // backgroundColor: "#1b2229",
        borderColor: "#1b2229",
        show: true
      }
    ],
    xAxis: [
      {
        type: "category",
        gridIndex: 0,
        scale: true,
        boundaryGap: true,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#37404b"
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: true,
          color: "#9aa4ac",
          showMinLabel: false,
          formatter(value, index) {
            if (cycle === "hour") {
              return value.substring(5);
            }
            if (cycle === "day") {
              return value.substring(0, 12);
            }
            if (cycle === "week") {
              return value.substring(0, 12);
            }
            if (cycle === "month") {
              return value.substring(0, 7);
            }
          }
        },
        axisTick: {
          alignWithLabel: true
        },
        splitNumber: 20,
        min: "dataMin",
        max: "dataMax",
        axisPointer: {
          z: 100
        }
      },
      {
        type: "category",
        gridIndex: 1,
        scale: true,
        boundaryGap: true,
        axisLine: {
          onZero: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisPointer: {
          z: 100,
          label: {
            show: false
          }
        },
        splitNumber: 20,
        min: "dataMin",
        max: "dataMax"
      }
    ],
    yAxis: [
      {
        scale: true,
        gridIndex: 0,
        position: 'right',
        splitArea: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: "#37404b",
            type: "dotted"
          }
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#37404b"
          }
        },
        axisLabel: {
          show: true,
          margin: 0,
          color: "#9aa4ac",
          fontSize: 12,
          verticalAlign: "middle"
        }
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        position: 'right',
        splitLine: {
          lineStyle: {
            color: "#37404b",
            type: "dotted"
          }
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#37404b"
          }
        },
        axisLabel: {
          show: true,
          margin: 0,
          color: "#9aa4ac",
          fontSize: 12,
          verticalAlign: "middle"
        }
      }
    ],
    dataZoom: [
      {
        id: "dataZoomX",
        type: "inside",
        filterMode: "filter",
        xAxisIndex: [0, 1],
        start: 60,
        end: 100,
        minSpan: 5
      }
    ],
    series: [
      {
        type: "candlestick",
        barMaxWidth: 10,
        itemStyle: {
          normal: {
            color: "#ee4b4b",
            color0: "#3ee99f",
            borderColor: null,
            borderColor0: null
          }
        }
      },
      {
        name: "MA5",
        type: "line",
        symbol: "none",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#fd1d57",
            opacity: 1,
            width: 1
          }
        }
      },
      {
        name: "MA10",
        type: "line",
        symbol: "none",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#4df561",
            opacity: 1,
            width: 1
          }
        }
      },
      {
        name: "MA20",
        type: "line",
        symbol: "none",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#2bdaff",
            opacity: 1,
            width: 1
          }
        }
      },
      {
        name: "MA30",
        type: "line",
        symbol: "none",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#ffd801",
            opacity: 1,
            width: 1
          }
        }
      },
      {
        name: "MA60",
        type: "line",
        symbol: "none",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#f721ff",
            opacity: 1,
            width: 1
          }
        }
      },
      {
        name: "Volume",
        type: "bar",
        barMaxWidth: 10,
        itemStyle: {
          normal: {
            color: function(param) {
              return param.value[2] <= 0 ? "#ee4b4b" : "#3ee99f";
            }
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1,
      }
    ]
  };
  
  export default option;
  