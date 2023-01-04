<template>
  <v-app-bar
      color="orange accent-4"
      dense
      dark
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>LinkEats!</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar>
          <v-btn icon="mdi-cart" v-bind="props"></v-btn>
        </v-avatar>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Burger <v-icon icon="mdi-food"></v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar>
          <v-btn icon="mdi-account" v-bind="props"></v-btn>
        </v-avatar>
      </template>

      <v-list>
        <v-list-item>
          <v-btn data-bs-target="#myModal" data-bs-toggle="modal">Login</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn href="/register">Register</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn href="/account">Account</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  <v-navigation-drawer app v-model="drawer" color="orange">
    <v-list dense nav>
      <v-list-item link href="/">
        <v-list-item-icon>
          <v-icon icon="mdi-home"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Home
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/restaurants">
        <v-list-item-icon>
          <v-icon icon="mdi-silverware"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Restaurants
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/about">
        <v-list-item-icon>
          <v-icon icon="mdi-information"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            About us
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <UserModal />
</template>

<script>
import UserModal from "@/components/UserModal.vue";

export default {
  name: 'SideBar',
  components: {UserModal},
  data: () => ({
    drawer: false,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Account', icon: 'mdi-account-box' },
      { title: 'Settings', icon: 'mdi-cog' },
    ],
    open: false
  }),
}
</script>

<style scoped>

</style>
