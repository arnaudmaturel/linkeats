<template>
  <SideBar />
  <v-app>
    <v-container>
      <v-row class="fill-height" align="center" justify="center">
        <v-col v-for="(letter, index) in letters" :key="index">
          <v-hover v-slot="{ hover }">
            <v-card
                height="300"
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                :href="'/' + letter"
                style="background-image: url('../assets/logo.png')"
            >
              <v-card-title>{{ letter }}</v-card-title>
              <v-card-subtitle></v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import SideBar from '../components/SideBar.vue';

export default {
  name: 'ShopView',
  components: {
    SideBar,
  },
  data() {
    return {
      letters: ['A', 'B', 'C'],
    };
  },
}
</script>

