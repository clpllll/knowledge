import Vue from 'vue'
import ElementUi from 'element-ui'
import App from './App.vue'
import router from './router/index'
import '../theme/index.css'
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
// import 'highlight.js/styles/nord.css';
// import 'highlight.js/styles/pojoaque.css';
import 'highlight.js/styles/railscasts.css';
// import 'highlight.js/styles/tomorrow-night-eighties.css';
import './style/markDown.less';
import '@/views/Icons'
Vue.use(ElementUi)
Vue.config.productionTip = false;
Vue.directive('anchor', {
  inserted: function (el) {
    el.onclick = (event) => {
      document.querySelector('.main').scrollTop =event.target.offsetTop-50;
    }
  }
})
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
