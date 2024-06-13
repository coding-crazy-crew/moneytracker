<template>
    <div class="outer">
        <div class="main-content">
            <MonthlyExpenditure :recordList="recordList" @updateRecords="updateMonthlyRecords" />
            <CategoryPieChart :records="monthlyRecords" />
            <ToRegisterButton/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from "axios"
import MonthlyExpenditure from '@/components/MonthlyExpenditure.vue'
import CategoryPieChart from '@/components/CategoryPieChart.vue'
import ToRegisterButton from '@/components/ToRegisterButton.vue'

const recordList = ref([])
const monthlyRecords = ref([])

const getEveryRecords = async () => {
    const url = "http://localhost:3000/data"
    try {
        const response = await axios.get(url)
        recordList.value = response.data
    } catch (error) {
        console.error('내역 로딩 실패')
    }
}

// MonthlyExpenditure에서 추출한 해당 월 정보를 records에 업데이트, CategoryPieChart에서 사용하도록 함
const updateMonthlyRecords = (records) => {
    monthlyRecords.value = records;
}

onMounted(() => {
    getEveryRecords()
})
</script>

<style scoped>
.outer{
    background-color: #D8EFD3;
    border :2vh solid #D8EFD3;
    min-height:98vh;
    height: max-content;
}

.main-content {
    background-color: #D8EFD3;
    margin: 20px auto;
    padding: 20px;
    width: 80%;
    max-width: 1200px;
    border-radius: 8px;
}
</style>