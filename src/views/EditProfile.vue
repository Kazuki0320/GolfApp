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
						:rules="userNameRules"
						:counter="30"
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
			<v-row>
				<v-col cols="12">
					<v-select
						label="年代"
						clearable
						:items="ageGroup"
						v-model="user.age">
					</v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-select
						label="居住地"
						clearable
						:items="candidatePrefectureDataItem"
						v-model="user.live"
						>
					</v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-select
						label="ゴルフ暦"
						clearable
						:items="golfPlayHistoryItems"
						v-model="user.golfPlayingHistory">
					</v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-select
						label="車の有無"
						clearable
						:items="AvailabilityOfCarItems"
						v-model="user.AvailabilityOfCar">
					</v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-textarea
						label="自己紹介文"
						clearable
						:counter="1000"
						:rules="remarkNameRules"
						v-model="user.selfIntroductionText">
					</v-textarea>
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
	},
	data: () => ({
		users:[],
		user: '',
		AvailabilityOfCarItems: [
			{value: true, text: "○"},
			{value: false, text: "×"},
		],
		golfPlayHistoryItems: [
			"数回打ちっぱなし程度",
			"1年未満",
			"1-2年",
			"2-3年",
			"3-4年",
			"5年以上",
		],
		ageGroup: [
			"20代",
			"30代",
			"40代",
			"50代",
			"60代",
			"70代",
			"80代",
		],
		candidatePrefectureDataItem: [
			'北海道',
			'青森',
			'岩手',
			'宮城',
			'秋田',
			'山形',
			'福島',
			'茨城',
			'栃木',
			'群馬',
			'埼玉',
			'千葉',
			'東京都',
			'神奈川',
			'新潟',
			'富山',
			'石川',
			'福井',
			'山梨',
			'長野',
			'岐阜',
			'静岡',
			'愛知',
			'三重',
			'滋賀',
			'京都府',
			'大阪府',
			'兵庫',
			'奈良',
			'和歌山',
			'鳥取',
			'島根',
			'岡山',
			'広島',
			'山口',
			'徳島',
			'香川',
			'愛媛',
			'高知',
			'福岡',
			'佐賀',
			'長崎',
			'熊本',
			'大分',
			'宮崎',
			'鹿児島',
			'沖縄',
		],
		selfIntroductionText: '',
		remarkNameRules: [
			v => v?.length <= 1000 || '紹介文は1000文字以内で入力してください',
		],
		userNameRules: [
			v => !!v || 'ユーザー名は必須です',
			v => v?.length <= 30 || 'グループ名は30文字以内で入力してください',
		],
	}),
	methods: {
		submit () {
			const userRef = firebase.firestore().collection("users").doc(this.user_id)
			userRef.update({
				email: this.user.email,
				userName: this.user.userName,
				age: this.user.age,
				live: this.user.live,
				golfPlayingHistory: this.user.golfPlayHistory,
				AvailabilityOfCar: this.user.AvailabilityOfCar,
				selfIntroductionText: this.user.selfIntroductionText,
			})
		}
	}
}
</script>