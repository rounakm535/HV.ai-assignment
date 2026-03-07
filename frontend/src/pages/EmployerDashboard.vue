<template>
  <div class="max-w-7xl mx-auto">
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">All Leave Requests</h3>
        <p class="mt-1 text-sm text-gray-500">Manage leave requests from employees.</p>
      </div>
      
      <div v-if="loading" class="p-8 text-center text-gray-500">
        Loading...
      </div>
      
      <div v-else-if="error" class="p-8 text-center text-red-500 bg-red-50">
        {{ error }}
      </div>
      
      <div v-else-if="leaves.length === 0" class="p-8 text-center text-gray-500">
        No leave requests found.
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="leave in leaves" :key="leave._id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ leave.employeeId?.name || 'Unknown' }}</div>
                <div class="text-sm text-gray-500">{{ leave.employeeId?.email || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ leave.leaveType }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(leave.startDate) }} - {{ formatDate(leave.endDate) }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" :title="leave.reason">{{ leave.reason }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[getStatusClass(leave.status), 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full']">
                  {{ leave.status.charAt(0).toUpperCase() + leave.status.slice(1) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <div v-if="leave.status === 'pending'" class="flex justify-center space-x-2">
                  <button @click="handleAction(leave._id, 'approve')" class="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded transition-colors disabled:opacity-50">
                    Approve
                  </button>
                  <button @click="handleAction(leave._id, 'reject')" class="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition-colors disabled:opacity-50">
                    Reject
                  </button>
                </div>
                <span v-else class="text-gray-400 italic">No actions available</span>
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

const fetchAllLeaves = async () => {
  try {
    const response = await api.get('/leaves/all');
    leaves.value = response.data;
  } catch (err) {
    error.value = 'Failed to load leave requests. Please try again.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleAction = async (id, action) => {
  if (!confirm(`Are you sure you want to ${action} this leave request?`)) return;
  
  try {
    await api.put(`/leaves/${id}/${action}`);
    // Refresh the list
    await fetchAllLeaves();
  } catch (err) {
    alert(`Failed to ${action} request: ` + (err.response?.data?.message || err.message));
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getStatusClass = (status) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-yellow-100 text-yellow-800';
  }
};

onMounted(() => {
  fetchAllLeaves();
});
</script>
