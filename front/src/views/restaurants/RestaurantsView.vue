<template>
  <v-container>
    <v-row>
      <v-col v-for="restaurant in allRestaurants" key="index" cols="3">
        <v-card min-width="250" max-width="400" :loading="loading" :id="restaurant">

          <v-img height="250" :src='restaurant.image'></v-img>

          <v-card-title>
            {{ restaurant.title }}
          </v-card-title>

          <v-card-subtitle>
            {{ restaurant.tags }}
          </v-card-subtitle>

          <v-card-text>
            <v-rating color="amber" dense half-increments size="14"></v-rating>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" :href='"/restaurants/" + restaurant.title'>
              Order from
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'ShopView',
  computed: mapGetters({
    allRestaurants: "getAllRestaurants"
  }),
  created() {
    this.$store.dispatch("getAllRestaurants")
  }
}
</script>
