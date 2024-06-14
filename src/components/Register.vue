<template lang="">
    <div class="register-window" @click.stop>
        <div class="main-content">
            <form :class="register" @submit.prevent="registFormSubmitHandler">
                <button 
                    type="button" 
                    class="btn btn-success" 
                    :class="{active: tradeHistoryData.type === 'income'}" 
                    @click="setTradeType('income')">수입</button>
                <button 
                    type="button" 
                    class="btn btn-success" 
                    :class="{active: tradeHistoryData.type === 'expenses'}" 
                    @click="setTradeType('expenses')">지출</button>

                <br>
                <div class="mb-3 mt-3" style="text-align: -webkit-center;">
                    <div class="input-list">
                        <label for="date" class="form-label">날짜</label>
                        <input
                            type="text"
                            class="form-control"
                            id="date"
                            placeholder="날짜를 입력하세요.(ex. 월/일/년)"
                            required
                            v-model="tradeHistoryData.date"
                        />
                        <label for="amount" class="form-label">금액</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="amount" 
                            placeholder="금액을 입력하세요." 
                            required
                            v-model="tradeHistoryData.amount"
                        />
                        <label for="category" class="form-label">분류</label>
                        <select class="form-select" v-model="tradeHistoryData.category" v-if="tradeHistoryData.type==='expenses'">
                            <option>식비</option>
                            <option>교통/차량</option>
                            <option>문화생활</option>
                            <option>마트/편의점</option>
                            <option>패션/미용</option>
                            <option>생활용품</option>
                            <option>주거/통신</option>
                            <option>건강</option>
                            <option>교육</option>
                            <option>경조사/회비</option>
                            <option>부모님</option>
                            <option>기타</option>
                        </select>
                        <select class="form-select" v-model="tradeHistoryData.category" v-if="tradeHistoryData.type==='income'">
                            <option>월급</option>
                            <option>부수입</option>
                            <option>용돈</option>
                            <option>상여</option>
                            <option>금융소득</option>
                            <option>기타</option>
                        </select>
                        <label for="asset" class="form-label">자산</label>
                        <select class="form-select" v-model="tradeHistoryData.asset">
                            <option>현금</option>
                            <option>은행</option>
                            <option>카드</option>
                        </select>
                        <label for="content" class="form-label">내용</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="content" 
                            placeholder="내용을 입력하세요.." 
                            required
                            v-model="tradeHistoryData.content"
                        />
                    </div>
                </div>
                <div class="bottom-button">
                    <button type="submit" class="btn btn-success">저장</button>
                    <button type="button" class="btn btn-success" @click="registMoreEvent">저장 후 계속</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import {reactive,onMounted} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'
import { useLoginInfoStore } from '@/stores/LoginInfo';

export default {
    name: 'Register',
    setup() {
        const store = useLoginInfoStore()
        const tradeHistoryData = reactive({
            id: Date.now(),
            userId: store.getLoginId,
            type: '',
            date: '',
            amount: '',
            category: '',
            asset: '',
            content: '',
        })

        const router = useRouter()

        onMounted(async() => {
            if(store.getLoginId ===0){
                router.push('/settings')
            }
        })


        const route = useRoute()
        const registFormSubmitHandler = async (e) => {
            const url = `http://localhost:3000/data`
            const data = tradeHistoryData

            const response = await axios.get(url)
            const ids = response.data.map((res) => {
                return res.id;
            })
            const maxId = ids.length == 0 ? 0 : Math.max(...ids)
            data.id = (maxId+1).toString();
            data.amount = Number(data.amount)
            const dataJson = JSON.stringify(data)
            try{
                const response = await axios.post(url, dataJson, {"Content-Type":"application/json"})
                if(route.path==='/list') {
                    location.reload()
                }else{
                    router.push("/list")
                }
            } catch(err) {
                console.log(err)
                router.push("/")
            }
        }


        const registMoreEvent = async (e) => {
            const url = `http://localhost:3000/data`
            const data = tradeHistoryData
            const response = await axios.get(url)
            const ids = response.data.map((res) => {
                return res.id;
            })
            const maxId = ids.length == 0 ? 0 : Math.max(...ids)
            data.id = (maxId+1).toString();
            data.amount = Number(data.amount)
            const dataJson = JSON.stringify(data)
            try{
                const response = await axios.post(url, dataJson, {"Content-Type":"application/json"})
                location.reload();
            } catch(err) {
                alert(err.response.data)
            }
        }
        
        const setTradeType = (type) => {
            tradeHistoryData.type = type;
        }

        setTradeType('income');

        return {tradeHistoryData, registFormSubmitHandler, registMoreEvent, setTradeType}
    }
}
</script>
<style scoped>
    .register-window {
        background-color: #D8EFD3;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #000000;
        box-shadow: 0px 0px 15px #00000029;
        width: 400px;
        z-index: 2;
        overflow-y: auto;
    }

    
    .main-content {
        background-color: #D8EFD3;
        margin: 0 auto;
        padding: 20px;
        max-width: 1200px;
        border-radius: 8px;
        text-align: center;
    }

    .input-list {
        width: 60%;
        text-align: left;
    }

    .btn-success {
        margin-right: 10px;
    }

    .bottom-button {
        justify-content: space-between;
    }
</style>