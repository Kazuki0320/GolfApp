<template>
	<v-app id="inspire">
	<sidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ユーザー</v-toolbar-title>

		<v-spacer></v-spacer>

		<!-- <v-btn icon>
		<v-icon>mdi-dots-vertical</v-icon>
		</v-btn> -->
		<router-link to="/usersSearch">
			<v-btn class="ma-2" color="primary" dark>ユーザー追加</v-btn>
		</router-link>
	</v-app-bar>

	<v-main>
		<v-container>
		<v-row>
			<v-col
			v-for="user in users"
			:key="user.id"
			cols="4"
			>
			<!--this.friendsがpushした後にどういうデータが入っているか？
				[{id: doc.id},{id: doc.id}]-->
			
			<router-link :to="{ path: '/profile', query: { user_id: user.id }}">
			<v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
			</router-link>
			
			</v-col>
		</v-row>
		</v-container>
	</v-main>
	</v-app>
</template>

<script>
import Sidebar from '@/components/layouts/Sidebar'
import firebase from "@/firebase/firebase"

export default {
	components: {
		Sidebar
	},
	mounted() {
		this.getUsers()

		this.auth = JSON.parse(sessionStorage.getItem('user'))// JSONからオブジェクトに変換
		// console.log("uid call", this.auth.uid)
	},
	data: () => ({
		users:[],
		user:[]
	}),
	methods: {
		async getUsers() {
			this.users = []
			const userRef = firebase.firestore().collection("users")
			const snapshot = await userRef.get()
			// console.log("snapshot call", snapshot);

			snapshot.forEach(doc => {
				let data = {
					id: doc.id
				}
				if(!(data.id == this.auth.uid)) {
					this.users.push(data)
				}else{
					// console.log("success")
				}
				// console.log("data1", data)

				//this.friendsがpushした後にどういうデータが入っているか？
				// [{id: doc.id},{id: doc.id}]
		})

		// snapshot.docs.map(doc => {
		// 	// const data = {
		// 	// 	name: doc.data().name,
		// 	// 	thumbnailUrl: doc.data().thumbnailUrl,
		// 	// 	createAt: doc.data().createAt
		// 	// }

		// 	const data = {...doc.data()}
		// 	data.id = doc.id
		// 	console.log(data)
		// 	this.rooms.push(data)
		// })

		},
	}
}
</script>