import get from 'lodash/get';
import Router from 'vue-router';
import store from './store';
import Vue from 'vue';

import Login from '@/components/Login';
import Registration from '@/components/Registration';
import ResetEmail from '@/components/ResetEmail';
import ResetPassword from '@/components/ResetPassword';
import Welcome from '@/components/Welcome';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: Login
  }, {
    path: '/register',
    name: 'registration',
    component: Registration
  }, {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: ResetPassword
  }, {
    path: '/reset-email',
    name: 'reset-email',
    component: ResetEmail
  }, {
    path: '/welcome',
    name: 'welcome',
    component: Welcome,
    meta: { auth: true }
  }]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(it => it.meta.auth) && !get(store.state, 'user')) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
