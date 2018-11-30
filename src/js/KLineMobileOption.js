var mobileOption = {
    backgroundColor: "#161b21",
    animation: true,
    axisPointer: {
      link: { xAxisIndex: "all" },
      label: {
        // backgroundColor: "#777"
      }
    },
    tooltip: {
      trigger: "axis",
      animation: false,
      hideDelay: 15000,
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
      extraCssText: "background:#252332;border:0;color:#ffffff;opacity: 0.7;font-size:18px;"
    },
    grid: [
      {
        left: "20px",
        right: "55px"
      },
      {
        left: "20px",
        right: "55px",
        bottom: "5px",
        backgroundColor: "#1b2229",
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
          show: false
        },
        splitNumber: 20,
        min: "dataMin",
        max: "dataMax",
        axisPointer: {
          z: 100,
          label: {
            show: false
          }
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
        splitNumber: 20,
        min: "dataMin",
        max: "dataMax"
      }
    ],
    yAxis: [
      {
        scale: true,
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
          lineStyle: {
            color: "#37404b"
          }
        },
        axisLabel: {
          show: true,
          color: "#f3f7f6",
          fontSize: 18,
          algin: "right",
          verticalAlign: "top"
        }
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        type: "candlestick",
        barMaxWidth: 20,
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
    ]
  }
  export default mobileOption;
    