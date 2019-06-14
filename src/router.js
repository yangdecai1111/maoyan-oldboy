import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./views/Index'),
      children: [
        {
          path: 'moive',
          name: 'moive',
          component: () => import('./views/Index/moive.vue')
        },
        {
          path: 'cinema',
          name: 'cinema',
          component: () => import('./views/Index/cinema.vue')
        },
        {
          path: '',
          redirect: '/moive'
        }
      ]
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('./views/City')
    },
    {
      path: '/center',
      name: 'center',
      component: () => import('./views/Center')
    },
    {
      path: '/cinemaDetail/:id',
      name: 'cinemaDetail',
      component: () => import('./views/Detail/cinemaDetail.vue')
    },
    {
      path: '/test/:id',
      name: 'test',
      component: () => import('./views/Index/test.vue')
    }
  ]
})
