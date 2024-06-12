<template>
    <div>
        <div class="main-content">
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
                            <td><div class="cell-content">{{ totalIncome.toLocaleString() }}원</div></td>
                            <td><div class="cell-content">{{ totalExpenses.toLocaleString() }}원</div></td>
                            <td><div class="cell-content">{{ profit.toLocaleString() }}원</div></td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <hr>
                <div class="pie-chart">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import axios from "axios";

export default {
    setup() {

        const totalIncome = ref(0);
        const totalExpenses = ref(0);
        const currentDate = ref(new Date());

        const formattedDate = computed(() => {
            return `${currentDate.value.getFullYear()}년 ${currentDate.value.getMonth() + 1}월`;
        });

        const prevMonth = () => {
            const date = new Date(currentDate.value);
            date.setMonth(date.getMonth() - 1);
            currentDate.value = date;
        };

        const nextMonth = () => {
            const date = new Date(currentDate.value);
            date.setMonth(date.getMonth() + 1);
            currentDate.value = date;
        };

        const recordList = ref([]);
        const monthlyRecords = ref([]);

        const getMonthRecords = async () => {
            const url = "http://localhost:3000/data";
            axios.get(url).then(response => {
                recordList.value = response.data;
            });
        };

        const filterMonthRecord = () => {
            const year = currentDate.value.getFullYear();
            const month = currentDate.value.getMonth() + 1;
            monthlyRecords.value = recordList.value.filter((record) => {
                const recordDate = new Date(record.date);
                console.log(record.date);
                return (
                    recordDate.getFullYear() === year &&
                    recordDate.getMonth() + 1 === month
                );
            });

            filterIncomeAndExpenses();
        };

        const filterIncomeAndExpenses = () => {
            monthlyRecords.value.forEach((record) => {
                console.log(record.type);
                if (record.type === "income") {
                    totalIncome.value += record.amount;
                } else {
                    totalExpenses.value += record.amount;
                }
            });
        };

        onMounted(() => {
            getMonthRecords();
        });

        const profit = computed(() => {
            return totalIncome.value - totalExpenses.value;
        });

        watch(currentDate, filterMonthRecord);

        return {
            currentDate,
            formattedDate,
            prevMonth,
            nextMonth,
            recordList,
            monthlyRecords,
            profit,
            totalExpenses,
            totalIncome,
            filterIncomeAndExpenses
        };
    }
};
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
    transition: color 0.3s;
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
    position: sticky;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.summary-table th,
.summary-table td {
    padding: 12px 15px;
    text-align: center;
}

.summary-table td {
    padding: 0;
    text-align: center;
    vertical-align: middle;
}

.cell-content {
    background-color: #ffffff;
    border-radius: 30px;
    border: 1px solid #e0e0e0;
    padding: 10px;
    margin: 10px;
    width: 90%;
    text-align: center;
    box-sizing: border-box;
    font-weight: bold;
}

.summary-table thead {
    border-bottom: 2px solid #55AD9B;
}
</style>
