<template>
	<v-navigation-drawer
		v-model="drawer"
		app
	>
		<v-sheet
		color="grey lighten-4"
		class="pa-4"
		>
		<router-link :to="{ path: '/myProfile', query: { user_id: user.id }}">
			<v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
		</router-link>

			<div class="username">test</div>

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
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import firebase from "@/firebase/firebase"

	export default {
	data: () => ({
		drawer: null,
		links: [
		['mdi-inbox-arrow-down', 'rooms','/'],
		['mdi-send', 'users','/user'],
		['mdi-delete', 'messages','/about'],
		['mdi-alert-octagon', 'Logout','/about'],
		],
		user:[],
	}),
	// computed: {
	// 	userId () {
	// 	return 	this.$route.query.user_id;
	// 	}
	// },
	mounted() {
		this.getUser()
	},
	methods: {
		async getUser() {
			this.user = []
			// console.log("userId call", this.userId);//userIdの取得確認できず。
			const userRef = firebase.firestore().collection("users")
			const userDoc = await userRef.get()//←userDocはconsole上で、確認済
			const user = userDoc.data
			console.log(user);/*←【課題】userIdが取得できていない。この場合、userIDはどこから受け取り、どこで取得するのか？
			アイコンをクリックし、マイプロフィールへ画面遷移はできた。*/
			userDoc.forEach(doc => {
				let data = {
					id: doc.id
				}
				console.log(data)
				this.user.push(data)

				//this.friendsがpushした後にどういうデータが入っているか？
				// [{id: doc.id},{id: doc.id}]
				})
			},
		},
	}
</script>