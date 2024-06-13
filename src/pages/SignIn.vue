<template lang="">
    <div>
        <form @submit.prevent="loginFormSubmitHandler">
        <label for="i">아이디:</label>
        <input type="text" name="id" id="i" required  v-model="id"><br>
        <label for="p">비밀번호:</label>
        <input type="password" name="pwd" id="p" required v-model="pwd"><br>
        <input type="checkbox" v-model="checked">아이디저장
        <button>로그인</button> <!--<button type="submit">과 같음-->
    </form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "Login",
    setup() {
        let id = ref('')
        let pwd = ref('')
        let checked = ref(true)
        //----form객체에서 submit이벤트가 발생했을 때 할 일 START----
        // function loginFormSubmitHandler() {
        const loginFormSubmitHandler = async()=>{
            const url = 'http://localhost:3000/login'
            const data = {
                id: id.value,
                pwd: pwd.value
            }
            try{
                const response = await axios.post(url,data, {"Content-Type": "application/json"})
            console.log(response)
            }catch(err){
                console.log(err.message)
            }
        }
        return {id,  pwd, loginFormSubmitHandler}
    }
}
</script>
<style lang="">
    
</style>