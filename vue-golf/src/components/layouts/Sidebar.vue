<template>
	<v-navigation-drawer
		v-model="drawer"
		app
	>
		<v-sheet
		color="grey lighten-4"
		class="pa-4"
		>
		<v-avatar
			class="mb-4"
			color="grey darken-1"
			size="64"
		></v-avatar>

		<div class="username">test</div>
		</v-sheet>

		<v-divider></v-divider>

		<v-list>
		<v-list-item
			v-for="[icon, text, to] in links"
			:key="icon"
			:to="to"
			link
		>
			<v-list-item-icon>
			<v-icon>{{ icon }}</v-icon>
			</v-list-item-icon>

			<v-list-item-content>
			<v-list-item-title>{{ text }}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
	export default {
	data: () => ({
		drawer: null,
		links: [
		['mdi-inbox-arrow-down', 'rooms','/'],
		['mdi-send', 'users','/user'],
		['mdi-delete', 'messages','/about'],
		['mdi-alert-octagon', 'Logout','/about'],
		],
	}),
	}
</script>