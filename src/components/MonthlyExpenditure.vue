<template>
    <div>
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
    },
    currentDate: {
        type: Date,
        required: true,
    },
    formattedDate: {
        type: String,
        required: true,
    }
})

const emit = defineEmits(['updateRecords'])

const totalIncome = ref(0)
const totalExpenses = ref(0)
const monthlyRecords = ref([])

const filterMonthRecord = () => {
    const year = props.currentDate.getFullYear()
    const month = props.currentDate.getMonth() + 1
    monthlyRecords.value = props.recordList.filter((record) => {
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

watch(() => props.currentDate, filterMonthRecord, { immediate: true })
watch(() => props.recordList, filterMonthRecord, { immediate: true })
</script>

<style scoped>

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