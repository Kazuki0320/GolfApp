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
				<thead><!--基本はtableと組み合わせて、th/tr/tdなどを使う。th=table header tr=table row td=table data-->
					<tr>
						<th class="text-center">
							開催候補地1
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
							開催候補地2
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
							候補日
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
							回答締切
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
							車の有無
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
							スルーor昼付き
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
						<td>空白</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<!-- <router-link :to="{ path: '/surveyEdit', query: { user_id: this.user_id, schedules_id: this.schedulesIdData } }"> -->
		<router-link :to="{ path: '/newSurvey', query: { user_id: this.user_id } }">
			<v-btn color="secondary">一覧に戻る</v-btn>
		</router-link>
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
		//ログインユーザーの友人情報を取得する必要があるので、user.idを前の画面から受け取ってくる必要がある。

		console.log("schedulesId", this.schedulesId())
		// this.schedulesId = this.$route.query.schedules_id;
		// console.log("schedules", this.schedulesId);
		const schedulesDoc = firebase.firestore().collection("schedules").doc(this.$route.params.id)
		const schedulesData = await schedulesDoc.get()
		const schedules = schedulesData.data()
		console.log("schedules", schedules)

		// console.log("userId call", this.userId)//userID取得確認OK
		// const userRef = firebase.firestore().collection("users").doc(this.user_id)
		// console.log("userRef", userRef)
		// const userDoc = await userRef.get()
		// const user = userDoc.data()
		// console.log("user", user);

		// 	const snapshot = await userRef.get()
		// 	snapshot.forEach(doc => {
		// 		console.log(doc.data())
		// 		this.users.push(doc.data())
		// 	// 	console.log("this.users call", this.users)
	},
	data: () => ({
		user: '',
		users:[],
		user_id: '',
		schedules_id: '',
		schedulesIdData: ''
	}),
	methods: {
		schedulesId () {
		// console.log("routerId", this.route.id)
		return 	this.$route.params.id;
		},
	},
	// computed: {
	// 	schedulesId () {
	// 	return 	this.$router.id;
	// 	},
	// },
}
</script>