<template>
    <div class="Tab">
        <Tab/>
    </div>
 <div class="calendar">

    <FullCalendar :options="calendarOptions" />
 </div>
 
  </template>
  
  <script>
  import Tab from "@/components/Tab.vue";
  import { ref, onMounted, reactive } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import axios from 'axios';
  
  export default {
    components: {
      FullCalendar ,Tab
    },
    setup() {
      const calendarOptions = reactive({
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: handleDateClick,
        events: [] 
      });
  
      
      onMounted(() => {
        requestList();
      });
  
      const requestList = async () => {
        try {
          const response = await axios.get('http://localhost:3000/data');
          console.log(response.data);
          const events = response.data.map(event => ({
            title: `${event.amount.toLocaleString()} ${event.type === 'income' ? '수입' : '지출'}`,
            start: formatDate(event.date)
          }));
          calendarOptions.events = events;
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      // formDate:  날짜를 'YYYY-MM-DD' 형식으로 변환하는 함수
      const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  
      // handleDateClick: 날짜 클릭 함수, 클릭시 세부 일정 보임
      function handleDateClick(arg) {
        alert('date click! ' + arg.dateStr);
      }
  
      return {
        calendarOptions
      };
    }
  };
  </script>
  
  <style scoped>
 
  .calendar{
    background-color: #D8EFD3;
  }

  </style>
  