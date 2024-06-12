<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">X</button>
      <h4>Money Tracker</h4>
      <ul>
        <li v-for="(event, index) in events" :key="index">
          <p>날짜: {{ event.date }}</p>
          <p>소비유형: {{ event.type === "income" ? "수입" : "지출" }}</p>
          <p>금액: {{ event.amount.toLocaleString() }}</p>
          <p>분류: {{ event.category }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "CalendarModal",
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { events } = toRefs(props);

    const closeModal = () => {
      emit("close");
    };

    return {
      events,
      closeModal,
    };
  },
});
</script>

<style scoped>
h4 {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 1);
  margin: 0;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

h2 {
  margin-top: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

p {
  margin: 5px 0;
}
</style>
