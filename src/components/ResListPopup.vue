<template>
    <div class="resList popup">
        <div class="popup_header">
            <h3>예약 조회</h3>
            <button class="btn_close" @click="closePopup()"></button>
        </div>
        <div class="popup_body">
            <div class="search_area">
                <div class="row_wrap">
                    <div class="form_wrap">
                        <label class="number">기간</label>
                        <datepicker :value="searchParams.from" @input="fromDatePicker" min="2020-04-01" max="2030-01-01" :dayStr="dayStr" :popperProps="dateProps"/>
                        <span class="during">&nbsp;~&nbsp;</span>
                        <datepicker :value="searchParams.to" @input="toDatePicker" min="2020-04-01" max="2030-01-01" :dayStr="dayStr" :popperProps="dateProps"/>
                    </div>
                </div>
            </div>
            <div class="btn_area">
                <button class="btn_search btn_primary" @click="getResList()">조회</button>
                <button class="btn_excel btn_secondary" @click="download()">Excel</button>
            </div>
            <div class="table_area">
                <table class="table" id="resList">
                    <colgroup>
                        <col style="width:4%">
                        <col style="width:5%">
                        <col style="width:8%">
                        <col style="width:5%">
                        <col style="width:10%">
                        <col style="width:10%">
                        <col style="width:10%">
                        <col style="width:5%">
                        <col style="width:10%">
                        <col style="width:5%">
                        <col style="width:10%">
                        <col style="width:10%">
                    </colgroup>
                    <thead>
                        <th>번호</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>룸번호</th>
                        <th>옵션들</th>

                        <th>체크인일시</th>
                        <th>체크아웃일시</th>
                        <th>체크아웃</th>
                        <th>실제체크아웃일시</th>
                        <th>총시간</th>

                        <th>등록일시</th>
                        <th>최근수정일시</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in mainData.resList" :key="item.ListSeqID">
                            <td>{{item.ListSeqID}}</td>
                            <td>{{item.Name}}</td>
                            <td>{{item.Phone}}</td>
                            <td>{{item.RoomNo}}</td>
                            <td>{{item.OptionNames}}</td>
                            <td>{{item.CheckInDate}}</td>
                            <td>{{item.CheckOutDate}}</td>
                            <td>{{item.CheckOutYN}}</td>
                            <td>{{item.ECheckOutDate}}</td>
                            <td>{{item.TotalMinute}}</td>

                            <td>{{item.CDate}}</td>
                            <td>{{item.RDate}}</td>
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
import { Datepicker } from '@livelybone/vue-datepicker'
import util from '@/etc/util'

export default {
    computed: {
        ...mapState({
            commonData: state => state.common,
            mainData: state => state.main
        })
    },
    components: { Datepicker },
    created () {
        
    },
    data(){
        return {
            searchParams: {
                from    : '',
                to      : '',
            },
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
        getResList() {
            if(!this.searchParams.from || !this.searchParams.to){
                alert('기간을 선택하세요.');
                return;
            }
            let item = {
                fromDate: this.searchParams.from + ' 00:00:00',
                toDate: this.searchParams.to + ' 00:00:00',
                type: 'all'
            }
            this.$store.dispatch('main/getResList', item).then(() => {

            });
        },
        closePopup() {
            this.$emit('closeUpdate');
        },
        fromDatePicker(val){
            this.searchParams.from = val;
        },
        toDatePicker(val){
            this.searchParams.to = val;
        },
        download(){
            window.open('data:application/vnd.ms-excel,' + document.getElementById('resList').innerHTML);
        }
    }
}
</script>
<style scoped>
    .resList.popup {
        width: 1200px;
        margin-left: -600px;
        margin-top: -375px;
    }
    .popup_body{
        height: 630px;
        flex-direction: column;
    }
    .search_area label{
        width: 100px;
        float: left;
        font-size: 16px;
        line-height: 30px;
        overflow: hidden;
    }
    .during{
        float: left;
        line-height: 30px;
    }
    .btn_area{
        margin-top: 10px;
        text-align: right;
    }
    .search_area{
        background: #e5e5e5;
        border-radius: 5px;
    }
    .btn_search{
        width: 80px;
        float: right;
        margin-left: 10px;
    }
    .btn_excel {
        width: 80px;
        float: right;
    }
    .table_area{
        margin-top: 10px
    }
</style>