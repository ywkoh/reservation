<template>
  <section class="app_header">
    <h2>Book and Rest Private Room</h2>
    <a class="btn_logout" @click="goLogin()">{{mainData.loginData.isLogin ? '로그아웃' : '로그인'}}</a>
    <p class="admin_name">{{mainData.loginData.loginName}}</p>
  </section>
</template>
<script>
/* eslint-disable */ 
import { mapState, mapActions } from 'vuex'

export default {
    computed: mapState({
      mainData: state => state.main,
      commonData: state => state.common
    }),
    methods: {
      goLogin() {
        if(this.mainData.loginData.isLogin){
          // 로그아웃
          this.$store.dispatch('common/logout');
        }else{
          location.href = '/general/html/login.html';
        }
      }
    }
}
</script>
<style scoped>
.app_header{
    position: relative;
    height: 40px;
    background:#EC6700;
    color: #fff;
}
.app_header h2{
  line-height: 40px;
  text-indent: 20px;
  font-size: 16px;
}
.admin_name{
  position:absolute;
  right: 80px;
  top:10px;
  font-size: 15px;
  line-height: 20px;
  color: #fff;
}
.btn_logout{
  position:absolute;
  top:10px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  line-height: 20px;
}
</style>
