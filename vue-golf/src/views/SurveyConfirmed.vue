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
			</v-col>
		</v-row>
		<router-link to="/surveyEdit">
			<v-btn color="secondary">一覧に戻る</v-btn>
		</router-link>
		<router-link to="/">
			<v-btn class="ma-2" color="primary" dark>メッセージ送信</v-btn>
		</router-link>
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