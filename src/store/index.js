import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import main from './modules/main'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    common,
    main,
  },
  strict: false
})
