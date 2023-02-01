import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		//[リファクタ用]
		//-----------------------------------
		// questionnaire: {},
		// questionnaireAnswer: {},
		//-----------------------------------

		groupName: '',
		friends: [],
		price: '',
		playTime: '',
		candidatePrefecture1: '',
		candidatePrefecture2: '',
		proposedDate: new Date().toISOString().substr(0, 10),
		deadlineForResponse: new Date().toISOString().substr(0, 10),
		isCars: false,
		isCaddy: false,
		isLunch: false,
		remark: '',

		attendanceAnswer: '',
		isCarAnswer: '',
		remarkAnswer: '',
	},
	getters: {
		//[リファクタ用]
		//-----------------------------------
		// questionnaireAnswer: state => state.questionnaireAnswer,
		//-----------------------------------

		groupName: state => state.groupName,
		friends: state => state.friends,
		price: state => state.price,
		playTime: state => state.playTime,
		candidatePrefecture1: state => state.candidatePrefecture1,
		candidatePrefecture2: state => state.candidatePrefecture2,
		proposedDate: state => state.proposedDate,
		deadlineForResponse: state => state.deadlineForResponse,
		isCarsModel: state => state.isCars,
		isCaddyModel: state => state.isCaddy,
		isLunchModel: state => state.isLunch,
		remarkModel: state => state.remark,

		attendanceAnswer: state => state.attendanceAnswer,
		isCarAnswer: state => state.isCarAnswer,
		remarkAnswer: state => state.remarkAnswer,
	},

	//[ハードコード用]
	//-----------------------------------
	// mutations: {
	// 		updateSurvey(state, surveyList) { 
	// 			updateFriends(state).friends = surveyList["newFriends"]
	// 		}
	// },
	//-----------------------------------

	mutations: {
		//[リファクタ用]
		//-----------------------------------
		// updateQuestionnaireAnswer(state, questionnaireAnswer) {
		// 	state.questionnaireAnswer = questionnaireAnswer
		// },
		//-----------------------------------

		updateGroupName(state, newGroupName) {
			state.groupName = newGroupName
		},
		updateFriends(state, newFriends) {
			state.friends = newFriends
		},
		updatePrice(state, newPrice) {
			state.price = newPrice
		},
		updatePlayTime(state, newPlayTime) {
			state.playTime = newPlayTime
		},
		updateCandidatePrefecture1(state, newCandidatePrefecture1) {
			state.candidatePrefecture1 = newCandidatePrefecture1
		},
		updateCandidatePrefecture2(state, newCandidatePrefecture2) {
			state.candidatePrefecture2 = newCandidatePrefecture2
		},
		updateDate(state, newDate) {
			state.proposedDate = newDate
		},
		updateDeadLineDate(state, newDeadLineDate) {
		state.deadlineForResponse = newDeadLineDate
		},
		updateIsCars(state, newIsCars) {
			state.isCars = newIsCars
		},
		updateIsCaddy(state, newIsCaddy) {
			state.isCaddy = newIsCaddy
		},
		updateIsLunch(state, newIsLunch) {
			state.isLunch = newIsLunch
		},
		updateRemark(state, newRemark) {
			state.remark = newRemark
		},

		updateAttendanceAnswer(state, newAttendanceAnswer) {
			state.attendanceAnswer = newAttendanceAnswer
		},
		updateIsCarAnswer(state, newIsCarAnswer) {
			state.isCarAnswer = newIsCarAnswer
		},
		updateRemarkAnswer(state, newRemarkAnswer) {
			state.remarkAnswer = newRemarkAnswer
		},
	},

	//[ハードコード用]
	//-----------------------------------
	// actions: {
	// 		updateSurvey({ commit }, surveyList) { 
	// 			commit("updateFriends", surveyList["newFriends"])
	// 			commit("updatePrice", surveyList["newPrice"])
	// 			commit("updatePlayTime", surveyList["newPlayTime"])
	// 			commit("updateCandidatePrefecture1", surveyList["newCandidatePrefecture1"])
	// 			commit("updateCandidatePrefecture2", surveyList["newCandidatePrefecture2"])
	// 			commit("updateDate", surveyList["newDate"])
	// 			commit("updateDeadLineDate", surveyList["newDeadLineDate"])
	// 			commit("updateIsCars", surveyList["newIsCars"])
	// 			commit("updateIsCaddy", surveyList["newIsCaddy"])
	// 			commit("updateIsLunch", surveyList["newIsCars"])
	// 			commit("updateIsCars", surveyList["newIsLunch"])
	// 			commit("updateRemark", surveyList["newRemark"]) 
	// 		}
	// },
	//-----------------------------------

	actions: {
		//[リファクタ用]
		//-----------------------------------
		// updateQuestionnaireAnswer({commit}, questionnaireAnswer) {
		// 	commit("updateQuestionnaireAnswer", questionnaireAnswer)
		// },
		//-----------------------------------

		updateGroupName({commit}, newGroupName) {
			commit("updateGroupName", newGroupName)
		},
		updateFriends({commit}, newFriends) {
			commit("updateFriends", newFriends)
		},
		updatePrice({commit}, newPrice) {
			commit("updatePrice", newPrice)
		},
		updatePlayTime({commit}, newPlayTime) {
			commit("updatePlayTime", newPlayTime)
		},
		updateCandidatePrefecture1({commit}, newCandidatePrefecture1) {
			commit("updateCandidatePrefecture1", newCandidatePrefecture1)
		},
		updateCandidatePrefecture2({commit}, newCandidatePrefecture2) {
			commit("updateCandidatePrefecture2", newCandidatePrefecture2)
		},
		updateDate({commit}, newDate) {
			commit("updateDate", newDate)
		},
		updateDeadLineDate({commit}, newDeadLineDate) {
			commit("updateDeadLineDate", newDeadLineDate)
		},
		updateIsCars({commit}, newIsCars) {
			commit("updateIsCars", newIsCars)
		},
		updateIsCaddy({commit}, newIsCaddy) {
			commit("updateIsCaddy", newIsCaddy)
		},
		updateIsLunch({commit}, newIsLunch) {
			commit("updateIsLunch", newIsLunch)
		},
		updateRemark({commit}, newRemark) {
			commit("updateRemark", newRemark)
		},
		
		updateAttendanceAnswer({commit}, newAttendanceAnswer) {
			commit("updateAttendanceAnswer", newAttendanceAnswer)
		},
		updateIsCarAnswer({commit}, newIsCarAnswer) {
			commit("updateIsCarAnswer", newIsCarAnswer)
		},
		updateIsCaddyAnswer({commit}, newIsCaddyAnswer) {
			commit("updateIsCaddyAnswer", newIsCaddyAnswer)
		},
		updateRemarkAnswer({commit}, newRemarkAnswer) {
			commit("updateRemarkAnswer", newRemarkAnswer)
		},
	}
});
