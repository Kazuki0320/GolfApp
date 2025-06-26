<template>
	<v-navigation-drawer
		v-model="drawer"
		app
	>
		<v-sheet color="grey lighten-4" class="pa-4">
			<!--マイプロフィールにuserのIDをqueryとして渡している-->
			<router-link :to="{ path: '/myProfile', query: { user_id: userId } }">
				<v-avatar color="indigo">
					<v-icon dark>
						mdi-account-circle
					</v-icon>
				</v-avatar>
			</router-link>
			<div v-if="userInfo" class="username">{{ userInfo.userName }}</div>
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
			<router-link :to="{ path: '/newSurvey', query: { user_id: userId } }">
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

				<!--追加処理-->
				<router-link to="/surveyResults">
				<v-list-item>
					<v-list-item-icon>
						<v-icon color="blue">
							mdi-account-eye
						</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							アンケート結果
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
import { auth, firestore } from "@/firebase/firebase"

export default {
	data() {
		return {
			drawer: null,
			links: [
				['mdi-door-open', 'ルーム', '/'],
				['mdi-account-multiple', 'フレンド', '/user'],
			],
			userId: null,
			userInfo: null
		}
	},
	async created() {
		try {
			const user = auth.currentUser
			if (user) {
				this.userId = user.uid
				const userDoc = await firestore.collection("users").doc(user.uid).get()
				if (userDoc.exists) {
					this.userInfo = userDoc.data()
				} else {
					console.error('ユーザー情報が見つかりません')
				}
			} else {
				console.error('ユーザーが認証されていません')
				this.$router.replace('/login')
			}
		} catch (error) {
			console.error('ユーザー情報の取得に失敗しました:', error)
			this.$router.replace('/login')
		}
	},
	methods: {
		async logout() {
			try {
				await auth.signOut()
				localStorage.message = "ログアウトに成功しました"
				this.$router.replace('/login')
			} catch (error) {
				console.error('ログアウトに失敗しました:', error)
			}
		}
	}
}
</script>
