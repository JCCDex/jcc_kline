import { Chart, MobileKline, FSMobileKLine } from './src/index'

const kline={
  install:function (Vue) {
    Vue.component('jKline', Chart);
    Vue.component('mKline', MobileKline);
    Vue.component('fsmKline', FSMobileKLine);
  }
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(kline)
}
export default kline