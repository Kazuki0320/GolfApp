<template>
	<v-app id="inspire">
	<DefaultSidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ルーム一覧</v-toolbar-title>

		<v-spacer></v-spacer>

		<router-link :to="{ path: '/roomCreate', query: { user_id: this.currentUserId }}">
			<v-btn class="ma-2" color="primary" dark>ルーム作成</v-btn>
		</router-link>
	</v-app-bar>

	<v-main>
		<v-container>
		<v-row>
			<v-col
			v-for="(room, index) in rooms"
			:key="`${room.doc.id}_${index}`"
			cols="4"
			>
			<router-link :to="{ path: '/chat', query: { room_id: room.doc.id }}">
				<v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
			</router-link>
			<div></div>

			</v-col>
		</v-row>
		</v-container>
	</v-main>
	</v-app>
</template>

<script>
import DefaultSidebar from '@/components/layouts/DefaultSidebar'
import firebase from "@/firebase/firebase"

export default {
	components: {
		DefaultSidebar
	},
	created() {
	//[ルーム作成ボタンを押した際、userIdを次の遷移先へ渡すための処理]
	this.currentUserId = firebase.auth().currentUser.uid

	//[ルームを日付順に降順処理]+[ログインユーザーが招待されているグループの探索処理]
	const roomRef = firebase.firestore().collection("rooms")
	roomRef.onSnapshot(async snapshot => {
		const roomRef = firebase.firestore().collection("rooms").orderBy('createdAt', "desc")
		const memberGet = await roomRef.where("members_id", "array-contains",  this.currentUserId).get()
			memberGet.docChanges().forEach(change => {
				if (this.rooms.length === 0) {//1回目は必ずpush
					this.rooms.push(change)
				} else {
					let existenceCheck = true
					this.rooms.forEach(val =>{
						if (change.doc.id === val.doc.id) {
							existenceCheck = false
						}
					})
					if (existenceCheck) this.rooms.push(change)
				}
			})
		})
	},
	data: () => ({
		currentUserId: '',
		rooms:[],
		user:'',
		users:[],
		open: false,
		auth: null
	}),
}
</script>
