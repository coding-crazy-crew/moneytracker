<template>
  <div class="outer">
    <div class="tab">
      <Tab @tab-selected="filterEvents" />
    </div>
    <div
      class="totals"
      v-if="currentMonthTotal.income || currentMonthTotal.expenses"
    >
      <h3>{{ currentMonth }}</h3>
      <p>이번 달 총 수입: {{ currentMonthTotal.income.toLocaleString() }} 원</p>
      <p>
        이번 달 총 지출: {{ currentMonthTotal.expenses.toLocaleString() }} 원
      </p>
      <p class="p_plus" v-if="currentMonthTotal.netIncome >= 0">
        이번달은 {{ currentMonthTotal.netIncome.toLocaleString() }} 원의
        순이익이 있어요
      </p>
      <p class="p_minus" v-else>
        이번달은 {{ currentMonthTotal.netIncome.toLocaleString() }} 원으로
        순이익이 없어요. <br />재정관리에 힘쓰세요!
      </p>
    </div>
    <div class="calendar">
      <FullCalendar
        :options="calendarOptions"
        @datesSet="handleDatesSetHandler"
      />
    </div>
    <ToRegisterButton />
    <CalendarModal
      v-if="showModal"
      @close="showModal = false"
      :events="selectedEvents"
    />
  </div>
</template>

<script setup>
import ToRegisterButton from "@/components/ToRegisterButton.vue";
import Tab from "@/components/Tab.vue";
import CalendarModal from "@/components/CalendarModal.vue";
import { ref, onMounted, reactive, watch } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

const calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  dateClick: (info) => dateClickHandler(info),
  events: [],
  locale: "ko",
});

const allEvents = ref([]);
const monthlyTotals = ref({});
const currentMonth = ref("");
const currentMonthTotal = ref({ income: 0, expenses: 0, netIncome: 0 });
const filterType = ref("all");
const showModal = ref(false);
const selectedEvents = ref([]);

onMounted(() => {
  requestList();
});

watch(filterType, () => {
  updateCalendarEvents();
});

const requestList = async () => {
  try {
    const response = await axios.get("http://localhost:3000/data");
    const events = response.data.map((event) => ({
      title: `${event.amount.toLocaleString()} ${
        event.type === "income" ? "(+)" : "(-)"
      }`,
      start: formatDate(event.date),
      type: event.type,
      textColor: event.type === "income" ? "#55AD9B" : "black",
      borderColor: "#F1F8E8",
      backgroundColor: "#F1F8E8",
      ...event,
    }));
    allEvents.value = events;
    calculateMonthlyTotals(events);
    updateCalendarEvents();
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

//calculateMonthlyTotals: 월별 총 수입과 지출을 계산하는 함수
const calculateMonthlyTotals = (events) => {
  const totals = {};
  events.forEach((event) => {
    const eventDate = new Date(event.start);
    const monthKey = `${eventDate.getFullYear()}-${String(
      eventDate.getMonth() + 1
    ).padStart(2, "0")}`;
    if (!totals[monthKey]) {
      totals[monthKey] = { income: 0, expenses: 0, netIncome: 0 };
    }
    const amount = parseFloat(event.title.split(" ")[0].replace(/,/g, ""));
    if (event.type === "income") {
      totals[monthKey].income += amount;
    } else {
      totals[monthKey].expenses += amount;
    }
    totals[monthKey].netIncome =
      totals[monthKey].income - totals[monthKey].expenses;
  });
  monthlyTotals.value = totals;
};

// updateCalendarEvents: 캘린더 이벤트를 업데이트하는 함수
const updateCalendarEvents = () => {
  if (filterType.value === "all") {
    calendarOptions.events = allEvents.value;
  } else {
    calendarOptions.events = allEvents.value.filter(
      (event) => event.type === filterType.value
    );
  }

  const calendarApi = document
    .querySelector(".fc")
    ?.__vueParentComponent.ctx.getApi();
  if (calendarApi) {
    const start = new Date(calendarApi.view.currentStart);
    const end = new Date(calendarApi.view.currentEnd);
    currentMonthTotal.value = calculateMonthlyTotal(start, end);
  }
};

//calculateMonthlyTotal: 특정 날짜 범위의 총 수입과 지출을 계산하는 함수
const calculateMonthlyTotal = (start, end) => {
  const totals = { income: 0, expenses: 0, netIncome: 0 };
  const monthKey = `${start.getFullYear()}-${String(
    start.getMonth() + 1
  ).padStart(2, "0")}`;
  if (monthlyTotals.value[monthKey]) {
    totals.income = monthlyTotals.value[monthKey].income;
    totals.expenses = monthlyTotals.value[monthKey].expenses;
    totals.netIncome = monthlyTotals.value[monthKey].netIncome;
  }
  return totals;
};

//handleDatesSetHandler: FullCalendar의 datesSet 이벤트 핸들러
const handleDatesSetHandler = (info) => {
  const start = new Date(info.start);
  const end = new Date(info.end);
  currentMonth.value = `${start.getFullYear()}-${String(
    start.getMonth() + 1
  ).padStart(2, "0")}`;
  currentMonthTotal.value = calculateMonthlyTotal(start, end);
};

//dateClickHandler: 날짜 클릭 시 모달 호출 이벤트 핸들러
const dateClickHandler = (info) => {
  const clickedDate = formatDate(info.date);
  selectedEvents.value = allEvents.value.filter(
    (event) => event.start === clickedDate
  );
  showModal.value = true;
};

const filterEvents = (type) => {
  filterType.value = type;
  updateCalendarEvents();
};

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
</script>

<style scoped>
.outer {
  background-color: #d8efd3;
  padding-bottom: 80px;
}
.tab {
  padding-top: 40px;
  margin: auto;
  width: 80%;
  max-width: 1200px;
}
.calendar {
  margin: 20px auto;
  padding: 20px;
  width: 80%;
  max-width: 1200px;
  border-radius: 8px;
  background-color: #f1f8e8;
}
.totals {
  margin: 20px auto;
  padding: 20px;
  width: 80%;
  max-width: 1200px;
  background-color: #f1f8e8;
  border-radius: 8px;
}

p {
  font-size: 20px;
  text-align: center;
}
.p_minus {
  color: red;
  text-align: center;
}

.p_plus {
  color: blue;
  text-align: center;
}
/* 날짜 번호 색상을 검은색으로 설정 */
:deep(.fc-daygrid-day-number),
:deep(.fc-col-header-cell-cushion) {
  color: black;
  text-decoration: none;
}
:deep(.fc-prev-button),
:deep(.fc-next-button),
:deep(.fc-today-button) {
  background-color: #95d2b3;
}
</style>
