import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/firebase/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'roomList',
    component: () => import('@/views/roomList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/newSurvey',
    name: 'NewSurvey',
    component: () => import(/* webpackChunkName: "survey" */ '@/views/NewSurvey.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/surveyConfirmed',
    name: 'SurveyConfirmed',
    component: () => import(/* webpackChunkName: "survey" */ '@/views/SurveyConfirmed.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/surveyAnswer',
    name: 'SurveyAnswer',
    component: () => import(/* webpackChunkName: "survey" */ '@/views/SurveyAnswer.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/surveyAnswerConfirmed',
    name: 'SurveyAnswerConfirmed',
    component: () => import(/* webpackChunkName: "survey" */ '@/views/SurveyAnswerConfirmed.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/surveyResultsAnswer',
    name: 'SurveyResultsAnswer',
    component: () => import(/* webpackChunkName: "survey" */ '@/views/SurveyResultsAnswer.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/surveyResults',
    name: 'SurveyResults',
    component: () => import(/* webpackChunkName: "survey" */ '@/views/SurveyResults.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/usersSearch',
    name: 'UsersSearch',
    component: () => import(/* webpackChunkName: "users" */ '@/views/UsersSearch.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUp.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/chat',
    name: 'ChatBoard',
    component: () => import(/* webpackChunkName: "chat" */ '@/views/ChatBoard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'UsersList',
    component: () => import(/* webpackChunkName: "users" */ '@/views/UsersList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "users" */ '@/views/UserProfile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/myProfile',
    name: 'MyProfile',
    component: () => import(/* webpackChunkName: "users" */ '@/views/MyProfile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/editProfile',
    name: 'EditProfile',
    component: () => import(/* webpackChunkName: "users" */ '@/views/EditProfile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/roomCreate',
    name: 'RoomCreate',
    component: () => import(/* webpackChunkName: "room" */ '@/views/RoomCreate.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/roomCreateConfirmed',
    name: 'RoomCreateConfirmed',
    component: () => import(/* webpackChunkName: "room" */ '@/views/RoomCreateConfirmed.vue'),
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes
})

// グローバルナビゲーションガード
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresGuest && currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router

