<template>
	<v-app id="inspire">

	<DefaultSidebar/>
		<v-avatar
			class="mb-4"
			color="grey darken-1"
			size="64"
		></v-avatar>

	<v-main>
		<v-container
		class="py-8 px-6"
		fluid
		>
		<v-row>
			<v-col
			v-for="card in cards"
			:key="card"
			cols="12"
			>
			<v-card>

				<v-list two-line>
				<div v-for="(data, index) in message" :key="index">
					<v-list-item>
					<v-list-item-avatar color="grey darken-1">
					</v-list-item-avatar>

					<v-list-item-content>

						<v-list-item-subtitle 
						v-if="data.questionnairesId"
						class="message">
						<router-link :to="{ path: '/surveyAnswer', query: { room_id: roomId }}">
							{{ data.message }}
						</router-link>
						</v-list-item-subtitle>
						<v-list-item-subtitle 
						v-else
						class="message">
							{{ data.message }}
						</v-list-item-subtitle>
					</v-list-item-content>
					</v-list-item>

					<v-divider
					v-if="index !== 6"
					:key="`divider-${index}`"
					inset
					></v-divider>
				</div>
				</v-list>
			</v-card>
			</v-col>
		</v-row>
		</v-container>
		<v-textarea
			v-model="body"
			class="mx-2"
			label="メッセージを送信"
			rows="3"
			prepend-icon="mdi-comment"
			auto-grow
		></v-textarea>
		<v-btn @click="clear">
			クリア
		</v-btn>
		<v-btn
			color="primary"
			class="ma-2"
			type="submit"
			:disabled="invalid"
			@click="submit"
		>
			メッセージ送信
		</v-btn>
	</v-main>
	</v-app>
</template>

<script>
import firebase from "@/firebase/firebase"
import DefaultSidebar from '@/components/layouts/DefaultSidebar'

	export default {
		components: {
			DefaultSidebar
		},
		async created() {
			//[roomのデータを取得]
			const roomRef = firebase.firestore().collection("rooms").doc(this.roomId)
			const roomDoc = await roomRef.get()
			const room = roomDoc.data()

			//[questionnairesIdを取得]
			const questionnairesIdRef = firebase.firestore().collection("questionnaires").doc(room.questionnairesId)
			const questionnairesGet = await questionnairesIdRef.get()
			const questionnaires = questionnairesGet.data()

			//メッセージをfirestoreから取得する
			roomRef.collection('messages').orderBy('createdAt', "asc")
			.onSnapshot(snapshot => {
				snapshot.docChanges().forEach(change => {
					this.message.push(change.doc.data())
				})
			})
		},
		mounted () {
			this.auth = firebase.auth().currentUser
		},
		data: () => ({
			questionnairesData: '',
			message: [],
			body: "",
			cards: ['Today'],
			drawer: null,
			links: [
			['mdi-inbox-arrow-down', 'Inbox'],
			['mdi-send', 'Send'],
			['mdi-delete', 'Trash'],
			['mdi-alert-octagon', 'Spam'],
			],
			auth: null,
		}),
		computed: {
			invalid() {
				if(!this.body){
					return true;
				}
				return false;
			},
			roomId () {
			return 	this.$route.query.room_id;
			},
		},
		methods: {
			clear()	{
				this.body = "";
			},
			submit() {
				const roomRef = firebase.firestore().collection("rooms").doc(this.roomId)
				roomRef.collection('messages').add({
					message: this.body,
					name: this.auth.displayName,
					//後から、photoURLは追加すると思うから、一旦残し
					// photoURL: this.auth.photoURL,
					createdAt: firebase.firestore.Timestamp.now()
				})
				.then((result) => {
					this.body = ""
				})
				.catch((error) => {
					alert('メッセージの送信に失敗しました')
				})
			}
		}
	}
</script>

<style scoped>
.message {
	text-align: left;
}
</style>
