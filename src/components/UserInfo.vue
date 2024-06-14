<template lang="">
    <div class="outer">
        <div class="main-content">
            <h2>유저 정보</h2>
            <ul class="list-group">
                <li class="list-group-item d-flex gap-3 py-3">이름 : {{c.name}}</li>
                <li class="list-group-item d-flex gap-3 py-3" >아이디 : {{c.userId}}</li>
            </ul>
            <button class="btn btn-success" @click="logOut">로그아웃</button>
        </div>
    </div>
</template>
<script>
import { useLoginInfoStore } from '@/stores/LoginInfo'
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router'

export default {
    name: "UserInfo",
    setup(){
        const store = useLoginInfoStore()
        const c = reactive({
            name : '',
            userId : ''
        })
        const router = useRouter()
        const url = 'http://localhost:3000/user'

        onMounted(async()=>{
            try{
                const response = await axios.get(url+"?userId="+store.getLoginId)
                console.log(response.data)
                c.name = response.data[0].name
                c.userId = response.data[0].userId
                console.log(c)
            }catch(err){
                console.log(err)
            }

        })

        console.log("현재 id값 :" +store.getLoginId)
        const logOut = (e)=>{
            store.logOut(0)
            location.href = "/"
        }
        return {logOut, c}
    }
}
</script>
<style scoped>
    .outer {
        background-color : #D8EFD3;
        margin: 0;
        padding: 0;
        height: 98vh;
    }
    
    .main-content {
        height:100vh;
        background-color: #D8EFD3;
        margin: 0 auto;
        padding: 20px;
        max-width: 60vw;
        min-width: 30vh;
        border-radius: 8px;
        text-align: center;
    }
</style>