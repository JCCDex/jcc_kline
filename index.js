import Kline from './src/components/kline.vue'
import MobileKLine from './src/components/mobileKline.vue'

const kline={
  install:function (Vue) {
    Vue.component('jKline', Kline);
    Vue.component('mKline', MobileKLine)
  }
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(kline)
}
export default kline