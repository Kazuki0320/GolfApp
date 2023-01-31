<template>
	<v-app id="inspire">
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>フレンド検索</v-toolbar-title>
		<v-spacer></v-spacer>
	</v-app-bar>
	<v-main>
		<v-container
		v-show="!isValid">
			<v-row>
				<v-col cols="6">
					<v-text-field
					label="フレンド検索"
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
						@click="search">
						検索する
					</v-btn>
				</v-col>
			</v-row>
		</v-container>

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
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async created() {
	},
	data: () => ({
		valid: true,
		user: '',
		keyword: '',
		searchResults: [],
		friendsArray: [],
		errormessage: '',
		userDoc: '',
		userInfo: '',
	}),
	methods: {
		async search() {
			const userRef = firebase.firestore().collection("users").doc(this.keyword)
			const userDoc = await userRef.get()
			this.user = userDoc.data()

			this.valid = !this.valid
			//[下記処理はemailや個人IDなどで検索する場合に使用する]
			// const userDoc = firebase.firestore().collection("users")
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
			//ログインユーザーが持ってるfriendsに、検索したユーザーを追加する処理
			this.userDoc = firebase.firestore().collection("users").doc(this.userId)
			const userGet = await this.userDoc.get()
			this.userInfo = userGet.data()

			// ログインユーザーがfriendsを持ってない場合の処理
			if (this.userInfo.friends == undefined) {
				this.friendsArray.push(this.keyword)
				this.userDoc.update({
					friends: this.friendsArray
				})
			} else {
				this.friendsArray = this.userInfo.friends
				this.friendsArray.push(this.keyword)
				this.userDoc.update({
					friends: this.friendsArray
				})
			}

			//非同期関数だったら、catchが使えるようになる。
			//async/awaitを調べる。
			// .catch((error) => {
			// 		console.log("fail", error)
			// 		this.errorMessage = "友達追加に失敗しました"
			// })

			this.$router.push('/user')
		},
	},
	computed:	{
		isValid () {
			return !this.valid //this.userに値があるかどうかで、判定するのもアリ。
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