<template>
  <v-app-bar height="120" style="background-color: #27476E;">

    <v-app-bar-nav-icon size="x-large" @click.stop="mainMenu = !mainMenu" style="color: orange; background-color: white;"></v-app-bar-nav-icon>

    <v-toolbar-title>
      <b style="color: orange; font-family: MV Boli; font-size: 36px;">LinkEats!</b>
    </v-toolbar-title>

    <v-card width="400" style="background-color: #27476E;" variant="plain">
      <v-card-text>
        <v-text-field
          density="compact"
          variant="solo"
          single-line
          hide-details
          label="Your address"
          append-inner-icon="mdi-map-marker"
        ></v-text-field>
      </v-card-text>
    </v-card>

    <v-card width="400" style="background-color: #27476E;" variant="plain">
      <v-card-text>
        <v-text-field
          :loading="loading"
          density="compact"
          variant="solo"
          label="Search menu"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="onClick"
        ></v-text-field>
      </v-card-text>
    </v-card>

    <v-spacer></v-spacer>

    <v-menu v-model="cartMenu" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-badge color="error" :content=cart.itemCount>
          <v-btn v-bind="props" icon color="warning" size="x-large" style="background-color: white" value="Cart"
          >
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-badge>
      </template>
      <CartComponent/>
    </v-menu>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" size="x-large" color="warning" style="background-color: white; margin-left: 20px;" value="Account">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list density="compact">
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

  <v-navigation-drawer app v-model="mainMenu" temporary>
    <v-list nav density="compact">
      <v-list-item link href="/" prepend-icon="mdi-home" title="Home" value="home" style="font-size: 24px;"></v-list-item>

      <v-list-item link href="/restaurants"  prepend-icon="mdi-silverware" title="Restaurants" value="restaurants" style="font-size: 24px;"></v-list-item>
      
      <v-list-item link href="/about" prepend-icon="mdi-information" title="About us" value="about" style="font-size: 24px;"></v-list-item>
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
      loaded: false,
      loading: false,
      mainMenu: false,
      cartMenu: false,
      locationMenu: false,
      cart: this.cart = this.$store.getters
    }
  },
  methods: {
    onClick () {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
  }
}
</script>
