<template>
<div>
    <commHeader />
    <section class="app_body">
        <div class="control_wrap">
            <button class="prev" @click="goPrevDate()"></button>
            <div class="date_control">{{mainData.todayStr}}</div>
            <button class="next" @click="goNextDate()"></button>
        </div>
        <button class="btn_setting" v-if="mainData.loginData.isLogin" @click="openSettingPopup()">설정</button>
        <button class="btn_create btn_primary" v-if="mainData.loginData.isLogin" @click="openRegistPopup()">생성</button>
        <button class="btn_search btn_secondary" v-if="mainData.loginData.isLogin && mainData.loginData.loginType == 'S'" @click="openResListPopup()">조회</button>
        <div class="grid_wrap">
            <div class="left_wrap">
                <span class="top cell"></span>
                <span class="room cell" v-for="item in commonData.roomList" :key="item.no">{{item.name}}</span>
            </div>
            <div class="bg_outer">
                <div class="bg_wrap">
                    <div class="header">
                        <span class="cell" v-for="item in commonData.hourList" :key="item.idx">{{item.name}}</span>
                    </div>
                    <div class="row" v-for="(item2, index) in commonData.roomList" :key="item2.no" :class="{'even': index%2 == 0}">
                        <span class="cell" v-for="(item3, index3) in commonData.hourList" :key="item3.idx" :class="{'on': index3 == mainData.currHour}" @click="mainData.loginData.isLogin &&  clickCell(item2)"></span>
                    </div>
                    <div class="item_wrap" v-for="item in mainData.cellList" :key="item.idx" :style="getCellStyle(item)" 
                        :class="{'checkout': item.checkOut}">
                        <button class="btn_log" @click="mainData.loginData.isLogin && openLogPopup(item)">L</button>
                        <button class="item" @click="mainData.loginData.isLogin && openEditPopup(item)" :class="{'ontime': item.ontime}">
                            <span class="name">{{item.name}}</span>
                            <span class="phone" v-if="mainData.loginData.loginType == 'S'">{{item.phone}}</span>
                            <span class="phone" v-else>{{item.phone | maskPhone}}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="curr_time"></div>
        </div>
    </section>
    <commFooter />
    <div class="dimmed" v-show="showDimmed"></div>
    <div class="spinner_wrap" v-show="commonData.showSpinner"><span class="spinner"></span></div>
    <registPopup :selectedItem="selectedItem" v-show="showRegistPopup" @closeUpdate="closeRegistPopup" />
    <editPopup :selectedItem="selectedItem" v-show="showEditPopup" @closeUpdate="closeEditPopup" />
    <changeLogPopup v-show="showLogPopup" @closeUpdate="closeLogPopup" />
    <settingPopup v-show="showSettingPopup" @closeUpdate="closeSettingPopup" />
    <resListPopup v-show="showResListPopup" @closeUpdate="closeResListPopup" />
</div>
</template>

<script>
/* eslint-disable */
import commHeader from '@/components/CommHeader'
import commFooter from '@/components/CommFooter'
import registPopup from '@/components/RegistPopup'
import editPopup from '@/components/EditPopup'
import settingPopup from '@/components/SettingPopup'
import changeLogPopup from '@/components/ChangeLogPopup'
import resListPopup from '@/components/ResListPopup'
import { mapState } from 'vuex'
import util from '@/etc/util'

