<template>
  <v-app id="app">
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
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
