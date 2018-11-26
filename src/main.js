import Vue from 'vue'
import ElementUi from 'element-ui'
import App from './App.vue'
import router from './router/index'
import '../theme/index.css'
import { Number } from 'core-js';
Vue.use(ElementUi)
Vue.config.productionTip = false
Vue.directive('anchor', {
  inserted: function (el) {
    el.onclick = (event) => {
    
      console.log(document.documentElement,event.pageY)
      document.documentElement.scrollTop =event.pageY- 50
    }
    // console.log(el)
    // el.focus()
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
