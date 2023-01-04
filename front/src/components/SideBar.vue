<template>
  <v-app-bar
      color="light-green accent-4"
      dense
      dark
  >
    <v-toolbar-title>LinkEats!</v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-slot:extension>
      <v-tabs align-with-title>
        <v-tab :href="'/'">Home</v-tab>
        <v-tab :href="'/restaurants'">Restaurants</v-tab>
        <v-tab :href="'/about'">About us</v-tab>
      </v-tabs>
    </template>

    <v-spacer></v-spacer>

    <v-btn icon href="/cart">
      <v-icon>mdi-cart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar>
          <v-btn icon="mdi-account" v-bind="props"></v-btn>
        </v-avatar>
      </template>

      <v-list>
        <v-list-item>
          <v-btn href="/login">Login</v-btn>
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
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<style scoped>

</style>
