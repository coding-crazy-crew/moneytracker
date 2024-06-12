<template>
  <div class="summary">
    <h3>현재 월 요약</h3>
    <p v-bind="incomeBind">수입: {{ incomeBind.text }} 원</p>
    <p v-bind="expensesBind">지출: {{ expensesBind.text }} 원</p>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "CalendarSummary",
  props: {
    currentMonthSummary: Object,
  },
  setup(props) {
    const incomeBind = ref({ text: "0" });
    const expensesBind = ref({ text: "0" });

    watch(
      () => props.currentMonthSummary,
      (newVal) => {
        incomeBind.value.text = newVal.income.toLocaleString();
        expensesBind.value.text = newVal.expenses.toLocaleString();
      },
      { immediate: true }
    );

    return {
      incomeBind,
      expensesBind,
    };
  },
};
</script>

<style scoped>
.summary {
  margin: 20px auto;
  padding: 20px;
  width: 80%;
  max-width: 1200px;
  border-radius: 8px;
  background-color: #f1f8e8;
  text-align: center;
}
</style>
