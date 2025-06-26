<template>
	<v-app>
		<div class="login-box">
		<v-card class="login-form">
			<v-card-title class="login-title">新規登録</v-card-title>
			<v-card-subtitle>ユーザー情報を入力してください</v-card-subtitle>
			<v-btn text color="light-blue" to="login">ログイン画面はこちら</v-btn>

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
			:rules="passwordRules"
			type="password"
			label="パスワード"
			required>
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
import { auth, firestore, serverTimestamp } from "@/firebase/firebase"
	export default {
data: () => ({
		valid: true,
		name: '',
		nameRules: [
			v => !!v || 'ユーザー名を入力してください',
			v => (v && v.length <= 10) || 'ユーザー名は10文字以内で入力してください',
		],
		email: '',
		emailRules: [
			v => !!v || 'メールアドレスを入力してください',
			v => /.+@.+\..+/.test(v) || 'メールアドレスの形式が正しくありません',
		],
		password: '',
		passwordRules: [
			v => !!v || 'パスワードを入力してください',
			v => v.length >= 6 || 'パスワードは6文字以上で入力してください',
		],
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
		async submit() {
			try {
				if (!this.password || this.password.length < 6) {
					this.errorMessage = "パスワードは6文字以上で入力してください";
					return;
				}

				// 新規ユーザー作成
				const userCredential = await auth.createUserWithEmailAndPassword(this.email, this.password)
				const user = userCredential.user

				if (!user) {
					throw new Error('ユーザー作成に失敗しました')
				}

				// ユーザープロフィールの更新
				await user.updateProfile({
					displayName: this.name
				})

				// Firestoreにユーザー情報を保存
				await firestore.collection('users').doc(user.uid).set({
					uid: user.uid,
					userName: this.name,
					displayName: this.name,
					email: this.email,
					createdAt: serverTimestamp(),
					updatedAt: serverTimestamp(),
					lastLogin: serverTimestamp(),
					friends: []
				})

				localStorage.message = "新規作成に成功しました"
				this.$router.push('/')
			} catch (error) {
				console.error("Signup error:", error)
				switch (error.code) {
					case 'auth/email-already-in-use':
						this.errorMessage = "このメールアドレスは既に使用されています"
						break
					case 'auth/invalid-email':
						this.errorMessage = "メールアドレスの形式が正しくありません"
						break
					case 'auth/operation-not-allowed':
						this.errorMessage = "この操作は許可されていません"
						break
					case 'auth/weak-password':
						this.errorMessage = "パスワードは6文字以上で入力してください"
						break
					default:
						this.errorMessage = "ユーザーの新規作成に失敗しました: " + (error.message || error)
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
.error-message {
	margin-top: 20px;
}
</style>
