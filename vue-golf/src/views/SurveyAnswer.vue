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
					<tr>
					<td>空白</td>
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
					<td>空白</td>
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
						<td>空白</td>
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
		users:[]
	}),
	computed: {
		userId () {
		return 	this.$route.query.user_id;
		},
	},
}
</script>