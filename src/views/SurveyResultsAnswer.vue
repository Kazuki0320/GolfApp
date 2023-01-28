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
		<v-data-iterator
			:items="items"
			hide-default-footer
		>
			<template>
				<v-row>
					<v-col
						v-for="(surveyResult, index) in surveyResultAnswer"
						:key="`${surveyResult.userName}_${index}`"
						cols="12"
						sm="6"
						md="4"
						lg="3"
					>
						<v-card>
							<v-card-title class="subheading font-weight-bold">
								{{ surveyResult.userName }}
							</v-card-title>
					<!-- <v-col
						v-for="item in items"
						:key="item.name"
						cols="12"
						sm="6"
						md="4"
						lg="3"
					>
						<v-card>
							<v-card-title class="subheading font-weight-bold">
								{{ item.name }}
							</v-card-title> -->

							<!-- <v-divider></v-divider> -->

							<v-list dense>
								<v-list-item>
									<v-list-item-content>Calories:</v-list-item-content>
									<v-list-item-content class="align-end">
										{{ surveyResult }}
									</v-list-item-content>
								</v-list-item>

								<!--<v-list-item>
									<v-list-item-content>Fat:</v-list-item-content>
									<v-list-item-content class="align-end">
										{{ item.fat }}
									</v-list-item-content>
								</v-list-item>

								<v-list-item>
									<v-list-item-content>Carbs:</v-list-item-content>
									<v-list-item-content class="align-end">
										{{ item.carbs }}
									</v-list-item-content>
								</v-list-item>

								<v-list-item>
									<v-list-item-content>Protein:</v-list-item-content>
									<v-list-item-content class="align-end">
										{{ item.protein }}
									</v-list-item-content>
								</v-list-item>

								<v-list-item>
									<v-list-item-content>Sodium:</v-list-item-content>
									<v-list-item-content class="align-end">
										{{ item.sodium }}
									</v-list-item-content>
								</v-list-item>

								<v-list-item>
									<v-list-item-content>Calcium:</v-list-item-content>
									<v-list-item-content class="align-end">
										{{ item.calcium }}
									</v-list-item-content>
								</v-list-item>

								<v-list-item>
									<v-list-item-content>Iron:</v-list-item-content>
									<v-list-item-content class="align-end">
										{{ item.iron }}
									</v-list-item-content>
								</v-list-item>-->
							</v-list>
						</v-card>
					</v-col>
				</v-row>
			</template>
			</v-data-iterator>
			</v-container>
		</template>
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

	export default {
		async created() {
			this.questionnaireId = this.$route.query.questionnaire_id;

			const answerRef = firebase.firestore().collection("answer")
			const answerGet = await answerRef.where("questionnaire_id", "==", this.questionnaireId).get()

			answerGet.docs.forEach(doc => {
				let data = doc.id
				this.answerIds.push(data)
			})
			this.answerIds.forEach(async doc => {
				const answerRef = firebase.firestore().collection("answer").doc(doc)
				const answerGet = await answerRef.get()
				const answerData = answerGet.data()
				this.surveyResultAnswer.push(answerData)
				// this.surveyResult = answerData
				// console.log("surveyResult", this.surveyResult)
			})
				console.log("surveyResultAnswer", this.surveyResultAnswer)
			},
		data: () => ({
			answerIds: [],
			surveyResult: '',
			surveyResultAnswer: [],
			questionnaireId: '',
			items: [
				{
					name: 'Frozen Yogurt',
					calories: 159,
					fat: 6.0,
					carbs: 24,
					protein: 4.0,
					sodium: 87,
					calcium: '14%',
					iron: '1%',
				},
				{
					name: 'Ice cream sandwich',
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3,
					sodium: 129,
					calcium: '8%',
					iron: '1%',
				},
			],
		}),
	}
</script>
<style scoped>
.survey-form {
	padding: 30px;
}
</style>
