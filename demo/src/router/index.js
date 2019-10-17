import Vue from 'vue'
import Router from 'vue-router'
import KLine from '@/components/KLine'
import Toolbar from '@/components/testToolbar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'KLine',
      component: KLine
    },
    {
      path:'/test',
      name: Toolbar,
      component: Toolbar
    }
  ]
})
