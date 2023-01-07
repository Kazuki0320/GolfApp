import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		count: 2
	},
	//gettersで、stateの値をいじって、その値を関数の中に組み込む
	getters: {
		doubleCount: state => state.count *  2,
		tripleCount: state => state.count *  3
	}
});