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
					v-model="prefModel1"
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
					v-model="prefModel2"
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
				<v-checkbox
					v-model="caddy"
					label="キャディの有無"
				></v-checkbox>
				</v-col>

				<v-col
					cols="12"
					md="4"
				>
				<v-select
					v-model="lunchModel"
					:items="throughOrLunch"
					label="スルーor昼付き"
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
				<v-btn color="secondary" :to="{ path:'/', query: {user_id: this.user_id}}">一覧に戻る</v-btn>
				<!-- <router-link 
				:to="{ path:`/survey/${ this.schedulesIdData }`}"> -->
				<!-- <router-link :to="{ path: '/surveyConfirmed', query: { user_id: this.user_id }}"> 
					:to="{ name: 'content-url', params: {id: Number(id) + 1 } }"
				-->
					<v-btn 
						@click="onClick"
						class="ma-2"
						color="primary" 
						dark>
						確認
					</v-btn>
				<!-- </router-link> -->
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

		// const questionnairesRef = firebase.firestore().collection("questionnaires")
		// 	questionnairesRef.add({
		// 		active: this.active,
		// 		answered: this.answered,
		// 		room_id: this.room_id,
		// 		schedules_id: this.schedulesId,
		// 		users_id: this.user_id,
		// 	})
		// 	.then((result) => {
		// 		console.log("success",result);
		// 		this.questionnairesId = result.id
		// 	})
		// 	.catch((error) => {
		// 		console.log("fail", error);
		// 	})

		// const questionnairesDoc = await questionnairesRef.get()
		// console.log("questionnairesDoc", questionnairesDoc)
		/*
		schedulesには、本来何もドキュメントが設定されていない状態なので、アンケート作成と共に、ドキュメントを作成し、その中でアンケートの中身も書き換える必要がある。
		有無の場合、checkボックスを使った方が良い。
		selectboxと表示のvalueを分けたい時があると思うから、その時はvuetifyを使って、うまくデータ保存する。
		ESLintとprettier後程、インストール。
		「やっぱ、やめた」の時一覧から戻るときに、firebase上のデータを削除するのが１つの方法。
		オプションAPI、コンポジションAPI。他の新しい書き方もあるらしい...スクリプトセットアップ。
		ローカルストレージ使うのも、１つの方法としてあり。
		firebaseのsetとaddの違い
		テンプレート構文orテンプレートリテラル
		*/
		// const schedulesDoc = await schedulesRef.get()
		// console.log("schedulesDoc", schedulesDoc)
		// const schedules = schedulesDoc.data()
		// console.log("schedules", schedules);
	},
	// mounted() {
	// },
	data: () => ({
		questionnairesId: '',
		schedulesId: '',
		room_id: '',
		active: true,
		answered: false,
		lunchModel: 0,
		carsModel: false,
		throughOrLunch: [
			{
				text: 'スルー',
				value: 1,
			},
			{
				text: '昼付き',
				value: 2,
			}
		],
		caddy:false,
		friendNameList: [],
		friends: [],
		users:[],
		user_id: '',
		user:'',
		auth:null,
		menu: false,
		menu1: false,
		date:new Date().toISOString().substr(0, 10),
		date1:new Date().toISOString().substr(0, 10),
		prefModel1: '',
		prefModel2: '',
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
		async onClick() {
			const schedulesRef = firebase.firestore().collection("schedules")
			const result = await schedulesRef.add({
				questionnairesId: this.questionnairesId,
				friends: this.friendNameList,
				selectPlace1: this.prefModel1,
				selectPlace2: this.prefModel2,
				proposedDate: this.date,
				DeadlineForResponse: this.date1,
				AvailabilityOfCar: this.carsModel,
				throughOrLunch: this.lunchModel,
				AvailabilityOfCaddy: this.caddy,
			})
			this.$router.push(`/survey/${ result.id }`)
			// this.$router.push(`/survey/${ this.schedulesIdData.id }`)
			// this.$router.push({ name: '/surveyConfirmed', params: { schedules_id: this.schedulesId }})
			// .then(async(result) => {
			// 	this.schedulesIdData = result.id
			// 	// schedulesId = result.id;
			// 	// const schedulesData = firebase.firestore().collection("schedules")
			// 	// const snapshot = await schedulesData.get(result.id)
			// 	// console.log("snapshot", snapshot)
			// 	console.log("schedulesIdData", this.schedulesIdData)
			// 	// snapshot.forEach(doc => {
			// 	// 	if(result.id === doc.id) {
			// 	// 		this.schedulesIdData = doc.id
			// 	// 		console.log("schedulesIdData", this.schedulesIdData)
			// 	// 	}
			// 	// })
			// })
			// .catch((error) => {
			// 	console.log("fail", error);
			// })

			// schedulesIdData.forEach(doc => {
			// 	let data = {
			// 		id: doc.id
			// 	}
			// })
			// console.log("schedulesID", this.schedulesId)
			// const schedules =schedulesIdData.data()
			// console.log("schedules", schedules);
			
			// const userRef = firebase.firestore().collection("users")
			// const snapshot = await userRef.get()
			// snapshot.forEach(doc => {
			// 	let data = {
			// 		id: doc.id
			// 	}
			// 	if(this.auth.uid == data.id) {
			// 		this.user = data
			// 	}else{
			// 		// console.log("success")
			// 	}
			// 	// console.log("user", this.user.id)
			// })

		// 	const questionnairesData = firebase.firestore().collection("questionnaires").doc(this.questionnairesId)
		// 	// console.log("questionnairesData", questionnairesData)
		// 	questionnairesData.update({
		// 		schedulesId: this.schedulesId,
		// 	})
		// 	.then((result) => {
		// 		console.log("success",result);
		// 		this.questionnairesId = result
		// 	})
		// 	.catch((error) => {
		// 		console.log("fail", error);
		// 	})
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
		schedulesIdData(newValue) {
			console.log("newValue", newValue)
		}
	},
	computed: {
		// userId () {
		// return 	this.$route.query.user_id;
	},
}
</script>
