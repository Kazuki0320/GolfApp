<template>
	<v-app id="inspire">
	<sidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ユーザープロフィール</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-btn icon>
		</v-btn>
	</v-app-bar>

	
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
			console.log("userId call", this.userId)//userID
			const userRef = firebase.firestore().collection("users").doc(this.userId)
			const userDoc = await userRef.get()
			console.log("userDoc call", userDoc);
			const user = userDoc.data()
			console.log("user", user);

		// 	snapshot.forEach(doc => {
		// 		console.log(doc.data())
		// 		this.users.push(doc.data())
		// 	// 	console.log("this.users call", this.users)
	},
	data: () => ({
		users:[]
	}),
	computed: {
		userId () {
		return 	this.$route.query.user_id;
		},
	},
	methods: {

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
	}
}
</script>