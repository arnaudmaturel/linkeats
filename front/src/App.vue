<template>
  <v-app id="app">
    <v-main>
      <SideBar />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from './/components/SideBar.vue';

export default {
  name: 'App',
  components: {
    SideBar
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
