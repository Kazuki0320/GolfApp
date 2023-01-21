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
				<div v-for="(data, index) in messages" :key="index">
					<v-list-item>
					<v-list-item-avatar color="grey darken-1">
					</v-list-item-avatar>

					<v-list-item-content>

						<v-list-item-subtitle 
						v-if="data.questionnairesId"
						class="message">
						<router-link to="/surveyAnswer">
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
		<v-btn
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
			const roomRef = firebase.firestore().collection("rooms").doc(this.roomId)
			const roomDoc = await roomRef.get()
			const room = roomDoc.data()
			console.log("room", room);

			const questionnairesIdRef = firebase.firestore().collection("questionnaires").doc(room.questionnairesId)
			const questionnairesGet = await questionnairesIdRef.get()
			const questionnaires = questionnairesGet.data()
			console.log("questionnairesData", questionnaires)

			//[schedulesのデータを取得して、出力する処理はアンケート回答者画面で行う]
			// const schedulesRef = firebase.firestore().collection("schedules").doc(questionnairesData.schedulesId)
			// const schedulesGet = await schedulesRef.get()
			// const schedulesData = schedulesGet.data()
			// console.log("schedulesData", schedulesData)

			//メッセージをfirestoreから取得する
			const snapshot = await roomRef.collection("messages").orderBy("createdAt", "asc").get()
			snapshot.forEach(doc => {
				console.log(doc.data())
				this.messages.push(doc.data())
			})
		},
		mounted () {
			this.auth = firebase.auth().currentUser
			console.log("auth call", this.auth);
		},
		data: () => ({
			questionnairesData: '',
			messages: [],
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
					console.log('success', result);
					this.body = ""
				})
				.catch((error) => {
					console.log('fail', error);
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
