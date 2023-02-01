<template>
	<v-app id="inspire">
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>グループ作成(メンバー確定画面)</v-toolbar-title>
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
							ゴルフ場
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
				<router-link :to=" { path: '/roomCreateConfirmed',query: { user_id: this.user_id} }">
					<v-btn class="ma-2" color="primary" dark>修正</v-btn>
				</router-link>
					<v-btn class="ma-2" color="primary" dark to="/">確定</v-btn>
	</v-main>
	</v-app>
</template>

<script>
//後ほど使うと思うので、残し
// import firebase from "@/firebase/firebase"

export default {
	async created() {
		this.user_id = this.$route.query.user_id;
		//userID取得確認OK
		console.log("userId call", this.user_id)
	},
	data: () => ({
		user_id:'',
		user:'',
		users:[]
	}),
}
</script>