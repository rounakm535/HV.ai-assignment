<template>
  <div class="min-h-screen bg-gray-100 font-sans text-gray-900">
    <Navbar v-if="showNavbar" />
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

const route = useRoute();

// Don't show navbar on login/register pages
const showNavbar = computed(() => {
  return !['Login', 'Register'].includes(route.name);
});
</script>
