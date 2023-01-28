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
			cols="12"
			md="4"
		>
		<v-text-field
			v-model="groupNameModel"
			label="グループ名"
			required
		></v-text-field>
		<label v-if="!groupIsValid" class="error-message">グループ名を入力してください</label>
		</v-col>
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
					:items="candidatePrefectureData1"
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
					:items="candidatePrefectureData2"
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

				<!--次の画面から、この画面に戻ってきた時に、キャディを活性にする必要がある。-->
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
				<router-link :to="{ path: '/survey', query: { user_id: this.user_id }}">
					<v-btn :disabled="!groupNameModel" class="ma-2" color="primary" dark>
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
		
		if (userDoc.get("friends") === undefined) return
		const friendsIdArray = JSON.parse(userDoc.get("friends"))
		if (friendsIdArray === undefined) return
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
		candidatePrefectureData1: [
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
		candidatePrefectureData2: [
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
		//[ハードコード用]
		//-----------------------------------
		// friends: {
		// 	get() {
		// 		return this.$store.getters.friends;
		// 	},
		// 	set(value) {
		// 		this.$store.dispatch(updateSurvey("updateFriends", value))
		// },
		//-----------------------------------
		groupIsValid () {
			console.log("groupNameModel:", this.groupNameModel)
			return this.groupNameModel != ""
		},
		groupNameModel: {
			get() {
				return this.$store.getters.groupName;
			},
			set(value) {
				this.$store.dispatch("updateGroupName", value)
			}
		},
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
				return this.$store.getters.candidatePrefecture1
			},
			set(value) {
				this.$store.dispatch("updateCandidatePrefecture1", value)
			}
		},
		prefModel2: {
			get() {
				return this.$store.getters.candidatePrefecture2
			},
			set(value) {
				this.$store.dispatch("updateCandidatePrefecture2", value)
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
				return this.$store.getters.isCars
			},
			set(value) {
				this.$store.dispatch("updateIsCars", value)
			}
		},
		caddy: {
			get() {
				return this.$store.getters.isCaddy
			},
			set(value) {
				this.$store.dispatch("updateIsCaddy", value)
			}
		},
		lunchModel: {
			get() {
				return this.$store.getters.isLunch
			},
			set(value) {
				this.$store.dispatch("updateIsLunch", value)
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
	}
}
</script>

<style scoped>
	.error-message {
		color: brown;
	}
</style>
