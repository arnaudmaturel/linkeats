<template>
  <v-app id="app">
    <v-main>
      <div>
        <SideBar  @on-loggout="logout()" :isLogged="isLog" />
      </div>
      <div style="height: 100%">
        <router-view @on-logged="log()" style="height: 100%"/>
        <footer-component style="position:absolute; bottom: 0"/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from './components/SideBar.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',

  components: {
    SideBar,
    FooterComponent
  },
  created() {
    //this.$store.dispatch("createVisitor")
  },
  data: () => ({
    isLog : false
  }),
  methods: {
    logout() { this.isLog = false; console.log('App.vue : loggout') },
    log() { this.isLog = true; console.log('App.vue : logged !') }
  }
}
</script>

<style>
#app{
  background-color: #F9FAFA;
  /* background-image: linear-gradient(to bottom, rgb(39,71,110) 75%,rgb(0,105,146)); */
    font-family: MyFont;
}

@font-face {
  font-family: 'MyFont';
  src: url('./assets/ARLRDBD.ttf');
}
</style>
