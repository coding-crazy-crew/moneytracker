<template lang="">
    <h2>로그인 페이지</h2>
    <form @submit.prevent="loginFormSubmitHandler">
        <label for="i">아이디:</label>
        <input type="text" name="id" id="i" required  v-model="id"><br>
        <label for="p">비밀번호:</label>
        <input type="password" name="pwd" id="p" required v-model="pwd"><br>
        <button>로그인</button>
    </form>
        <button @click.preventDefault="switchSignUpHandler">회원가입</button>
</template>
<script>
import { useLoginInfoStore } from '@/stores/LoginInfo';
import axios from 'axios';
import {ref} from 'vue'
import { useRouter } from 'vue-router';
export default {
    name: "SignIn",
    setup() {
        let id = ref('')
        let pwd = ref('')
        const store = useLoginInfoStore()
        const router = useRouter()

        const loginFormSubmitHandler = async()=>{
            const url = 'http://localhost:3000/user'
            const data = {
                id: id.value,
                pwd: pwd.value
            }
            try{
                const response = await axios.get(url+"?userId="+data.id+"&pwd="+data.pwd, {"Content-Type": "application/json"})
                console.log(response.data)
                successLoginHandler(response.data,data)
            }catch(err){
                console.log(err.message)
            }
        }
        
        const successLoginHandler = (axiosData,data)=>{
            if (axiosData){
                console.log("로그인 성공!")
                store.logIn(data.id)
                router.push('/')
            }else{
                alert("아이디 혹은 비밀번호를 다시 입력하세요.")
                console.log("로그인 실패!")
            }
        }
        const switchSignUpHandler =()=>{
            
            router.push('/signup')
        }
        

        return {id,  pwd, loginFormSubmitHandler,switchSignUpHandler}
    }
}
</script>
<style lang="">

</style>