<template>
	<v-app id="inspire">
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>グループ作成</v-toolbar-title>
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
				<v-col
					cols="12"
					md="4"
				>
				<v-text-field
					label="グループ名"
					required
				></v-text-field>
				</v-col>
				<v-col
					cols="12"
					md="4"
				>
				<v-text-field
					label="ゴルフ場"
					required
				></v-text-field>
				</v-col>
				<v-col
					class="d-flex"
					cols="12"
					sm="6">
					<v-autocomplete
						:items="friendsIdArray"
						outlined
						dense
						chips
						small-chips
						label="友人検索"
						multiple
					></v-autocomplete>
				</v-col>
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
				<!-- <v-col
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
				</v-col> -->
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
				<router-link :to="{ path: '/memberConfirmed', query: { user_id: this.user_id} }">
					<v-btn class="ma-2" color="primary" dark>確認</v-btn>
				</router-link>
			</v-col>
		</v-row>
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
		</v-btn> -->

	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
	async created() {
		this.user_id = this.$route.query.user_id;
		// console.log("user_id", this.user_id);
		const userRef = firebase.firestore().collection("users").doc(this.user_id)
		const userDoc = await userRef.get()
		this.user = userDoc.data()
		console.log("user", this.user);

		// this.friendsIdArray =JSON.parse(userDoc.get("friends"))
		console.log("friendsIdArray", this.friendsIdArray)

	},
	data: () => ({
		menu: false,
		friendsIdArray: [],
		date:new Date().toISOString().substr(0, 10),
		user:'',
		user_id: '',
		users:[],
		pref: [
			'北海道',
			'青森',
			'岩手',
			'宮城',
			'秋田',
			'山形',
			'福島',
			'茨城',
			'栃木',
			'群馬',
			'埼玉',
			'千葉',
			'東京都',
			'神奈川',
			'新潟',
			'富山',
			'石川',
			'福井',
			'山梨',
			'長野',
			'岐阜',
			'静岡',
			'愛知',
			'三重',
			'滋賀',
			'京都府',
			'大阪府',
			'兵庫',
			'奈良',
			'和歌山',
			'鳥取',
			'島根',
			'岡山',
			'広島',
			'山口',
			'徳島',
			'香川',
			'愛媛',
			'高知',
			'福岡',
			'佐賀',
			'長崎',
			'熊本',
			'大分',
			'宮崎',
			'鹿児島',
			'沖縄',
		]
	}),
	// computed: {
	// 	userId () {
	// 	return 	this.$route.query.user_id;
	// 	},
	// },
}
</script>