<template>
    <div class="changelog popup">
        <div class="popup_header">
            <h3>변경 이력</h3>
            <button class="btn_close" @click="closePopup()"></button>
        </div>
        <div class="popup_body">
            <div class="right_area">
                <table class="table">
                    <colgroup>
                        <col style="width:10%">
                        <col style="width:4%">
                        <col style="width:5%">
                        <col style="width:10%">
                        <col style="width:4%">
                        <col style="width:10%">
                        <col style="width:10%">
                        <col style="width:4%">
                        <col style="width:10%">
                        <col style="width:5%">
                        <col style="width:15%">
                    </colgroup>
                    <thead>
                        <th>변경일시</th>
                        <th>번호</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>룸번호</th>
                        <th>체크인일시</th>
                        <th>체크아웃일시</th>
                        <th>체크아웃</th>
                        <th>실제체크아웃일시</th>
                        <th>총시간</th>
                        <th>옵션들</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in mainData.changeLogList" :key="item.ListSeqID">
                            <td>{{item.CDate}}</td>
                            <td>{{item.ListSeqID}}</td>
                            <td>{{item.Name}}</td>
                            <td>{{item.Phone}}</td>
                            <td :class="checkColumn(item, 'RoomNo', index - 1)">{{item.RoomNo}}</td>
                            <td>{{item.CheckInDate}}</td>
                            <td>{{item.CheckOutDate}}</td>
                            <td :class="checkColumn(item, 'CheckOutYN', index - 1)">{{item.CheckOutYN}}</td>
                            <td>{{item.ECheckOutDate}}</td>
                            <td :class="checkColumn(item, 'TotalMinute', index - 1)">{{item.TotalMinute}}</td>
                            <td :class="checkColumn(item, 'OptionNames', index - 1)">{{item.OptionNames}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="popup_footer">
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

        }
    },
    methods: {
        closePopup() {
            this.$emit('closeUpdate');
        },
        checkColumn(item, key, i){
            if(i < 0)   return {};
            if(item[key] != this.mainData.changeLogList[i][key]){
                return {change: true};
            }
            return {};
        }
    }
}
</script>
<style scoped>
    .changelog.popup{
        width: 1200px;
        margin-left: -600px;
        margin-top: -375px;
    }
    .popup_body .right_area{width: 100%}
    .table td.change{background: #ffc107}
</style>