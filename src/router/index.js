import Vue from 'vue'
import VueRouter from 'vue-router'
import roomList from '../views/roomList.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import ChatBoard from '../views/ChatBoard.vue'
import UsersList from '../views/UsersList.vue'
import UserProfile from '../views/UserProfile.vue'
import MyProfile from '../views/MyProfile.vue'
import EditProfile from '../views/EditProfile.vue'
import RoomCreate from '../views/RoomCreate.vue'
import RoomCreateConfirmed from '../views/RoomCreateConfirmed.vue'
import NewSurvey from '../views/NewSurvey.vue'
import SurveyConfirmed from '../views/SurveyConfirmed.vue'
import SurveyAnswer from '../views/SurveyAnswer.vue'
import SurveyAnswerConfirmed from '../views/SurveyAnswerConfirmed.vue'
import SurveyResults from '../views/SurveyResults.vue'
import SurveyResultsAnswer from '../views/SurveyResultsAnswer.vue'
import UsersSearch from '../views/UsersSearch.vue'

import firebase from "@/firebase/firebase"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'roomList',
    component: roomList,
    meta: { requiresAuth: true }
  },
  {
    path: '/newSurvey',
    name: 'NewSurvey',
    component: NewSurvey,
    meta: { requiresAuth: true }
  },
  {
    path: '/surveyConfirmed',
    name: 'SurveyConfirmed',
    component: SurveyConfirmed,
    meta: { requiresAuth: true }
  },
  {
    path: '/surveyAnswer',
    name: 'SurveyAnswer',
    component: SurveyAnswer,
    meta: { requiresAuth: true }
  },
  {
    path: '/surveyAnswerConfirmed',
    name: 'SurveyAnswerConfirmed',
    component: SurveyAnswerConfirmed,
    meta: { requiresAuth: true }
  },
  {
    path: '/surveyResultsAnswer',
    name: 'SurveyResultsAnswer',
    component: SurveyResultsAnswer,
    meta: { requiresAuth: true }
  },
  {
    path: '/surveyResults',
    name: 'SurveyResults',
    component: SurveyResults,
    meta: { requiresAuth: true }
  },
  {
    path: '/usersSearch',
    name: 'UsersSearch',
    component: UsersSearch,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/chat',
    name: 'ChatBoard',
    component: ChatBoard,
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'UsersList',
    component: UsersList,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/surveyAnswerConfirmed',
    name: 'SurveyAnswerConfirmed',
    component: SurveyAnswerConfirmed,
    meta: { requiresAuth: true }
  },
  {
    path: '/myProfile',
    name: 'MyProfile',
    component: MyProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/editProfile',
    name: 'EditProfile',
    component: EditProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/roomCreate',
    name: 'RoomCreate',
    component: RoomCreate,
    meta: { requiresAuth: true }
  },
  {
    path: '/roomCreateConfirmed',
    name: 'RoomCreateConfirmed',
    component: RoomCreateConfirmed,
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if(requiresAuth) {
    //ユーザーがログイン済みかどうか確認する処理:onAuthStateChanged
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
          let userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          if (!userDoc.exists) {
          // 新規登録時に、firestore にユーザーIDがなければ新しいIDを作る。
          await userDoc.ref.set({
              userName: user.displayName,
              email: user.email,
          });
        }
      }
    })
  }else {
    next()
  }
  })

export default router

