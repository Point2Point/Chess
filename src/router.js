import Vue from 'vue';
import Router from 'vue-router';


import LoginForm from '@/components/Autorization/LoginForm.vue';
import RegistrationForm from '@/components/Autorization/RegistrationForm.vue';

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
      component: () => import('./views/Login'),
    },
    {
      path: '/registration',
      name: 'registrationForm',
      component: RegistrationForm,
    }
  ],
});
