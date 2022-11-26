<template>
	<v-app id="inspire">
	<sidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ユーザー一覧</v-toolbar-title>

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
	created() {
		console.log("created call");
	},
	data: () => ({
		users:[]
	}),
	computed: {
		userId () {
		return 	this.$route.query.user_id;
		},
	},
	mounted() {
		this.getUsers()
	},
	methods: {
		//ここの処理をcreatedの中に書き換える←明日やる
		async getUsers() {
			this.users = []
			console.log("userId call", this.userId)//userID取得確認OK
			const userRef = firebase.firestore().collection("users").doc(this.userId)
			const userDoc = await userRef.get()
			const user = userDoc.data()
			console.log("user", user);

		// 	const snapshot = await userRef.get()
		// 	snapshot.forEach(doc => {
		// 		console.log(doc.data())
		// 		this.users.push(doc.data())
		// 	// 	console.log("this.users call", this.users)

		// 		//this.friendsがpushした後にどういうデータが入っているか？
		// 		// [{id: doc.id},{id: doc.id}]
		// })

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