import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		count: 2,
		message: '',
		friend: ''
	},
	//gettersで、stateの値をいじって、その値を関数の中に組み込む
	getters: {
		doubleCount: state => state.count *  2,
		tripleCount: state => state.count *  3,
		message: state => state.message
	},
	mutations: {
		increment(state, number) {
			state.count += number
		},
		decrement(state, number) {
			state.count -= number
		},
		updateMessage(state, newMessage) {
			state.message = newMessage
		}
	},
	actions: {
		increment({commit}, number) {
			commit("increment", number)
		},
		decrement({commit}, number) {
			commit("decrement", number)
		},
		updateMessage({commit}, newMessage) {
			commit("updateMessage", newMessage)
		}
	}
});