import vue from 'Vue'
import VueResource from 'vue-resource'
import App from './app.vue'
import { store } from './store'
import router from './router'
//import { sync } from 'vuex-router-sync'


/**
 * Plugins
 */


/**
 * Settings
 */
//sync(store, router)
vue.use(VueResource)
vue.config.devtools = false
vue.http.options.credentials = true


/**
 * App Entry
 */
const app = new vue({
  data: () => {
    return {
      'api': {
        'endpoint': '',
      },
      'url': {
        'origin': location.origin
      }
    }
  },
  methods: {
  },
  store,
  router,
  render: h => h(App)
}).$mount('#app');