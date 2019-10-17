<template>
  <div class="h_box">
    <div class="h_console">
      <div class="h_tool">工具台</div>
      <ul class="h_tool1">
        <li id="line" class="bg">
          <span class="iconfont" title="绘制直线" @click="drawLine">&#xe653;</span>
        </li>
        <li id="rect" class="bg">
          <span class="iconfont" title="绘制矩形">&#xe648;</span>
        </li>
        <li id="dytriangle" class="bg">
          <span class="iconfont" title="绘制等腰三角形">&#xe601;</span>
        </li>
        <li id="zjtriangle" class="bg">
          <span class="iconfont" title="绘制直角三角形">&#xe705;</span>
        </li>
        <li id="tablet" class="bg bgtb">
          <span class="iconfont" title="铅笔">&#xe6be;</span>
        </li>
        <li id="polygon" class="bg bgp">
          <span class="iconfont" title="绘制多边形">&#xe605;</span>
          <div class="polygon1">
            <input type="number" min="3" max="30" value="3" id="range" />
            <div class="trag"></div>
          </div>
        </li>
        <li class="bg" id="circle">
          <span class="iconfont" title="绘制圆形">&#xe75d;</span>
        </li>
        <li class="bg" id="ellipse">
          <span class="iconfont" title="绘制椭圆">&#xe800;</span>
        </li>
        <li class="bg" id="eraser">
          <span class="iconfont" title="橡皮擦">&#xe6b8;</span>
        </li>
      </ul>
      <ul class="h_tool1 h_tool2">
        <li class="bg" id="way">
          <span class="iconfont" title="转换填充样式">&#xe644;</span>
        </li>
        <li class="bg bgp">
          <span class="iconfont" title="修改填充色">&#xe649;</span>
          <div class="polygon1 poly1">
            <input type="color" id="fillCo" />
            <div class="trag"></div>
          </div>
        </li>
        <li class="bg bgp">
          <span class="iconfont" title="线条加粗">&#xe604;</span>
          <div class="polygon2">
            <input type="range" min="1" max="30" value="1" id="linew" />
            <div class="trag trag1"></div>
            <p id="numW">0</p>
          </div>
        </li>
        <li class="bg" id="revo">
          <span class="iconfont" title="撤销">&#xe699;</span>
        </li>
        <li class="bg" id="refresh">
          <span class="iconfont" title="刷新画板">&#xe747;</span>
        </li>
        <li class="bg" id="save">
          <span class="iconfont" title="保存">&#xe69d;</span>
        </li>
      </ul>
    </div>
    <canvas id="canvas" width="1200" height="600"></canvas>
  </div>
</template>
<script>
import "../css/index.css";
import DrawToolbar from "../js/DrawToolbar";
export default {
  name: "toolbar",
  data() {
    return {
      canvas: null,
      ctx: null,
      p: null
    };
  },
  created() {},
  mounted() {
    this.canvas = document.getElementById("canvas");
    if (!this.canvas.getContext) return;
    this.ctx = this.canvas.getContext("2d");
    this.p = new DrawToolbar(this.canvas, this.ctx);
  },
  methods: {
    drawLine() {
      this.p.style = "drawLine";
      this.p.drawing();
    }
  }
};
</script>