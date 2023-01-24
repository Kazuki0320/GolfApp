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
					<td>{{ questionnaireContent.groupName }}</td>
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
					<!--メンバーについてはアンケート回答者画面では人数のみ表示-->
					<tr>
						<td>他{{ member }}名</td>
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
					<td>{{ questionnaireContent.selectPlace1 }}</td>
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
					<td>{{ questionnaireContent.selectPlace2 }}</td>
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
						<td>{{ questionnaireContent.proposedDate }}</td>
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
						<td>{{ questionnairesId.DeadlineForResponse }}</td>
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
							希望金額
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ questionnaireContent.price }}</td>
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
							スタート希望時間
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ questionnaireContent.playTime }}</td>
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
						<td>{{ questionnaireContent.remarks }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-btn 
		class="ma-2"
		color="secondary" dark
		@click="unParticipationClick">
		断る
		</v-btn>
		<v-btn 
		class="ma-2"
		color="primary" dark
		@click="participationClick">
		参加
		</v-btn>
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
		this.questionnairesId = questionnairesGet.data()

		// [schedulesの中で上記questionnairesIdと同じ値を持つ、IDを検索してきてそのデータを表示する処理]
		const schedulesRef = firebase.firestore().collection("schedules")
		const schedulesQuestionnaireId = await schedulesRef.where("questionnairesId", "==", roomData.questionnairesId).get()
		this.scheduleId = schedulesQuestionnaireId.docs[0]
		const schedulesCollection = firebase.firestore().collection("schedules").doc(this.scheduleId.id)
		const schedulesGet = await schedulesCollection.get()
		this.questionnaireContent = schedulesGet.data()

		//[メンバーの数を集計するための処理]
		//懸念点:1がマジックナンバーとなること。
		const membersArray = JSON.parse(schedulesGet.get("member"))
		this.member = (membersArray.length + 1)

		// //車の有無を表示するための処理
		this.AvailabilityOfCar = (this.questionnaireContent.AvailabilityOfCar ? '有' : '無')
		// //スルーorランチ付きかを判断する処理
		this.throughOrLunch = (this.questionnaireContent.throughOrLunch ? '昼付き' : 'スルー')
		// //キャディの有無
		this.AvailabilityOfCaddy = (this.questionnaireContent.AvailabilityOfCaddy ? '有' : '無')
	},
	data: () => ({
		scheduleId: '',
		member: '',
		questionnairesId: '',
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
	}
}
</script>