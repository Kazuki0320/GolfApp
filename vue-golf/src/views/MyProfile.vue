<template>
	<v-app id="inspire">
	<sidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>マイページ</v-toolbar-title>
	</v-app-bar>
	<!--[プロフィール画面について]
	①プロフィール編集画面で編集をするのではなく、テキストフィールドに直接入力して最後に保存する。
	②プロフィール画面では表示のみで、編集画面で入力できるようにする。
	-->
	<v-main>
		<!-- <v-simple-table
		v-if="auth"
		>
			<template v-slot:default>
				<thead>
					<tr>
					<th class="text-center">
						ユーザーネーム（工事中）
					</th>
					<th class="text-center">
						メールアドレス（工事中）
					</th>
					</tr>
				</thead>
			<tbody>
				<tr
					v-for="item in userInfo"
					:key="item.name"
				>
				<td>{{ auth.displayName }}</td>
				<td>{{ auth.email }}</td>
				</tr>
			</tbody>
			</template>
		</v-simple-table> -->
		<v-simple-table
		v-if="auth"
		>
			<template v-slot:default>
				<thead><!--基本はtableと組み合わせて、th/tr/tdなどを使う。th=table header tr=table row td=table data-->
					<tr>
					<th class="text-center">
						ユーザーネーム（工事中）
					</th>
					</tr>
					<!--<tr>
					<th class="text-center">
						メールアドレス（工事中）
					</th>
					</tr> -->
				</thead>
				<tbody>
					<tr>
					<td>{{ auth.displayName }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
					<th class="text-center">
						メールアドレス（工事中）
					</th>
					</tr>
				</thead>
				<tbody>
					<tr>
					<td>{{ auth.email }}</td>
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
					<router-link to="/editProfile">
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

		// 	const snapshot = await userRef.get()
		// 	snapshot.forEach(doc => {
		// 		console.log(doc.data())
		// 		this.users.push(doc.data())
		// 	// 	console.log("this.users call", this.users)
	},
	async mounted() {
		this.auth = JSON.parse(sessionStorage.getItem('user'))
		console.log("auth call", this.auth);
		this.email = this.auth.email
		this.displayName = this.auth.displayName
		// userRef.collection('users').add({//←コメントアウトするとこ
			// 	name: this.auth.user.displayName,
			// 	email: this.auth.user.email,
			// 	uid: this.auth.user.uid,
			// 	refreshToken: this.auth.user.refreshToken
			// })
		
		// const userDoc = await userRef.get()
		// console.log("userDoc call", userDoc.data())
	},
	data: () => ({
		users:[],
		auth: null,
		// desserts: [
		// {
		// 	name: 'Frozen Yogurt',
		// 	calories: 159,
		// }]
	}),
	computed: {
		userId () {
		return 	this.$route.query.user_id;
		},
	},
}
</script>