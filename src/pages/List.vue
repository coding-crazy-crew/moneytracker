<template lang="">
    <div>
        <div>
            <select class="form-select" v-model="filteredType">
                    <option value="all" selected>전체</option>
                    <option value="수입">수입</option>
                    <option value="지출">지출</option>
                </select>
        </div>
        <div>
            <a href="#" class="previous round" @click="previousMonthList">&#8249;</a>
            {{currentDate.year}}-{{currentDate.month}}
            <a href="#" class="`next round" @click="nextMonthList">&#8250;</a></div>
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <td>날짜</td>
                        <td>금액</td>
                        <td>유형</td>
                        <td>분류</td>
                        <td>카테고리</td>
                        <!-- <td>내용</td> -->
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="i in filteredItems" :key="i.id" :class="`tr ${i.id}`" @click="itemClickHandler" >
                        <td>{{i.date}}</td>
                        <td>{{i.amount}}</td>
                        <td>{{i.asset}}</td>
                        <td>{{i.type}}</td>
                        <td>{{i.category}}</td>
                        <!-- <td>{{i.content}}</td> -->
                    </tr>
                </tbody>
            </table>
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
                item.type = item.type=== 'expense' ? '지출' : '수입'
                item.date= formatDate(item.date)})
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
            return filteredType.value ==='all' ? dateFiltered : dateFiltered.filter(item =>item.type === filteredType.value)
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

        const itemClickHandler = (event)=>{
            console.log(event.currentTarget.getAttribute('class').split(' ')[1])
            
        }
        return {currentDate,nextMonthList,previousMonthList,filteredItems,filteredType, itemClickHandler}
    }
}
</script>
<style lang="">
    
</style>