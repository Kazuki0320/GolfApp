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
			item-text="name"
			:items="friendNameList"
			v-model="friends"
			outlined
			deletable-chips
			dense
			chips
			small-chips
			label="友人検索"
			return-object
			multiple
		>
		</v-autocomplete>
		</v-col>

		<v-row>
			<v-col cols="12">
				<v-col
					class="d-flex"
					cols="12"
					sm="6"
				>
				<v-select
					v-model="priceModel"
					:items="price"
					label="価格"
				>
				</v-select>
				</v-col>
				<v-col
					class="d-flex"
					cols="12"
					sm="6"
				>
				<v-select
					v-model="playTimeModel"
					:items="startTime"
					label="スタート時間"
				>
				</v-select>
				</v-col>
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
						v-model="deadLineDate"
						prepend-icon="mdi-calendar"
						readonly
						v-bind="attrs"
						v-on="on"
						label="回答締切"
						required
					></v-text-field>
					</template>
					<v-date-picker
						v-model="deadLineDate"
						@input="menu1 = false"
						locale="jp-ja"
						:day-format="deadLineDate => new Date(deadLineDate).getDate()">
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

				<!--・次の画面から、この画面に戻ってきた時に、キャディを活性にする必要がある。-->
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
				<v-checkbox
					v-model="lunchModel"
					label="昼付き"
				></v-checkbox>
				</v-col>

				<v-col
					cols="12"
					md="4"
				>
				<v-text-field
					v-model="remarkModel"
					label="備考"
					required
				></v-text-field>
				</v-col>
				<v-btn color="secondary" :to="{ path:'/', query: {user_id: this.user_id}}">一覧に戻る</v-btn>
				<router-link to="/survey">
					<v-btn 
						class="ma-2"
						color="primary"
						dark>
						確認
					</v-btn>
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
		this.user_id = this.$route.query.user_id;
		const userRef = firebase.firestore().collection("users").doc(this.user_id)
		const userDoc = await userRef.get()
		this.user = userDoc.data()

		const friendsIdArray =JSON.parse(userDoc.get("friends"))
		friendsIdArray.forEach(async (friendId) => {
			const friendRef = firebase.firestore().collection("users").doc(friendId)
			const friendDoc = await friendRef.get()
			const friendGetName = friendDoc.get('userName')
			const friend = {
				id: friendId,
				name: friendGetName
			}
			this.friendNameList.push(friend)
		});

	},
	data: () => ({
		friendNameList: [],
		friendsId: [],
		users:[],
		user_id: '',
		user:'',
		auth:null,
		menu: false,
		menu1: false,
		price: [
			"1万円以下",
			"1万円〜1万5千円",
			"1万5千〜2万円",
			"2万〜2万5千円",
			"2万5千〜3万",
			"3万以上"
		],
		startTime: [
			"7:00~8:00",
			"8:00~9:00",
			"9:00~10:00",
			"10:00~11:00",
			"午後のみ",
		],
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
	computed: {
		friends: {
			get() {
				return this.$store.getters.friends;
			},
			set(value) {
				this.$store.dispatch("updateFriends", value)
			}
		},
		priceModel: {
			get() {
				return this.$store.getters.price
			},
			set(value) {
				this.$store.dispatch("updatePrice", value)
			}
		},
		playTimeModel: {
			get() {
				return this.$store.getters.playTime
			},
			set(value) {
				this.$store.dispatch("updatePlayTime", value)
			}
		},
		prefModel1: {
			get() {
				return this.$store.getters.pref1
			},
			set(value) {
				this.$store.dispatch("updatePref1", value)
			}
		},
		prefModel2: {
			get() {
				return this.$store.getters.pref2
			},
			set(value) {
				this.$store.dispatch("updatePref2", value)
			}
		},
		date: {
			get() {
				return this.$store.getters.proposedDate
			},
			set(value) {
				this.$store.dispatch("updateDate", value)
			}
		},
		deadLineDate: {
			get() {
				return this.$store.getters.deadlineForResponse
			},
			set(value) {
				this.$store.dispatch("updateDeadLineDate", value)
			}
		},
		carsModel: {
			get() {
				return this.$store.getters.cars
			},
			set(value) {
				this.$store.dispatch("updateCars", value)
			}
		},
		caddy: {
			get() {
				return this.$store.getters.caddy
			},
			set(value) {
				this.$store.dispatch("updateCaddy", value)
			}
		},
		lunchModel: {
			get() {
				return this.$store.getters.lunch
			},
			set(value) {
				this.$store.dispatch("updateLunch", value)
			}
		},
		remarkModel: {
			get() {
				return this.$store.getters.remark
			},
			set(value) {
				this.$store.dispatch("updateRemark", value)
			}
		},
	// 	...mapGetters(["doubleCount", "tripleCount"]),
	// 	// message() {
	// 	// 	return this.$store.getters.message;
	// 	// }
	// 	message: {
	// 		get() {
	// 			return this.$store.getters.message;
	// 		},
	// 		set(value) {
	// 			this.$store.dispatch("updateMessage", value)
	// 		}
	// 	}
	},
	// watch:{
	// 	friendNameList(newValue) {
	// 		console.log("newValue", newValue)
	// 	}
	// },
}
</script>
