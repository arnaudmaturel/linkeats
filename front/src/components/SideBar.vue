<template>
  <v-app-bar height="90" style="background-color: #27476E;" elevation="0">
    <v-app-bar-nav-icon size="x-large" @click.stop="mainMenu = !mainMenu" style="color: orange;"></v-app-bar-nav-icon>

    <v-app-bar-title>
      <b style="font-family: MV Boli; font-size: 36px;">
        <router-link :to="{ name: 'home' }" style="text-decoration: none; color: white;">
          LinkEats!
        </router-link>
      </b>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-menu v-model="cartMenu" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-badge color="error" :content=cartCount>
          <v-btn v-bind="props" icon size="x-large" style="color: orange" value="Cart">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-badge>
      </template>

      <CartComponent/>
    </v-menu>

          <!-- <router-link  :to="{name:'account'}" style="text-decoration: none"> -->
            <v-btn icon v-bind="props" @click="loginAccount" size="x-large" color="warning" style="margin-left: 20px;"
              value="Account">
              <v-icon>mdi-account-tie</v-icon>
            </v-btn>
          <!-- </router-link> -->

          <v-btn icon size="x-large" color="red" style="margin-left: 20px;" @click="logout()" v-if="role !== 5" :to="{ name: 'home' }">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-app-bar>
          
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
      role: localStorage.getItem('userRole'),
    }
  },
  computed: mapGetters({
    cartCount: "itemCount",
    user: "credential",
  }),
  created() {
    this.$store.dispatch("getCount");
    // console.log('userRole' + localStorage.getItem('userRole'))
    // console.log('userRole != 5' + localStorage.getItem('userRole')!=5)
  },
  methods: {
    onClick () {
      this.loading = true;

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
    logout () {
      localStorage.clear();
      this.$router.push({ name: 'home' });
    },
    loginAccount()
    {
      if (!localStorage.getItem('userRole') || localStorage.getItem('userRole') == 5)
        this.$router.push({ name:'login'});
      else
        this.$router.push({ name: 'account' })
    }
  }
}
</script>
