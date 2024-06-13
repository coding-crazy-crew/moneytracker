<template lang="">
    <form class="signup" @submit.prevent="signupFormSubmitHandler">
        <label for="i">아이디 : </label>
        <input type="text" name="id" id="i" required v-model="c.userId"  />
        <button type="button" @click="btDupchkClickHandler">중복확인</button>
        <br />
        <label for="p">비밀번호 :</label>
        <input type="password" name="pwd" id="p" required v-model="c.pwd" ref="p" />
        <br />
        <label for="p1">비밀번호1 :</label>
        <input type="password" id="p1" required v-model="pwd1" />
        <br />

        <label for="n">이름 :</label>
        <input type="text" name="name" id="n" required v-model="c.name" />
        <button type="submit" :class="[isBtSignup ? 'btSignupShow' : 'btSignupHide']"> 가입하기 </button>
    </form>
</template>
<script>
  // import axios from 'axios'
    import axios from "axios";
    import { reactive, ref } from "vue";
    export default {
    name: "Signup",
    setup() {
        let pwd1 = ref("");
        let c = reactive({
        userId: "",
        id:0,
        pwd: "",
        name: "",
        });
        const profile = ref("");
        const isBtSignup = ref(false)
        const url = `http://localhost:3000/user`;
    

        const setNextId = (data)=>{
            const ids = data.map((memo)=>{
                    return memo.id;
            }) //ids: [1,2,3]
            const maxId = ids.length ==0? 0 : Math.max(...ids)
            
            c.id= maxId +1

        }

        const btDupchkClickHandler = async()=>{
            try{
                const response = await axios.get(url)
                const dbCheckedId = response.data.findIndex((item)=> item.userId=== c.userId)
                if (dbCheckedId == -1){
                    isBtSignup.value = true
                    console.log("중복 없음")
                    setNextId(response.data)
                }else{
                    alert("다시 입력하세요")
                }
            }catch(err){
                alert(err.response.data)
            }
        }

        //----폼객체에서 submit이벤트 발생했을때 할 일 START----
        const p = ref(null); //<input ref="p">
        const signupFormSubmitHandler = async (e) => {
            if (c.pwd != pwd1.value) {
            alert("비밀번호를 다시 입력하세요");
            const pwdObj = p.value;
            pwdObj.select();
            } else {
                
                const data = JSON.stringify(c);
                try{
                    const response = await axios.post(url,data,{"Content-Type": "application/json"})
                    console.log(response)
                }catch(err){
                    alert("에러 발생@")
                    alert(err.response.data)
                }
            }
        };
        return {
            pwd1,
            isBtSignup,
            c,
            profile,
            p,
            signupFormSubmitHandler,
            btDupchkClickHandler
        };
        },
    };
</script>
<style scoped>
/* form.signup>button[type=submit] {
    display: none;
} */
    div.profile {
    width: 300px;
    height: 300px;
    overflow: auto;
    }

    .btSignupShow {
    display: block;
    }

</style>