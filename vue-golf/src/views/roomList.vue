<template>
	<v-app id="inspire">
	<sidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ルーム一覧</v-toolbar-title>

		<v-spacer></v-spacer>

		<!--ルーム作成画面にuser.idを渡す必要がある-->
		<!-- <router-link :to="{ path: '/roomCreateConfirmed', query: { user_id: user.id }}"> -->
		<router-link :to="{ path: '/roomCreateConfirmed', query: { user_id: this.user.id }}">
			<v-btn class="ma-2" color="primary" dark>ルーム作成</v-btn>
		</router-link>
				<!-- <v-btn class="ma-2" color="primary" dark>ルーム作成</v-btn>
			<v-icon dark right>mdi-checkbox-marked-circle</v-icon> ←チョンマークを表示してくれるv-iconディレクティブ -->
	</v-app-bar>

	<v-main>
		<v-container>
		<v-row>
			<v-col
			v-for="room in rooms"
			:key="room.id"
			cols="4"
			>
			<!--this.roomsがpushした後にどういうデータが入っているか？
				[{id: doc.id},{id: doc.id}]-->
				
			<!--ここで/chatのパスのqueryとして、idを設定している
			↓pathとqueryで、room_idを取得してきてる。（ここがChatBoard.vueの$routerと紐づいてる)
			-->
			<router-link :to="{ path: '/chat', query: { room_id: room.id }}">
				<v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
			</router-link>
			<div>グループ1</div>
			
			</v-col>
		</v-row>
		<!-- <v-row>
			<v-col
			v-for="n in 24"
			:key="n"
			cols="4"
			>

			<router-link :to="{ path: '/chat', query: { room_id: n }}">
				<v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
			</router-link>
			
			</v-col>
		</v-row> -->
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
	async mounted() {
		this.getRooms()
		// this.getUser()

		this.auth = JSON.parse(sessionStorage.getItem('user'))// JSONからオブジェクトに変換
		// console.log("uid call", this.auth)

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
				console.log("user", this.user.id)
			})
		// this.auth = JSON.parse(sessionStorage.getItem('user'))
		// console.log("auth call roomlist", this.auth);
	},
	data: () => ({
		rooms:[],
		user:'',
		users:[],
		open: false,
		auth: null
	}),
	methods: {
		async getRooms() {
			this.rooms = []
			const roomRef = firebase.firestore().collection("rooms")
			const snapshot = await roomRef.get()

			snapshot.forEach(doc => {
				let data = {
					id: doc.id
				}
				// console.log(data)
				this.rooms.push(data)
				// console.log("this.room call", this.rooms)

				//this.roomsがpushした後にどういうデータが入っているか？
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
		// async getUser() {
		// 	const userRef = firebase.firestore().collection("users")
		// 	const snapshot = await userRef.get()
		// 	// console.log("snapshot call", snapshot);

		// 	snapshot.forEach(doc => {
		// 		let data = {
		// 			id: doc.id
		// 		}
		// 		if(!(data.id == this.auth.uid)) {
		// 			this.users.push(data)
		// 			console.log("data", this.users)
		// 		}else{
		// 			// console.log("success")
		// 		}
		// 	})
		// }
	}
}
</script>