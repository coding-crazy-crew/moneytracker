<template lang="">
    <div class="outer">
        <div class="main-content">
            <UserInfo v-if="showUserInfo"/>
            <SignIn v-if="showSignIn" />
        </div>
    </div>
</template>
<script>
import UserInfo from '@/components/UserInfo.vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/pages/SignUp.vue';
import { useLoginInfoStore } from '../stores/LoginInfo'
import {onMounted,ref, reactive} from 'vue'
export default {
    name : 'Settings',
    components : {UserInfo,SignIn, SignUp},
    setup(){
        const store = useLoginInfoStore()
        const showSignIn = ref(false)
        const showUserInfo = ref(false)
        
        onMounted(() => {
            console.log("현재 id값 :" +store.getLoginId)
            if(store.getLoginId ===0 || store.getLoginId === undefined){
                showSignIn.value = true
            }else{
                showUserInfo.value = true
            }
        })
    

        return{showSignIn,showUserInfo}
    }    
}
</script>
<style scoped>
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
</style>