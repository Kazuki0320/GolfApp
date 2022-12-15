<template>
	<v-app id="inspire">
	<sidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ユーザープロフィール</v-toolbar-title>

		<v-spacer></v-spacer>
	</v-app-bar>
	<v-main>
		<!-- <v-simple-table
		v-if="auth"
		> -->
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
					<td>{{ user.userName }}</td>
					<!--
					・指定しているユーザーネームを出力したい
					・ログインしてるユーザー情報は除外する
					-->
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
					v-for="item in users"
					:key="item.name"
				>
				<td>{{ user.displayName }}</td>
				<td>{{ auth.email }}</td>
				</tr>
			</tbody>
		</template>
		</v-simple-table> -->
		<v-container>
			<router-link to="/user">
				<v-btn class="ma-2" color="primary" dark>戻る</v-btn>
			</router-link>
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
			// console.log("userId call", this.userId)//userID
			const userRef = firebase.firestore().collection("users").doc(this.userId)
			const userDoc = await userRef.get()
			// console.log("userDoc call", userDoc);
			const user = userDoc.data()
			console.log("user", user);
			this.user = user

			// const userName = user.userName
			// console.log("userName call", userName)
			// this.userName.push(userName);
			// const email = user.email
			// console.log("email call", email)

		// 	snapshot.forEach(doc => {
		// 		console.log(doc.data())
		// 		this.users.push(doc.data())
		// 	// 	console.log("this.users call", this.users)
	},
	// async mounted() {
	// 	this.auth = JSON.parse(sessionStorage.getItem('user'))//authをここで定義する必要があるのか？
	// 	console.log("auth call", this.auth);
	// 	this.email = this.auth.email
	// 	this.displayName = this.auth.displayName

		// userRef.collection('users').add({//←コメントアウトするとこ
			// 	name: this.auth.user.displayName,
			// 	email: this.auth.user.email,
			// 	uid: this.auth.user.uid,
			// 	refreshToken: this.auth.user.refreshToken
			// })
		
		// const userDoc = await userRef.get()
		// console.log("userDoc call", userDoc.data())
	// },
	data: () => ({
		user: "",
		userName: "",
		email: '',
		// userInfo: [{
		// 	displayName: '',
		// 	email: '',
		// }]
	}),
	computed: {
		userId () {
		return 	this.$route.query.user_id;
		},
	},
	// methods: {

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
	// }
}
</script>