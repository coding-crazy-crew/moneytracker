<template>
    <div>
        <div class="pie-chart">
            <div class="summary-chart">
                <h5>카테고리 별 지출 현황</h5>
                <div v-if="isDataReady" class="chart-legend-container">
                    <div class="chart-container">
                        <Pie :data="computedChartData" :options="chartOptions" />
                    </div>
                    <div class="legend-container">
                        <h6>카테고리 종류</h6>
                        <ul class="legend-list">
                            <li v-for="(label, index) in computedChartData.labels" :key="index" class="legend-item">
                                <span class="legend-color"
                                    :style="{ backgroundColor: computedChartData.datasets[0].backgroundColor[index] }"></span>
                                {{ label }}: {{ computedChartData.datasets[0].data[index].toLocaleString() }}원
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-else>데이터를 불러오는 중...</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

const props = defineProps({
    records: {
        type: Array,
        required: true
    }
})

const categoryExpenses = reactive({
    '식비': 0,
    '교통/차량': 0,
    '문화생활': 0,
    '마트/편의점': 0,
    '패션/미용': 0,
    '생활용품': 0,
    '주거/통신': 0,
    '건강': 0,
    '교육': 0,
    '경조사/회비': 0,
    '부모님': 0,
    '기타': 0
})

const isDataReady = ref(false)

// 해당 년 월의 지출 내역을 카테고리별로 분류합니다.
const updateCategoryExpenses = () => {
    if (!props.records || !Array.isArray(props.records)) {
        console.warn('Invalid records array')
        return
    }

    Object.keys(categoryExpenses).forEach(key => {
        categoryExpenses[key] = 0
    })

    props.records.forEach((record) => {
        if (record.type === "expenses") {
            categoryExpenses[record.category] += record.amount
        }
    })

    // 데이터 준비 완료 상태로 설정
    isDataReady.value = true
}

// chartData를 computed로 정의
const computedChartData = computed(() => ({
    labels: Object.keys(categoryExpenses),
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#34D399', '#6366F1', '#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'],
            data: Object.values(categoryExpenses)
        }
    ]
}))

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
    }
})

// watch를 통해 년, 월이 바뀔때마다 데이터를 분류합니다.
watch(() => props.records, updateCategoryExpenses, { immediate: true })
</script>

<style scoped>
h5 {
    margin: 20px auto;
    font-weight: bold;
}

.summary-chart {
    border-radius: 8px;
    display: table;
    background-color: #F1F8E8;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.chart-legend-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
}

.chart-container {
    flex: 6;
    display: flex;
    justify-content: left;
    align-items: left;
    height: auto;
    width: 60%;
    margin-top: 10%;
}

.legend-container {
    flex: 4;
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    padding: 10px;
    border-radius: 8px;
    width: 40%;
    margin: auto 20px;
    margin-bottom: 20px;
}

.legend-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.legend-item {
    display: flex;
    align-items: left;
    margin-bottom: 8px;
    justify-content: left;
    align-items: left;
}

.legend-color {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 10px;
    border-radius: 4px;
}
</style>
