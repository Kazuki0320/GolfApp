<template>
	<v-navigation-drawer v-model="drawer" app>

		<v-sheet color="grey lighten-4" class="pa-4">
			<!--マイプロフィールにuserのIDをqueryとして渡している-->
			<router-link :to="{ path: '/myProfile', query: { user_id: this.user.id } }">
				<v-avatar color="indigo">
					<v-icon dark>
						mdi-account-circle
					</v-icon>
				</v-avatar>
			</router-link>
			<div class="username">{{ userInfo.userName }}</div>
		</v-sheet>

		<v-list>
			<v-list-item v-for="[icon, text, to] in links" :key="icon" :to="to" link>
				<v-list-item-icon>
					<v-icon>{{ icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ text }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<!--アンケート作成画面にユーザーIDを渡している-->
			<router-link :to="{ path: '/newSurvey', query: { user_id: this.user.id } }">
				<v-list-item>
					<v-list-item-icon>
						<v-icon color="blue">
							mdi-hand-wave-outline
						</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							フレンドを誘う
						</v-list-item-title>
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
					<v-list-item-title>
						ログアウト
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async mounted() {
		this.auth = JSON.parse(sessionStorage.getItem('user'))// JSONからオブジェクトに変換
		//collection("users")から、ログインユーザーと同じIDを検索する処理
		const userRef = firebase.firestore().collection("users")
		const snapshot = await userRef.get()
		snapshot.forEach(doc => {
			let data = {
				id: doc.id
			}
			if (this.auth.uid == data.id) {
				this.user = data
			} else {
				//消したらエラーになるかも？
				// console.log("success")
			}
		})

		//検索したIDから、user情報を取得する処理
		const userDoc = firebase.firestore().collection("users").doc(this.user.id)
		const userData = await userDoc.get()
		this.userInfo = userData.data()
	},
	data: () => ({
		drawer: null,
		links: [
			['mdi-door-open', 'ルーム', '/'],
			['mdi-account-multiple', 'ユーザー', '/user'],
		],
		user: '',
		userInfo: '',
		auth: null,
	}),
	methods: {
		logout() {
			firebase.auth()
				.signOut()
				.then(() => {
					localStorage.message = "ログアウトに成功しました"
					this.$router.push('/UserLogin')
				})
				.catch((error) => {
					console.log(error)
				})
		}
	},
}
</script>