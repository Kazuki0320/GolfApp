<template>
	<v-app>
		<div class="login-box">
		<v-card class="login-form">
			<v-card-title class="login-title">新規登録</v-card-title>
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
			class="login-btn"
			:disabled="isValid">
			新規登録
		</v-btn>

		</v-form>
		</v-card>
	</div>
	</v-app>
</template>

<script>
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
</style>