export default {
    components: {
    commHeader,
    commFooter,
    registPopup,
    editPopup,
    settingPopup,
    changeLogPopup,
    resListPopup
    },
    computed: mapState({
    mainData: state => state.main,
    commonData: state => state.common
    }),
    name: 'TimeGrid',
    data () {
    return {
        showRegistPopup : false,
        showEditPopup   : false,
        showSettingPopup: false,
        showLogPopup    : false,
        showResListPopup: false,
        showDimmed      : false,
        selectedItem: {
            room        : {name: '선택하세요', no: 0},
            hour        : {idx: 0, name: ''},
            minute      : {idx: 0, name: ''},
            date        : {idx: 0, name: ''},
            time        : {name: '1시간', idx: 60},
            title       : "등록하기",
            name        : '',
            phone       : '',
            memo        : '',
            endTimeCd   : '',
            options     : '',
            alarm       : true,
        }
    }
    },
    created () {
        this.$store.commit('common/setShowSpinner', true);
        this.$store.dispatch('main/getAllCellList', true).then(() => {
            this.$store.commit('common/setShowSpinner', false);
        });
        setInterval(() => {
            this.$store.dispatch('main/checkTimeAction');
        }, 60000);
    },
    methods: {
        clickCell(item) {
            this.openRegistPopup(item);
        },
        openRegistPopup(roomItem) {
            let tDate = new Date();
            tDate.setMinutes(tDate.getMinutes() + 5);
            let nDate = new Date();
            nDate.setMinutes(nDate.getMinutes() + 65);
            this.selectedItem = {
                room        : roomItem ? roomItem : {name: '선택하세요', no: 0},
                hour        : util.getHourObj(tDate),
                minute      : util.getMinObj(tDate),
                date        : util.getDateObj(tDate),
                time        : {name: '1시간', idx: 60},
                title       : "등록하기",
                name        : '',
                phone       : '',
                memo        : '',
                endTimeCd   : util.getEndDate(nDate, 'cd'),
                alarm       : true,
            }
            this.showRegistPopup = true;
            this.showDimmed = true;
            this.$store.dispatch('common/getOptionList').then(() => {
                let event = new Event('optionLoaded');
                dispatchEvent(event);
            });
            document.body.classList.add('noscroll');
        },
        closeRegistPopup() {
            this.showRegistPopup = false;
            this.showDimmed = false;
            document.body.classList.remove('noscroll');
        },
        openEditPopup(item) {
            this.selectedItem = {
                idx         : item.idx,
                room        : item.room,
                hour        : item.hour,
                minute      : item.minute,
                date        : item.date,
                time        : item.time,
                title       : "수정하기",
                name        : item.name,
                phone       : item.phone,
                memo        : item.memo,
                endTimeCd   : item.endTimeCd,
                options     : item.options,
                checkOut    : item.checkOut,
                alarm       : item.alarm,
            }
            this.showEditPopup = true;
            this.showDimmed = true;
            this.$store.dispatch('common/getOptionList').then(() => {
                let event = new Event('optionLoaded');
                dispatchEvent(event);
            });
            document.body.classList.add('noscroll');
        },
        closeEditPopup() {
            this.showEditPopup = false;
            this.showDimmed = false;
            document.body.classList.remove('noscroll');
        },
        openLogPopup(item) {
            console.log('logPop');
            console.log(item.idx)
            this.showLogPopup = true;
            this.showDimmed = true;
            this.$store.dispatch('main/getChangeLog', item).then(() => {

            });
            document.body.classList.add('noscroll');
        },
        closeLogPopup() {
            this.showLogPopup = false;
            this.showDimmed = false;
            document.body.classList.remove('noscroll');
        },
        openResListPopup() {
            this.showResListPopup = true;
            this.showDimmed = true;
            
            document.body.classList.add('noscroll')
        },
        closeResListPopup() {
            this.showResListPopup = false;
            this.showDimmed = false;
            document.body.classList.remove('noscroll')
        },
        getCellStyle(item) {
        let cellWidth = 1.33333;
        var left = ((parseInt(item.hour.idx, 10) * 60) + parseInt(item.minute.idx, 10)) * cellWidth;

        if(item.date.name != this.mainData.selectedDate){
            left -= 1920;
        }
        left += 'px';
            return {
                top: ((parseInt(item.room.no, 10) - 100) - 1) * 40 + 30 + 'px', 
                left: left,
                width: (parseInt(item.time.idx, 10) * cellWidth) + 'px',
            }
        },
        openSettingPopup() {
            this.showSettingPopup = true;
            this.showDimmed = true;
            document.body.classList.add('noscroll');
            this.$store.dispatch('common/getOptionList');
        },
        closeSettingPopup() {
            this.showSettingPopup = false;
            this.showDimmed = false;
            document.body.classList.remove('noscroll');
        },
        goPrevDate() {
            let date = this.mainData.currDate;
            console.log(this.mainData.currDate)
            date.setDate(date.getDate() - 1);
            this.$store.commit('main/setDate', date);
            this.$store.dispatch('main/getAllCellList');
        },
        goNextDate() {
            let date = this.mainData.currDate;
            console.log(this.mainData.currDate)
            date.setDate(date.getDate() + 1);
            this.$store.commit('main/setDate', date);
            this.$store.dispatch('main/getAllCellList');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app_body .btn_create{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 80px;
}
.app_body .control_wrap{
    margin: 0 auto;
    width: 230px;
    height: 50px;
    box-sizing: border-box;
    overflow: hidden;
}
.app_body .control_wrap button{
    position: relative;
    float: left;
    width: 30px;
    border: 1px solid gray;
    height: 30px;
    margin-top: 10px;
    border-radius: 3px;
}
.app_body .control_wrap button.prev:before{
    content: '';
    display: block;
    position: absolute;
    background: #333;
    width: 1px;
    height: 9px;
    top: 6px;
    right: 14px;
    transform: rotate(45deg);
}
.app_body .control_wrap button.prev:after{
    content: '';
    display: block;
    position: absolute;
    background: #333;
    width: 1px;
    height: 9px;
    top: 12px;
    right: 14px;
    transform: rotate(135deg);
}
.app_body .control_wrap button.next:before{
    content: '';
    display: block;
    position: absolute;
    background: #333;
    width: 1px;
    height: 9px;
    top: 12px;
    right: 14px;
    transform: rotate(45deg);
}
.app_body .control_wrap button.next:after{
    content: '';
    display: block;
    position: absolute;
    background: #333;
    width: 1px;
    height: 9px;
    top: 6px;
    right: 14px;
    transform: rotate(135deg);
}

.app_body .control_wrap .date_control{
    float: left;
    margin: 0 10px;
    line-height: 50px;
    font-size: 16px;
    width: 150px;
    text-align: center;
}
.grid_wrap{
    position: relative;
    margin: 0 10px;
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    
}
.grid_wrap .left_wrap{
    width:100px;
    height:100%;
    background:#5A5E92;
    color: #fff;
    float:left;
}

.grid_wrap .left_wrap .cell{
    display:block;
    text-align:center;
    height:40px;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    box-sizing: border-box;
    line-height: 40px;
    font-size: 16px;
}
.grid_wrap .left_wrap .top{
    height:30px;
}
.grid_wrap .bg_outer{
    width: calc(100% - 100px);
    height: 764px;
    overflow-x: auto;
    overflow-y: hidden;
    float: left;
}
.grid_wrap .bg_wrap{
    width: 1920px;
    position: relative;
    overflow: hidden;
}
.grid_wrap .header{
    width: 100%;
    height: 30px;
    font-size: 13px;
}
.grid_wrap .header .cell{
    float:left;
    width: 80px;
    line-height: 30px;
    background: #5A5E92;
    color: #fff;
    height: 30px;
    border-bottom: 1px solid gray;
    border-right: 1px solid gray;
    box-sizing: border-box;
    white-space: nowrap;
}
.grid_wrap .row{
    width:100%;
    height: 40px;
}
.grid_wrap .bg_wrap .row:hover{
    background: #f2f7fb;
}
.grid_wrap .row.even{
    background: #F7F7FA;
}
.grid_wrap .row .cell{
    float: left;
    width: 80px;
    height: 40px;
    border-bottom: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    box-sizing: border-box;
}
.grid_wrap .row .cell.on{
    background: #ff980047;
}
.grid_wrap .cell_wrap{
    position: absolute;
    overflow: hidden;
    height: 720px;
    width: 1920px;
    left: 100px;
    top: 30px;
}
.grid_wrap .item_wrap{
    position: absolute;
    width: 100px;
    height: 36px;
    padding: 1px;
    box-sizing: border-box;
}
.grid_wrap .item_wrap .item{
    display:block;
    width: 100%;
    height: 100%;
    background: #FFEB3B;
    color: #000;
    border: 1px solid #9C27B0;
    border-radius: 3px;
    text-align: left;
    padding: 0 2px;
}
.grid_wrap .item_wrap.checkout .item{
    background: #e5e5e5;
    border: 1px solid #666;
}
.grid_wrap .item_wrap .item > span{
    display:block;
    font-size: 13px;
    word-break: break-all;
}
.btn_setting{
    position: absolute;
    right: 100px;
    top: 10px;
    width: 30px;
    height: 30px;
    background: url('/images/common/ico_setting.png') no-repeat;
    background-size: 30px 30px;
    text-indent: -99999px;
}
.btn_log{
    position:absolute;
    right: 3px;
    top: 2px;
    width: 20px;
    height: 13px;
    background: #fff;
    border-radius: 50%;
    color: #9C27B0
}
.btn_search{
    position: absolute;
    right: 140px;
    top: 10px;
    width: 80px;
    height: 30px;
}

.grid_wrap .item_wrap .item.ontime {
    animation-duration: 3s;
    animation-name: slidein;
    animation-iteration-count: infinite;
}

@keyframes slidein {
    from {
        background-color:#FFEB3B
    }

    to {
        background-color:#ff5722
    }
}
</style>
