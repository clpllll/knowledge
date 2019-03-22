import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import hello from '../components/HelloWorld.vue'
import Admin from '../views/Admin'
import AddArticle from '../views/Admin/AddArticle'
import noFount from '../views/404'
import content from '../views/Front';
import layout from '../views/Layout';
/*
const _import = ((mode) => {
  if (mode === 'development') {
    return (path) => {
      return require(`../views/${path}`).default  
      }
  } else {
    return (path) => {
      return import(`../views/${path}`)
    }
  }
})(process.env.NODE_ENV)
const content = _import('Front');
const layout = _import('Layout');
*/
const AdminRoutes = [
  {
    path: "/admin",
    component:Admin
  },
  {
    path: "/admin/add",
    component:AddArticle
  },
]
const routes = [
  { path: '/hello', component: hello },
  {
    path: '/front/',
    redirect: '/front/js',
    component: layout,
    children: [
      {
        path: 'js',
        component: content,
      },
      {
        path: 'browser',
        component: content,
      }
    ]
  }, {
    path: '/serve/',
    redirect: '/serve/koa',
    component: layout,
    children: [
      {
        path: 'koa',
        component: content,
      }
    ]
  }, {
    path: '/computers/',
    redirect: '/computers/regexp',
    component: layout,
    children: [
      {
        path: 'regexp',
        component: content,
      },
      {
        path: 'markdown',
        component: content,
      },
      {
        path: 'git',
        component: content,
      },
      {
        path: 'linux',
        component: content,
      }
    ]
  }, {
    path: '/tools/',
    redirect: '/tools/tools',
    component: layout,
    children: [
      {
        path: 'tools',
        component: content,
      }
    ]
  }, {
    path: '/',
    redirect: '/front/js',
  },{
    path: '*',
    component:noFount
  }
  
  
]
const router = new Router({
  mode: 'history',
  routes: [...AdminRoutes, ...routes],
  // scrollBehavior (to, from, savedPosition) {
  //   console.log(to.hash,decodeURIComponent(to.hash))
  //   if (to.hash) {
  //     return {selector:decodeURIComponent(to.hash)}
  //   }
  // }
})
export default router