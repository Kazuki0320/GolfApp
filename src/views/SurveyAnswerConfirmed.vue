<template>
	<v-app id="inspire">
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>アンケート回答</v-toolbar-title>
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
				アンケート内容
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
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ questionnaireContent.proposedDate}}
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
				{{ questionnaireContent.groupName }}
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
				{{ questionnaireContent.price }}
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
				{{ questionnaireContent.playTime }}
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
				{{ questionnaireContent.selectPlace1}}
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
				{{ questionnaireContent.selectPlace2 }}
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
				{{ questionnaireContent.remark }}
				</v-card>
			</v-col>
		</v-row>
	</v-container>

	<v-container>
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
				アンケート回答
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
				参加可能可否
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
				{{ attendance }}
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
				{{ AvailabilityOfCarAnswer }}
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
			{{ remarkAnswerModel }}
			</v-card>
		</v-col>
		</v-row>
	</v-container>

	<v-container>
		<v-layout wrap>
			<v-flex xs12 sm6 md4 text-center my-5>
				<v-btn color="secondary" :to="{ path: '/surveyAnswer', query: { room_id: roomId }}">一覧に戻る</v-btn>
			</v-flex>
			<v-flex xs12 sm6 md4 text-center my-5>
				<router-link to="/">
				<v-btn
				@click="unParticipationClick"
				class="ma-2"
				color="secondary"
				dark>不参加</v-btn>
				</router-link>
			</v-flex>
			<v-flex xs12 sm6 md4 text-center my-5>
				<router-link to="/">
				<v-btn
				@click="participationClick"
				class="ma-2"
				color="primary"
				dark>参加</v-btn>
				</router-link>
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
		//[queryで、room_idを受け取ってきて、roomsの中から受け取ってきたIDのデータを取得]
		this.roomId = this.$route.query.room_id;
		const roomRef = firebase.firestore().collection("rooms").doc(this.roomId)
		const roomGet = await roomRef.get()
		const roomData = roomGet.data()

		//[回答締め切りのみquestionnairesのフィールドの値としてあるため、ここでDeadlineForResponseのデータを取得]
		const questionnairesData =firebase.firestore().collection("questionnaires").doc(roomData.questionnairesId)
		const questionnairesGet =await questionnairesData.get()
		this.questionnairesInfo = questionnairesGet.data()

		// [schedulesの中で上記questionnairesIdと同じ値を持つ、IDを検索してきてそのデータを表示する処理]
		const schedulesRef = firebase.firestore().collection("schedules")
		const schedulesQuestionnaireId = await schedulesRef.where("questionnairesId", "==", roomData.questionnairesId).get()
		this.scheduleId = schedulesQuestionnaireId.docs[0]
		const schedulesCollection = firebase.firestore().collection("schedules").doc(this.scheduleId.id)
		const schedulesGet = await schedulesCollection.get()
		this.questionnaireContent = schedulesGet.data()
		console.log("questionnaireContent", this.questionnaireContent)

		//[memberを表示するための処理]
		const memberArray = JSON.parse(this.questionnaireContent.member)
		memberArray.forEach(async doc => {
			const userRef = firebase.firestore().collection("users").doc(doc)
			const userGet = await userRef.get()
			const userData = userGet.data()
			const userNameData = userData.userName
			this.usersName.push(userNameData)
		})

		//車の有無を表示するための処理
		this.AvailabilityOfCar = (this.questionnaireContent.AvailabilityOfCar ? '有' : '無')
		//スルーorランチ付きかを判断する処理
		this.throughOrLunch = (this.questionnaireContent.throughOrLunch ? '昼付き' : 'スルー')
		//キャディの有無
		this.AvailabilityOfCaddy = (this.questionnaireContent.AvailabilityOfCaddy ? '有' : '無')
		//車出しが可能かどうかの処理
		this.AvailabilityOfCarAnswer = (this.isCarAnswerModel ? '可' : '不可')

		//参加が可能かどうかの表示処理
		if(this.attendanceAnswerModel === 'yes') {
			this.attendance = "○"
		} else if(this.attendanceAnswerModel === 'no') {
			this.attendance = "×"
		} else {
			this.attendance = "△"
		}
	},
	data: () => ({
		attendance: [
			{value: 'yes', text: "○"},
			{value: 'fair', text: "△"},
			{value: 'no', text: "×"},
		],
		AvailabilityOfCarAnswer: '',
		usersName: [],
		scheduleId: '',
		member: '',
		questionnairesInfo: '',
		AvailabilityOfCaddy: '',
		throughOrLunch: '',
		AvailabilityOfCar:'',
		questionnaireContent: '',
		roomId: '',
	}),
	methods: {
		async participationClick() {
			const answerRef = firebase.firestore().collection("answer")
			const surveyAnswer = await answerRef.add({
				schedule_id: this.scheduleId.id,
				user_id: firebase.auth().currentUser.uid,
				participationInGroup: true,
			})
			this.$router.push('/')
		},
		async unParticipationClick() {
			const answerRef = firebase.firestore().collection("answer")
			const surveyAnswer = await answerRef.add({
				schedule_id: this.scheduleId.id,
				user_id: firebase.auth().currentUser.uid,
				participationInGroup: false,
			})
			this.$router.push('/')
		}
	},
	computed: {
		//[リファクタ用]
		//-----------------------------------
		// questionnaireAnswerModel: {
		// 	get() {
		// 		return this.$store.getters.questionnaireAnswer
		// 	},
		// 	set(value) {
		// 		this.$store.dispatch("updateQuestionnaireAnswer", value)
		// 	}
		// }
		//-----------------------------------
		attendanceAnswerModel: {
			get() {
				return this.$store.getters.attendanceAnswer
			},
			set(value) {
				this.$store.dispatch("updateAttendanceAnswer1", value)
			}
		},
		isCarAnswerModel: {
			get() {
				return this.$store.getters.isCarAnswer;
			},
			set(value) {
				this.$store.dispatch("updateIsCarAnswer", value)
			}
		},
		remarkAnswerModel: {
			get() {
				return this.$store.getters.remarkAnswer;
			},
			set(value) {
				this.$store.dispatch("updateRemarkAnswer", value)
			}
		}
	}
}
</script>