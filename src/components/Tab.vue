<template>
<!--tab-->
<div class="wrap">
    <h4>tab부분입니다</h4>
    <div class="tab">
      <button
        v-for="(tab, index) in tabList"
        :key="index"
        @click.prevent="currentTab = index"
        :class="{'active' : currentTab === index}"
      >
        {{ tab.name }}
      </button>
    </div>
    <ul class="tab-content" v-if="currentTab === 0">
      <li v-for="(item, index) in employList" :key="index">
	 	내용
      </li>
    </ul>
    <ul class="tab-content" v-if="currentTab === 1">
      <li v-for="(item, index) in employList" :key="index">
	 	내용
      </li>
    </ul>
    <ul class="tab-content" v-if="(currentTab === 2)">
      <li v-for="(item, index) in employList" :key="index">
	 	내용
      </li>
    </ul>
  </div>

</template>
<script>
export default {
 name: "Tab",
  data() {
    return {
      currentTagName: "employ",
      tabList: [
        { name: "전체", tag: "employ" },
        { name: "소비", tag: "career" },
        { name: "지출", tag: "company" },
     
      ],
      employList: [
       { title: "", tag: "employ" },
       { title: "", tag: "career" },
       { title: "", tag: "company" },
      
      ],
    };
  },
  computed: {
    currentList() {
      return this.employList.filter((el) => el.tag == this.currentTagName);
    },
  },
};
</script>
<style scoped>

</style>