import {defineStore} from 'pinia'
import { computed,ref } from 'vue';

export const useLoginInfoStore = defineStore("LoginInfo",()=>{
    const userId = ref(0); //로그인 안 한 상태
    const storedUserId = ref('')

    const logIn = ((id)=>{
        userId.value = id
        console.log(id+"로 로그인 성공")
    })

    const logOut = ((id)=>{
        userId.value=  id
        console.log("로그아웃 성공")
    })

    const rememberUserId = ((id)=>{
        storedUserId.value = id
        console.log(id+"로 로그인 성공")
    })

    const getLoginId =computed(()=>userId.value)


    return{logIn,getLoginId,logOut}


})