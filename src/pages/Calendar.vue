<template>
  <div class="outer">
    <div class="tab">
      <div class="summary">
        <CalendarSummary :currentMonthSummary="currentMonthSummary" />
      </div>
      <Tab @tab-selected="filterEvents" />
    </div>
    <div class="calendar">
      <FullCalendar :options="calendarOptions" @datesSet="updateCurrentMonth" />
    </div>
    <ToRegisterButton/>
  </div>
</template>

<script>
import ToRegisterButton from "@/components/ToRegisterButton.vue"
import Tab from "@/components/Tab.vue";
import { ref, onMounted, reactive, watch } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import CalendarSummary from "@/components/CalendarSummary.vue"

export default {
  name: "CalendarView", // 컴포넌트 이름 변경
  components: {
    FullCalendar,
    Tab,
    CalendarSummary,
  },
  setup() {
    const calendarOptions = reactive({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      dateClick: dateClickHandler,
      events: [],
      locale: "ko", // 한국어로 설정
      prev:'chevron-left',
      next:'chevron-right'
    })

    const allEvents = ref([]);
    const monthlySummary = ref({}); // 월별 수입 및 지출을 저장할 객체
    const currentMonth = ref(new Date().toISOString().substring(0, 7));
    const currentMonthSummary = ref({ income: 0, expenses: 0 });

    onMounted(() => {
      requestList();
    });

    const requestList = async () => {
      try {
        const response = await axios.get("http://localhost:3000/data");
        const events = response.data.map((event) => ({
          title: `${event.amount.toLocaleString()} ${event.type === "income" ? "(+)" : "(-)"}`,
          start: formatDate(event.date),
          type: event.type,
          amount: event.amount,
          textColor: event.type === "income" ? "#55AD9B" : "black",
          borderColor: "#F1F8E8",
          backgroundColor: "#F1F8E8",
        }));

        allEvents.value = events;
        calendarOptions.events = events;
        calculateMonthlySummary(events); // 월별 요약 업데이트
        updateCurrentMonthSummary();
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const calculateMonthlySummary = (events) => {
      const summary = {};
      events.forEach((event) => {
        const date = new Date(event.start);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        if (!summary[month]) {
          summary[month] = { income: 0, expenses: 0 };
        }
        if (event.type === "income") {
          summary[month].income += event.amount;
        } else {
          summary[month].expenses += event.amount;
        }
      });
      monthlySummary.value = summary;
    };

    const filterEvents = (type) => {
      if (type === "all") {
        calendarOptions.events = allEvents.value;
      } else {
        calendarOptions.events = allEvents.value.filter((event) => event.type === type);
      }
      updateCurrentMonthSummary();
    };

    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const updateCurrentMonth = (arg) => {
      const startDate = new Date(arg.start);
      const month = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}`;
      currentMonth.value = month;
      updateCurrentMonthSummary();
    };

    const updateCurrentMonthSummary = () => {
      currentMonthSummary.value = monthlySummary.value[currentMonth.value] || { income: 0, expenses: 0 };
    };

    function dateClickHandler(arg) {
      axios.get("http/localhost:3000/data")
      
      alert("수정 필요 " + arg.dateStr);
    }

    return {
      calendarOptions,
      filterEvents,
      currentMonthSummary,
    };
  },
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

/* 날짜 번호 색상을 검은색으로 설정 */
:deep(.fc-daygrid-day-number),
:deep(.fc-col-header-cell-cushion) {
  color: black;
  text-decoration: none;
}
:deep(.fc-prev-button), :deep(.fc-next-button), :deep(.fc-today-button) {
  background-color: #95D2B3;
}
</style>
