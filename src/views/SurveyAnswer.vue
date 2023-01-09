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
				<thead><!--基本はtableと組み合わせて、th/tr/tdなどを使う。th=table header tr=table row td=table data-->
					<tr>
					<th class="text-center">
						メンバー
					</th>
					</tr>
				</thead>
				<tbody>
					<tr
					v-for="index in friend"
					:key="index">
						<td>{{ index }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead><!--基本はtableと組み合わせて、th/tr/tdなどを使う。th=table header tr=table row td=table data-->
					<tr>
					<th class="text-center">
						開催候補地1
					</th>
					</tr>
				</thead>
				<tbody>
					<tr>
					<td>{{ prefModel1 }}</td>
					<!--
					・指定しているユーザーネームを出力したい
					・ログインしてるユーザー情報は除外する
					-->
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
						<td>{{ carsModel }}</td>
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
						<td>{{ lunchModel }}</td>
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
						<td>空白</td>
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
						<td>{{ caddyModel }}</td>
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
						<td>空白</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-center">
							最寄り駅
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>空白</td>
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
		<v-btn class="ma-2" color="secondary" dark to="/">断る</v-btn>
		<v-btn class="ma-2" color="primary" dark to="/">参加</v-btn>
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async created() {
		//この画面では、firebaseのIDを取得して、データを出力する。
		// //車の有無を表示するための処理
		this.AvailabilityOfCar = (this.carsModel ? '有' : '無')
		// //スルーorランチ付きかを判断する処理
		this.throughOrLunch = (this.lunchModel ? 'スルー' : '昼付き')
		// //キャディの有無
		this.AvailabilityOfCaddy = (this.caddyModel ? '有' : '無')

		this.users = []
		// console.log("userId call", this.userId)//userID取得確認OK
		const userRef = firebase.firestore().collection("users").doc(this.userId)
		const userDoc = await userRef.get()
		const user = userDoc.data()
		console.log("user", user);

		// 	const snapshot = await userRef.get()
		// 	snapshot.forEach(doc => {
		// 		console.log(doc.data())
		// 		this.users.push(doc.data())
		// 	// 	console.log("this.users call", this.users)
	},
	data: () => ({
		users:[],
		AvailabilityOfCar: '',
		throughOrLunch: '',
		AvailabilityOfCaddy: '',
	}),
	computed: {
		friend: {
			get() {
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
				return this.$store.getters.date
			},
		},
		deadLineDate: {
			get() {
				return this.$store.getters.deadlineDate
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