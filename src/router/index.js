import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/posts/list',
    beforeEnter: (to, from, next) => { 
      if (localStorage.getItem('token') == null) {
        next('/pages/login');
      }
      next();
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: 'posts/list',
        name: 'Posts',

        component: () => import('@/views/pages/posts/list.vue'),
      },
      {
        path: 'users/create',
        name: 'Create User',
        component: () => import('@/views/pages/users/create.vue'),
      },


      

    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },

      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },

    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
