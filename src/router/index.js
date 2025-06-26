import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "@/firebase/firebase"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'roomList',
    component: () => import(/* webpackChunkName: "room-list" */ '@/views/roomList.vue'),
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
    name: 'Login',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/Login.vue'),
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/SignUp.vue'),
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

// グローバルな認証状態
let isAuthenticated = false
let authInitialized = false

// 認証状態の監視を設定
firebase.auth().onAuthStateChanged((user) => {
  isAuthenticated = !!user
  authInitialized = true
})

router.beforeEach(async (to, from, next) => {
  // 認証の初期化が完了するまで待機
  if (!authInitialized) {
    await new Promise(resolve => {
      const unsubscribe = firebase.auth().onAuthStateChanged(() => {
        unsubscribe()
        resolve()
      })
    })
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router

