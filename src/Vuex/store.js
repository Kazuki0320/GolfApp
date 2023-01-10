import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		friends: [],
		price: '',
		playTime: '',
		pref1: '',
		pref2: '',
		proposedDate: new Date().toISOString().substr(0, 10),
		deadlineForResponse: new Date().toISOString().substr(0, 10),
		cars: false,
		caddy: false,
		lunch: false,
		remark: '',
	},
	
	//gettersで、stateの値をいじって、その値を関数の中に組み込む
	getters: {
		friends: state => state.friends,
		price: state => state.price,
		playTime: state => state.playTime,
		pref1: state => state.pref1,
		pref2: state => state.pref2,
		proposedDate: state => state.proposedDate,
		deadlineForResponse: state => state.deadlineForResponse,
		carsModel: state => state.cars,
		caddyModel: state => state.caddy,
		lunchModel: state => state.lunch,
		remarkModel: state => state.remark
	},
	mutations: {
		updateFriends(state, newFriends) {
			state.friends = newFriends
		},
		updatePrice(state, newPrice) {
			state.price = newPrice
		},
		updatePlayTime(state, newPlayTime) {
			state.playTime = newPlayTime
		},
		updatePref1(state, newPref1) {
			state.pref1 = newPref1
		},
		updatePref2(state, newPref2) {
			state.pref2 = newPref2
		},
		updateDate(state, newDate) {
			state.proposedDate = newDate
		},
		updateDeadLineDate(state, newDeadLineDate) {
		state.deadlineForResponse = newDeadLineDate
		},
		updateCars(state, newCars) {
			state.cars = newCars
		},
		updateCaddy(state, newCaddy) {
			state.caddy = newCaddy
		},
		updateLunch(state, newLunch) {
			state.lunch = newLunch
		},
		updateRemark(state, newRemark) {
			state.remark = newRemark
		}
	},
	actions: {
		updateFriends({commit}, newFriends) {
			commit("updateFriends", newFriends)
		},
		updatePrice({commit}, newPrice) {
			commit("updatePrice", newPrice)
		},
		updatePlayTime({commit}, newPlayTime) {
			commit("updatePlayTime", newPlayTime)
		},
		updatePref1({commit}, newPref1) {
			commit("updatePref1", newPref1)
		},
		updatePref2({commit}, newPref2) {
			commit("updatePref2", newPref2)
		},
		updateDate({commit}, newDate) {
			commit("updateDate", newDate)
		},
		updateDeadLineDate({commit}, newDeadLineDate) {
			commit("updateDeadLineDate", newDeadLineDate)
		},
		updateCars({commit}, newCars) {
			commit("updateCars", newCars)
		},
		updateCaddy({commit}, newCaddy) {
			commit("updateCaddy", newCaddy)
		},
		updateLunch({commit}, newLunch) {
			commit("updateLunch", newLunch)
		},
		updateRemark({commit}, newRemark) {
			commit("updateRemark", newRemark)
		}
	}
});