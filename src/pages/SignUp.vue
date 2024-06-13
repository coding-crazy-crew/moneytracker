<template lang="">
    <form class="signup" @submit.prevent="signupFormSubmitHandler">
        <label for="i">아이디 : </label>
        <input type="text" name="id" id="i" required v-model="c.userId"  />
        <br />
        <label for="p">비밀번호 :</label>
        <input type="password" name="pwd" id="p" required v-model="c.pwd" ref="p" />
        <!-- script영역에서 this.$refs.p로 참조할 수 있다-->
        <br />
        <label for="p1">비밀번호1 :</label>
        <input type="password" id="p1" required v-model="pwd1" />
        <br />

        <label for="n">이름 :</label>
        <input type="text" name="name" id="n" required v-model="c.name" />
        <button type="submit"> 가입하기 </button>
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
        const url = `http://localhost:3000/user`;
    
        const setNextId = async()=>{
            const response = await axios.get(url)
            const ids = response.data.map((memo)=>{
                    return memo.id;
            }) //ids: [1,2,3]
            const maxId = ids.length ==0? 0 : Math.max(...ids)
            
            c.id= maxId +1
        }

        //----폼객체에서 submit이벤트 발생했을때 할 일 START----
        const p = ref(null); //<input ref="p">
        const signupFormSubmitHandler = async (e) => {
            if (c.pwd != pwd1.value) {
            alert("비밀번호를 다시 입력하세요");
            const pwdObj = p.value;
            pwdObj.select();
            } else {
                setNextId()
                
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
            c,
            profile,
            p,
            signupFormSubmitHandler,
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