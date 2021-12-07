/* eslint-disable */

import axios from 'axios'
import Constant from '@/etc/const'

export default {
  logout (cb, errorCb) {
    axios.get(Constant.LOGOUT).then(response => {
      if(response.data && response.data.rescode === '0000'){
        cb();
      }else{
        errorCb(response.data.rescode);
      }
    }).catch(function (error) {
      console.log(error);
      errorCb(error)
    })
  },
  getOptionList (cb, errorCb) {
    axios.get(Constant.GET_SETTING).then(response => {
      if(response.data && response.data.rescode === '0000'){
        var arr = [];
        var arrAll = [];
        if(response.data.data && response.data.data.List){
          for(let i = 0; i<response.data.data.List.length; i++){
            let item = response.data.data.List[i];
            if(item.Items && item.Items.length){
              item.value = item.Items[0].ListSeqID;
              arr.push(item);
            }
            arrAll.push(item);
          }
        }
        var tempObj = {
          optionList: arr,
          optionListAll: arrAll,
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
  addOption (arg, cb, errorCb) {
    axios.post(Constant.ADD_OPTION,{
      OptionName: arg['name'],
      Type: arg['type'],
      OptionID: arg['id'] || '',
    }).then(response => {
      if(response.data && response.data.rescode === '0000'){
        cb();
      }else{
        errorCb(response.data.rescode);
      }
    }).catch(function (error) {
      console.log(error);
      errorCb(error)
    })
  },
  editOption (arg, cb, errorCb) {
    axios.post(Constant.EDIT_OPTION,{
      OptionName: arg['name'],
      Type: arg['type'],
      OptionID: arg['id'] || '',
      ListSeqID: arg['ListSeqID'] || '',
    }).then(response => {
      if(response.data && response.data.rescode === '0000'){
        cb();
      }else{
        errorCb(response.data.rescode);
      }
    }).catch(function (error) {
      console.log(error);
      errorCb(error)
    })
  },
  deleteOption (arg, cb, errorCb) {
    axios.post(Constant.DELETE_OPTION,{
      Type: arg['type'],
      OptionID: arg['id'] || '',
      ListSeqID: arg['ListSeqID'] || '',
    }).then(response => {
      if(response.data && response.data.rescode === '0000'){
        cb();
      }else{
        errorCb(response.data.rescode);
      }
    }).catch(function (error) {
      console.log(error);
      errorCb(error)
    })
  },
  editMessage (arg, cb, errorCb) {
    axios.post(Constant.UPDATE_MESSAGE,{
      Message: arg['message'],
    }).then(response => {
      if(response.data && response.data.rescode === '0000'){
        cb();
      }else{
        errorCb(response.data.rescode);
      }
    }).catch(function (error) {
      console.log(error);
      errorCb(error)
    })
  },
}