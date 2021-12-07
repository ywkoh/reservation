<template>
    <div class="edit popup">
        <div class="popup_header">
            <h3>{{selectedItem.title}}</h3>
            <button class="btn_close" @click="closePopup()"></button>
        </div>
        <div class="popup_body">
            <div class="right_area">
                <div class="row_wrap">
                    <div class="form_wrap" style="width: 50%">
                        <label class="number">번호</label>
                        <div class="select_wrap">
                            <button class="selected" @click="clickRoomSelect()">
                                <div>{{selectedItem.room.name}}</div>
                            </button>
                            <div class="dropdown_wrap" v-show="openRoomSelect" style="width: 169px; height: 220px">
                                <ul class="dropdown scroll" style="width: 169px">
                                    <li v-for="item in commonData.roomList" :key="item.no" @click="selectRoomItem(item)" :class="{on: item.no == selectedItem.room.no}">{{item.name}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="form_wrap" style="width: 50%">
                        <label for="alarm" class="number">십분전알림</label>
                        <input id="alarm" type="checkbox" v-model="selectedItem.alarm" style="width: 30px;height: 30px;"/>
                    </div>
                </div>
                <div class="row_wrap">
                    <div class="form_wrap" style="width: 50%">
                        <label for="editName">이름</label>
                        <input id="editName" v-model="selectedItem.name" type="text" maxlength="20" placeholder="이름을 입력해주세요."/>
                    </div>
                    <div class="form_wrap" style="width: 50%">
                        <label for="editPhone">전화번호</label>
                        <input id="editPhone" v-model="selectedItem.phone" type="text" maxlength="20" placeholder="전화번호를 입력해주세요."/>
                    </div>
                </div>
                <div class="row_wrap">
                    <div class="form_wrap" style="width: 50%">
                        <label class="number">입실날짜</label>
                        <datepicker :value="selectedItem.date.name" @input="datePickerLog" min="2020-04-01" max="2030-01-01" :dayStr="dayStr" :popperProps="dateProps"/>
                    </div>
                    <div class="form_wrap" style="width: 50%">
                        <label class="number">입실시간</label>
                        <div class="select_wrap">
                            <button class="selected" @click="clickHourSelect()">
                                <div>{{selectedItem.hour.name}} {{selectedItem.minute.name}}</div>
                            </button>
                            <div class="dropdown_wrap" v-show="openHourSelect">
                                <ul class="dropdown scroll" style="width:100px;height: 182px;">
                                    <li v-for="item in commonData.hourList" :key="item.idx" @click="selectHourItem(item)" :class="{on: item.idx == selectedItem.hour.idx}">{{item.name}}</li>
                                </ul>
                                <ul class="dropdown scroll" style="left: 100px;width: 69px;height: 182px;">
                                    <li v-for="item in commonData.minuteList" :key="item.idx" @click="selectMinuteItem(item)" :class="{on: item.idx == selectedItem.minute.idx}">{{item.name}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row_wrap">
                    <div class="form_wrap" style="width: 100%">
                        <label class="number">예약시간</label>
                        <div class="time_wrap">
                            <button class="btn_plus hour" @click="changeMinute(60)">+</button>
                            <button class="btn_minus hour" @click="changeMinute(-60)">-</button>
                            <button class="btn_plus minute" @click="changeMinute(10)">+</button>
                            <button class="btn_minus minute" @click="changeMinute(-10)">-</button>
                            <div class="result_time">{{selectedItem.time.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="row_wrap">
                    <div class="form_wrap" style="width: 50%">
                        <label>퇴실예정시간</label>
                        <p class="plain">{{selectedItem.endTimeCd | dispTime}}</p>
                    </div>
                    <div class="form_wrap" style="width: 50%">
                        <label for="checkOut" class="number">퇴실</label>
                        <input id="checkOut" type="checkbox" v-model="selectedItem.checkOut" style="width: 30px;height: 30px;"/>
                        <input id="checkOutNow" type="checkbox" v-model="selectedItem.checkOutNow" style="width: 30px;height: 30px;"/>
                        <span class="checkout_now">(현재시간으로 퇴실)</span>
                    </div>
                </div>
                <!-- options -->
                <div class="row_wrap options" v-for="(option, index) in commonData.optionList" :key="option.ListSeqID" :class="{bdt: index == 0}">
                    <div class="form_wrap">
                        <label class="number">{{option.OptionName}}</label>
                        <select v-model="option.value">
                        <option v-for="item in option.Items" :key="item.ListSeqID" :value="item.ListSeqID">{{item.Name}}</option>
                        </select>
                    </div>
                </div>
                <!--// options -->

                <div class="row_wrap">
                    <div class="form_wrap memo">
                        <label for="createMemo">메모</label>
                        <textarea id="createMemo" v-model="selectedItem.memo" type="text" maxlength="500" placeholder="메모를 입력해주세요."/>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup_footer">
            <button class="btn_delete btn_secondary" @click="deleteOrder()">삭제</button>
            <button class="btn_create btn_primary" @click="editOrder()">수정</button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */ 
import { mapState, mapActions } from 'vuex'
import {Datepicker} from '@livelybone/vue-datepicker';
import util from '@/etc/util'

export default {
    props: ['selectedItem'],
    computed: {
        ...mapState({
            commonData: state => state.common,
            mainData: state => state.main
        })
    },
    components:{Datepicker},
    created () {
        window.addEventListener('click', this.handleClick);
        window.addEventListener('optionLoaded', this.setOptions);
    },
    data(){
        return {
            openRoomSelect: false,
            openHourSelect: false,
            openTimeSelect: false,

            dayStr: this.$store.state.common.arrDays,
            dateProps: {
                popperOptions: {
                    modifiers: {
                        preventOverflow: {
                            padding: 20
                        }
                    }
                }
            }
        }
    },
    methods: {
        setOptions() {
            setTimeout(this.setOptionVal, 300);
        },
        setOptionVal() {
            var arr = [];
            var arrTemp = [];
            this.optionList = [];
            if(this.selectedItem.options && this.selectedItem.options.length){
                arr = this.selectedItem.options.split('|');
                for(var i = 0; i<arr.length; i++){
                    var obj = {
                        option: arr[i].split(',')[0],
                        item: arr[i].split(',')[1]
                    };
                    arrTemp.push(obj);
                }
            }
            for(var i = 0; i<this.commonData.optionList.length; i++){
                var option = this.commonData.optionList[i];
                for(var j = 0; j<arrTemp.length; j++){
                    if(option.ListSeqID === arrTemp[j].option){
                        for(var h = 0; h<option.Items.length; h++){
                            if(option.Items[h].ListSeqID === arrTemp[j].item){
                                option.value = arrTemp[j].item;
                                break;
                            }
                        }
                    }
                }
            }
        },
        handleClick(event) {
            let dropdown = event.target.closest('.select_wrap');
            //console.log(dropdown); 
            if(dropdown){
                return;
            }
            this.closeDropdown();
        },
        selectRoomItem(item) {
            this.selectedItem.room = item;
            this.openRoomSelect = false;
            //console.log('선택한 방번호: ' + this.selectedItem.room.no);
        },
        clickRoomSelect() {
            let flag = !this.openRoomSelect;
            this.closeDropdown();
            this.openRoomSelect = flag;
        },
        selectHourItem(item) {
            this.selectedItem.hour = item;
            //console.log('선택한 시작 시간: ' + this.selectedItem.hour.idx);
            this.calcEndDate();
        },
        clickHourSelect() {
            let flag = !this.openHourSelect;
            this.closeDropdown();
            this.openHourSelect = flag;
        },
        selectMinuteItem(item) {
            this.selectedItem.minute = item;
            //console.log('선택한 분: ' + this.selectedItem.minute.idx);
            this.calcEndDate();
        },
        closePopup() {
            this.$emit('closeUpdate');
        },
        editOrder() {
            if(!this.selectedItem.room.no){
                alert('방 번호를 선택하세요.');
                return;
            }
            if(!this.selectedItem.name){
                alert('이름을 입력하세요.');
                return;
            }
            if(!this.selectedItem.phone){
                alert('전화번호를 입력하세요.');
                return;
            }
            let strOpt = '';
            let strOptName = '';
            for(let i = 0; i<this.commonData.optionList.length; i++){
                strOpt += ( i > 0 ? '|' : '' ) + this.commonData.optionList[i].ListSeqID + ',' + this.commonData.optionList[i].value;
                strOptName += ( i > 0 ? '|' : '' ) + this.commonData.optionList[i].OptionName + ':' + util.getItemName(this.commonData.optionList[i].Items, this.commonData.optionList[i].value);
            }
            // api 호출
            let obj = {
                ListSeqID   : this.selectedItem.idx,
                Name        : this.selectedItem.name,
                Phone       : this.selectedItem.phone,
                Comment     : this.selectedItem.memo,
                RoomNo      : this.selectedItem.room.no,
                CheckInDate : this.selectedItem.date.name + ' ' + this.selectedItem.hour.idx + ':' + this.selectedItem.minute.idx + ':00',
                CheckOutDate: this.selectedItem.endTimeCd,
                TotalMinute : this.selectedItem.time.idx,
                CheckOutYN  : this.selectedItem.checkOut ? 'Y' : 'N',
                Options     : strOpt,
                OptionNames : strOptName,
                AlarmYN     : this.selectedItem.alarm ? 'Y' : 'N',
                CheckOutNow : this.selectedItem.checkOutNow ? 'Y' : 'N',
            }
            this.$store.commit('common/setShowSpinner', true);

            // 퇴실 프로세스
            //if(this.selectedItem.checkOut){
                this.$store.dispatch('main/editCell', obj).then((data) => {
                    console.log('editCell success ' , data);
                    this.$store.commit('common/setShowSpinner', false);
                });
                this.closePopup();
                //return;
            //}
        },
        datePickerLog(val) {
            this.selectedItem.date.name = val;
            this.calcEndDate();
        },
        calcEndDate() {
            let arr = this.selectedItem.date.name.split('-');
            let endTime = new Date(arr[0], parseInt(arr[1], 10) - 1, arr[2], util.addZero(this.selectedItem.hour.idx), util.addZero(this.selectedItem.minute.idx), '00');

            endTime.setMinutes(endTime.getMinutes()+this.selectedItem.time.idx);
            this.selectedItem.endTimeCd = endTime.getFullYear() + '-' + util.addZero(endTime.getMonth() + 1) + '-' + util.addZero(endTime.getDate()) + ' ' + util.addZero(endTime.getHours()) + ':' + util.addZero(endTime.getMinutes()) + ':00';
        },
        deleteOrder() {
            if(confirm('정말 삭제하시겠습니까?')){
                let obj = {
                    ListSeqID: this.selectedItem.idx,
                }
                this.$store.commit('common/setShowSpinner', true);
                this.$store.dispatch('main/deleteCell', obj).then(() => {
                    this.$store.commit('common/setShowSpinner', false);
                });
                this.closePopup();
            }
        },
        closeDropdown() {
            this.openRoomSelect = false;
            this.openHourSelect = false;
            this.openTimeSelect = false;
        },
        changeMinute(val) {
            if(val === -10){
                if(this.selectedItem.time.idx < 10){
                    return;
                }
            }
            if(val === -60){
                if(this.selectedItem.time.idx < 60){
                    return;
                }
            }
            this.selectedItem.time.idx += val;
            this.selectedItem.time.name = util.timeConvert(this.selectedItem.time.idx);
            this.calcEndDate();
        }
    }
}
</script>
<style scoped>
    .checkout_now{
        position:absolute;
        top: 5px;
        padding-left: 10px;
    }
</style>