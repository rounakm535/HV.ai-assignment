import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import EmployeeDashboard from '../pages/EmployeeDashboard.vue';
import EmployerDashboard from '../pages/EmployerDashboard.vue';
import ApplyLeave from '../pages/ApplyLeave.vue';

const routes = [
  {
    path: '/',
    redirect: () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return '/login';
      return user.role === 'employer' ? '/employer-dashboard' : '/employee-dashboard';
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guest: true }
  },
  {
    path: '/employee-dashboard',
    name: 'EmployeeDashboard',
    component: EmployeeDashboard,
    meta: { requiresAuth: true, role: 'employee' }
  },
  {
    path: '/apply-leave',
    name: 'ApplyLeave',
    component: ApplyLeave,
    meta: { requiresAuth: true, role: 'employee' }
  },
  {
    path: '/employer-dashboard',
    name: 'EmployerDashboard',
    component: EmployerDashboard,
    meta: { requiresAuth: true, role: 'employer' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.meta.requiresAuth && !user) {
    next('/login');
  } else if (to.meta.guest && user) {
    next(user.role === 'employer' ? '/employer-dashboard' : '/employee-dashboard');
  } else if (to.meta.role && user && user.role !== to.meta.role) {
    // Redirect if user tries to access the other role's dashboard
    next(user.role === 'employer' ? '/employer-dashboard' : '/employee-dashboard');
  } else {
    next();
  }
});

export default router;
