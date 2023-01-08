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
		<v-btn @click="increment">+</v-btn>
		<v-btn @click="decrement">-</v-btn>
		<p>{{  doubleCount }}</p>
		<p>{{  tripleCount }}</p>
		<input type="text" v-model="message">
		<p>{{ message }}</p>

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
import { mapGetters } from 'vuex';

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
	methods: {
		increment() {
			this.$store.state.count++;
		},
		decrement() {
			this.$store.state.count--;
		}
	},
	//mapGettersはオブジェクトとしても使えるし、配列としても使える。通常は配列で使うことが多い。
	computed: {
		...mapGetters(["doubleCount", "tripleCount"]),
		// message() {
		// 	return this.$store.getters.message;
		// }
		message: {
			get() {
				return this.$store.getters.message;
			},
			set(value) {
				this.$store.dispatch("updateMessage", value)
			}
		}
	},
	// computed: mapGetters({
	// 	myComponentDoubleCount: "doubleCount",
	// })
}
</script>