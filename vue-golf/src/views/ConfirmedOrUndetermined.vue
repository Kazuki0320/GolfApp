<template>
	<v-app id="inspire">
	<v-main>
		<div class="login-box">
		<v-content class="login-form">
			<v-card-title class="login-title">グループ作成(この画面は使っていない)</v-card-title>

			<v-row class="justify-center">
				<router-link to="/roomCreateUndetermined">
					<v-btn class="ma-10" color="primary" dark>メンバー未確定</v-btn>
				</router-link>
				<router-link to="/roomCreateConfirmed">
					<v-btn class="ma-10" color="primary" dark>メンバー確定</v-btn>
				</router-link>
			</v-row>
		</v-content>
		</div>
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

<style scoped>
.login-form {
	margin:200px;
	padding:30px;

}

/*.login-box {
	width:60%;
	margin:0px auto;
	padding:30px;
}*/

.login-title {
	display: inline-block;
}

/* .member{
	position: fixed;
	top: 0;
	right: 0;
	z-index: 1;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
} */
</style>