<template>
	<v-navigation-drawer
		v-model="drawer"
		app
	>
	
		<v-sheet color="grey lighten-4" class="pa-4">
			<router-link :to="{ path: '/myProfile', query: { user_id: user.id }}">
				<v-avatar color="indigo">
					<v-icon dark>
						mdi-account-circle
					</v-icon>
				</v-avatar>
			</router-link>
			<div class="username">{{ auth && auth.displayName }}</div>
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
		<v-list-item @click="logout">
			<v-list-item-icon>
				<v-icon color="blue">
					mdi-logout
				</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				<v-list-item-title>Logout</v-list-item-title>
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
		console.log("uid", this.auth.uid)
		const userRef = firebase.firestore().collection("users")
			const snapshot = await userRef.get()
			snapshot.forEach(doc => {
				let data = {
					id: doc.id
				}
				const user = data
				console.log("data call", user)
			})
			// if(this.auth.uid == this.user.id) {
			// 	firebase.firestore().collection("users").get()
			// }
		/*[やりたいこと]
		・sessionStorageから取得してきたログイン情報のuidとfirestore上のユーザードキュメントを比較して、
		ログインしているuidと同じIDを見つけたら、firestore上からその人の情報を取得してくる。
		*/
		// console.log("userId call", this.userId)//全部のドキュメントのIDを取得確認
		

		// console.log("userData", this.user)
		// if(this.auth.uid == )

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
	data: () => ({
		drawer: null,
		links: [
		['mdi-door-open', 'rooms','/'],
		['mdi-account-multiple', 'users','/user'],
		// ['mdi-message', 'messages','/about'],
		],
		user:'',
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
		// 	this.users = []
		// 	const roomRef = firebase.firestore().collection("users")
		// 	const snapshot = await roomRef.get()
		// 	// console.log("snapshot call", snapshot);

		// 	snapshot.forEach(doc => {
		// 		let data = {
		// 			id: doc.id
		// 		}
		// 		console.log(data)
		// 		this.users.push(data)

		// 		//this.friendsがpushした後にどういうデータが入っているか？
		// 		// [{id: doc.id},{id: doc.id}]
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