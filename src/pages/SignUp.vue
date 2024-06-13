<template lang="">
    <div class="outer">
        <div class="main-content">
            <div class="formwrapper mb-3 mt-3">
                <h2>회원 가입</h2>
                <form class="signup" @submit.prevent="signupFormSubmitHandler">
                    <div class="input-list">
                        <label for="i">아이디 </label>
                        <div class="id-position">
                            <input type="text" name="id" id="i" class="form-control" required v-model="c.userId"  />
                            <button type="button" class="btn btn-sm btn-outline-success" @click="btDupchkClickHandler">중복확인</button>
                        </div>
                        <br />
                        <label for="p">비밀번호 :</label>
                        <input type="password" name="pwd" id="p" class="form-control" required v-model="c.pwd" ref="p" />
                        <br />
                        <label for="p1">비밀번호 확인 :</label>
                        <input type="password" id="p1" class="form-control" required v-model="pwd1" />
                        <br />
                        <label for="n">이름 :</label>
                        <input type="text" name="name" id="n" class="form-control" required v-model="c.name" />
                        <button type="submit" :class="[isBtSignup ? 'btn btn-success btSignupShow' : 'btn btn-success btSignupHide']"> 가입하기 </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
  // import axios from 'axios'
    import axios from "axios";
    import { reactive, ref } from "vue";
    import { useRouter } from "vue-router";
    
    export default {
    name: "SignUp",
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
        const url = `http://localhost:3000/user`
        const router = useRouter()
    

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
                    router.push('/settings')

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
    .outer {
        background-color : #D8EFD3;
        margin: 0;
        padding: 0;
        height: 98vh;
    }
    
    .main-content {
        height:100vh;
        background-color: #D8EFD3;
        margin: 0 auto;
        padding: 20px;
        max-width: 60vw;
        min-width: 30vh;
        border-radius: 8px;
        text-align: center;
    }

    .input-list {
        width: 60%;
        text-align: left;
    }
    form{
        /* align-items: center; */
        justify-content: center;
        }
    .formwrapper{
        max-width:800px;
        min-width: 600px;
        margin:auto;
        padding:20px 0 50px 0;
        text-align: -webkit-center;

    }

    .id-position{
        position: relative;
    }
    .id-position button{
        position: absolute;
        width: 90px;
        height: 38px;
        top: 5;
        bottom: 0;
        right: 5px;
        margin: auto 0;
        border-radius: 3px; 
        font-weight: bold;
    }

    form.signup>button[type=submit] {
     margin-top:10px;
    display: none;
} 
    .btSignupHide{
        display:none;
    }
    .btSignupShow{
        display:block;
    }
    div.profile {
    width: 300px;
    height: 300px;
    overflow: auto;
    }

    /*.btSignupShow {
    display: block;
    }
    */
    

</style>