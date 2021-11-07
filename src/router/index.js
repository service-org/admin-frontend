import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用VueRouter
Vue.use(VueRouter)

// 定义加载路由方法
const ViewComponent = path => import('@/views/' + path + '.vue')

// 全局路由-无需嵌套上左右布局
const globalRoutes = [{
    path: '/404',
    component: ViewComponent('common/404'),
    name: '404',
    meta: {
      title: '404',
    },
  },
  {
    path: '/login',
    component: ViewComponent('common/login'),
    name: 'login',
    meta: {
      title: '登录'
    }
  }
]

// 主入口路由-需要嵌套上左右布局
const mainRoutes = {
  path: '/',
  component: ViewComponent('main'),
  name: 'main',
  redirect: {
    name: 'home'
  },
  meta: {
    title: '主入口整体布局'
  },
  children: [{
      path: '/home',
      component: ViewComponent('common/home'),
      name: 'home',
      meta: {
        title: '首页'
      }
    },
    {
      path: '/theme',
      component: ViewComponent('common/theme'),
      name: 'theme',
      meta: {
        title: '主题'
      }
    },
    {
      path: '/demo-echarts',
      component: ViewComponent('demo/echarts'),
      name: 'demo-echarts',
      meta: {
        title: 'demo-echarts',
        isTab: true
      }
    },
    {
      path: '/demo-ueditor',
      component: ViewComponent('demo/ueditor'),
      name: 'demo-ueditor',
      meta: {
        title: 'demo-ueditor',
        isTab: true
      }
    }
  ],
  beforeEnter(to, from, next) {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({
        name: 'login'
      })
    }
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }]
})
