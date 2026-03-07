<template>
  <div class="max-w-6xl mx-auto">
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center sm:flex-row flex-col gap-4">
        <h3 class="text-lg leading-6 font-medium text-gray-900">My Leave Requests</h3>
        <router-link to="/apply-leave" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Apply for Leave
        </router-link>
      </div>
      
      <div v-if="loading" class="p-8 text-center text-gray-500">
        Loading...
      </div>
      
      <div v-else-if="error" class="p-8 text-center text-red-500 bg-red-50">
        {{ error }}
      </div>
      
      <div v-else-if="leaves.length === 0" class="p-8 text-center text-gray-500">
        You haven't applied for any leaves yet.
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="leave in leaves" :key="leave._id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ leave.leaveType }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(leave.startDate) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(leave.endDate) }}</td>
              <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" :title="leave.reason">{{ leave.reason }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[getStatusClass(leave.status), 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full']">
                  {{ leave.status.charAt(0).toUpperCase() + leave.status.slice(1) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const leaves = ref([]);
const loading = ref(true);
const error = ref('');

const fetchMyLeaves = async () => {
  try {
    const response = await api.get('/leaves/my');
    leaves.value = response.data;
  } catch (err) {
    error.value = 'Failed to load leave requests. Please try again.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getStatusClass = (status) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-yellow-100 text-yellow-800';
  }
};

onMounted(() => {
  fetchMyLeaves();
});
</script>
