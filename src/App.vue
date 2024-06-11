<script setup>
import Header from './components/Header.vue';
</script>

<template>
  <Header />
  <div class="main-content">
    <RouterView/>
  </div>
</template>

<style scoped>

.main-content {
    background-color: #D9D9D9;
    margin: 20px auto;
    padding: 20px;
    width: 80%;
    max-width: 1200px;
    border-radius: 8px;
}
</style>
