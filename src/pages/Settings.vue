<template lang="">
    <div>
        <UserInfo v-if="showUserInfo"/>
        <SignIn v-if="showSignIn" />
        
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
<style lang="">
    
</style>