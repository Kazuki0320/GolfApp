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
import { auth, firestore, serverTimestamp } from "@/firebase/firebase"

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
		async submit () {
			try {
				const userCredential = await auth.signInWithEmailAndPassword(this.email, this.password)
				const user = userCredential.user

				if (!user) {
					throw new Error('ユーザー情報が取得できませんでした')
				}

				// ユーザー情報をFirestoreに保存/更新
				const userRef = firestore.collection('users').doc(user.uid)
				await userRef.set({
					uid: user.uid,
					displayName: user.displayName || '',
					email: user.email,
					lastLogin: serverTimestamp(),
					updatedAt: serverTimestamp(),
					createdAt: serverTimestamp()
				}, { merge: true })

				// ログイン成功時の処理
				this.message = "ログインに成功しました"
				setTimeout(() => {
					this.$router.replace('/')
				}, 1000)
			} catch (error) {
				console.error('Login error:', error)
				switch (error.code) {
					case 'auth/user-not-found':
						this.errorMessage = "ユーザーが見つかりません"
						break
					case 'auth/wrong-password':
						this.errorMessage = "パスワードが間違っています"
						break
					case 'auth/invalid-email':
						this.errorMessage = "メールアドレスの形式が正しくありません"
						break
					case 'auth/too-many-requests':
						this.errorMessage = "ログイン試行回数が多すぎます。しばらく時間をおいて再度お試しください"
						break
					default:
						this.errorMessage = "ログインに失敗しました: " + error.message
				}
			}
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
