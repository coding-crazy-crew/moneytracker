<template>
    <!-- Tab -->
    <div class="wrap">
      <div class="tab">
        <button
          v-for="(tab, index) in tabList"
          :key="index"
          @click.prevent="selectTab(tab.tag, index)"
          :class="{'active': currentTab === index}"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Tab",
    data() {
      return {
        currentTab: 0,
        tabList: [
          { name: "전체", tag: "all" },
          { name: "수입", tag: "income" },
          { name: "지출", tag: "expenses" },
        ],
      };
    },
    methods: {
      selectTab(tag, index) {
        this.currentTab = index;
        this.$emit('tab-selected', tag);
      }
    }
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
    background-color: #F1F8E8;
    border: none;
    cursor: pointer;
    border-top-left-radius: 20px;
    border-top-right-radius:20px;
  }
  button:hover{
    background-color: #95D2B3;
  }
  button.active {
    background-color:#95D2B3;
    
  }
  </style>
  