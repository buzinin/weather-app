import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import Loader from '@/components/Loader/Loader.ts'
import '@/plugins/element.js'
import '@/assets/style/style.css'

Vue.use(Loader);

Vue.config.productionTip = false;


new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
