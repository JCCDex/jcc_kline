import { Chart, FSMobileChart, MobileChart } from './src/index'

const kline = {
  install: function (Vue) {
    Vue.component('jKline', Chart);
    Vue.component('fsmKline', FSMobileChart);
    Vue.component('mKline', MobileChart);
  }
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(kline)
}
export default kline