<template>
  <nav class="bg-indigo-600 shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-white font-bold text-xl">LeaveApp</router-link>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-indigo-100 hidden sm:block">Hello, {{ userName }}</span>
          <button @click="logout" class="bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userName = computed(() => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return user.name;
    } catch (e) {
      return 'User';
    }
  }
  return '';
});

const logout = () => {
  localStorage.removeItem('user');
  router.push('/login');
};
</script>
