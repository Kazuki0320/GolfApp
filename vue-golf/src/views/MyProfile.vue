<template>
	<v-app id="inspire">
	<sidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>マイページ</v-toolbar-title>
		<v-spacer></v-spacer>
	</v-app-bar>
	<v-main>
		<!-- <v-btn
			class="mr-4"
			type="submit"
			:disabled="invalid"
			@click="submit"
		>
			submit
		</v-btn>
		<v-btn @click="clear">
			clear
		</v-btn> -->
		<router-link to="/editProfile">
			<v-btn color="primary" dark>マイページ編集</v-btn>
		</router-link>
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
	async created() {
			this.users = []
			// console.log("userId call", this.userId)//userID取得確認OK
			const userRef = firebase.firestore().collection("users").doc(this.userId)
			const userDoc = await userRef.get()
			const user = userDoc.data()
			console.log("user info", user);

			// userRef.collection('users').add({
			// 	name: this.auth.user.displayName,
			// 	email: this.auth.user.email,
			// 	uid: this.auth.user.uid,
			// 	refreshToken: this.auth.user.refreshToken
			// })
			// const roomRef = firebase.firestore().collection("rooms").doc(this.roomId)
			// 	roomRef.collection('messages').add({
			// 		message: this.body,
			// 		name: this.auth.displayName,
			// 		// photoURL: this.auth.photoURL,
			// 		createdAt: firebase.firestore.Timestamp.now()
			// 	})

		// 	const snapshot = await userRef.get()
		// 	snapshot.forEach(doc => {
		// 		console.log(doc.data())
		// 		this.users.push(doc.data())
		// 	// 	console.log("this.users call", this.users)
	},
	async mounted() {
		this.auth = JSON.parse(sessionStorage.getItem('user'))
		console.log("auth call", this.auth);

		// const userRef = await firebase.firestore().collection('users').add({
		// 		auth: this.auth
		// })
		// const userDoc = await userRef.get()
		// console.log("userDoc call", userDoc.data())
	},
	data: () => ({
		users:[],
		auth: null,
	}),
	computed: {
		userId () {
		return 	this.$route.query.user_id;
		},
	},
}
</script>