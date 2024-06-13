<template>
  <div class="wrap">
    <div class="tab">
      <button
        v-for="(tab, index) in tabList"
        :key="index"
        @click.prevent="selectTab(tab.tag, index)"
        :class="{ active: currentTab.value === index }"
      >
        {{ tab.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Tab",
  setup(_, { emit }) {
    const currentTab = ref(0);
    const tabList = [
      { name: "전체", tag: "all" },
      { name: "수입", tag: "income" },
      { name: "지출", tag: "expenses" },
    ];

    const selectTab = (tag, index) => {
      currentTab.value = index;
      emit("tab-selected", tag);
    };

    return {
      currentTab,
      tabList,
      selectTab,
    };
  },
};
</script>

<style scoped>
.tab {
  display: flex;
}
button {
  border-color: black;
  width: 400px;
  height: 50px;
  background-color: #f1f8e8;
  border: none;
  cursor: pointer;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
button:hover {
  background-color: #95d2b3;
}
button.active {
  background-color: #95d2b3;
}
button:focus {
  background-color: #95d2b3;
}
</style>
