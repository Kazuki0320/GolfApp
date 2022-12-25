<template>
	<v-navigation-drawer
		v-model="drawer"
		app
	>
	
		<v-sheet color="grey lighten-4" class="pa-4">
			<router-link 
			:to="{ path: '/myProfile', query: { user_id: this.user.id }}">
				<v-avatar color="indigo">
					<v-icon dark>
						mdi-account-circle
					</v-icon>
				</v-avatar>
			</router-link>
			<div class="username">{{ userInfo.userName }}</div>
		</v-sheet>


		<v-list>
		<v-list-item
			v-for="[icon, text, to] in links"
			:key="icon"
			:to="to"
			link
		>
			<v-list-item-icon>
				<v-icon>{{ icon }}</v-icon>
			</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title>{{ text }}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>

		<router-link :to="{ path: '/surveyEdit', query: { user_id: this.user.id }}">
			<v-list-item>
				<v-list-item-icon>
					<v-icon color="blue">
						mdi-hand-wave-outline
					</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>フレンドを誘う</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</router-link>

		<v-list-item @click="logout">
			<v-list-item-icon>
				<v-icon color="blue">
					mdi-logout
				</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				<v-list-item-title>ログアウト</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import firebase from "@/firebase/firebase"

	export default {
	async mounted() {
		// this.getUser()

		this.auth = JSON.parse(sessionStorage.getItem('user'))// JSONからオブジェクトに変換
		// console.log("uid", this.auth)
		const userRef = firebase.firestore().collection("users")
			const snapshot = await userRef.get()
			snapshot.forEach(doc => {
				let data = {
					id: doc.id
				}
				if(this.auth.uid == data.id) {
					this.user = data
				}else{
					// console.log("success")
				}
				// console.log("user", this.user.id)
			})

		const userDoc = firebase.firestore().collection("users").doc(this.user.id)
		const userData = await userDoc.get()
		this.userInfo = userData.data()
		// console.log("userInfo", this.userInfo)

		// console.log("user call", this.user)
		// const userDoc = userRef.data("QB7G6ur0aWglrXbfM8xaWTSePr93")
		// console.log("userDoc", userDoc)
		// const user = userDoc.data()
		// console.log("user info", user)

		// this.email = this.auth.email
		// const userRef = await firebase.firestore().collection('users').add({
		// 		email: this.email
		// })
		// console.log("email call", userRef);//ログイン情報と紐づくようになった。
		
		// console.log("auth call", this.auth);
		// const email = this.auth.email;
		// console.log("email call", email);
		// const displayName = this.auth.displayName
		// console.log("displayName call", displayName)

		// if(!auth) {
		// 	sessionStorage.removeItem(auth)
		// 	this.$router.push('/login')
		// }
		// this.auth = JSON.parse(sessionStorage.getItem('user'))
	},
	async created () {
		// const userRef = firebase.firestore().collection("users").doc(this.user.id)
		// console.log("userRef call", userRef)
		// const userDoc = await userRef.get()
		// console.log("userDoc", userDoc)
		// const user = userDoc.data()
		// console.log("user", user)
		// const user = userDoc.data()
		// // console.log("user info", user);
		// this.userInfo = user
		// console.log("userInfo", this.userInfo)
	},
	data: () => ({
		drawer: null,
		links: [
		['mdi-door-open', 'ルーム','/'],
		['mdi-account-multiple', 'ユーザー','/user'],
		// ['mdi-door', 'ルーム作成','/roomCreateConfirmed'],
		// ['mdi-hand-wave-outline', 'フレンドを誘う','/surveyEdit'],
		],
		user:'',
		userInfo:'',
		auth: null,
		email: '',
		displayName: ''
	}),
	// computed: {
	// 	userId () {
	// 	return 	this.$route.query.user_id;
	// 	}
	// },
	methods: {
		getAuth() {
			return firebase.auth().onAuthStateChanged((user) => {
				return user
			})
		},
		// async getUsers() {
		// 	const roomRef = firebase.firestore().collection("users")
		// 	const snapshot = await roomRef.get()
		// 	// console.log("snapshot call", snapshot);

		// }
		// async getUser() {

		// },
		logout() {
			firebase.auth()
				.signOut()
				.then(() => {
					localStorage.message = "ログアウトに成功しました"
					this.$router.push('/login')
				})
				.catch((error) => {
					console.log(error)
				})
			}
		},
	}
</script>