<template>
  <div class="setting popup">
        <div class="popup_header">
            <h3>설정</h3>
            <button class="btn_close" @click="closePopup()"></button>
        </div>
        <div class="popup_body column">
          <div class="row_wrap">
            <p class="title">옵션 등록/수정/삭제</p>
            <div class="options_wrap">
              <div class="option_area">
                <ul>
                    <li v-for="(item, index) in commonData.optionListAll" :key="item.ListSeqID">
                      <input type="radio" name="option_rg" :id="'rb_' + index" v-model="currentOptionID" :value="item.ListSeqID" @change="clickOption(item)"/>
                      <label :for="'rb_' + index"><p>{{item.OptionName}}</p></label>
                    </li>
                </ul>
              </div>
              <div class="change_area">
                  <div class="edit_wrap">
                    <input type="text" v-model="currentOption.OptionName"><button class="btn_primary" @click="editOption()">수정</button>
                  </div>
                  <div class="edit_wrap">
                    <input type="text" v-model="optionNewName"><button class="btn_primary" @click="addOption()">등록</button>
                  </div>
                  <button class="btn_delete btn_secondary" @click="deleteOption()">삭제</button>
                </div>
            </div>

            <div class="options_wrap">
              <div class="option_area">
                <ul>
                    <li v-for="(item, index) in currentOption.Items" :key="item.ListSeqID">
                      <input type="radio" name="item_rg" :id="'rbi_' + index" v-model="currentItemID" :value="item.ListSeqID" @change="clickItem(item)"/>
                      <label :for="'rbi_' + index"><p>{{item.Name}}</p></label>
                    </li>
                </ul>
              </div>

              <div class="change_area item">
                  <div class="edit_wrap">
                    <input type="text" v-model="currentItem.Name"><button class="btn_primary" @click="editItem()">수정</button>
                  </div>
                  <div class="edit_wrap">
                    <input type="text" v-model="itemNewName"><button class="btn_primary" @click="addItem()">등록</button>
                  </div>
                  <button class="btn_delete btn_secondary" @click="deleteItem()">삭제</button>
                </div>
              
            </div>
            
          </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */ 
import { mapState, mapActions } from 'vuex'
import util from '@/etc/util'

export default {
    computed: {
        ...mapState({
            commonData: state => state.common,
            mainData: state => state.main
        })
    },
    created () {
        
    },
    data(){
        return {
            currentOption: {},
            currentItem: {},
            currentOptionID: null,
            currentItemID: null,
            optionNewName: '',
            itemNewName: '',
        }
    },
    methods: {
        resetData() {
          this.currentOption = {};
          this.currentItem = {};
          this.currentOptionID = null;
          this.currentItemID = null;
          this.optionNewName = '';
          this.itemNewName = '';
        },
        clickOption(item) {
          this.currentOption = item;
          this.itemNewName = '';
          this.currentItem = {};
        },
        clickItem(item) {
          this.currentItem = item;
        },
        closePopup() {
          this.resetData();
          this.$emit('closeUpdate');
        },
        addOption() {
          if(!this.optionNewName){
            alert('옵션명을 입력해주세요.');
            return;
          }
          let obj = {name: this.optionNewName, type: 'P'};
          this.$store.commit('common/setShowSpinner', true);
          this.$store.dispatch('common/addOption', obj).then(() => {
            this.resetData();
            this.$store.commit('common/setShowSpinner', false);
          });
        },
        editOption() {
          if(!this.currentOption.ListSeqID){
            alert('수정할 옵션을 선택해 주세요.');
            return;
          }
          if(!this.currentOption.OptionName){
            alert('옵션명을 입력해주세요.');
            return;
          }
          let obj = {name: this.currentOption.OptionName, id: this.currentOption.ListSeqID, type: 'P'};
          this.$store.commit('common/setShowSpinner', true);
          this.$store.dispatch('common/editOption', obj).then(() => {
            this.resetData();
            this.$store.commit('common/setShowSpinner', false);
          });
        },
        deleteOption() {
          if(!this.currentOption.ListSeqID){
            alert('삭제할 옵션을 선택해 주세요.');
            return;
          }
          if(confirm('정말 삭제하시겠습니까?')){
            this.$store.commit('common/setShowSpinner', true);
            let obj = {id: this.currentOption.ListSeqID, type: 'P'};
            this.$store.dispatch('common/deleteOption', obj).then(() => {
              this.resetData();
              this.$store.commit('common/setShowSpinner', false);
            });
          }
        },
        addItem() {
          if(!this.currentOption.ListSeqID){
            alert('옵션을 선택해주세요.');
            return;
          }
          if(!this.itemNewName){
            alert('아이템명을 입력해주세요.');
            return;
          }
          this.$store.commit('common/setShowSpinner', true);
          let obj = {name: this.itemNewName, type:'C', id: this.currentOption.ListSeqID};
          this.$store.dispatch('common/addOption', obj).then(() => {
            this.resetData()
            this.$store.commit('common/setShowSpinner', false);
          });
        },
        editItem() {
          if(!this.currentItem.ListSeqID){
            alert('수정할 아이템을 선택해 주세요.');
            return;
          }
          if(!this.currentItem.Name){
            alert('아이템명을 입력해주세요.');
            return;
          }
          this.$store.commit('common/setShowSpinner', true);
          let obj = {name: this.currentItem.Name, type:'C', id: this.currentItem.OptionID, ListSeqID: this.currentItem.ListSeqID};
          this.$store.dispatch('common/editOption', obj).then(() => {
            this.resetData()
            this.$store.commit('common/setShowSpinner', false);
          });
        },
        deleteItem() {
          if(!this.currentItem.ListSeqID){
            alert('삭제할 아이템을 선택해 주세요.');
            return;
          }
          if(confirm('정말 삭제하시겠습니까?')){
            this.$store.commit('common/setShowSpinner', true);
            let obj = {id: this.currentOption.ListSeqID, type: 'C', ListSeqID: this.currentItem.ListSeqID};
            this.$store.dispatch('common/deleteOption', obj).then(() => {
              this.resetData();
              this.$store.commit('common/setShowSpinner', false);
            });
          }
        },
    }
}
</script>
<style scoped>
.popup_body.column{
  height: 406px;
}
.popup_body .options_wrap {
  position:relative;
  width: 180px;
  padding: 0 20px 0 0;
  float: left;
}
.popup_body .option_area {
  float: left;
  width: 180px;
}
.popup_body .btn_delete{
  width: 50px;
  position: absolute;
  right: 32px;
  top: -300px;
}
.popup_body .item_area{
  float: left;
}
.option_area{
  border: 1px solid #333;
  height: 260px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 5px;
}
.popup_body .title{
  line-height: 30px;
  margin-bottom: 10px;
  margin-top: -10px;
}
.popup_body .options_wrap ul li {
  padding: 10px 0 5px 10px;
  border-bottom: 1px solid #e5e5e5;
  height: 30px;
}
.options_wrap label p{
  font-size: 15px;
  clear: both;
  line-height: 22px;
}
.change_wrap{
  position: absolute;
  top: 262px;
}
.change_area{
  position: relative;
  float: left;
  width: 214px;
  margin-right: 100px;
}
.edit_wrap{
  margin-top:10px
}
.edit_wrap > input[type=text]{
  width: 127px;
  margin-right: 5px;
}
.edit_wrap .btn_primary{
  width: 50px
}
.msg_area{
  width: 100%;
  margin-bottom: 10px;
}
.msg_area > textarea{
  width: 100%;
}
.row_wrap.msg .btn_primary{
  float: right;
  width: 80px;
}
</style>