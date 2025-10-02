<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import MegaMenu from 'primevue/megamenu'
import HelloWorld from './components/HelloWorld.vue'

// Define the items for MegaMenu
const items = ref([
  {
    label: 'Home',
    url: '/' 
  },
  {
    label: 'About',
    url: '/about'
  },
])
</script>

<template>
  <header>
    <MegaMenu :model="items" orientation="horizontal"/>
    <!-- <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink> -->
</header>
  <RouterView />
</template>
<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* ensures it stays above content */
  padding: 1rem;
}

main.page {
  margin-top: 80px; /* offset for fixed header height */
  padding: 1rem;
}

</style>
