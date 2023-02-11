<template>
	<v-app id="inspire">
	<DefaultSidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ユーザープロフィール</v-toolbar-title>

		<v-spacer></v-spacer>
	</v-app-bar>

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
				{{ user.golfPlayingHistory }}
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
				{{ AvailabilityOfCar }}
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
		<router-link to="/user">
			<v-btn class="ma-2" color="primary" dark>戻る</v-btn>
		</router-link>
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
		const userRef = firebase.firestore().collection("users").doc(this.friendId)
		const userDoc = await userRef.get()
		const user = userDoc.data()
		this.user = user
	},
	data: () => ({
		user: "",
		userName: "",
		email: "",
	}),
	computed: {
		friendId () {
		return 	this.$route.query.friend_id;
		},
	},
}
</script>