<template lang="">
    <div class="outer">
            <div class="mb-3 mt-3" style="text-align: -webkit-center;">
        <h2>로그인 페이지</h2>
        <form @submit.prevent="loginFormSubmitHandler">
            <div class="input-list">
                <label for="i">아이디:</label>
                <input type="text" name="id" id="i" required  v-model="id" class="form-control" ><br>
                <label for="p">비밀번호:</label>
                <input type="password" name="pwd" id="p" required v-model="pwd" class="form-control" ><br>
                <button class="btn btn-success"> 로그인</button>
            </div>
            </form>
                <button @click.preventDefault="switchSignUpHandler" class="btn btn-success">회원가입</button>
                </div>
        </div>
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
<style scoped>
    .outer{
        margin:auto
    }
    form{
        /* align-items: center; */
        justify-content: center;
        width : 100%
    }
    .input-list {
        width: 60%;
        text-align: left;
    }
</style>