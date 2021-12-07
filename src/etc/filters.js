export function dispTime (value) {
    if(!value)  return;
    var strTime = '';
  var arr = value.split(' ')[1].split(':');
  var intHour = parseInt(arr[0]);
  if(intHour == 12) {
      strTime += '오후 ' + intHour + '시 ';
  }else if(intHour > 12) {
      strTime += '오후 ' + ( intHour - 12 ) + '시 ';
  }else{
      strTime += '오전 ' + intHour + '시 ';
  }
  return value.split(' ')[0] + ' ' + strTime + ' ' + parseInt(arr[1]) + '분';
}

export function maskPhone( value ) {
  if(!value) return
  var arr = value.split('-')
  arr[1] = '****'
  return arr.join('-')
}
