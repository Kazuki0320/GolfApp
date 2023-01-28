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
				v-for="survey in surveyMakeUsers"
				:key="survey.active"
				>
				<v-card 
				class="mx-auto pa-8 survey-form"
				max-width="374">
				<router-link :to="{ path: '/surveyResultsAnswer', query: { questionnaire_id: questionnairesId.id }}">
					<v-avatar
					class="mb-4"
					color="grey darken-1"
					size="64"
					>
					</v-avatar>
				</router-link>
			<v-card-title>グループ１</v-card-title>
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
			//※[questionnaireの中のフィールドの値に、アンケート作成者のuserIdを登録する処理を追加]
			//→userIdから、name or ID検索を行う。
			const userName = firebase.auth().currentUser.displayName

			//[questionnairesIDにログインユーザーが作成したアンケートがあるか探索する実装]
			const questionnaireRef = firebase.firestore().collection("questionnaires")
			const questionnaireUserGet = await questionnaireRef.where("userName", "==", userName).get()
			questionnaireUserGet.forEach(async doc => {
				let data = {
					id: doc.id
				}
				this.questionnairesId = data

				const questionnairesId = firebase.firestore().collection("questionnaires").doc(data.id)
				const questionnairesGet = await questionnairesId.get()
				const questionnairesData = questionnairesGet.data() 
				this.surveyMakeUsers.push(questionnairesData)
			})
		},
		data: () => ({
			questionnairesId: '',
			surveyMakeUsers: [],
		})
	}
</script>
<style scoped>
.survey-form {
	padding: 30px;
}
</style>
