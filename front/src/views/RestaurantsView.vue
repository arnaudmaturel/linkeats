<template>
  <SideBar/>
  <v-container>
    <v-row>
      <v-col v-for="(restaurant, index) in restaurants" :key="index">
        <v-card
            min-width="250"
            max-width="400"
            :loading="loading"
        >
          <v-img
              height="100%"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-title>{{ restaurant }}</v-card-title>
          <v-card-subtitle>
            Lorem ipsum spartacus romulus
          </v-card-subtitle>
          <v-card-text>
            <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
            ></v-rating>
          </v-card-text>
          <v-card-actions>
            <v-btn
                color="deep-purple lighten-2"
                text
                @click="reserve"
            >
              Order
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      restaurants: ['McDoonalds', 'BurgerKong', 'SubRoad', "O'Toutouc", 'SuShinois', 'Pizza De Lamama', 'MozzaStickss', 'Sevran', 'Food Night', 'Carrouf', 'Quizz'],
    };
  },
  methods: {
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>
