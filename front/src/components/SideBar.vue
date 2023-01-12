<template>
  <v-app-bar color="#F9B233">
    <v-app-bar-nav-icon size="50" @click.stop="mainMenu = !mainMenu"></v-app-bar-nav-icon>

    <v-toolbar-title>
      <v-list style="text-align: center">
        <b>LinkEats!</b>
      </v-list>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu v-model="cartMenu" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-badge color="error" :content=cart.itemCount>
          <v-btn v-bind="props" icon="mdi-cart"
          ></v-btn>
        </v-badge>
      </template>
      <CartComponent/>
    </v-menu>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar>
          <v-btn icon="mdi-account" v-bind="props"></v-btn>
        </v-avatar>
      </template>

      <v-list>
        <v-list-item>
          <v-btn href="/login" variant="plain">Login</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn href="/register" variant="plain">Register</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn href="/account" variant="plain">Account</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <v-navigation-drawer app v-model="mainMenu" color="#F9B233">
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
import CartComponent from "@/components/cart/CartComponent.vue";

export default {
  name: 'SideBar',
  components: { 
    CartComponent 
  },
  data() {
    return {
      mainMenu: false,
      cartMenu: false,
      cart: this.cart = this.$store.getters
    }
  }
}
</script>
