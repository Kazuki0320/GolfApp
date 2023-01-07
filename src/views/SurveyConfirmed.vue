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
							メンバー
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
					v-for="friend in friendsArray"
					:key="friend.name">
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
							開催候補地1
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ schedules.selectPlace1 }}</td>
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
						<td>{{ schedules.selectPlace2 }}</td>
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
						<td>{{ schedules.proposedDate }}</td>
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
						<td>{{ schedules.DeadlineForResponse }}</td>
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
						<td>{{ schedules.remarks }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
			<v-btn 
				to="/newSurvey"
				color="secondary">
				一覧に戻る
			</v-btn>
		<router-link to="/surveyAnswer">
			<v-btn class="ma-2" color="primary" dark>メッセージ送信</v-btn>
		</router-link>
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async created() {

		const schedulesDoc = firebase.firestore().collection("schedules").doc(this.$route.params.id)
		const schedulesData = await schedulesDoc.get()
		this.schedules = schedulesData.data()

		//友人一覧を表示するための処理
		this.friendsArray = this.schedules.friends
		//車の有無を表示するための処理
		this.AvailabilityOfCar = (this.schedules.AvailabilityOfCar ? '有' : '無')
		//スルーorランチ付きかを判断する処理
		this.throughOrLunch = (this.schedules.throughOrLunch ? 'スルー' : '昼付き')
		//キャディの有無
		this.AvailabilityOfCaddy = (this.schedules.AvailabilityOfCaddy ? '有' : '無')

		const questionnairesRef = firebase.firestore().collection("questionnaires").doc(this.schedules.questionnairesId)
			questionnairesRef.update({
				schedules_id: this.$route.params.id,
			})
	},
	data: () => ({
		user: '',
		users:[],
		user_id: '',
		schedules: '',
		schedules_id: '',
		friendsArray: [],
		AvailabilityOfCar: null,
		AvailabilityOfCaddy: null,
		throughOrLunch: null
	}),
}
</script>