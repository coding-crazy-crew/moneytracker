<template lang="">
        <div class = "outer">
    <div class="main-content">
            <div class="grid-container">
                <div class="grid-item item1">
                    <select class="form-select" v-model="filteredType">
                            <option value="all" selected>전체</option>
                            <option value="수입">수입</option>
                            <option value="지출">지출</option>
                        </select>
                </div>
                <div class="grid-item item2">
                    <a href="#" class="previous round" @click="previousMonthList">&#8249;</a>
                    {{currentDate.year}}-{{currentDate.month}}
                    <a href="#" class="next round" @click="nextMonthList">&#8250;</a>
                </div>
            </div>
            <div class="tableWrapper">
                <table class="tb">
                    <thead class="tb-thead">
                        <tr class="thead-tr">
                            <td width=14%>날짜</td>
                            <td width=14%>금액</td>
                            <td width=14%>유형</td>
                            <td width=14%>분류</td>
                            <td width=14%>카테고리</td>
                            <td width=30%>내용</td>
                        </tr>
                    </thead>
                    <tbody class="tb-tbody">
                        <tr v-for="i in filteredItems" :key="i.id" :class="`tr ${i.id}`" @click="itemClickHandler" >
                            <td>{{i.date.substring(2)}}</td>
                            <td>{{i.amount.toLocaleString('ko-KR')}}</td>
                            <td><span class="type">{{i.type}}</span></td>
                            <td>{{i.asset}}</td>
                            <td>{{i.category}}</td>
                            <td class="content">{{i.content}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios';
import {computed, onMounted,reactive, ref} from 'vue';
export default {
    name : "List",
    setup(){
        const lists = reactive([]) //기본 모든 정보
        const filteredType = ref('all')
        const currentDate = reactive({
            year : 2024,
            month : "01"
        })

        onMounted(async() => {
            currentDate.year = new Date().getFullYear()
            currentDate.month = String(new Date().getMonth() + 1).padStart(2,'0')
            await getCurrentMonthList()
        })
        
        // getCurrentMonthList : 기록 내역 가져오기
        const getCurrentMonthList = async()=>{
            const response = await axios.get('http://localhost:3000/data')
            response.data.map((item)=>{
                item.type = item.type=== 'expenses' ? '지출' : '수입'
                item.date= formatDate(item.date)
                item.content = item.content.length < 100 ? item.content : item.content.substr(0,100) +" ..."
            })
            Object.assign(lists,response.data)
        }

        // formDate : 날짜를 'YYYY-MM-DD'형식으로 변환하는 함수
        const formatDate = (date) => {
            const d = new Date(date)
            const year = d.getFullYear()
            const month = String(d.getMonth() + 1).padStart(2, '0')
            const day = String(d.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        }
        
        // filteredItems : Filter 항목을 적용하여 list 반환
        const filteredItems = computed(() => {
            let dateFiltered = lists.filter(item => item.date.substr(0,7)  === `${currentDate.year}-${currentDate.month}`)
            let typeFiltered = filteredType.value ==='all' ? dateFiltered : dateFiltered.filter(item =>item.type === filteredType.value)
            return typeFiltered
        });

        // nextMonthList : 다음 월의 내역 가지고오기
        const nextMonthList = (event) =>{
            if(parseInt(currentDate.month) >11){
                currentDate.month = "01"
                currentDate.year++
            }else{
                currentDate.month = String(parseInt(currentDate.month) +1).padStart(2,'0')
            }
        }

        // previousMonthList : 이전 월의 내역 가지고오기
        const previousMonthList = (event) =>{
            if(currentDate.month <2){
                currentDate.month = '12'
                currentDate.year--
            }else{
                currentDate.month =String(parseInt(currentDate.month) -1).padStart(2,'0')
            }
        }

        //itemClickHandler : 수정 삭제 컴포넌트 visible 관리, props 관리
        const itemClickHandler = (event)=>{
            const clickedId = event.currentTarget.getAttribute('class').split(' ')[1]
            //객체 id가 clickedId 인 객체 찾기
            const clickedObj = lists[clickedId-1]
            console.log(clickedObj)
        }
        return {currentDate,nextMonthList,previousMonthList,filteredItems,filteredType, itemClickHandler}
    }
}
</script>
<style scoped>
    /* layout style */
    .outer{
        background-color: #D8EFD3;
        border :2vh solid #D8EFD3;
        min-height:98vh;
        height: max-content;
    }
    .main-content {
        background-color: #D8EFD3;
        margin: 10px auto;
        padding: 20px;
        width: 80%;
        max-width: 1200px;
        border-radius: 8px;
    }
    .grid-container{
        display: grid;
        grid-template-columns: repeat(2,1fr);
        justify-content : space-between;
        margin-bottom : 2vh;
    }
    .grid-container > .item2{
        background-color: white;
        justify-self: end;
        padding : 4px 10px;
        border-radius: 20px;
    }

    /* table style */
    .tb {
        /* padding:0.5em; */
        border-collapse: separate;
        border-radius: 2em 2em 0 0;
        border : 0.1px solid #55AD98;
        background-color: #55AD98;
        min-width: 100%;
        table-layout: fixed;
    }
    .tb-thead{
        /* background-color: #55AD9B; */
        font-size: large;
        font-weight: bold;
        text-align: center;
        color: #F1F8E8;
        height: 3em;
        padding: 2em;
        
    } 
    .tb-tbody{
        background-color: #F1F8E8;
        text-align: center;
        border : 1px solid black
    } 
    .type{
        background-color:#D8EFD3;
        padding: 10px 15px;
        border-radius: 10px;
        border : 1px solid #D8EFD3;
    }
    .tr{
        padding: 10px;
    }

    /* button style */
    .form-select{
        max-width:40%;
    }
    a {
        text-decoration: none;
        display: inline-block;
        padding: 0.2em 0.6em;
    }
    a:hover {
        background-color: #ddd;
        color: black;
    }
    .previous, .next {
        background-color: #F1F8E8;
        color: black;
        font-size: 1.1em;
    }
    .round {
        border-radius: 50%;
        }  
</style>