import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  base: '/',
  routes: [{
      path: '/',
      name: 'Home',
      component: () => import('./pages/home/Home')
    },
    //movies tab
    {
      path: '/movies-list',
      name: 'MoviesList',
      component: () => import('./pages/movies/MoviesList'),
    },
    {
      path: '/movies-list/:id',
      name: 'MoviePage',
      component: () => import('./pages/movies/components/MoviePage')
    },
    //actors tab
    {
      path: '/actors-list',
      name: 'ActorsList',
      component: () => import('./pages/actors/ActorsList')
    },
    {
      path: '/actors-list/:id',
      name: 'ActorPage',
      component: () => import('./pages/actors/components/ActorPage')
    },
    //shows tab
    {
      path: '/shows',
      name: 'Shows',
      component: () => import('./pages/shows/Shows')
    },
    {
      path: '/shows/:id',
      name: 'ShowPage',
      component: () => import('./pages/shows/components/ShowPage')
    },
  ]
})