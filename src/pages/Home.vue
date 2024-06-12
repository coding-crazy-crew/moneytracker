<template>
    <div class="outer">
        <div class="main-content">
            <MonthlyExpenditure @updateRecords="updateMonthlyRecords" />
            <CategoryPieChart :records="monthlyRecords" />
            <ToRegisterButton/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MonthlyExpenditure from '@/components/MonthlyExpenditure.vue'
import CategoryPieChart from '@/components/CategoryPieChart.vue'
import ToRegisterButton from '@/components/ToRegisterButton.vue'

const monthlyRecords = ref([])

// MonthlyExpenditure에서 추출한 해당 월 정보를 records에 업데이트, CategoryPieChart에서 사용하도록 함
const updateMonthlyRecords = (records) => {
    monthlyRecords.value = records;
}
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