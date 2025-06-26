import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import {
	VApp,
	VAppBar,
	VToolbarTitle,
	VSpacer,
	VBtn,
	VMain,
	VContainer,
	VRow,
	VCol,
	VCard,
	VList,
	VListItem,
	VListItemContent,
	VListItemTitle,
	VListItemSubtitle,
	VAvatar,
	VDivider,
	VForm,
	VTextField,
	VSelect,
	VMenu,
	VDatePicker,
	VCombobox,
	VAutocomplete,
	VAlert,
	VTextarea,
	VIcon
} from 'vuetify/lib'

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
	components: {
		VApp,
		VAppBar,
		VToolbarTitle,
		VSpacer,
		VBtn,
		VMain,
		VContainer,
		VRow,
		VCol,
		VCard,
		VList,
		VListItem,
		VListItemContent,
		VListItemTitle,
		VListItemSubtitle,
		VAvatar,
		VDivider,
		VForm,
		VTextField,
		VSelect,
		VMenu,
		VDatePicker,
		VCombobox,
		VAutocomplete,
		VAlert,
		VTextarea,
		VIcon
	},
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
