import Vue from 'vue'
import ElementUi from 'element-ui'
import App from './App.vue'
import router from './router/index'
import '../theme/index.css'
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')