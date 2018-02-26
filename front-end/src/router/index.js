import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Season from '@/pages/Season';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/season/:id',
      name: 'Season',
      component: Season,
    },
  ],
});
