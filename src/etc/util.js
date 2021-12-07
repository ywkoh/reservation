export default {
  addZero (num) {
    let str = num + ''
    return str.length < 2 ? '0' + str : str
  },
  getMinuteList() {
    var arr = [];
    for(var i = 0; i< 60; i++) {
      var obj = {
        idx: i,
        name: i + '분'
      }
      arr.push(obj);
    }
    return arr;
  },
  getHourList() {
    var arr = [];
    for(var i = 0; i<24; i++){
      var obj = {
        idx: i,
        name: i <= 12 ? '오전 ' + i + '시' : '오후 ' + (i - 12) + '시',
      }
      arr.push(obj);
    }
    return arr;
  },
  getRoomList() {
    var arr = [];
    for(var i = 1; i<=18; i++){
      var obj = {
        no: '1' + this.addZero(i),
        name: '1' + this.addZero(i)
      }
      arr.push(obj);
    }
    return arr;
  },
  getHourObj(time) {
    var i = time.getHours();
    var obj = {
      idx: i,
      name: i <= 12 ? '오전 ' + i + '시' : '오후 ' + (i - 12) + '시'
    }
    return obj;
  },
  getMinObj(time) {
    var i = time.getMinutes();
    var obj = {
      idx: i,
      name: i + '분'
    }
    return obj;
  },
  getDateObj(time) {
    return { name: time.getFullYear() + '-' + this.addZero(time.getMonth() + 1) + '-' + this.addZero(time.getDate()) };
  },
  getEndDate(time, type) {
    if(type === 'cd'){
      return time.getFullYear() + '-' + this.addZero(time.getMonth() + 1) + '-' + this.addZero(time.getDate()) + ' ' + this.addZero(time.getHours()) + ':' + this.addZero(time.getMinutes()) + ':00';
    }
    return time.getFullYear() + '-' + this.addZero(time.getMonth() + 1) + '-' + this.addZero(time.getDate()) + ' ' + (time.getHours() == 12 ? '오후 ' + time.getHours() + '시 ' : time.getHours() > 12 ? '오후 ' + ( time.getHours() - 12 ) + '시 ' : '오전 ' + time.getHours() + '시 ') + time.getMinutes() + '분';
  },
  copyObj(obj) {
    var copy = {};
    if (Array.isArray(obj)) {
      copy = obj.slice().map((v) => {
        return copyObj(v);
      });
    } else if (typeof obj === 'object' && obj !== null) {
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = copyObj(obj[attr]);
        }
      }
    } else {
      copy = obj;
    }
    return copy;
  },
  timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return (rhours ? rhours + "시간 " : "") + (rhours && !rminutes ? "" : rminutes + "분");
  },
  maskPhone(value) {
    if(!value)  return;
    var arr = value.split('-');
    arr[1] = '****';
    return arr.join('-');
  },
  getItemName(list, value){
    var result = ''
    for(var i = 0; i<list.length; i++) {
      if(list[i].ListSeqID == value){
        result = list[i].Name;
        break;
      }
    }
    return result
  },
  getNextDate(date, n){
    let day = date || new Date()
    let nextDay = new Date(day)
    nextDay.setDate(day.getDate() + (n || 1))
    return nextDay
  }
}
