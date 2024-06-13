<template lang="">
    <div>
        <h2>유저 정보</h2>
        <button @click="logOut">로그아웃</button>
    </div>
</template>
<script>
import { useLoginInfoStore } from '@/stores/LoginInfo'
import { useRouter } from 'vue-router'
export default {
    name: "UserInfo",
    setup(){
        const store = useLoginInfoStore()
        const router = useRouter()
        console.log("현재 id값 :" +store.getLoginId)
        const logOut = (e)=>{
            store.logOut(0)
            console.log(store.getUserId)
            if(store.getUserId ===0)
                router.push('/')
        }
        return {logOut}
    }
}
</script>
<style lang="">
    
</style>