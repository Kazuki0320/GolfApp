<template>
	<v-app id="inspire">
	<DefaultSidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>フレンド</v-toolbar-title>

		<v-spacer></v-spacer>

		<router-link :to="{ path: '/usersSearch', query: { user_id: this.currentUserId}}">
			<v-btn class="ma-2" color="primary" dark>フレンド追加</v-btn>
		</router-link>
	</v-app-bar>

	<v-main>
		<v-container>
		<v-row>
			<v-col
			v-for="friend in friends"
			:key="friend.id"
			cols="4">
			<router-link :to="{ path: '/profile', query: { friend_id: friend.id }}">
				<v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
			</router-link>
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
	async created() {
		//ログインユーザーの情報をusersから取得
		this.currentUserId = firebase.auth().currentUser.uid
		const userRef = firebase.firestore().collection("users").doc(this.currentUserId)
		const userGet = await userRef.get()
		const userData = userGet.data()
		if (userData == undefined) return

		//ログインユーザーがフレンドを持っている場合、friendsArrayでデータを一つにまとめる。
		const friendsArray = userData.friends
		friendsArray.forEach(doc => {
			let friendData = {
				id: doc
			}
			this.friends.push(friendData)
		})
	},
	data: () => ({
		currentUserId:'',
		friends:[]
	}),
}
</script>
