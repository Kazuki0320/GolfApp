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
					v-for="(friend, index) in friends"
					:key="`${friend.name}_${index}`"><!--
					↑このやり方は良くない。
					他で、indexを使った場合、キーが０の値が複数できてしまう。
					その場合、テンプレートリテラルを使って、表示を行う。
					-->
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
						<td>{{ prefModel1 }}</td>
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
						<td>{{ prefModel2 }}</td>
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
		<router-link to="/surveyAnswer">
			<v-btn 
			@click="onClick"
			class="ma-2"
			color="primary"
			dark
			>メッセージ送信</v-btn>
		</router-link>
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async created() {
		// //車の有無を表示するための処理
		this.AvailabilityOfCar = (this.carsModel ? '有' : '無')
		// //スルーorランチ付きかを判断する処理
		this.throughOrLunch = (this.lunchModel ? 'スルー' : '昼付き')
		// //キャディの有無
		this.AvailabilityOfCaddy = (this.caddyModel ? '有' : '無')

		// //友人一覧を表示するための処理
		// this.friendsArray = this.schedules.friends

		const questionnairesRef = firebase.firestore().collection("questionnaires").doc(this.$route.params.id)
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
	methods: {
		async onClick() {
			const schedulesRef = firebase.firestore().collection("schedules")
			const result = await schedulesRef.add({
				// questionnairesId: this.questionnairesId,
				friends: this.friend,
				selectPlace1: this.prefModel1,
				selectPlace2: this.prefModel2,
				proposedDate: this.date,
				DeadlineForResponse: this.deadLineDate,
				AvailabilityOfCar: this.carsModel,
				throughOrLunch: this.lunchModel,
				AvailabilityOfCaddy: this.caddyModel,
				remarks: this.remarkModel,
			})
			console.log("result", result)
		}
	},
	computed: {
		friends: {
			get() {
				console.log("friends", this.$store.getters.friend)
				return this.$store.getters.friend;
			}
		},
		prefModel1: {
			get() {
				return this.$store.getters.pref1;
			}
		},
		prefModel2: {
			get() {
				return this.$store.getters.pref2;
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
				return this.$store.getters.carsModel
			},
		},
		caddyModel: {
			get() {
				return this.$store.getters.caddyModel
			}
		},
		lunchModel: {
			get() {
				return this.$store.getters.lunchModel
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