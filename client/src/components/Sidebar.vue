<script setup lang="ts"></script>

<template>
  <section id="sidebar">
    <h1>Marine Vessels</h1>
    <input type="text" placeholder="Search for Vessels..." class="search"/>
  </section>
</template>

<style scoped>
#sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  width: 20%;
  background-color: #e5e5e5;
}

.search {
  width: 80%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
