<template>
	<v-app id="inspire">
	<sidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ルーム一覧</v-toolbar-title>

		<v-spacer></v-spacer>

		<router-link :to="{ path: '/roomCreateConfirmed', query: { user_id: this.user.id }}">
			<v-btn class="ma-2" color="primary" dark>ルーム作成</v-btn>
		</router-link>
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

	// JSON.parseでJSONからオブジェクトに変換
	this.auth = JSON.parse(sessionStorage.getItem('user'))
	const userRef = firebase.firestore().collection("users")
		const snapshot = await userRef.get()
		snapshot.forEach(doc => {
			let data = {
				id: doc.id
			}
			if(this.auth.uid === data.id) {
				this.user = data
			}else{
				// console.log("success")
			}
		})
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
			const roomRef = firebase.firestore().collection("rooms")
			const snapshot = await roomRef.get()

			snapshot.forEach(doc => {
				let data = {
					id: doc.id
				}
				this.rooms.push(data)
			})
		},
	}
}
</script>