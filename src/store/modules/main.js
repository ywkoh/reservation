/* eslint-disable */ 
import main from '@/api/main'
import util from '@/etc/util'

var today = new Date();

const state = {
  currDate: today,
  selectedDate: today.getFullYear() + '-' + util.addZero(today.getMonth() + 1) + '-' + util.addZero(today.getDate()),
  todayStr: today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월 ' + today.getDate() + '일',
  currHour: today.getHours(),
  cellList: [],
  resList: [],
  changeLogList: [],
  rowHeight: 40,
  loginData: {
    isLogin: true,
    loginId: '',
    loginName: '',
    loginType: ''
  }
}

// getters
const getters = {
  
}

// actions
const actions = {
  getAllCellList ({ commit, state, dispatch }) {
    let params = {
      selectedDate: state.selectedDate
    }
    main.getCellList(params, data => {
      commit('setCellList', data.cellList);
      commit('setLoginData', data.user);
      dispatch('checkTimeAction', true);
    },
    code => {
      dispatch('commErrorCb', code)
    })
  },
  createCell ({ commit, dispatch }, item) {
    main.createReserv(item, result => {
      dispatch('getAllCellList');
      if(result.rescode == "0000"){
      }
    }, code => {
      dispatch('commErrorCb', code)
    })
  },
  editCell ({ commit, dispatch }, item) {
    main.editReserv(item, result => {
      dispatch('getAllCellList');
    }, code => {
      dispatch('commErrorCb', code)
    })
  },
  deleteCell ({ commit, dispatch }, item) {
    main.deleteReserv(item, result => {
      dispatch('getAllCellList');
    }, code => {
      dispatch('commErrorCb', code)
    })
  },
  getChangeLog ({ commit, dispatch }, item) {
    main.getChangeLog(item, data => {
      commit('setChangeLog', data);
    },
    code => {
      dispatch('commErrorCb', code)
    })
  },
  getResList ({ commit, dispatch }, item) {
    main.getResList(item, data => {
      commit('setResList', data);
    },
    code => {
      dispatch('commErrorCb', code)
    })
  },
  commErrorCb ({ commit, dispatch }, code) {
    if(code == '3333'){
      alert('로그인이 필요합니다.');
      dispatch('resetLoginData');
    }else{
      alert('서버에러가 발생했습니다. 에러코드: ' + code);
    }
  },
  resetLoginData({ commit, state }) {
    commit('setLoginData', {
      isLogin: false,
      loginId: '',
      loginName: '',
      loginType: ''
    });
  },
  checkTimeAction({ commit, state, dispatch}, isFirst) {
    let now = new Date();
    commit('setCurrHour', now);
    let cellList = [...state.cellList];
    let doBell = false;
    let listSeqIDs = '';
    for(let i = 0; i<cellList.length; i++){
      let endDate = new Date( cellList[i].endTimeCd );
      let now = new Date();
      let diff = endDate - now;
      console.log(diff);
      if(diff > 0 && diff <= 600000){
        if(cellList[i].alarm && !cellList[i].checkOut){
          cellList[i].ontime = true;
          console.log('doBell');
          listSeqIDs += doBell ? ',' + cellList[i].idx : cellList[i].idx;
          doBell = true;
        }else{
          console.log('no alarm or checkout');
          cellList[i].ontime = false;
        }
      }else{
        console.log('ontime no');
        cellList[i].ontime = false;
      }
    }
    commit('setCellList', cellList);
    console.log('isFirst : ' + isFirst);
    if(doBell && !isFirst){
      let audio = new Audio('http://localhost:8080/room/src/assets/alarm.mp3');
      audio.play();
      /*let item = {
        ListSeqIDS   : listSeqIDs,
        AlarmYN     : 'N'
      }
      main.changeAlarm(item, result => {
      }, code => {
      })*/
    }
  }
}

// mutations
const mutations = {
  setCellList (state, cellList) {
    state.cellList = cellList
  },
  setLoginData (state, loginData) {
    state.loginData = loginData
  },
  setChangeLog (state, list) {
    state.changeLogList = list
  },
  setResList (state, list) {
    state.resList = list
  },
  setSelectedDate (state, date) {
    state.selectedDate = date.getFullYear() + '-' + util.addZero(date.getMonth() + 1) + '-' + util.addZero(date.getDate())
  },
  setCurrHour (state, date) {
    console.log('setCurrHour', date)
    state.currHour = date.getHours();
  },
  setDate (state, date) {
    state.currDate = date;
    state.selectedDate = date.getFullYear() + '-' + util.addZero(date.getMonth() + 1) + '-' + util.addZero(date.getDate());
    state.todayStr = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일';
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}