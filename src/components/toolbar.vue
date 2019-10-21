<template>
  <div>
    <canvas id="toolbar-canvas"  width="1200" height="600"></canvas>
  </div>
</template>
<script>
import "../css/index.css";
import { ColorPicker, Slider } from "element-ui";
import DrawToolbar from "../js/DrawToolbar";
export default {
  name: "toolbar",
  components: {
    ColorPicker
  },
  data() {
    return {
      drawColor: "rgb(255, 0, 0)",
      lineWidth: 1,
      showSlider: false,
      canvas: null,
      ctx: null,
      p: null
    };
  },
  created() {},
  mounted() {
    this.canvas = document.getElementById("toolbar-canvas");
    if (!this.canvas.getContext) return;
    this.ctx = this.canvas.getContext("2d");
    this.p = new DrawToolbar(this.canvas, this.ctx);
  },
  methods: {
    // 绘制直线
    drawLine() {
      this.p.style = "drawLine";
      this.p.drawing();
    },
    // 绘制矩形
    drawRect() {
      this.p.style = "drawRect";
      this.p.drawing();
    },
    // 绘制写字板
    drawTablet() {
      this.p.style = "drawTablet";
      this.p.drawing();
    },
    // 修改颜色
    changeDrawColor() {
      this.p.fillColor = this.drawColor;
      this.p.strokeColor = this.drawColor;
    },
    // 修改线条宽度
    changeLineWidth() {
      this.ctx.lineWidth = this.lineWidth;
    },
    // 显示修改线宽的滑块
    showChangeLineWidthSlider() {
      this.showSlider = true;
    },
    // 隐藏修改线宽的滑块
    hiddenChangeLineWidthSlider() {
      this.showSlider = false;
    },
    // 橡皮擦
    eraser() {
      this.p.style = "eraser";
      this.p.drawing();
    },
    // 撤销
    withdraw() {
      this.p.withdraw();
    },
    // 刷新
    refresh() {
      this.p.history.length = 0;
      this.p.ctx.clearRect(0, 0, this.p.canvasW, this.p.canvasH);
    },
    // 保存
    save() {
      this.p.save();
    }
  }
};
</script>