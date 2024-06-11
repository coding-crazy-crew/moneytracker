<template>
  <div class="outer">
    <div class="tab">
      <Tab @tab-selected="filterEvents" />
    </div>
    <div class="calendar">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script>
import Tab from "@/components/Tab.vue";
import { ref, onMounted, reactive } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

export default {
  name: "calendar",
  components: {
    FullCalendar,
    Tab,
  },
  setup() {
    const calendarOptions = reactive({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      dateClick: dateClickHandler,
      events: [],
    });

    const allEvents = ref([]);

    onMounted(() => {
      requestList();
    });

    const requestList = async () => {
      try {
        const response = await axios.get("http://localhost:3000/data");
        const events = response.data.map((event) => ({
          title: `${event.amount.toLocaleString()} ${
            event.type === "income" ? "수입" : "지출"
          }`,
          start: formatDate(event.date),
          type: event.type,
          textColor: "black",
          borderColor: "#F1F8E8",
          backgroundColor: "#F1F8E8",
        }));
        allEvents.value = events;
        calendarOptions.events = events; // 초기값은 전체 데이터를 표시]
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const filterEvents = (type) => {
      if (type === "all") {
        calendarOptions.events = allEvents.value;
      } else {
        calendarOptions.events = allEvents.value.filter(
          (event) => event.type === type
        );
      }
    };

    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    //dateClickHandler: 날짜 클릭시 drawer화면 호출
    function dateClickHandler(arg) {
      alert("수정필요 " + arg.dateStr);
    }

    return {
      calendarOptions,
      filterEvents,
    };
  },
};
</script>

<style scoped>
.outer {
  background-color: #d8efd3;
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
}
</style>
