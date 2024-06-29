import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';
import StudentListView from '../views/StudentListView.vue';

const routes = [
  { path: '/', component: WelcomeView },
  { path: '/students', component: StudentListView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
