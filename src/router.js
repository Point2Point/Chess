import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'game',
      component: () => import('./components/Game/Game.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login'),
    },
  ],
});
