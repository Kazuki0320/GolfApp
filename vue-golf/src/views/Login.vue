<template>
	<v-app>
		<div class="login-box">
		<v-card class="login-form">
			<v-card-title class="login-title">ログイン</v-card-title>
			<v-card-subtitle>ユーザー情報を入力してください</v-card-subtitle>
		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
		>
		<v-text-field
			v-model="name"
			:counter="10"
			:rules="nameRules"
			label="Name"
			required
		></v-text-field>

		<v-text-field
			v-model="email"
			:rules="emailRules"
			label="E-mail"
			required
		></v-text-field>

		<v-checkbox
			v-model="checkbox"
			:rules="[v => !!v || 'You must agree to continue!']"
			label="Do you agree?"
			required
		></v-checkbox>

		<v-btn
			:disabled="!valid"
			color="success"
			class="mr-4"
			@click="validate"
		>
			Validate
		</v-btn>

		<v-btn
			color="error"
			class="mr-4"
			@click="reset"
		>
			Reset Form
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
	v => !!v || 'Name is required',
	v => (v && v.length <= 10) || 'Name must be less than 10 characters',
		],
		email: '',
		emailRules: [
	v => !!v || 'E-mail is required',
	v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
		select: null,
		items: [
	'Item 1',
	'Item 2',
	'Item 3',
	'Item 4',
		],
		checkbox: false,
}),
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
.login-form{
	margin:150px;
	padding:30px;
}

.login-box{
	width:60%;
	margin:0px auto;
	padding:30px;
}

.login-title{
	display: inline-block;
}
</style>