<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
    <div class="w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
      <div class="text-center">
        <h2 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Create Account</h2>
        <p class="mt-2 text-sm text-gray-600">Join us to manage your leave requests easily</p>
      </div>
      <form class="space-y-4" @submit.prevent="handleRegister">
        <div v-if="error" class="p-4 text-sm font-medium text-red-700 bg-red-100 rounded-xl border border-red-200">
          {{ error }}
        </div>
        
        <div>
          <label for="name" class="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <input id="name" v-model="name" name="name" type="text" required 
                 class="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" placeholder="John Doe">
        </div>

        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
          <input id="email" v-model="email" name="email" type="email" autocomplete="email" required 
                 class="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" placeholder="you@example.com">
        </div>

        <div>
           <label for="password" class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
           <input id="password" v-model="password" name="password" type="password" required 
                  class="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" placeholder="••••••••">
        </div>
        
        <div>
           <label for="role" class="block text-sm font-semibold text-gray-700 mb-1">Role</label>
           <select id="role" v-model="role" 
                   class="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-800">
             <option value="employee">Employee</option>
             <option value="employer">Employer</option>
           </select>
        </div>

        <div class="pt-2">
          <button type="submit" :disabled="loading" 
                  class="flex justify-center w-full px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
             {{ loading ? 'Registering...' : 'Complete Registration' }}
          </button>
        </div>
      </form>

      <div class="text-sm text-center font-medium pt-2">
        <span class="text-gray-600">Already have an account?</span>
        <router-link to="/login" class="text-indigo-600 hover:text-purple-600 ml-1 transition-colors duration-200">
          Sign In
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('employee');
const error = ref('');
const loading = ref(false);

const handleRegister = async () => {
  error.value = '';
  loading.value = true;
  
  try {
    const response = await api.post('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    });
    
    // Save user data
    localStorage.setItem('user', JSON.stringify(response.data));
    
    // Navigate based on role
    if (response.data.role === 'employer') {
      router.push('/employer-dashboard');
    } else {
      router.push('/employee-dashboard');
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to register';
  } finally {
    loading.value = false;
  }
};
</script>
