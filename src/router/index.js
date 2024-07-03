import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';
import StudentListView from '../views/StudentListView.vue';
import Web3dView from '../views/Web3dView.vue'

const routes = [
  { path: '/', component: WelcomeView },
  { path: '/students', component: StudentListView },
  { path: '/web', component : Web3dView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
