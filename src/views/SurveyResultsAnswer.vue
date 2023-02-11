<template>
	<v-app id="inspire">
	<v-container fluid>
		<v-app-bar
			app
			shrink-on-scroll
			class="mb-2"
			color="primary darken-5"
			dark
			flat
		>
		<v-toolbar-title>各メンバーアンケート状況</v-toolbar-title>
		</v-app-bar>
	</v-container>

	<v-main>
		<template>
		<v-container fluid>
			<template>
				<v-col
				v-for="(userData,index) in surveyResultAnswer"
				:key="`${userData}_${index}`"
				>
				<v-card>
					{{ userData.userName }}
				<v-row
				cols="12"
				sm="6"
				md="4"
				lg="3">
					<v-col>
						<v-list dense>
							<v-list-item>
								<v-card>
									<v-card-title class="subheading font-weight-bold">
										{{ userData.surveyAnswers[0].date }}
									</v-card-title>
								<v-col>
									<v-list-item-content class="align-end">
										参加可否:{{ userData.surveyAnswers[0].attendance }}
									</v-list-item-content>
								</v-col>
								<v-col>
									<v-list-item-content class="align-end">
										車の有無:{{ userData.surveyAnswers[0].carAnswer }}
									</v-list-item-content>
								</v-col>
								</v-card>
							</v-list-item>
						</v-list>
					</v-col>

					<v-col>
					<v-list dense>
						<v-list-item>
							<v-card>
								<v-card-title class="subheading font-weight-bold">
									{{ userData.surveyAnswers[1].date }}
								</v-card-title>
							<v-col>
								<v-list-item-content class="align-end">
									参加可否:{{ userData.surveyAnswers[1].attendance }}
								</v-list-item-content>
							</v-col>
							<v-col>
								<v-list-item-content class="align-end">
									車の有無:{{ userData.surveyAnswers[1].carAnswer }}
								</v-list-item-content>
							</v-col>
							</v-card>
						</v-list-item>
					</v-list>
					</v-col>

					<v-col>
					<v-list dense>
						<v-list-item>
							<v-card>
								<v-card-title class="subheading font-weight-bold">
									{{ userData.surveyAnswers[2].date }}
								</v-card-title>
							<v-col>
								<v-list-item-content class="align-end">
									参加可否:{{ userData.surveyAnswers[2].attendance }}
								</v-list-item-content>
							</v-col>
							<v-col>
								<v-list-item-content class="align-end">
									車の有無:{{ userData.surveyAnswers[2].carAnswer }}
								</v-list-item-content>
							</v-col>
							</v-card>
						</v-list-item>
					</v-list>
					</v-col>
				</v-row>
				</v-card>
				</v-col>
			</template>
			</v-container>
		</template>
		<v-btn color="secondary" :to="{path: '/surveyResults', query: { schedules_id: schedulesId }}">一覧に戻る</v-btn>
		<v-btn
		@click="roomMakeOnClick"
		class="ma-2"
		color="primary"
		dark>グループ作成</v-btn>
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

	export default {
		async created() {
			//[usersの中から、ログインユーザーの情報を取得]
			this.userId = firebase.auth().currentUser.uid;
			const userDoc = firebase.firestore().collection("users").doc(this.userId)
			const userGet = await userDoc.get()
			this.userInfo = userGet.data()

			//[schedulesIdを受け取る処理]
			this.schedulesId = this.$route.query.schedules_id;

			//[受け取ってきたschedulesIdをanswerコレクションの中で、探索してデータを取得]
			const answerRef = firebase.firestore().collection("answer")
			const answerGet = await answerRef.where("schedule_id", "==", this.schedulesId).get()
			answerGet.docs.forEach(doc => {
				this.answerIds.push(doc.id)
			})
			this.answerIds.forEach(async doc => {
				const answerRef = firebase.firestore().collection("answer").doc(doc)
				const answerGet = await answerRef.get()
				const answerData = answerGet.data()
				const surveyAnswer = answerData
				let usersId = {
					userId: answerData.user_id,
				}

				//[usersIdを取得して、各ユーザーの名前を表示させるための処理
				const userDoc = firebase.firestore().collection("users").doc(usersId.userId)
				const userGet = await userDoc.get()
				const user = userGet.data()
				let userData = {
					userName: user.userName,
					surveyAnswers: surveyAnswer.surveyAnswers
				}
				this.surveyResultAnswer.push(userData)
			})

			//[schedulesの中から、questionnaireIdを探索してデータを取得]
			const schedulesRef = firebase.firestore().collection("schedules").doc(this.schedulesId)
			const schedulesGet = await schedulesRef.get()
			const schedulesData = schedulesGet.data()
			this.schedulesInfo.push(schedulesData)

			//[schedulesInfoからquestionnairesIdとmembersのIdを取得]
			this.schedulesInfo.forEach(async doc => {
				this.questionnaireId = doc.questionnairesId
				this.membersId = doc.members
			})

			// //車の有無を表示するための処理
			this.AvailabilityOfCar = (this.surveyAnswer.AvailabilityOfCar ? '有' : '無')
			// 参加可否を表示するための処理
			this.participationInGroup = (this.surveyAnswer.participationInGroup ? '可' : '不可')

			},
		data: () => ({
			usersName: [],
			users: [],
			userAnswer: [],
			answerTest: [],
			surveyAnswer: '',
			participationInGroup: '',
			AvailabilityOfCar: '',
			usersInfo: [],
			schedulesId: '',
			userInfo:'',
			schedulesInfo: [],
			userId: '',
			answerIds: [],
			surveyResult: '',
			surveyResultAnswer: [],
			questionnaireId: '',
			groupName:'',
			membersId: [],
		}),
		methods: {
			async roomMakeOnClick() {
			//groupNameの取得処理
			this.schedulesInfo.forEach(value => {
				this.groupName = value.groupName
				this.membersId = value.members
			})

			//roomsのドキュメントIDを作成し、フィールドの値を追加
			const roomRef = await firebase.firestore().collection("rooms").add({
				members_id: this.membersId,
			})

			//roomsのドキュメントIDの中にサブコレクションmessageを追加
			const roomId = firebase.firestore().collection("rooms").doc(roomRef.id)
			const messageAdd = await roomId.collection("messages").add({
				message: this.groupName,
				name: this.userInfo.userName,
				questionnairesId: this.questionnaireId,
				//後から、photoURLは追加すると思うから、一旦残し
				// photoURL: this.auth.photoURL,
				createdAt: firebase.firestore.Timestamp.now()
			})
			this.$router.push('/')
			}
		}
	}
</script>
<style scoped>
.survey-form {
	padding: 30px;
}
</style>
