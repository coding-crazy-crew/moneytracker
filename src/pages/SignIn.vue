<template lang="">
    <form @submit.prevent="loginFormSubmitHandler">
        <label for="i">아이디:</label>
        <input type="text" name="id" id="i" required  v-model="id"><br>
        <label for="p">비밀번호:</label>
        <input type="password" name="pwd" id="p" required v-model="pwd"><br>
        <button>로그인</button>
    </form>
</template>
<script>
import { useLoginInfoStore } from '@/stores/LoginInfo';
import axios from 'axios';
import {ref} from 'vue'
export default {
    name: "SignIn",
    setup() {
        let id = ref('')
        let pwd = ref('')
        const store = useLoginInfoStore()

        const loginFormSubmitHandler = async()=>{
            const url = 'http://localhost:3000/user'
            const data = {
                id: id.value,
                pwd: pwd.value
            }
            try{
                const response = await axios.get(url+"?userId="+data.id+"&pwd="+data.pwd, {"Content-Type": "application/json"})
                console.log(response.data)
                if (response.data){
                    console.log("로그인 성공!")
                    store.logIn(data.id)
                }else{
                    alert("아이디 혹은 비밀번호를 다시 입력하세요.")
                    
                    console.log("로그인 실패!")
                }
            }catch(err){
                console.log(err.message)
            }
        }

        const successLoginHandler = (data)=>{
            if (data){
                
            }

        }
        

        return {id,  pwd, loginFormSubmitHandler}
    }
}
</script>
<style lang="">

</style>