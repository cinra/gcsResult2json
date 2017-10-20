import vue from 'Vue'
import VueRouter from 'vue-router'
import { store } from './store'


/**
 * Components
 */

// pages
import Top from './views/page-top.vue'


/**
 * Settings
 */
vue.use(VueRouter)


/**
 * Routing
 */
const router = new VueRouter({
  mode: 'history',
  base: '/gcsResult2json',
  scrollBehavior: (to, from, savedPosition) => {
    return !savedPosition ? { x: 0, y: 0 } : savedPosition;
  },
  routes: [
    {
      path: '/',
      component: Top
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach((to, from, next) => {
});


export default router;