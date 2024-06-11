<template lang="">
    <div>
        <div>필터</div>
        <div>
            <a href="#" class="previous round" @click="previousMonthList">&#8249;</a>
            {{currentDate.year}}-{{currentDate.month}}
            <a href="#" class="`next round" @click="nextMonthList">&#8250;</a></div>
        <div>리스트
            <table>
                <thead>
                    <tr>
                        <td>날짜</td>
                        <td>금액</td>
                        <td>유형</td>
                        <td>분류</td>
                        <td>자산</td>
                        <td>내용</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in lists" :key="i.id" :class="`tr ${i.id}`">
                        <td>{{i.id}}</td>
                        <td>{{i.type}}</td>
                        <td>{{i.date}}</td>
                        <td>{{i.amount}}</td>
                        <td>{{i.asset}}</td>
                        <!-- <td>{{i.content}}</td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    {{currentDate}}
</template>
<script>

import axios from 'axios';
import {computed, onMounted,reactive, ref} from 'vue';
export default {
    name : "List",
    setup(){
        
        let lists = reactive([])
        const currentDate = reactive({
            year : 2024,
            month : 1
        })
        onMounted(async() => {
            currentDate.year = new Date().getFullYear()
            currentDate.month = new Date().getMonth() + 1
            await getCurrentMonthList()
            // lists.filter(function(date){
            //     console.log(date)
            //     console.log('--------')
            // })
        })
        
        //내역 가져오기
        const getCurrentMonthList = async()=>{
            const response = await axios.get('http://localhost:3001/data')
            response.data.map(item=>item.date= formatDate(item.date))
            Object.assign(lists,response.data)
        }
        //formDate : 날짜를 'YYYY-MM-DD'형식으로 변환하는 함수
        const formatDate = (date) => {
            const d = new Date(date)
            const year = d.getFullYear()
            const month = String(d.getMonth() + 1).padStart(2, '0')
            const day = String(d.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        }

        const filteredTest = computed(()=>{
            return lists.filter(i =>i.date === currentDate.month)
        })

        // 다음 월의 내역 가지고오기
        const nextMonthList = (event) =>{
            if(currentDate.month >11){
                currentDate.month = 1
                currentDate.year++
            }else{
                currentDate.month++
            }
        }
        const previousMonthList = (event) =>{
            if(currentDate.month <2){
                currentDate.month = 12
                currentDate.year--
            }else{
                currentDate.month--
            }
        }
        return {lists,currentDate,nextMonthList,previousMonthList}
    }
}
</script>
<style lang="">
    
</style>