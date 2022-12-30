<template>
	<v-app id="inspire">
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>アンケート作成</v-toolbar-title>
		<v-spacer></v-spacer>
	</v-app-bar>
	<v-main>
		<v-col
		class="d-flex"
		cols="12"
		sm="6">
		<v-autocomplete
			:items="friendNameList"
			outlined
			dense
			chips
			small-chips
			label="友人検索"
			multiple
		></v-autocomplete>
		</v-col>

		<v-row>
			<v-col cols="12">
				<v-col
					class="d-flex"
					cols="12"
					sm="6"
				>
				<v-select
					:items="prefs1"
					label="開催候補地1"
				>
				</v-select>
				</v-col>
				<v-col
					class="d-flex"
					cols="12"
					sm="6"
				>
				<v-select
					:items="prefs2"
					label="開催候補地2"
				>
				</v-select>
				</v-col>
				<v-col
					cols="12"
					sm="6"
					md="4"
				>
					<v-menu
						v-model="menu"
						:close-on-content-click="false"
						:nudge-right="40"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
					<template v-slot:activator="{ on, attrs }">
					<v-text-field
						v-model="date"
						prepend-icon="mdi-calendar"
						readonly
						v-bind="attrs"
						v-on="on"
						label="候補日"
						required
					></v-text-field>
					</template>
					<v-date-picker
						v-model="date"
						@input="menu = false"
						locale="jp-ja"
						:day-format="date => new Date(date).getDate()">
					</v-date-picker>
					</v-menu>
				</v-col>

				<v-col
					cols="12"
					sm="6"
					md="4"
				>
					<v-menu
						v-model="menu1"
						:close-on-content-click="false"
						:nudge-right="40"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
					<template v-slot:activator="{ on, attrs }">
					<v-text-field
						v-model="date1"
						prepend-icon="mdi-calendar"
						readonly
						v-bind="attrs"
						v-on="on"
						label="回答締切"
						required
					></v-text-field>
					</template>
					<v-date-picker
						v-model="date1"
						@input="menu1 = false"
						locale="jp-ja"
						:day-format="date1 => new Date(date1).getDate()">
					</v-date-picker>
					</v-menu>
				</v-col>

				<v-col
					cols="12"
					md="4"
				>
				<v-checkbox
					v-model="carsModel"
					label="車の有無"
				></v-checkbox>
				</v-col>

				<v-col
					cols="12"
					md="4"
				>
				<v-select
					v-model="lunchModel"
					:items="lunches"
					label="スルーor昼付き"
				></v-select>
				</v-col>

				<v-col
					cols="12"
					md="4"
				>
				<v-select
					:items="caddys"
					label="キャディの有無"
				></v-select>
				</v-col>

				<v-col
					cols="12"
					md="4"
				>
				<v-text-field
					label="備考"
					required
				></v-text-field>
				</v-col>
				<v-btn color="secondary" to="/">一覧に戻る</v-btn>
				<router-link :to="{ path:'/surveyConfirmed', query: { user_id: this.user_id}}">
					<v-btn 
						@click="onClick"
						class="ma-2"
						color="primary" 
						dark
						>確認</v-btn>
				</router-link>
			</v-col>
		</v-row>
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async created() {
		// this.auth = JSON.parse(sessionStorage.getItem('user'))// JSONからオブジェクトに変換

		this.user_id = this.$route.query.user_id;
		const userRef = firebase.firestore().collection("users").doc(this.user_id)
		const userDoc = await userRef.get()
		this.user = userDoc.data()

		const friendsIdArray =JSON.parse(userDoc.get("friends"))

		friendsIdArray.forEach(async (doc) => {
			const friendRef = firebase.firestore().collection("users").doc(doc)
			const friendDoc = await friendRef.get()
			const friendGetName = friendDoc.get('userName')
			this.friendNameList.push(friendGetName)
		});


		/*
		submit() {
				const roomRef = firebase.firestore().collection("rooms").doc(this.roomId)
				roomRef.collection('messages').add({
					message: this.body,
					name: this.auth.displayName,
					// photoURL: this.auth.photoURL,
					createdAt: firebase.firestore.Timestamp.now()
				})
				.then((result) => {
					console.log('success', result);
					this.body = ""
				})
				.catch((error) => {
					console.log('fail', error);
					alert('メッセージの送信に失敗しました')
				})
			}
		schedulesには、本来何もドキュメントが設定されていない状態なので、アンケート作成と共に、ドキュメントを作成し、その中でアンケートの中身も書き換える必要がある。
		有無の場合、checkボックスを使った方が良い。
		selectboxと表示のvalueを分けたい時があると思うから、その時はvuetifyを使って、うまくデータ保存する。
		*/
		// const schedulesRef = firebase.firestore().collection("schedules")
		// schedulesRef.add({
		// 	友人一覧: this.friendNameList,
		// 	開催場所1: this.prefs1,
		// 	開催場所2: this.prefs2,
		// 	候補日: this.date,
		// 	回答締切: this.date1,
		// 	車の有無: this.carsModel,
		// 	スルーor昼付き: this.lunchModel,
		// 	キャディの有無: this.caddys,
		// })
		// .then((result) => {
		// 	console.log("success",result);
		// })
		// .catch((error) => {
		// 	console.log("fail", error);
		// })

		// const schedulesDoc = await schedulesRef.get()
		// console.log("schedulesDoc", schedulesDoc)
		// const schedules = schedulesDoc.data()
		// console.log("schedules", schedules);
	},
	// mounted() {
	// },
	data: () => ({
		lunchModel: 0,
		carsModel: false,
		lunches: [{
			text: 'スルー',
			value: 1,
		},
		{
			text: '昼付き',
			value: 2,
		}
	],
		caddys:[],
		friendNameList: [],
		friends: [],
		// friendsIdArray: [],
		users:[],
		user_id: '',
		user:'',
		auth:null,
		menu: false,
		menu1: false,
		date:new Date().toISOString().substr(0, 10),
		date1:new Date().toISOString().substr(0, 10),
		prefs1: [
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
		prefs2: [
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
		]
	}),
	methods: {
		onClick() {
			const schedulesRef = firebase.firestore().collection("schedules")
			schedulesRef.add({
			友人一覧: this.friendNameList,
			開催場所1: this.prefs1,
			開催場所2: this.prefs2,
			候補日: this.date,
			回答締切: this.date1,
			車の有無: this.carsModel,
			スルーor昼付き: this.lunchModel,
			キャディの有無: this.caddys,
		})
		.then((result) => {
			console.log("success",result);
		})
		.catch((error) => {
			console.log("fail", error);
		})
		}
	// 	async getUser() {
	// 		// 	const userRef = firebase.firestore().collection("users").doc(this.userId)
	// 		// const userDoc = await userRef.get()
	// 		// // console.log("userDoc call", userDoc);
	// 		// const user = userDoc.data()
	// 		// console.log("user", user);
	// 		// this.user = user

	// 		// })
	// 		// snapshot.forEach(doc => {
	// 		// 	let data = {
	// 		// 		id: doc.id
	// 		// 	}
	// 		// 	if(!(data.id == this.auth.uid)) {
	// 		// 		this.users.push(data)
	// 		// 	}else{
	// 		// 		// console.log("success")
	// 		// 	}
	// 	}
	},
	watch:{
		lunchModel(newValue) {
			console.log(newValue)
		}
	},
	computed: {
		// userId () {
		// return 	this.$route.query.user_id;
		// },
	}
}
</script>
