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
import Sidebar from '@/components/layouts/Sidebar'
import firebase from "@/firebase/firebase"

export default {
	components: {
		Sidebar
	},
	mounted() {
		this.getUserId()

		this.auth = JSON.parse(sessionStorage.getItem('user'))// JSONからオブジェクトに変換
		// console.log("uid call", this.auth.uid)
	},
	data: () => ({
		user:'',
		friends:[]
	}),
	methods: {
		/*下記処理は、ドキュメントIDの中でログインしてるユーザー以外のIDを取得する処理を書いてる。
		→ログインしてるユーザーのフレンドのみを表示する処理に変更する。
		→そこから、userIdをユーザー追加の画面へ渡す
		→ルーム作成のボタンをルームリストに作成する
		*/
		async getUserId() {
			const userRef = firebase.firestore().collection("users")
			const snapshot = await userRef.get()
			// console.log("snapshot call", snapshot);

			snapshot.forEach(doc => {
				let data = {
					id: doc.id
				}
				if(data.id == this.auth.uid) {
					this.user = data
				}
				//this.friendsがpushした後にどういうデータが入っているか？
				// [{id: doc.id},{id: doc.id}]
			})

			const userDoc = firebase.firestore().collection("users").doc(this.user.id)
			const userInfo = await userDoc.get()
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