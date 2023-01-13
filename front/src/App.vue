<template>
  <v-app id="app">
    <v-main>
      <SideBar />
      <router-view/>
      <footer-component/>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from './/components/SideBar.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    SideBar,
    FooterComponent
  }
}
</script>

<style
    FooterComponent>
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
