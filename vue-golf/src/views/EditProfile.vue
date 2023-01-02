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
		<v-container>
			<v-row>
				<v-col cols="12">
					<v-text-field
						label="ユーザーネーム"
						clearable
						v-model="user.userName">
					</v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-text-field
						label="メールアドレス"
						clearable
						v-model="user.email">
					</v-text-field>
				</v-col>
			</v-row>
		</v-container>
			
		<router-link :to="{ path: '/myProfile', query: { user_id: this.user_id }}">
			<v-btn 
			color="primary"
			@click="submit">編集完了</v-btn>
		</router-link>
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async created() {
		this.user_id = this.$route.query.user_id;
		const userRef = firebase.firestore().collection("users").doc(this.user_id)
		const userDoc = await userRef.get()
		const user = userDoc.data()
		this.user = user
		console.log("user", user);
	},
	data: () => ({
		users:[],
		user: '',
	}),
	methods: {
		submit () {
			const userRef = firebase.firestore().collection("users").doc(this.user_id)
			userRef.update({
				email: this.user.email,
				userName: this.user.userName
			})
		}
	}
}
</script>