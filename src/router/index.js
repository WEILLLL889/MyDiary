import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Add from '../views/Add.vue';
import Edit from '../views/Edit.vue';
import View from '../views/View.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/add', component: Add },
  { path: '/edit/:id', component: Edit },  // ȷ�����·�������� :id
  { path: '/view/:id', component: View }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
