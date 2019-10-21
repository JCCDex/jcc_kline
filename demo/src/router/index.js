import Vue from 'vue'
import Router from 'vue-router'
import KLine from '@/components/KLine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'KLine',
      component: KLine
    }
  ]
})
