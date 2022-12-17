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
// import ConfirmedOrUndetermined from '../views/ConfirmedOrUndetermined.vue'
import RoomCreateConfirmed from '../views/RoomCreateConfirmed.vue'
import MemberConfirmed from '../views/MemberConfirmed.vue'
import RoomJoinConfirmed from '../views/RoomJoinConfirmed.vue'
import SurveyEdit from '../views/SurveyEdit.vue'
import SurveyConfirmed from '../views/SurveyConfirmed.vue'
import SurveyAnswer from '../views/SurveyAnswer.vue'
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
    path: '/surveyEdit',
    name: 'SurveyEdit',
    component: SurveyEdit
  },
  {
    path: '/surveyConfirmed',
    name: 'SurveyConfirmed',
    component: SurveyConfirmed
  },
  {
    path: '/surveyAnswer',
    name: 'SurveyAnswer',
    component: SurveyAnswer
  },
  {
    path: '/usersSearch',
    name: 'UsersSearch',
    component: UsersSearch
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/chat',
    name: 'ChatBoard',
    component: ChatBoard
  },
  {
    path: '/user',
    name: 'UsersList',
    component: UsersList
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/myProfile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/editProfile',
    name: 'EditProfile',
    component: EditProfile
  },
  {
    path: '/roomCreateConfirmed',
    name: 'RoomCreateConfirmed',
    component: RoomCreateConfirmed
  },
  {
    path: '/memberConfirmed',
    name: 'MemberConfirmed',
    component: MemberConfirmed
  },
  {
    path:'/roomJoinConfirmed',
    name: 'RoomJoinConfirmed',
    component: RoomJoinConfirmed
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
	// console.log("requiresAuth", requiresAuth);
	if(requiresAuth) {
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
          // Firestore にユーザー用のドキュメントが作られていなければ作る
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

// firebase.auth().onAuthStateChanged(async (user) => {
//   // 未ログイン時
//   if (!user) {
//     // 匿名ログインする
//     firebase.auth().signInAnonymously();
//   }
//   // ログイン時
//   else {
//     // ログイン済みのユーザー情報があるかをチェック
//     var userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
//     if (!userDoc.exists) {
//       // Firestore にユーザー用のドキュメントが作られていなければ作る
//       await userDoc.ref.set({
//         screen_name: user.uid,
//         display_name: '名無しさん',
//         created_at: firebase.firestore.FieldValue.serverTimestamp(),
//       });

export default router
