<template>
	<v-app id="inspire">
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>アンケート確認</v-toolbar-title>
		<v-spacer></v-spacer>
	</v-app-bar>
	<v-main>
		<v-container class="grey lighten-5">
			<v-row
				no-gutters
				style="flex-wrap: nowrap;"
			>
				<v-col
					cols="1"
					style="min-width: 100px; max-width: 100%;"
					class="flex-grow-1 flex-shrink-0"
				>
					<v-card
						class="pa-2"
						outlined
						tile
					>
					グループ作成内容
					</v-card>
				</v-col>
			</v-row>
			<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				グループ名
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ groupNameModel }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
				v-for="userName in usersName"
				:key="userName"
				class="pa-2"
				outlined
				tile
				>
				メンバー
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
				v-for="userName in usersName"
				:key="userName"
				class="pa-2"
				outlined
				tile
				>
				{{ userName }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				価格
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ priceModel }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				スタート時間
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ playTimeModel }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				開催候補地1
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ candidatePrefectureModel1 }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				開催候補地2
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ candidatePrefectureModel2 }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				候補日
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
				v-for=" proposedDate in date"
				:key="proposedDate"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ proposedDate }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				回答締切
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ deadLineDate }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				車の有無
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ AvailabilityOfCar }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				キャディの有無
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ AvailabilityOfCaddy }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				ランチの有無
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ throughOrLunch }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				備考
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ remarkModel }}
				</v-card>
			</v-col>
		</v-row>
		</v-container>

	<v-container>
		<v-layout wrap>
			<v-flex xs12 sm6 md4 text-center my-5>
				<v-btn color="secondary" :to="{ path: '/roomCreate', query: { user_id: this.user_id }}">一覧に戻る</v-btn>
			</v-flex>
			<v-flex xs12 sm6 md4 text-center my-5>
				<v-btn
				label="参加"
				@click="onClick"
				class="ma-2"
				color="primary"
				dark>グループ作成</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async created() {
		this.user_id = this.$route.query.user_id;

		// //車の有無を表示するための処理
		this.AvailabilityOfCar = (this.carsModel ? "○" : "×")
		if(this.AvailabilityOfCar === "○") {
			this.carAnswer = true
		}else {
			this.carAnswer = false
		}
		// //スルーorランチ付きかを判断する処理
		this.throughOrLunch = (this.lunchModel ? '○' : '×')
		// //キャディの有無
		this.AvailabilityOfCaddy = (this.caddyModel ? '○' : '×')

		//状態管理から、受け取ってきたfriendsのデータのIDを取得するための処理
		this.friends.forEach(friends => {
			const friendId = friends.id
			this.members.push(friendId)
		})

		//roomのフィールドに作成者＋メンバー含めたIDを持つ配列を作成
		this.members.push(this.user_id)

		//[memberを表示するための処理]
		this.members.forEach(async doc => {
			const userRef = firebase.firestore().collection("users").doc(doc)
			const userGet = await userRef.get()
			const userData = userGet.data()
			const userNameData = userData.userName
			this.usersName.push(userNameData)
		})
	},
	data: () => ({
		userData: '',
		user_id: '',
		schedules: '',
		friendsArray: [],
		AvailabilityOfCar: '',
		AvailabilityOfCaddy: '',
		throughOrLunch: '',
		questionnairesId: '',
		room_id: '',
		active: true,
		answered: false,
		members: [],
		rooms: [],
		carAnswer: '',
		usersName: [],
		questionnaireContent: '',
	}),
	methods: {
		async onClick() {
			//userNameを取るために、userDataを取得
			const userRef = firebase.firestore().collection("users").doc(this.user_id)
			const userGet = await userRef.get()
			this.userData = userGet.data()

			//questionnairesに新規ID＆新規フィールドを追加する処理
			const questionnairesRef = firebase.firestore().collection("questionnaires")
				const result1 = await questionnairesRef.add({
					active: this.active,
					answered: this.answered,
					room_id: this.room_id,
					user_id: this.user_id,
					users_id: this.members,
					DeadlineForResponse: this.deadLineDate,
				})
			this.questionnairesId = result1.id

			//roomsのドキュメントIDを作成
			//フィールドの値には選択したユーザーのIDも含め、members_idとして追加
			const roomRef = await firebase.firestore().collection("rooms").add({
				members_id: this.members,
			})

			//roomsのドキュメントIDの中にサブコレクションmessageを追加
			const roomId = firebase.firestore().collection("rooms").doc(roomRef.id)
			const messageAdd = await roomId.collection("messages").add({
				message: this.groupNameModel,
				name: this.userData.userName,
				questionnairesId: this.questionnairesId,
				//後から、photoURLは追加すると思うから、一旦残し
				// photoURL: this.auth.photoURL,
				createdAt: firebase.firestore.Timestamp.now()
			})

			const schedulesRef = firebase.firestore().collection("schedules")
				await schedulesRef.add({
				groupName: this.groupNameModel,
				questionnairesId: this.questionnairesId,
				members: this.members,
				price: this.priceModel,
				playTime: this.playTimeModel,
				selectPlace1: this.candidatePrefectureModel1,
				selectPlace2: this.candidatePrefectureModel2,
				proposedDate: this.date,
				AvailabilityOfCar: this.carsModel,
				throughOrLunch: this.lunchModel,
				AvailabilityOfCaddy: this.caddyModel,
				remark: this.remarkModel,
			})
			this.$router.push('/')
		},
	},
	computed: {
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
			}
		},
		priceModel: {
			get() {
				return this.$store.getters.price
			}
		},
		playTimeModel: {
			get() {
				return this.$store.getters.playTime
			}
		},
		candidatePrefectureModel1: {
			get() {
				return this.$store.getters.candidatePrefecture1
			}
		},
		candidatePrefectureModel2: {
			get() {
				return this.$store.getters.candidatePrefecture2
			}
		},
		date: {
			get() {
				return this.$store.getters.proposedDate
			},
		},
		deadLineDate: {
			get() {
				return this.$store.getters.deadlineForResponse
			},
		},
		carsModel: {
			get() {
				return this.$store.getters.isCarsModel
			},
		},
		caddyModel: {
			get() {
				return this.$store.getters.isCaddyModel
			}
		},
		lunchModel: {
			get() {
				return this.$store.getters.isLunchModel
			}
		},
		remarkModel: {
			get() {
				return this.$store.getters.remarkModel
			}
		},
	}
}
</script>