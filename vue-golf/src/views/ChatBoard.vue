<template>
	<v-app id="inspire">

	<sidebar/>
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

						<v-list-item-subtitle class="message">
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
import Sidebar from '@/components/layouts/Sidebar'

	export default {
		components: {
			Sidebar
		},
		async created() {
			const user_id = this.$route.query.user_id;
			console.log("user_id", user_id);

			// console.log("roomId call", this.roomId)
			//firebaseから、ドキュメントを取得
			const roomRef = firebase.firestore().collection("rooms").doc(this.roomId)
			// console.log("roomRef", roomRef)
			const roomDoc = await roomRef.get()
			// console.log("roomDoc", roomDoc)
			const room = roomDoc.data()
			console.log("room", room);

			//メッセージをfirestoreから取得する
			const snapshot = await roomRef.collection("messages").orderBy("createdAt", "asc").get()
			snapshot.forEach(doc => {
				console.log(doc.data())
				this.messages.push(doc.data())
			})
			// const snapshot = await roomsRef.get()
			// console.log(snapshot);

			// snapshot.forEach(doc => {
			// 	console.log(doc.data());
			// 	this.messages.unshift(doc.data())
			// })

		},
		mounted () {
			this.auth = JSON.parse(sessionStorage.getItem('user'))
			console.log("auth call", this.auth);
		},
		data: () => ({
			messages: [
				// { message: "message 1" },
				// { message: "message 2" },
				// { message: "message 3" },
				// { message: "message 4" },
				// { message: "message 5" },				
			],
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
				// console.log("submit call", this.body)
				// this.messages.unshift({ message: this.body });
				// this.body = "";

				const roomRef = firebase.firestore().collection("rooms").doc(this.roomId)
				roomRef.collection('messages').add({
					message: this.body,
					name: this.auth.displayName,
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