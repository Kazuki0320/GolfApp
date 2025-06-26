import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import {
	mdiCalendar,
	mdiComment,
	mdiInboxArrowDown,
	mdiSend,
	mdiDelete,
	mdiAlertOctagon,
	mdiSquare,
	mdiCircle,
	mdiTriangle,
	mdiAccountCircle,
	mdiHandWaveOutline,
	mdiAccountEye,
	mdiLogout,
	mdiDoorOpen,
	mdiAccountMultiple
} from '@mdi/js'

Vue.use(Vuetify)

const vuetify = new Vuetify({
	icons: {
		iconfont: 'mdiSvg',
		values: {
			calendar: mdiCalendar,
			comment: mdiComment,
			inboxArrowDown: mdiInboxArrowDown,
			send: mdiSend,
			delete: mdiDelete,
			alertOctagon: mdiAlertOctagon,
			square: mdiSquare,
			circle: mdiCircle,
			triangle: mdiTriangle,
			accountCircle: mdiAccountCircle,
			handWaveOutline: mdiHandWaveOutline,
			accountEye: mdiAccountEye,
			logout: mdiLogout,
			doorOpen: mdiDoorOpen,
			accountMultiple: mdiAccountMultiple
		}
	}
})

export default vuetify
