<template>
    <div>
        <div class="yearly-profit">
            <div class="yearly-table">
                <h5>{{ currentYear }} 월별 순수익 현황</h5>
                <div class="bar-chart-container">
                    <Bar :data="chartData" :options="chartOptions" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
    recordList: {
        type: Array,
        required: true,
    },
    currentDate: {
        type: Date,
        required: true,
    },
})

const currentYear = ref(props.currentDate.getFullYear())
const yearlyProfitMap = reactive(new Map())

// 그래프 데이터 저장을 위해 맵을 사용하였습니다.
const initializeMap = () => {
    for (let i = 1; i <= 12; i++) {
        yearlyProfitMap.set(i, 0)
    }
}

// 년도의 데이터를 월별로 분류합니다.
const filterByMonth = () => {
    initializeMap()

    currentYear.value = props.currentDate.getFullYear()
    const year = props.currentDate.getFullYear()

    props.recordList.forEach((record) => {
        const recordDate = new Date(record.date)
        const month = recordDate.getMonth() + 1

        if (recordDate.getFullYear() !== year) {
            return
        }

        if (Number.isNaN(month)) {
            console.warn('Invalid month for record:', record)
            return
        }

        const amount = record.amount

        if (record.type === "income") {
            yearlyProfitMap.set(month, yearlyProfitMap.get(month) + amount)
        } else if (record.type === "expenses") {
            yearlyProfitMap.set(month, yearlyProfitMap.get(month) - amount)
        }
    })
}

watch(() => props.recordList, filterByMonth, { immediate: true })
watch(() => props.currentDate, filterByMonth, { immediate: true })

const chartData = computed(() => ({
    labels: Array.from(yearlyProfitMap.keys()).map(month => `${month}월`),
    datasets: [
        {
            label: '월별 수익',
            backgroundColor: '#41B883',
            data: Array.from(yearlyProfitMap.values())
        }
    ]
}))

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            title: {
                display: true,
                text: '월'
            }
        },
        y: {
            title: {
                display: true,
                text: '순수익 (원)'
            },
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        },
    }
}
</script>

<style scoped>
h5 {
    margin: 20px auto;
    font-weight: bold;
}

.yearly-profits {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
}

.bar-chart-container {
    width: 100%;
    height: 400px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
}

@media (max-width: 768px) {
    .yearly-table {
        padding: 10px;
    }
}

.yearly-table{
    border-radius: 8px;
    display: table;
    background-color: #F1F8E8;
    width: 500px;
    height: 300px;
    text-align: center;
    border-collapse: collapse;
    margin-bottom: 20px;
}
</style>
