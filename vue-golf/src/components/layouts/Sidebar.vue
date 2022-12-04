<template>
	<v-navigation-drawer
		v-model="drawer"
		app
	>
	
		<v-sheet
			color="grey lighten-4"
			class="pa-4"
			v-for="user in users"
			:key="user.id"
			cols="4"
		>
			<router-link :to="{ path: '/myProfile', query: { user_id: user.id }}">
			<v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
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
	mounted() {
		this.getUsers()

		this.auth = JSON.parse(sessionStorage.getItem('user'))
	},
	data: () => ({
		drawer: null,
		links: [
		['mdi-door-open', 'rooms','/'],
		['mdi-account-multiple', 'users','/user'],
		// ['mdi-message', 'messages','/about'],
		],
		users:[],
		auth: null
	}),
	// computed: {
	// 	userId () {
	// 	return 	this.$route.query.user_id;
	// 	}
	// },
	methods: {
		async getUsers() {
			this.users = []
			const userRef = firebase.firestore().collection("users")
			const snapshot = await userRef.get()

			snapshot.forEach(doc => {
				let data = {
					id: doc.id
				}
				// console.log("data call", data);
				this.users.push(data);
				// this.roomsがpushした後にどういうデータが入っているか？
				// [{id: doc.id},{id: doc.id}]
			})
		},
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