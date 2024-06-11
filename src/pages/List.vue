<template lang="">
    <div>
        <div>필터</div>
        <div>날짜</div>
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
                        <td>{{i.content}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {onMounted,reactive} from 'vue';
export default {
    name : "List",
    setup(){
        let lists = reactive([])
        onMounted(async() => {
            
            const response = await axios.get('http://localhost:3001/data')
            console.log(response)
            Object.assign(lists,response.data)
        })
        return {lists}
    }
}
</script>
<style lang="">
    
</style>