<template>
    <div>
        <div class="month-bar">
            <button @click="prevMonth" class="btn-icon"><i class="bi bi-caret-left-fill"></i></button>
            <span class="currentMonth">{{ formattedDate }}</span>
            <button @click="nextMonth" class="btn-icon"><i class="bi bi-caret-right-fill"></i></button>
        </div>
        <hr>
        <div class="monthly-expenses">
            <table class="summary-table">
                <thead>
                    <tr>
                        <th scope="col">수입</th>
                        <th scope="col">지출</th>
                        <th scope="col">순이익</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="cell-content">{{ totalIncome.toLocaleString() }}원</div>
                        </td>
                        <td>
                            <div class="cell-content">{{ totalExpenses.toLocaleString() }}원</div>
                        </td>
                        <td>
                            <div class="cell-content">{{ profit.toLocaleString() }}원</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <hr>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    recordList: {
        type: Object, 
        required: true,
    }
})

const emit = defineEmits(['updateRecords'])

const totalIncome = ref(0)
const totalExpenses = ref(0)
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
const monthlyRecords = ref([])

const filterMonthRecord = () => {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth() + 1
    monthlyRecords.value = props.recordList.filter((record) => {
        console.log(record.date)
        const recordDate = new Date(record.date)
        return (
            recordDate.getFullYear() === year &&
            recordDate.getMonth() + 1 === month
        )
    })

    filterIncomeAndExpenses()

    emit('updateRecords', monthlyRecords.value)
}

const filterIncomeAndExpenses = () => {
    totalIncome.value = 0
    totalExpenses.value = 0
    monthlyRecords.value.forEach((record) => {
        if (record.type === "income") {
            totalIncome.value += record.amount
        } else {
            totalExpenses.value += record.amount
        }
    })
}

const profit = computed(() => {
    return totalIncome.value - totalExpenses.value
})

watch(currentDate, filterMonthRecord)
watch(() => props.recordList, filterMonthRecord, { immediate: true })
</script>

<style scoped>
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

.monthly-expenses {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.summary-table {
    border-radius: 8px;
    display: table;
    background-color: #F1F8E8;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.summary-table th,
.summary-table td {
    padding: 12px 15px;
    text-align: center;
    vertical-align: middle;
    width: 33%;
}

.summary-table td {
    padding: 0;
}

.cell-content {
    background-color: #ffffff;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
    padding: 10px;
    width: 90%;
    margin: 10px auto;
    box-sizing: border-box;
    text-align: center;
}

.summary-table thead {
    border-bottom: 2px solid #55AD9B;
}
</style>