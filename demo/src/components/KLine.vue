<template>
  <div :style="{ position: 'relative', width: klineConfig.size.width + 'px' }">
    <jKline
      ref="vkline"
      v-on:listenToChildEvent="changeCycle"
      :kline-data-obj="klineDataObj"
      :kline-config="klineConfig"
    ></jKline>
  </div>
</template>

<script>
import { JcInfo } from "jcc_rpc";
let width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
let height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
export default {
  name: "KLine",
  data() {
    return {
      id: null,
      cycle: "hour",
      kline: null,
      klineDataObj: null,
      klineConfig: {
        platform: "pc",
        backgroundColor: "#161b21",
        defaultSize: false,
        size: {
          width: width * 0.8,
          height: height * 0.7
        },
        defaultMA: false,
        MA: [
          {
            name: "MA3",
            color: "#67ff7c"
          },
          {
            name: "MA10",
            color: "#ff4d71"
          },
          {
            name: "MA15",
            color: "#f6d026"
          },
          {
            name: "MA20",
            color: "#ff4d71"
          },
          {
            name: "MA30",
            color: "#000000"
          }
        ]
      }
    };
  },
  created() {
    clearInterval(this.id);
    this.getKline();
    this.id = setInterval(this.update, 10000);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    clearInterval(this.id);
  },
  mounted() {
    window.addEventListener("resize", this.resize);
  },
  methods: {
    changeCycle(cycle) {
      this.cycle = cycle;
      this.getKline();
    },
    update() {
      this.getKline();
    },
    resize() {
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      let height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      this.klineConfig = {
        platform: "pc",
        backgroundColor: "#161b21",
        defaultSize: false,
        size: {
          width: width * 0.8,
          height: height * 0.7
        },
        MA: [
          {
            name: "MA3",
            color: "#67ff7c"
          },
          {
            name: "MA10",
            color: "#ff4d71"
          },
          {
            name: "MA15",
            color: "#f6d026"
          },
          {
            name: "MA20",
            color: "#ff4d71"
          },
          {
            name: "MA30",
            color: "#000000"
          }
        ]
      };
    },
    async getKline() {
      var hosts = process.env.infoHosts;
      var port = process.env.infoPort;
      var https = true;
      let inst = new JcInfo(hosts, port, https);
      var base = "SWT";
      var counter = "CNT";
      let coinType = {
        baseTitle: "swt",
        counterTitle: "cnt"
      };
      let res2 = await inst.getDepth(base, counter, "more");
      if (this.cycle != "everyhour") {
        let res1 = await inst.getKline(base, counter, this.cycle);
        this.klineDataObj = {
          klineData: res1.data,
          depthData: res2.data,
          coinType: coinType,
          cycle: this.cycle,
          pricePrecision: 6,
          amountPrecision: 0
        };
      } else {
        let res = await inst.getHistory(base, counter, "all", null);
        this.klineDataObj = {
          pricePrecision: this.pairConfig.bidLimitDecimal,
          amountPrecision: this.pairConfig.amountDecimal,
          coinType: coinType,
          cycle: this.cycle
        };
        if (res.result) {
          this.klineDataObj.timeDivisionData = res.data.reverse();
        }
        if (res2.result) {
          thsi.klineDataObj.depthData = res2.data;
        }
      }
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
