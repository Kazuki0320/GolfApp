<template>
	<v-app id="inspire">
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>アンケート作成（メッセージ送信）</v-toolbar-title>
		<v-spacer></v-spacer>
	</v-app-bar>
	<v-main>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							グループ名
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
					<td>{{ groupNameModel }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							メンバー
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
					v-for="(friend, index) in friends"
					:key="`${friend.name}_${index}`">
						<td>{{ friend.name }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							価格
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ priceModel }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							スタート時間
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ playTimeModel }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							開催候補地1
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ candidatePrefectureModel1 }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							開催候補地2
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ candidatePrefectureModel2 }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							候補日
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ date }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							回答締切
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ deadLineDate }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							車の有無
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ AvailabilityOfCar }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							スルーor昼付き
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ throughOrLunch }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							キャディの有無
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ AvailabilityOfCaddy }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							備考
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ remarkModel }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
			<v-btn 
				to="/newSurvey"
				color="secondary">
				一覧に戻る
			</v-btn>
			<v-btn 
			@click="onClick"
			class="ma-2"
			color="primary"
			dark
			>メッセージ送信</v-btn>
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async created() {
		this.user_id = this.$route.query.user_id;

		// //車の有無を表示するための処理
		this.AvailabilityOfCar = (this.carsModel ? '有' : '無')
		// //スルーorランチ付きかを判断する処理
		this.throughOrLunch = (this.lunchModel ? '昼付き' : 'スルー')
		// //キャディの有無
		this.AvailabilityOfCaddy = (this.caddyModel ? '有' : '無')

		//状態管理から、受け取ってきたfriendsのデータのIDを取得するための処理
		this.friends.forEach(friends => {
			const friendId = friends.id
			this.members.push(friendId)
		})
		//roomのフィールドに作成者＋メンバー含めたIDを持つ配列を作成
		this.members.push(this.user_id)
	},
	data: () => ({
		userData: '',
		user_id: '',
		schedules: '',
		friendsArray: [],
		AvailabilityOfCar: null,
		AvailabilityOfCaddy: null,
		throughOrLunch: null,
		questionnairesId: '',
		room_id: '',
		active: true,
		answered: false,
		members: [],
		rooms: [],
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