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
			<v-toolbar-title>アンケート集計画面</v-toolbar-title>
			</v-app-bar>
		</v-container>

		<v-main>
			<v-row>
				<v-col
				v-for="schedules in schedulesInfo"
				:key="schedules.groupName"
				>
				<v-card 
				class="mx-auto pa-8 survey-form"
				max-width="374">
				<router-link :to="{ path: '/surveyResultsAnswer', query: { schedules_id: schedulesId }}">
					<v-avatar
					class="mb-4"
					color="grey darken-1"
					size="64"
					>
					</v-avatar>
				</router-link>
					<v-card-title>
						{{ schedules.groupName }}
					</v-card-title>
				<v-divider class="mx-4"></v-divider>
			<v-card-title>回答待ち</v-card-title>
			</v-card>
				</v-col>
			</v-row>
		</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

	export default {
		async created() {
			//[userName取得処理]
			const userId = firebase.auth().currentUser.uid

			//[questionnairesIDにログインユーザーが作成したアンケートがあるか探索する実装]
			const questionnaireRef = firebase.firestore().collection("questionnaires")
			const questionnaireUserGet = await questionnaireRef.where("user_id", "==", userId).get()
			questionnaireUserGet.forEach(async doc => {
				this.questionnairesId.push(doc.id)
				let data = {
					id: doc.id
				}
				const questionnairesId = firebase.firestore().collection("questionnaires").doc(data.id)
				const questionnairesGet = await questionnairesId.get()
				const questionnairesData = questionnairesGet.data() 
				this.surveyMakeUsers.push(questionnairesData)
			})

			//[取得したquestionnairesIdで、schedulesコレクションの中を探索して、データを取得]
			this.questionnairesId.forEach(async doc => {
				const schedulesRef = firebase.firestore().collection("schedules")
				const schedulesGet = await schedulesRef.where("questionnairesId", "==", doc).get()
				schedulesGet.forEach(async doc => {
					this.schedulesId = doc.id
					const schedulesGet = await schedulesRef.doc(doc.id).get()
					const schedulesData = schedulesGet.data()
					this.schedulesInfo.push(schedulesData)
			})
			})

		},
		data: () => ({
			schedulesId: '',
			schedules: '',
			questionnairesId: [],
			surveyMakeUsers: [],
			schedulesInfo: [],
		})
	}

</script>
<style scoped>
.survey-form {
	padding: 30px;
}
</style>
