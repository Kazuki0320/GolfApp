<template>
	<v-app id="inspire">
	<sidebar/>
	<v-app-bar
		app
		shrink-on-scroll
	>
		<v-toolbar-title>ルーム一覧</v-toolbar-title>

		<v-spacer></v-spacer>

			<!--vue-hamburger-menuを追加したいけど、上手くライブラリからimportできてない-->
			<button type="button" class="menu-btn" color="blue" @click="open=!open">
				<span></span>
				<i class="fa fa-bars" aria-hidden="true"></i>
			</button >
				<div class="menu" v-bind:class="{'is-active' : open }">

			<router-link to="/ConfirmedOrUndetermined">
				<div class="menu__item">ルーム作成</div>
			</router-link>
			<router-link to="/surveyEdit">
				<div class="menu__item">フレンドを誘う</div>
			</router-link>

			</div>
			
				<!-- <v-btn class="ma-2" color="primary" dark>ルーム作成</v-btn>
			<v-icon dark right>mdi-checkbox-marked-circle</v-icon> ←チョンマークを表示してくれるv-iconディレクティブ -->
	</v-app-bar>

	<v-main>
		<v-container>
		<v-row>
			<v-col
			v-for="room in rooms"
			:key="room.id"
			cols="4"
			>
			<!--this.roomsがpushした後にどういうデータが入っているか？
				[{id: doc.id},{id: doc.id}]-->
				
			<!--ここで/chatのパスのqueryとして、idを設定している
			↓pathとqueryで、room_idを取得してきてる。（ここがChatBoard.vueの$routerと紐づいてる)
			-->
			<router-link :to="{ path: '/chat', query: { room_id: room.id }}">
				<v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
			</router-link>
			<div>グループ1</div>
			
			</v-col>
		</v-row>
		<!-- <v-row>
			<v-col
			v-for="n in 24"
			:key="n"
			cols="4"
			>

			<router-link :to="{ path: '/chat', query: { room_id: n }}">
				<v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
			</router-link>
			
			</v-col>
		</v-row> -->
		</v-container>
	</v-main>
	</v-app>
</template>
<!-- <script src="https://cdn.jsdelivr.net/npm/vue-burger-menu@2.0.3/dist/vue-burger-menu.umd.js"></script> -->

<script>
import Sidebar from '@/components/layouts/Sidebar'
import firebase from "@/firebase/firebase"

export default {
	components: {
		Sidebar
	},
	mounted() {
		this.getRooms()

		// this.auth = JSON.parse(sessionStorage.getItem('user'))
		// console.log("auth call roomlist", this.auth);
	},
	data: () => ({
		rooms:[],
		open: false,
		auth: null
	}),
	methods: {
		async getRooms() {
			this.rooms = []
			const roomRef = firebase.firestore().collection("rooms")
			const snapshot = await roomRef.get()

			snapshot.forEach(doc => {
				let data = {
					id: doc.id
				}
				// console.log(data)
				this.rooms.push(data)
				// console.log("this.room call", this.rooms)

				//this.roomsがpushした後にどういうデータが入っているか？
				// [{id: doc.id},{id: doc.id}]
		})

		// snapshot.docs.map(doc => {
		// 	// const data = {
		// 	// 	name: doc.data().name,
		// 	// 	thumbnailUrl: doc.data().thumbnailUrl,
		// 	// 	createAt: doc.data().createAt
		// 	// }

		// 	const data = {...doc.data()}
		// 	data.id = doc.id
		// 	console.log(data)
		// 	this.rooms.push(data)
		// })

		},
	}
}
</script>

<style scoped>
	/*----------------------------
* メニュー開閉ボタン
*----------------------------*/
.menu-btn{
	position: fixed;
	top: 20px;
	right: 20px;
	z-index: 3;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #333;
}

.menu-btn span,
.menu-btn span:before,
.menu-btn span:after {
    content: '';
    display: block;
    height: 3px;
    width: 25px;
    border-radius: 3px;
    background-color: #ffffff;
    position: absolute;
}
.menu-btn span:before {
    bottom: 8px;
}
.menu-btn span:after {
    top: 8px;
}
/*----------------------------
* メニュー本体
*----------------------------*/
.menu{
	position: fixed;
	top: 0;
	right: 0;
	z-index: 1;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #555;
}
.menu__item{
	width: 100%;
	height: auto;
	padding: .5em 1em;
	text-align: center;
	color: #fff;
	box-sizing: border-box;
}

/*----------------------------
* アニメーション部分
*----------------------------*/

/* アニメーション前のメニューの状態 */
.menu{
	transform: translateX(100vw);
	transition: all .3s linear;
}
/* アニメーション後のメニューの状態 */
.menu.is-active{
	transform: translateX(0);
}
</style>