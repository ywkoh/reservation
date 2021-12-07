/* eslint-disable */ 
import common from '@/api/common'
import util from '@/etc/util'

const state = {
  arrDays: ['일', '월', '화', '수', '목', '금', '토'],
  hourList: util.getHourList(),
  minuteList: util.getMinuteList(),
  roomList: util.getRoomList(),
  optionList: [], // 아이템이 있는 옵션
  optionListAll: [], // 모든 옵션 
  showSpinner: false, // 스피너 보이기
}

// getters
const getters = {
  
}

// actions
const actions = {
  logout ({ commit, dispatch }) {
    common.logout(() => {
      location.href = '/room/dist/';
    },
    code => {
      dispatch('main/commErrorCb', code, {root: true})
    })
  },
  getOptionList ({ commit, dispatch }) {
    common.getOptionList(data => {
      commit('setOptionList', data.optionList);
      commit('setOptionListAll', data.optionListAll);
    },
    code => {
      dispatch('main/commErrorCb', code, {root: true})
    })
  },
  addOption ({ commit, dispatch }, param) {
    common.addOption(param, data => {
      dispatch('getOptionList')
    },
    code => {
      dispatch('main/commErrorCb', code, {root: true})
    })
  },
  editOption ({ commit, dispatch }, param) {
    common.editOption(param, data => {
      dispatch('getOptionList')
    },
    code => {
      dispatch('main/commErrorCb', code, {root: true})
    })
  },
  deleteOption ({ commit, dispatch }, param) {
    common.deleteOption(param, () => {
      dispatch('getOptionList')
    },
    code => {
      dispatch('main/commErrorCb', code, {root: true})
    })
  },
  editMessage ({ commit, dispatch }, param) {
    common.editMessage(param, data => {
    },
    code => {
      dispatch('main/commErrorCb', code, {root: true})
    })
  },
}

// mutations
const mutations = {
  setOptionList (state, list) {
    state.optionList = list
  },
  setOptionListAll (state, list) {
    state.optionListAll = list
  },
  setShowSpinner (state, boo) {
    console.log('setShowSpinner', boo)
    state.showSpinner = boo
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}