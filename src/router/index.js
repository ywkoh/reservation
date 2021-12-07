import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import TimeGrid from '@/components/TimeGrid'

Vue.use(Router)
Vue.use(Vuex)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TimeGrid',
      component: TimeGrid
    }
  ]
})
