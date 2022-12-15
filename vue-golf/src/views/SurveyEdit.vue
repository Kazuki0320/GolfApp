<template>
	<v-app id="inspire">
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>アンケート作成</v-toolbar-title>
		<v-spacer></v-spacer>
	</v-app-bar>
	<v-main>
		<!-- <v-btn
			class="mr-4"
			type="submit"
			:disabled="invalid"
			@click="submit"
		>
			submit
		</v-btn>
		<v-btn @click="clear">
			clear
		</v-btn> 
	-->
		<v-row>
			<v-col cols="12">
					<!-- <v-col>都道府県</v-col>
						<select id="shot_pref" name="input_pref" class="form-control input-lg">
							<option value="">都道府県選択</option>
							<option v-for="(item) in getPref"
							:key="item.no">
							{{ item.name }}
							</option>
						</select> -->
						<!-- <v-col cols="4">
							<v-img :src="book.image"></v-img>
						</v-col> -->
							<v-col
								class="d-flex"
								cols="12"
								sm="6"
							>
							<v-select
								:items="pref"
								label="開催候補地1"
							>
								<!-- <option v-for="(item) in getPref"
								:key="item.no">
								{{ item.name }}
								</option> -->
							</v-select>
							</v-col>
								<!-- <v-text-field
									label="都道府県選択1"
									required
								></v-text-field> -->
								<!-- class="mx-2" v-model="book.memo">
								{{ book.memo }} -->
							<v-col
								class="d-flex"
								cols="12"
								sm="6"
							>
							<v-select
								:items="pref"
								label="開催候補地2"
							>
							</v-select>
							</v-col>
								<v-col
									cols="12"
									sm="6"
									md="4"
								>
									<v-menu
										v-model="menu"
										:close-on-content-click="false"
										:nudge-right="40"
										transition="scale-transition"
										offset-y
										min-width="auto"
									>
									<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="date"
										readonly
										v-bind="attrs"
										v-on="on"
										label="候補日"
										required
									></v-text-field>
									</template>
									<v-date-picker
										v-model="date"
										@input="menu = false"
										locale="jp-ja"
										:day-format="date => new Date(date).getDate()">
									</v-date-picker>
									</v-menu>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="4"
								>
									<v-menu
										v-model="menu"
										:close-on-content-click="false"
										:nudge-right="40"
										transition="scale-transition"
										offset-y
										min-width="auto"
									>
									<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="date"
										readonly
										v-bind="attrs"
										v-on="on"
										label="回答締切"
										required
									></v-text-field>
									</template>
									<v-date-picker
										v-model="date"
										@input="menu = false"
										locale="jp-ja"
										:day-format="date => new Date(date).getDate()">
									</v-date-picker>
									</v-menu>
								</v-col>
								<v-col
									cols="12"
									md="4"
								>
								<v-text-field
									label="備考"
									required
								></v-text-field>
								</v-col>
								<v-btn color="secondary" to="/">一覧に戻る</v-btn>
								<router-link to="/surveyConfirmed">
									<v-btn class="ma-2" color="primary" dark>確認</v-btn>
								</router-link>
								<!-- <v-btn color="info">保存する</v-btn> -->
			</v-col>
		</v-row>
		<!-- <router-link to="/surveyConfirmed">
			<v-btn class="ma-2" color="primary" dark>確認</v-btn>
		</router-link> -->

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
		users:[],
		date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
		menu: false,
		pref: [
			'北海道',
			'青森',
			// {"no":"1","name":"\u5317\u6d77\u9053"},
			// {"no":"2","name":"\u9752\u68ee\u770c"},
			// {"no":"3","name":"\u5ca9\u624b\u770c"},
			// {"no":"4","name":"\u5bae\u57ce\u770c"},
			// {"no":"5","name":"\u79cb\u7530\u770c"},
			// {"no":"6","name":"\u5c71\u5f62\u770c"},
			// {"no":"7","name":"\u798f\u5cf6\u770c"},
			// {"no":"8","name":"\u8328\u57ce\u770c"},
			// {"no":"9","name":"\u6803\u6728\u770c"},
			// {"no":"10","name":"\u7fa4\u99ac\u770c"},
			// {"no":"11","name":"\u57fc\u7389\u770c"},
			// {"no":"12","name":"\u5343\u8449\u770c"},
			// {"no":"13","name":"\u6771\u4eac\u90fd"},
			// {"no":"14","name":"\u795e\u5948\u5ddd\u770c"},
			// {"no":"15","name":"\u65b0\u6f5f\u770c"},
			// {"no":"16","name":"\u5bcc\u5c71\u770c"},
			// {"no":"17","name":"\u77f3\u5ddd\u770c"},
			// {"no":"18","name":"\u798f\u4e95\u770c"},
			// {"no":"19","name":"\u5c71\u68a8\u770c"},
			// {"no":"20","name":"\u9577\u91ce\u770c"},
			// {"no":"21","name":"\u5c90\u961c\u770c"},
			// {"no":"22","name":"\u9759\u5ca1\u770c"},
			// {"no":"23","name":"\u611b\u77e5\u770c"},
			// {"no":"24","name":"\u4e09\u91cd\u770c"},
			// {"no":"25","name":"\u6ecb\u8cc0\u770c"},
			// {"no":"26","name":"\u4eac\u90fd\u5e9c"},
			// {"no":"27","name":"\u5927\u962a\u5e9c"},
			// {"no":"28","name":"\u5175\u5eab\u770c"},
			// {"no":"29","name":"\u5948\u826f\u770c"},
			// {"no":"30","name":"\u548c\u6b4c\u5c71\u770c"},
			// {"no":"31","name":"\u9ce5\u53d6\u770c"},
			// {"no":"32","name":"\u5cf6\u6839\u770c"},
			// {"no":"33","name":"\u5ca1\u5c71\u770c"},
			// {"no":"34","name":"\u5e83\u5cf6\u770c"},
			// {"no":"35","name":"\u5c71\u53e3\u770c"},
			// {"no":"36","name":"\u5fb3\u5cf6\u770c"},
			// {"no":"37","name":"\u9999\u5ddd\u770c"},
			// {"no":"38","name":"\u611b\u5a9b\u770c"},
			// {"no":"39","name":"\u9ad8\u77e5\u770c"},
			// {"no":"40","name":"\u798f\u5ca1\u770c"},
			// {"no":"41","name":"\u4f50\u8cc0\u770c"},
			// {"no":"42","name":"\u9577\u5d0e\u770c"},
			// {"no":"43","name":"\u718a\u672c\u770c"},
			// {"no":"44","name":"\u5927\u5206\u770c"},
			// {"no":"45","name":"\u5bae\u5d0e\u770c"},
			// {"no":"46","name":"\u9e7f\u5150\u5cf6\u770c"},
			// {"no":"47","name":"\u6c96\u7e04\u770c"}
		]
	}),
	computed: {
		userId () {
		return 	this.$route.query.user_id;
		},
		// getPref: {
		// 	get: function () {
		// 		let self = this;
		// 		return self.pref.filter(function (item) {
		// 			return item;
		// 		});
		// 	},
		// 	set: function (v) {
		// 		this.pref = v;
		// 	}
		// }
	},
}
</script>