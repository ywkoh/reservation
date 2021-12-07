
var devParam = location.host.indexOf('localhost:8081') > -1 ? '?dev_yn=y' : '';
var domain = 'http://localhost:8080';
var Constant = {
  GET_RESERV: domain + '/server/get_reserv.php' + devParam,
  CREATE_RESERV: domain + '/server/create_reserv.php' + devParam,
  EDIT_RESERV: domain + '/server/edit_reserv.php' + devParam,
  DELETE_RESERV: domain + '/server/delete_reserv.php' + devParam,
  LOGOUT: domain + '/server/logout.php' + devParam,
  GET_CHANGE_LOG: domain + '/server/get_changelog.php' + devParam,
  CHANGE_ALARM: domain + '/server/change_alarm.php' + devParam,

  ADD_OPTION: domain + '/server/add_option.php' + devParam,
  EDIT_OPTION: domain + '/server/edit_option.php' + devParam,
  DELETE_OPTION: domain + '/server/delete_option.php' + devParam,
  GET_SETTING: domain + '/server/get_setting.php' + devParam,
}
export default Constant
