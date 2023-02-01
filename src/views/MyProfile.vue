<template>
	<v-app id="inspire">
	<DefaultSidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>マイページ</v-toolbar-title>
	</v-app-bar>
	<v-main>
		<v-simple-table
		v-if="user">
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
						<td>{{ user.userName }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							メールアドレス
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ user.email }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>

		<v-container>
			<v-row>
				<v-col>
					<!-- <v-text-field
						label="ユーザーネーム（工事中）"
						clearable
					></v-text-field> -->
					<router-link
					:to="{ path: '/editProfile', query: { user_id: this.user_id}}">
						<v-btn color="primary" dark>マイページ編集</v-btn>
					</router-link>
				</v-col>

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
		this.user_id = this.$route.query.user_id;
		console.log("user_id", this.user_id);
		// console.log("userId call", this.userId)//userID取得確認OK
		const userRef = firebase.firestore().collection("users").doc(this.user_id)
		const userDoc = await userRef.get()
		const user = userDoc.data()
		// console.log("user info", user);
		this.user = user
		// console.log("user", this.user)

		// 	const snapshot = await userRef.get()
		// 	snapshot.forEach(doc => {
		// 		console.log(doc.data())
		// 		this.users.push(doc.data())
		// 	// 	console.log("this.users call", this.users)
	},
	data: () => ({
		user:'',
		userName: '',
		email: '',
	}),
}
</script>