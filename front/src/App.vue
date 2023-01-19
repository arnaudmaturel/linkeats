<template>
  <v-app id="app">
    <v-main>
      <div>
        <SideBar />
      </div>
      <div style="padding-bottom:150px">
        <router-view/>
      </div>
      <div style="width: 100%;">
        <footer-component style="position: absolute; bottom: 0;"/>
      </div>
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
  },
  created() {
    this.$store.dispatch("createVisitor")
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
