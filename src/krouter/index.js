import Vue from 'vue'
import VueRouter from '../plugins/kvue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [{
      path: '/about/info',
      component: { render(h) { return h('div', 'info page') } }
    },{
      path: '/about/user',
      component: { render(h) { return h('div', 'user page') } }
    }]
  },
  {
    path: '/console',
    name: 'console',
    component: () => import('../views/Console.vue'),
    children: [
      {
        path: '/console/page1',
        component: { render(h) { return h('div', ['console page1', h('p','子h'), 'page1 下的子内容']) } }
      }, {
        path: '/console/page2',
        component: { render(h) { return h('div', 'console page2') } }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
