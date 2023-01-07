<template>
	<v-app id="inspire">
	<DefaultSidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ユーザー</v-toolbar-title>

		<v-spacer></v-spacer>

		<!-- <v-btn icon>
		<v-icon>mdi-dots-vertical</v-icon>
		</v-btn> -->
				<router-link :to="{ path: '/usersSearch', query: { user_id: this.user.id}}">
					<v-btn class="ma-2" color="primary" dark>ユーザー追加</v-btn>
				</router-link>
	</v-app-bar>

	<v-main>
		<v-container>
		<v-row>
			<v-col
			v-for="friend in friends"
			:key="friend.id"
			cols="4">
			<!--this.friendsがpushした後にどういうデータが入っているか？
				[{id: doc.id},{id: doc.id}]-->

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
	mounted() {
		this.getUserId()
	},
	data: () => ({
		user:'',
		friends:[]
	}),
	methods: {
		async getUserId() {
			const userRef = firebase.firestore().collection("users")
			const snapshot = await userRef.get()
      const currentUserId = firebase.auth().currentUser.uid

			snapshot.forEach(doc => {
				let data = {
					id: doc.id
				}
				if(currentUserId === data.id) {
					this.user = data
				}
				//this.friendsがpushした後にどういうデータが入っているか？
				// [{id: doc.id},{id: doc.id}]
			})

			const userDoc = firebase.firestore().collection("users").doc(this.user.id)
			const userInfo = await userDoc.get()
			if (userInfo != undefined) return

			const friendsArray =JSON.parse(userInfo.get("friends"))
			friendsArray.forEach(doc => {
				let friendData = {
					id: doc
				}
				this.friends.push(friendData)
				console.log("friendData", this.friends)
			})
			// console.log("userId friend", this.friends)

			// let arr = ['first', 'second', 'third'];
			// let obj = {};
			// arr.forEach((element, index) => {
			// obj['key' + index] = element;
			// });
			//
			// console.log(obj);
			// const friendDoc =firebase.firestore().collection("users").doc(this.friends)
			// console.log("friendDoc", friendDoc)
			// const userInfo = userId.data()
			// const friend =userInfo.data("friends")
			// console.log("friend", friend)

					// const postRef = db.collection('posts').doc('AOPFbwazI7HoE2ofXm5Q')
			// const postDoc = await postRef.get() // firebase.firestore.DocumentSnapshotのインスタンスを取得
			// if (postDoc.exists) {
			//   console.log(postDoc.id)
			//   console.log(postDoc.data())
			//   console.log(postDoc.get('title'))
			// } else {
			//   console.log('No such document!')
			// }
			// var docRef = db.collection("cities").doc("SF");
			// docRef.get().then(function(doc) {
				// if (doc.exists) {
					// console.log("Document data:", doc.data());
				// } else {
					// console.log("No such document!");
				// }
			// }).catch(function(error) {
				// console.log("Error getting document:", error);
			// });
		},
	}
}
</script>
