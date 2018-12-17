import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import hello from '../components/HelloWorld.vue'
import Admin from '../views/Admin'
import AddArticle from '../views/Admin/AddArticle'
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

const AdminRoutes = [
  {
    path: "/admin",
    component:Admin
  },
  {
    path: "/admin/add",
    component:AddArticle
  }
]
const routes = [
  { path: '/hello', component: hello },
  {
    path: '/',
    component: _import('Layout'),
    children: [
      {path:'js/',component:_import('Js')}
    ]
  },
  // {
  //   path: '/layout',
  //   component: _import('Layout'),
  //   children: [
  //     {path:'js',component:_import('Js')}
  //   ]
  // },
  
]
export default new Router({routes:[...AdminRoutes,...routes]})