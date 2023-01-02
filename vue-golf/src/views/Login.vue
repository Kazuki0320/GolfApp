<template>
	<v-app>
		<div class="login-box">
		<v-card class="login-form">
			<v-card-title class="login-title">ログイン</v-card-title>
			<v-card-subtitle>ユーザー情報を入力してください</v-card-subtitle>
			<v-btn text color="light-blue" to="signUp">新規登録はこちら</v-btn>
		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
		>

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
			class="login-btn"
			@click="submit"
			:disabled="isValid">
			ログイン
		</v-btn>

		<v-alert
			dense
			text
			type="success"
			v-if="message"
			class="success-message"
			>
			{{ message }}
		</v-alert>

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
		email: '',
		emailRules: [
			v => !!v || 'メッセージを入力してください',
			v => /.+@.+\..+/.test(v) || 'メッセージ内容が間違えてます',
		],
		password: '',
		errorMessage: "",
		message: ''
}),
mounted() {
	if(localStorage.message) {
		this.message = localStorage.message
		localStorage.message = ''
	}
},
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
		submit () {
			firebase.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.then((result) => {
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
				.catch((error) => {
					console.log("fail", error)
					this.errorMessage = "ユーザーのログインに失敗しました"
				})
		}
	},
}
</script>

<style scoped>
.login-form {
	margin:150px;
	padding:30px;
}
.login-box {
	width:60%;
	margin:0px auto;
	padding:30px;
}
.login-title {
	display: inline-block;
}
.login-btn {
	margin-left: 20px; 
}
.success-message {
	margin-top: 20px;
}
.error-message {
	margin-top: 20px;
}
</style>