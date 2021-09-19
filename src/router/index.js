/* eslint-disable import/no-unresolved */
import { createRouter, createWebHashHistory } from 'vue-router';
import userList from '@/components/userList.vue';
import editUser from '@/components/editUser.vue';
import addUser from '@/components/addUser.vue';

const routes = [
  {
    path: '/',
    name: 'user-list',
    component: userList,
  },
  {
    path: '/users/new',
    name: 'add-user',
    component: addUser,
  },
  {
    path: '/users/:id/edit',
    name: 'edit-user',
    component: editUser,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
