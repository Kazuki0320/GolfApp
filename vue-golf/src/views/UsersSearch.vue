<template>
	<v-app id="inspire">
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ユーザー検索</v-toolbar-title>
		<v-spacer></v-spacer>
	</v-app-bar>
	<v-main>
		<v-container
		v-show="valid">
			<v-row>
				<v-col cols="6">
					<v-text-field
					label="ユーザー検索"
					clearable
					v-model="keyword">
					</v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="3">
					<v-btn
						color="secondary"
						to="/user">
						一覧に戻る
					</v-btn>
				</v-col>
				<v-col cols="3">
					<v-btn
						color="primary"
						@click="search"><!--firestoreで、検索した時の処理をmethodで書く必要がある-->
						検索する
					</v-btn>
				</v-col>
			</v-row>
		</v-container>

			<!-- <v-row>
				<v-col cols="12" md="6"
				v-for="(users, index) in searchResults" :key="users.index">
				<v-card class="mx-auto">-->
		<v-container
		v-show="isValid">
			<v-sheet
			color="grey lighten-4"
			class="pa-16"
			>
				<v-row>
					<v-col>
						<v-avatar
						class="mb-4"
						color="grey darken-1"
						size="64"
						>
						</v-avatar>
						<div class="username">{{ this.user.userName }}</div>
					</v-col>
				</v-row>
			</v-sheet>

				<v-btn
					color="primary"
					@click="submit">
					追加
				</v-btn>
		</v-container>
<!-- 
		<v-alert
			dense
			outlined
			type="error"
			v-if="errorMessage"
			class="error-message"
			>
			{{ errorMessage }}
		</v-alert> -->

		<!--
		<div id="app-1">
    <div v-show="checkflg">チェックが入るとこの要素が表示されます</div>
    
    <input type="checkbox" v-model="checkflg" /> チェックを入れる
</div>

<script>
new Vue({
    el: '#app-1',
    data: {
        checkflg : false,
    }
});
</script>
						<v-main>
		<v-container>
		<v-row>
			<v-col
			v-for="user in users"
			:key="user.id"
			cols="4"
			>
			this.friendsがpushした後にどういうデータが入っているか？
				[{id: doc.id},{id: doc.id}]
			
			<router-link :to="{ path: '/profile', query: { user_id: user.id }}">
			<v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
			</router-link>
			
			</v-col>
		</v-row>
		</v-container>
	</v-main>
				</v-card>
				</v-col>
			</v-row> -->
			
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
			<!-- <v-btn class="ma-2" color="primary" dark>キャンセル</v-btn>
			<v-btn class="ma-2" color="primary" dark>追加</v-btn> -->
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async created() {
		// this.users = []
		// console.log("userId call", this.userId)//userID取得確認OK
		// const userRef = firebase.firestore().collection("users").doc(this.userId)
		// const userDoc = await userRef.get()
		// const user = userDoc.data()
		// console.log("user", user);

		// 	const snapshot = await userRef.get()
		// 	snapshot.forEach(doc => {
		// 		console.log(doc.data())
		// 		this.users.push(doc.data())
		// 	// 	console.log("this.users call", this.users)
	},
	data: () => ({
		valid: true,
		user: '',
		keyword: '',
		searchResults: [],
		friendsArray: [],
		errormessage: ''
	}),
	methods: {
		async search() {

			// console.log("userId call", this.userId)//userID
			const userRef = firebase.firestore().collection("users").doc(this.keyword)
			const userDoc = await userRef.get()
			// console.log("userDoc call", userDoc);
			this.user = userDoc.data()
			// console.log("user", this.user);
			// this.user = user

			this.valid = !this.valid
			//[下記処理はemailや個人IDなどで検索する場合に使用する]
			// const userDoc = firebase.firestore().collection("users")
			// // console.log("userDoc", userDoc)
			// await userDoc.where("id", "==", this.keyword).get()
			// // console.log("query call", query)
			// .then((result) => {
			// 	console.log("success",result)
			// 	result.forEach((doc) => {
			// 	// doc.data() is never undefined for query doc snapshots
			// 	console.log(doc.id, " => ", doc.data());
			// 	});
			// })
			// .catch((error) => {
			// 	console.log("検索に失敗しました", error);
			// });
		},
		async submit () {
			const userDoc = firebase.firestore().collection("users").doc(this.userId)
			const userInfo =await userDoc.get()
			this.friendsArray = JSON.parse(userInfo.get("friends"))
			this.friendsArray.push(this.keyword)
			userDoc.update({
					friends: JSON.stringify(this.friendsArray)
				})
			console.log("friendsArray", this.friendsArray)

			this.$router.push('/user')

			// z5OszDyVMVcuNBDeR5XvOftNKz53
			// ["z5OszDyVMVcuNBDeR5XvOftNKz53", "6vDQs644K9XGlZTt3j67HXhfjbO2"]
			// .catch((error) => {
			// 		console.log("fail", error)
			// 		this.errorMessage = "友達追加に失敗しました"
			// })


			// logout() {
			// firebase.auth()
			// 	.signOut()
			// 	.then(() => {
			// 		localStorage.message = "ログアウトに成功しました"
			// 		this.$router.push('/login')
			// 	})
			// 	.catch((error) => {
			// 		console.log(error)
			// 	})
			// }
			// .catch((error) => {
			// 		console.log("fail", error)

			// 		this.errorMessage = "ユーザーのログインに失敗しました"
			// 	})

			// const userRef = firebase.firestore().collection("users").doc(this.user_id)
			// userRef.update({
			// 	email: this.user.email,
			// 	userName: this.user.userName
			// })
		},
	},
	computed:	{
		isValid () {
			return !this.valid
		},
		userId () {
		return 	this.$route.query.user_id;
		},
	},
}
</script>

<style scoped>
.username {
	margin-bottom: 10px;
}
.error-message {
	margin-top: 20px;
}
</style>