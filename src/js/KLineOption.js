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
        left: 10,
        right: 100
      },
      {
        left: 10,
        right: 100,
        bottom: 10,
        backgroundColor: "#1b2229",
        borderColor: "#1b2229",
        show: true
      },
      {
        top: 60,
        width: 90,
        right: 0,
        bottom: 10,
      },
      {
        right: 0,
        width: "90px",
        bottom: 10
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
      },
      {
        type: "value",
        gridIndex: 2,
        scale: true,
        position: "top",
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#37404b"
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
          show: false
        },
        axisLabel: {
          show: false
        },
        min: 0
      },
      {
        type: "value",
        gridIndex: 3,
        scale: true,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#37404b"
          }
        },
        axisPointer: {
          show: true
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        min: 0
      }
    ],
    yAxis: [
      {
        scale: true,
        gridIndex: 0,
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
          verticalAlign: "middle",
          textStyle: {
            align: "left"
          }
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
      },
      {
        type: "category",
        gridIndex: 2,
        boundaryGap: false,
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
          onZero: false,
          lineStyle: {
            color: "#37404b"
          }
        },
        axisPointer: {
          lineStyle: {
            type: "dotted"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          inside: true,
          margin: 88,
          showMinLabel: true,
          showMaxLabel: true,
          interval: 12,
          color: "#b9cadd",
          fontSize: 10,
          verticalAlign: "middle",
          textStyle: {
            align: "right"
          }
        }
      },
      {
        type: "category",
        gridIndex: 3,
        boundaryGap: false,
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
          onZero: false,
          lineStyle: {
            color: "#37404b"
          }
        },
        axisPointer: {
          lineStyle: {
            type: "dotted"
          }
        },
        axisTick: {
          show: false
        },
        inverse: true,
        axisLabel: {
          show: true,
          margin: 88,
          showMinLabel: true,
          showMaxLabel: true,
          inside: true,
          interval: 12,
          color: "#b9cadd",
          fontSize: 10,
          verticalAlign: "middle",
          textStyle: {
            align: "right"
          }
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
      },
      {
        name: "sell",
        type: "line",
        areaStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#14322d"
                },
                {
                  offset: 1,
                  color: "#28b869"
                }
              ]
            }
          }
        },
        itemStyle: {
          normal: {
            color: "#28b869"
          }
        },
        step: "end",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1,
            color: "#28b869",
            opacity: 1
          }
        },
        xAxisIndex: 2,
        yAxisIndex: 2
      },
      {
        name: "buy",
        type: "line",
        areaStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#2d1d23"
                },
                {
                  offset: 1,
                  color: "#ee4a4a"
                }
              ]
            }
          }
        },
        itemStyle: {
          normal: {
            color: "#ee4a4a"
          }
        },
        step: "end",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1,
            color: "#ee4b4b",
            opacity: 1
          }
        },
        xAxisIndex: 3,
        yAxisIndex: 3
      }
    ]
  };
  
  export default option;
  