<template>
  <v-app-bar height="120" style="background-color: #27476E;" elevation="0">
    <v-app-bar-nav-icon size="x-large" @click.stop="mainMenu = !mainMenu" style="color: orange; background-color: white;"></v-app-bar-nav-icon>

    <v-toolbar-title>
      <b style="font-family: MV Boli; font-size: 36px;">
        <router-link :to="{ name: 'home' }" style="text-decoration: none; color: orange;">
          LinkEats!
        </router-link>
      </b>
    </v-toolbar-title>

    <v-card width="400" style="background-color: #27476E;" variant="plain">
      <v-card-text>
        <v-text-field density="compact" variant="solo" label="Your address" append-inner-icon="mdi-map-marker" single-line hide-details></v-text-field>
      </v-card-text>
    </v-card>

    <v-card width="400" style="background-color: #27476E;" variant="plain">
      <v-card-text>
        <v-text-field :loading="loading" density="compact" variant="solo" label="Search menu" append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="onClick"></v-text-field>
      </v-card-text>
    </v-card>

    <v-spacer></v-spacer>

    <v-menu v-model="cartMenu" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-badge color="error" :content=cartCount>
          <v-btn v-bind="props" icon color="warning" size="x-large" style="background-color: white" value="Cart">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-badge>
      </template>

      <CartComponent/>
    </v-menu>

    <v-menu>
      <template v-slot:activator="{ props }">
        <router-link :to="{name:'login'}" style="text-decoration: none">
          <v-btn icon v-bind="props" size="x-large" color="warning" style="background-color: white; margin-left: 20px;" value="Account">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </router-link>
      </template>

      <!--<v-list density="compact">
        <v-list-item v-if="!logged">
          <router-link :to="{name:'login'}" style="text-decoration: none">
            <v-btn icon v-bind="props" size="x-large" color="warning" style="background-color: white; margin-left: 20px;" value="Account">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </router-link>
        </v-list-item>
        <v-list-item v-if="!logged">
          <router-link :to="{ name: 'register' }" style="text-decoration: none; color: black;">
            <v-btn variant="plain">Register</v-btn>
          </router-link>
        </v-list-item>
        <v-list-item v-if="logged">
          <router-link :to="{ name: 'clients/account', params: { id: '1' }}" style="text-decoration: none; color: black;">
            <v-btn href="/account" variant="plain">Account</v-btn>
          </router-link>
        </v-list-item>
      </v-list> -->
    </v-menu>

    <v-btn icon size="x-large" color="warning" style="background-color: white; margin-left: 20px;" @click="logout()" v-if="role !== 5">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>

  <!--<v-navigation-drawer location="top" v-model="mainMenu" width="150" style="background: #27476E; background: -webkit-linear-gradient(to bottom, #27476E, #1f4e76, #02678f); background: linear-gradient(to bottom, #27476E, #1f4e76, #02678f);">
    <v-list>
      <v-list-item>
        It's time to find something to eat!
      </v-list-item>
    </v-list>
  </v-navigation-drawer>-->
  <v-navigation-drawer app v-model="mainMenu">
    <v-list nav density="compact">
      <router-link :to="{ name: 'home' }" style="text-decoration: none; color: black;">
        <v-list-item prepend-icon="mdi-home" title="Home" value="home" style="font-size: 24px;"></v-list-item>
      </router-link>

      <router-link :to="{ name: 'restaurants' }" style="text-decoration: none; color: black;">
        <v-list-item prepend-icon="mdi-silverware" title="Restaurants" value="restaurants" style="font-size: 24px;"></v-list-item>
      </router-link>
      
      <router-link :to="{ name: 'about' }" style="text-decoration: none; color: black;">
        <v-list-item prepend-icon="mdi-information" title="About us" value="about" style="font-size: 24px;"></v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
  
  
</template>

<script>
import CartComponent from "@/components/cart/CartComponent.vue";
import {mapGetters} from "vuex";

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
      logged: false,
      role: localStorage.getItem('userRole')
    }
  },
  computed: mapGetters({
    cartCount: "itemCount"
  }),
  created() {
    this.$store.dispatch("getCount")
  },
  methods: {
    onClick () {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
    logout () {
      localStorage.removeItem('accessToken')
    }
  }
}
</script>
