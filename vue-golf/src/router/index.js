import Vue from 'vue'
import VueRouter from 'vue-router'
import roomList from '../views/roomList.vue'
import ChatBoard from '../views/ChatBoard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'roomList',
    component: roomList
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/chat',
    name: 'ChatBoard',
    component: ChatBoard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
