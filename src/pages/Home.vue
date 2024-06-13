<template>
    <div class="outer">
        <div class="main-content">
            <div class="month-bar">
                <button @click="prevMonth" class="btn-icon"><i class="bi bi-caret-left-fill"></i></button>
                <span class="currentMonth">{{ formattedDate }}</span>
                <button @click="nextMonth" class="btn-icon"><i class="bi bi-caret-right-fill"></i></button>
            </div>
            <MonthlyExpenditure :recordList="recordList" 
            :currentDate="currentDate"
            :formattedDate="formattedDate"
            @updateRecords="updateMonthlyRecords" />
            <div class="visual-datas">
                <CategoryPieChart :records="monthlyRecords" />
                <YearlyProfitBarChart :recordList="recordList" :currentDate="currentDate" />
            </div>
            <ToRegisterButton />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from "axios"
import MonthlyExpenditure from '@/components/MonthlyExpenditure.vue'
import CategoryPieChart from '@/components/CategoryPieChart.vue'
import YearlyProfitBarChart from '@/components/YearlyProfitBarChart.vue'
import ToRegisterButton from '@/components/ToRegisterButton.vue'
import { useLoginInfoStore } from '@/stores/LoginInfo'
import { useRouter } from 'vue-router'

const recordList = ref([])
const monthlyRecords = ref([])

const store = useLoginInfoStore()
const router = useRouter()

const getEveryRecords = async () => {
    const url = "http://localhost:3000/data"
    const query = "?userId="+store.getLoginId
    try {
        const response = await axios.get(url+query)
        recordList.value = response.data
        console.log(recordList.value)
    } catch (error) {
        console.error('내역 로딩 실패')
    }
}

const currentDate = ref(new Date())

const formattedDate = computed(() => {
    return `${currentDate.value.getFullYear()}년 ${currentDate.value.getMonth() + 1}월`
})


const prevMonth = () => {
    const date = new Date(currentDate.value)
    date.setMonth(date.getMonth() - 1)
    currentDate.value = date
}

const nextMonth = () => {
    const date = new Date(currentDate.value)
    date.setMonth(date.getMonth() + 1)
    currentDate.value = date
}

// MonthlyExpenditure에서 추출한 해당 월 정보를 records에 업데이트, CategoryPieChart에서 사용하도록 함
const updateMonthlyRecords = (records) => {
    monthlyRecords.value = records;
}

onMounted(() => {
    if(store.getLoginId ===0){
        router.push('/settings')
    }
    getEveryRecords()
})
</script>

<style scoped>
.outer {
    background-color: #D8EFD3;
    border: 2vh solid #D8EFD3;
    min-height: 98vh;
    height: max-content;
}

.month-bar {
    display: flex;
    align-items: left;
    justify-content: left;
    gap: 10px;
}

.btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    color: black;
    font-size: 18px;
    cursor: pointer;
}

.currentMonth {
    font-size: 18px;
    font-weight: bold;
}

.main-content {
    background-color: #D8EFD3;
    margin: 20px auto;
    padding: 20px;
    width: 80%;
    max-width: 1200px;
    border-radius: 8px;
    box-sizing: border-box;
}

.visual-datas {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
}

.chart-container {
    flex-grow: 1;
    flex-basis: 50%;
    min-width: 300px;
    padding: 10px;
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .chart-container {
        flex-basis: 100%;
    }
}
</style>