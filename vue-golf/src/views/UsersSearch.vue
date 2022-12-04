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
		<v-container>
			<v-row>
				<v-col cols="6">
					<v-text-field
					label="ユーザー検索"
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
						@click="search(keyword)">
						検索する
					</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="6"
				v-for="(users, index) in searchResults" :key="users.index">
				<v-card class="mx-auto">
					<v-row>
						<v-col>
							<v-avatar 
							class="mb-4"
							color="grey darken-1"
							size="64"
							></v-avatar>
							<v-btn
								color="secondary">
								キャンセル
							</v-btn>
							<v-btn
								color="primary"
								@click="addUsersList(index)">
								追加
							</v-btn>
							
						</v-col>
					</v-row>
				</v-card>
				</v-col>
			</v-row>
			
		</v-container>
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
	},
	data: () => ({
		users:[],
		keyword: '',
		searchResults:[]
	}),
	computed: {
		userId () {
		return 	this.$route.query.user_id;
		},
	},
}
</script>