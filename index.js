import { Chart, MobileKline, FSMobileKLine, MobileChart, Toolbar } from './src/index'

const kline = {
  install: function (Vue) {
    Vue.component('jKline', Chart);
    // Vue.component('mKline', MobileKline);
    Vue.component('fsmKline', FSMobileKLine);
    Vue.component('mKline', MobileChart);
    Vue.component('toolbar', Toolbar)
  }
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(kline)
}
export default kline