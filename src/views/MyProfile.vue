<template>
	<v-app id="inspire">
	<DefaultSidebar/>

	<v-main>
		<v-container class="grey lighten-5">
			<v-row
				no-gutters
				style="flex-wrap: nowrap;"
			>
				<v-col
					cols="1"
					style="min-width: 100px; max-width: 100%;"
					class="flex-grow-1 flex-shrink-0"
				>
					<v-card
						class="pa-2"
						outlined
						tile
					>
					マイプロフィール
					</v-card>
				</v-col>
			</v-row>
			<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				ユーザー名
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ user.userName }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
				class="pa-2"
				outlined
				tile
				>
				メールアドレス
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
				class="pa-2"
				outlined
				tile
				>
				{{ user.email }}
				</v-card>
			</v-col>
		</v-row>

		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				年代
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ user.age }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				居住地
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ user.live }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				ゴルフ暦
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ golfPlayingHistory }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				車の有無
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ is_availabilityOfCar }}
				</v-card>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			style="flex-wrap: nowrap;"
		>
			<v-col
				cols="2"
				class="flex-grow-0 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				自己紹介文
				</v-card>
			</v-col>
			<v-col
				cols="1"
				style="min-width: 100px; max-width: 100%;"
				class="flex-grow-1 flex-shrink-0"
			>
				<v-card
					class="pa-2"
					outlined
					tile
				>
				{{ user.selfIntroductionText }}
				</v-card>
			</v-col>
		</v-row>
		</v-container>
		<v-container>
			<v-row>
				<v-col>
					<router-link
					:to="{ path: '/editProfile', query: { user_id: this.user_id}}">
						<v-btn color="primary" dark>マイページ編集</v-btn>
					</router-link>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
	</v-app>
</template>

<script>
import DefaultSidebar from '@/components/layouts/DefaultSidebar'
import firebase from "@/firebase/firebase"

export default {
	components: {
		DefaultSidebar
	},
	async created() {
		this.user_id = this.$route.query.user_id;
		const userRef = firebase.firestore().collection("users").doc(this.user_id)
		const userDoc = await userRef.get()
		const user = userDoc.data()
		this.user = user

		this.is_availabilityOfCar = (this.user.is_availabilityOfCar ? '有' : '無')

		if(this.user.golfPlayingHistory === 0) {
			this.golfPlayingHistory = "数回打ちっぱなし程度";
		} else if(this.user.golfPlayingHistory === 1) {
			this.golfPlayingHistory = "1年未満";
		} else if(this.user.golfPlayingHistory === 2) {
			this.golfPlayingHistory = "1-2年";
		} else if(this.user.golfPlayingHistory === 3) {
			this.golfPlayingHistory = "1-2年";
		} else if(this.user.golfPlayingHistory === 4) {
			this.golfPlayingHistory = "3-4年";
		} else if(this.user.golfPlayingHistory === 5) {
			this.golfPlayingHistory = "5年以上";
		}
	},
	data: () => ({
		golfPlayingHistory: '',
		is_availabilityOfCar: '',
		user:'',
		userName: '',
		email: '',
	}),
}
</script>