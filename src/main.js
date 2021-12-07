// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */ 
import Vue from 'vue'
import App from './App'
import router from './router'
import './css/common.css'
import './css/datepicker.css'
import store from './store'
import {Datepicker, Timepicker} from '@livelybone/vue-datepicker';
import * as filters from './etc/filters'

Vue.config.productionTip = false
Vue.component('datepicker', Datepicker);
Vue.component('timepicker', Timepicker);

Object.keys(filters).forEach(function(key) {
  Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
