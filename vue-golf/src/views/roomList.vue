<template>
	<v-app id="inspire">
	<sidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ルーム一覧</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-btn icon>
		<v-icon>mdi-dots-vertical</v-icon>
		</v-btn>
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
	data: () => ({
		rooms:[]
	}),
	mounted() {
		this.getRooms()
	},
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
				console.log("this.room call", this.rooms)

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
	}
}
</script>