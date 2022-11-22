<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>

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

    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.grey.darken-1 {
  background-color: #757575 !important;
  border-color: #757575 !important;
}

.pa-4 {
  padding: 16px !important;
}

.username {
  padding-top: 10px;
}
</style>

<script>
	export default {
	data: () => ({
		drawer: null,
		links: [
		['mdi-inbox-arrow-down', 'Inbox','/'],
		['mdi-send', 'Send','/about'],
		['mdi-delete', 'Trash','/about'],
		['mdi-alert-octagon', 'Spam','/about'],
		],
	}),
	}
</script>
