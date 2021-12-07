/* eslint-disable */
/**
 * Mocking client-server processing
 */

import axios from 'axios'
import Constant from '@/etc/const'
import util from '@/etc/util'

export default {
  // 예약 날짜별 조회
  getCellList (arg, cb, errorCb) {
    axios.get(Constant.GET_RESERV,{
      params: {
        curDate: arg.selectedDate//'2020-05-09'
      }
    }
    ).then(response => {
      if(response.data && response.data.rescode === '0000'){
        var arr = [];
        if(response.data.data && response.data.data.List){
          for(let i = 0; i<response.data.data.List.length; i++){
            let item = response.data.data.List[i];

            let arrCheckInDate = item.CheckInDate.split(' ');
            let arrTime = arrCheckInDate[1];
            let hour = arrTime.split(':')[0];
            let minute = arrTime.split(':')[1];

            let obj = {
              idx: item.ListSeqID,
              name: item.Name,
              phone: item.Phone,
              endTimeCd: item.CheckOutDate,
              checkOut: item.CheckOutYN === 'Y' ? true : false,
              options: item.Options,
              date: {
                name: item.CheckInDate.split(' ')[0]
              },
              room: {
                name: item.RoomNo,
                no: item.RoomNo
              },
              hour: {
                name: hour > 12 ? '오후 ' + hour + '시' : '오전 ' + hour + '시',
                idx: hour
              },
              minute: {
                name: minute + '분',
                idx: minute
              },
              time: {
                name: util.timeConvert(item.TotalMinute),
                idx: parseInt(item.TotalMinute, 10)
              },
              memo: item.Comment,
              alarm: item.AlarmYN && item.AlarmYN === 'Y' ? true : false
            }
            arr.push(obj);
          }
        }
        var tempObj = {
          cellList: arr,
          user: response.data.user
        }
        cb(tempObj);
      }else{
        errorCb(response.data.rescode);
      }
    }).catch(function (error) {
      console.log(error);
      errorCb(error)
    })
  },
  getChangeLog (arg, cb, errorCb) {
    axios.get(Constant.GET_CHANGE_LOG, {
      params: {
        ResID: arg.idx
      }
    }).then(response => {
      if(response.data && response.data.rescode === '0000'){
        var arr = [];
        if(response.data.data && response.data.data.List){
          for(let i = 0; i<response.data.data.List.length; i++){
            let item = response.data.data.List[i];
            arr.push(item);
          }
        }
        cb(arr);
      }else{
        errorCb(response.data.rescode);
      }
    }).catch(function (error) {
      console.log(error);
      errorCb(error)
    })
  },
  // 예약 기간별 조회
  getResList (arg, cb, errorCb) {
    axios.get(Constant.GET_RESERV, {
      params: {
        type: arg.type,
        toDate: arg.toDate,
        fromDate: arg.fromDate
      }
    }).then(response => {
      if(response.data && response.data.rescode === '0000'){
        var arr = [];
        if(response.data.data && response.data.data.List){
          for(let i = 0; i<response.data.data.List.length; i++){
            let item = response.data.data.List[i];
            arr.push(item);
          }
        }
        cb(arr);
      }else{
        errorCb(response.data.rescode);
      }
    }).catch(function (error) {
      console.log(error);
      errorCb(error)
    })
  },
  createReserv (arg, cb, errorCb) {
    axios.post(Constant.CREATE_RESERV,{
        Name        : arg['Name'],
        Phone       : arg['Phone'],
        Comment     : arg['Comment'],
        RoomNo      : arg['RoomNo'],
        CheckInDate : arg['CheckInDate'],
        CheckOutDate: arg['CheckOutDate'],
        TotalMinute : arg['TotalMinute'],
        Options     : arg['Options'],
        OptionNames : arg['OptionNames'],
        AlarmYN     : arg['AlarmYN']
    }).then(response => {
      if(response.data && response.data.rescode === '0000'){
        cb(response.data);
      }else{
        errorCb(response.data.rescode)
      }
    }).catch(function (error) {
      console.log(error);
      errorCb(error)
    })
  },
  editReserv (arg, cb, errorCb) {
    axios.post(Constant.EDIT_RESERV,{
        ListSeqID   : arg['ListSeqID'],
        Name        : arg['Name'],
        Phone       : arg['Phone'],
        Comment     : arg['Comment'],
        RoomNo      : arg['RoomNo'],
        CheckInDate : arg['CheckInDate'],
        CheckOutDate: arg['CheckOutDate'],
        TotalMinute : arg['TotalMinute'],
        CheckOutYN  : arg['CheckOutYN'],
        CheckOutNow : arg['CheckOutNow'],
        Options     : arg['Options'],
        OptionNames : arg['OptionNames'],
        AlarmYN     : arg['AlarmYN']
    }).then(response => {
      if(response.data && response.data.rescode === '0000'){
        cb(response.data);
      }else{
        errorCb(response.data.rescode)
      }
    })
  },
  deleteReserv (arg, cb, errorCb) {
    axios.post(Constant.DELETE_RESERV,{
        ListSeqID: arg['ListSeqID'],
    }).then(response => {
      if(response.data && response.data.rescode === '0000'){
        cb(response.data);
      }else{
        errorCb(response.data.rescode)
      }
    }).catch(function (error) {
      console.log(error);
      errorCb(error)
    })
  },
  changeAlarm (arg, cb, errorCb) {
    axios.post(Constant.CHANGE_ALARM,{
        ListSeqIDS   : arg['ListSeqIDS'],
        AlarmYN     : arg['AlarmYN']
    }).then(response => {
      if(response.data && response.data.rescode === '0000'){
        cb(response.data);
      }else{
        errorCb(response.data.rescode)
      }
    })
  }
}