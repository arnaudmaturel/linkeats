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

    <div style="width:max-content; margin-right: 20px; margin-top: 20px; width: 140px;">
      <v-select 
        :label="translate('lang')" 
        variant="outlined" 
        :model-value="selectedLang" 
        @update:model-value="changeLang($event)" 
        :items="languages"
        item-title="name"
        item-value="code"
        density="compact"
        style="color: orange;"
      />
    </div>

    <v-menu v-model="cartMenu" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <div v-if="basket && basket.dishes && basket.dishes.length">
          <v-badge color="error" :content=basket.dishes.length>
            <v-btn v-bind="props" icon size="x-large" style="color: orange" value="Cart">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
        </div>
        <div v-else>
            <v-btn v-bind="props" icon size="x-large" style="color: orange" value="Cart">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
        </div>
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
        <v-list-item prepend-icon="mdi-home" :title="translate('nav_home')" value="home" style="font-size: 24px;"></v-list-item>
      </router-link>

      <router-link :to="{ name: 'restaurants' }" style="text-decoration: none; color: black;">
        <v-list-item prepend-icon="mdi-silverware" :title="translate('nav_restaurants')" value="restaurants" style="font-size: 24px;"></v-list-item>
      </router-link>
      
      <router-link :to="{ name: 'about' }" style="text-decoration: none; color: black;">
        <v-list-item prepend-icon="mdi-information" :title="translate('nav_about')" value="about" style="font-size: 24px;"></v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
  
  
</template>

<script>
import CartComponent from "@/components/cart/CartComponent.vue";
import {mapGetters} from "vuex";
import languages from "@/assets/lang/lang_list.json"

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
      languages: languages,
      selectedLang: localStorage.getItem("codeLang"),
      file: {}
    }
  },
  computed: mapGetters({
    basket : "basket",
    cartCount: "itemCount",
    user: "credential",
  }),
  async created() {
    this.$store.dispatch("getCount");
    if ((!this.$store.basket || this.$store.basket.IDClient != localStorage.getItem('userId')) && localStorage.getItem('userRole') ==1)
    {
      console.log("checkBaket");
      await this.$store.dispatch("getClientBasket", localStorage.getItem('userId'));
    }
    const fileLang = localStorage.getItem("codeLang") || "FR_fr"
    this.file = require(`@/assets/lang/${fileLang}.json`); 
    this.languages.forEach(lang => {
      lang.name = this.translate(lang.name)
    });
    // console.log('userRole' + localStorage.getItem('userRole'))
    // console.log('userRole != 5' + localStorage.getItem('userRole')!=5)
  },
  methods: {
    translate(wordKey) {
      return this.file[wordKey]
    },
    onClick () {
      this.loading = true;

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
    changeLang(lang) {
      this.selectedLang = lang;
      localStorage.setItem("codeLang", lang)
      this.$router.go()
    },
    logout () {
      localStorage.removeItem("userId");
      localStorage.setItem("userRole",5);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("credentialId");
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
