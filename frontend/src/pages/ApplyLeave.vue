<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-8">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Apply for Leave</h2>
        <router-link to="/employee-dashboard" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          &larr; Back to Dashboard
        </router-link>
      </div>

      <form @submit.prevent="submitLeave" class="space-y-6">
        <div v-if="error" class="bg-red-50 text-red-700 p-4 rounded-md text-sm">
          {{ error }}
        </div>
        
        <div v-if="success" class="bg-green-50 text-green-700 p-4 rounded-md text-sm">
          {{ success }}
        </div>

        <div>
          <label for="leaveType" class="block text-sm font-medium text-gray-700">Leave Type</label>
          <select id="leaveType" v-model="form.leaveType" required class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm border">
            <option value="" disabled>Select a leave type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
          </select>
        </div>

        <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" id="startDate" v-model="form.startDate" required :min="today" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>

          <div>
            <label for="endDate" class="block text-sm font-medium text-gray-700">End Date</label>
            <input type="date" id="endDate" v-model="form.endDate" required :min="form.startDate || today" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
        </div>

        <div>
          <label for="reason" class="block text-sm font-medium text-gray-700">Reason for Leave</label>
          <div class="mt-1">
            <textarea id="reason" v-model="form.reason" rows="4" required class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3" placeholder="Please provide specific details..."></textarea>
          </div>
        </div>

        <div class="flex justify-end pt-4">
          <router-link to="/employee-dashboard" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3">
            Cancel
          </router-link>
          <button type="submit" :disabled="loading" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
            {{ loading ? 'Submitting...' : 'Submit Request' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();

const form = reactive({
  leaveType: '',
  startDate: '',
  endDate: '',
  reason: ''
});

const loading = ref(false);
const error = ref('');
const success = ref('');

// Get today's date formatted as YYYY-MM-DD for min attribute
const today = computed(() => {
  const d = new Date();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
});

const submitLeave = async () => {
  error.value = '';
  success.value = '';
  
  if (new Date(form.startDate) > new Date(form.endDate)) {
    error.value = 'End date cannot be earlier than start date.';
    return;
  }

  loading.value = true;
  
  try {
    await api.post('/leaves/apply', form);
    success.value = 'Leave request submitted successfully!';
    
    // Reset form after short delay to show success message
    setTimeout(() => {
      router.push('/employee-dashboard');
    }, 1500);
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to submit leave request. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
