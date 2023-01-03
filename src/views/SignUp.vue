<template>
	<v-app>
		<div class="Login-box">
		<v-card class="Login-form">
			<v-card-title class="Login-title">新規登録</v-card-title>
			<v-card-subtitle>ユーザー情報を入力してください</v-card-subtitle>
			<v-btn text color="light-blue" to="Login">ログイン画面はこちら</v-btn>

		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
		>

		<v-text-field
			v-model="name"
			:rules="nameRules"
			label="ユーザー名"
			required
		></v-text-field>

		<v-text-field
			v-model="email"
			:rules="emailRules"
			label="メールアドレス"
			required
		></v-text-field>

		<v-text-field
			v-model="password"
			type="password"
			label="パスワード">
		</v-text-field>

		<v-btn
			color="#64FFDA">
			クリア
		</v-btn>

		<v-btn
			color="#4DD0E1"
			class="Login-btn"
			@click="submit"
			:disabled="isValid">
			新規登録
		</v-btn>

		<v-alert
			dense
			outlined
			type="error"
			v-if="errorMessage"
			class="error-message"
			>
			{{ errorMessage }}
		</v-alert>

		</v-form>
		</v-card>
	</div>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"
	export default {
data: () => ({
		valid: true,
		name: '',
		nameRules: [
			v => !!v || 'ユーザー名を入力してください',
			v => (v && v.length <= 10) || 'ユーザー名が間違えてます',
		],
		email: '',
		emailRules: [
			v => !!v || 'メッセージを入力してください',
			v => /.+@.+\..+/.test(v) || 'メッセージ内容が間違えてます',
		],
		password: '',
		errorMessage: "",
}),
computed:	{
	isValid() {
		console.log("isValid", this.valid);
		return !this.valid;
	}
},
methods: {
		validate () {
			this.$refs.form.validate()
		},
		reset () {
			this.$refs.form.reset()
		},
		resetValidation () {
			this.$refs.form.resetValidation()
		},
		submit() {
			firebase.auth()
			//firebaseAuthに、ユーザーの認証をするために新しくログイン情報を作成
			.createUserWithEmailAndPassword(this.email, this.password)
			.then(async(result) => {
				await result.user.updateProfile(
					{displayName: this.name}
				);
				localStorage.message = "新規作成に成功しました"
			//新規作成したユーザーのログイン情報作成後、auth変数の中にユーザー情報を持たせて、それをsessionStorageで保存し、そのままホーム画面へ遷移
			firebase.auth()
			.signInWithEmailAndPassword(this.email, this.password)
			.then((result) => {
				// console.log("success result", result.user)
				const auth = {
					displayName: result.user.displayName,
					email: result.user.email,
					uid: result.user.uid,
					password: this.password
				}
				//sessionStorageに保存する値は、文字列にする必要があるので、JSON.stringifyで指定
				sessionStorage.setItem('user', JSON.stringify(auth))
				this.$router.push('/')
				})
			})
			.catch((error) => {
				console.log("fail", error)
				this.errorMessage = "ユーザーの新規作成に失敗しました。";
			})
		}
	},
}
</script>

<style scoped>
.Login-form {
	margin:150px;
	padding:30px;
}
.Login-box {
	width:60%;
	margin:0px auto;
	padding:30px;
}
.Login-title {
	display: inline-block;
}
.Login-btn {
	margin-left: 20px; 
}
.error-message {
	margin-top: 20px;
}
</style>