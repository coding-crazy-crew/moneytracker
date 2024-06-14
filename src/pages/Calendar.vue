<template>
  <div class="outer" @click="windowClickHandler">
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
        순이익이 없어요, <br />재정관리에 힘쓰세요!
      </p>
    </div>
    <div class="calendar">
      <FullCalendar :options="calendarOptions" @datesSet="handleDatesSet" />
    </div>
    <CalendarModal
      v-if="showModal"
      @close="showModal = false"
      :events="selectedEvents"
    />
    <toRegisterButton @show-regist-component="handleShowRegistComponent"/>
    <Register v-if="isVisibleRegistComponent"/>
  </div>
</template>

<script setup>
import Tab from "@/components/Tab.vue";
import CalendarModal from "@/components/CalendarModal.vue";
import { ref, onMounted, reactive, watch } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useRouter } from "vue-router";
import { useLoginInfoStore } from "@/stores/LoginInfo";
import ToRegisterButton from '@/components/ToRegisterButton.vue'
import Register from '@/components/Register.vue';

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

const store =useLoginInfoStore()
const router = useRouter()

onMounted(() => {
  if(store.getLoginId ===0){
                router.push('/settings')
            }
  requestList();
});

watch(filterType, () => {
  updateCalendarEvents();
  updateCurrentMonthTotal();
});

const requestList = async () => {
  try {
    const query = "?userId="+store.getLoginId
    const response = await axios.get("http://localhost:3000/data"+query);
    const events = response.data.map((event) => ({
      title: `${event.amount.toLocaleString()} ${
        event.type === "income" ? "(+)" : "(-)"
      }`,
      start: formatDate(event.date),
      type: event.type,
      textColor: event.type === "income" ? "#55AD9B" : "black",
      borderColor: "#F1F8E8",
      backgroundColor: "#F1F8E8",
      ...event, // 모든 데이터를 포함하도록 확장
    }));
    allEvents.value = events;
    calculateMonthlyTotals(events);
    updateCalendarEvents();
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

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

const updateCalendarEvents = () => {
  if (filterType.value === "all") {
    calendarOptions.events = allEvents.value;
  } else {
    calendarOptions.events = allEvents.value.filter(
      (event) => event.type === filterType.value
    );
  }
  // 현재 보이는 날짜 범위를 기준으로 계산
  const calendarApi = document
    .querySelector(".fc")
    ?.__vueParentComponent.ctx.getApi();
  if (calendarApi) {
    const start = new Date(calendarApi.view.currentStart);
    const end = new Date(calendarApi.view.currentEnd);
    currentMonthTotal.value = calculateMonthlyTotal(start, end);
  }
};

const updateCurrentMonthTotal = () => {
  // 현재 보이는 달의 총합계를 업데이트
  const calendarApi = document
    .querySelector(".fc")
    ?.__vueParentComponent.ctx.getApi();
  if (calendarApi) {
    const start = new Date(calendarApi.view.currentStart);
    const end = new Date(calendarApi.view.currentEnd);
    currentMonthTotal.value = calculateMonthlyTotal(start, end);
  }
};

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

const handleDatesSet = (info) => {
  const start = new Date(info.start);
  const end = new Date(info.end);
  currentMonth.value = `${start.getFullYear()}-${String(
    start.getMonth() + 1
  ).padStart(2, "0")}`;
  currentMonthTotal.value = calculateMonthlyTotal(start, end);
};

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
  updateCurrentMonthTotal(); // 탭 변경 시 현재 월 총합계 업데이트
};

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const isVisibleRegistComponent = ref(false);
const handleShowRegistComponent = (value) => {
    isVisibleRegistComponent.value = value
}

const windowClickHandler = () => {
    isVisibleRegistComponent.value = false
}

const stopPropagation = (event) => {
    event.stopPropagation();
}
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
  text-align: cet;
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
