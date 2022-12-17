<template>
	<v-app id="inspire">
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>マイページ編集</v-toolbar-title>
		<v-spacer></v-spacer>
	</v-app-bar>
	<v-main>
		<v-simple-table>
			<template v-slot:default>
				<thead><!--基本はtableと組み合わせて、th/tr/tdなどを使う。th=table header tr=table row td=table data-->
					<tr>
						<th class="text-center">
							ユーザーネーム
						</th>
					</tr>
				</thead>
					<tbody>
					<tr>
						<td>{{ user }}</td>
					</tr>
					</tbody>
					<!-- <v-col
					cols="12"
					sm="6"
					md="3"
					>
					<v-text-field
						label="ユーザーネーム"
					></v-text-field>
					</v-col> -->
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>

				<thead><!--基本はtableと組み合わせて、th/tr/tdなどを使う。th=table header tr=table row td=table data-->
					<tr>
						<th class="text-center">
							メールアドレス
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ user }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
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
		<router-link to="/myProfile">
			<v-btn color="primary">編集完了</v-btn>
		</router-link>
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async created() {
			this.users = []
			// console.log("userId call", this.userId)//userID取得確認OK
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
		users:[]
	}),
	computed: {
		userId () {
		return 	this.$route.query.user_id;
		},
	},
}
</script>