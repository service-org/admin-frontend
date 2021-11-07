import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import '@/element-ui-theme'
import router from '@/router'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
import httpRequest from '@/utils/httpRequest.js'

Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.$http = httpRequest

new Vue({
  el: '#app',
  router,
  mounted: () => {
    window.addEventListener('unload', this.saveState);
  },
  render: h => h(App),
  methods: {
    saveState: () => {
      let state = this.$store.state;
      this.$cookies.set('state', JSON.stringify(state))
    }
  }
})
