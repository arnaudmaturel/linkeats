<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Filter</v-card-title>
        </v-card>
      </v-col>
      
      <v-col class="d-flex" cols="12" md="10">
        <v-row>
          <v-col cols="3" v-for="restaurant in allRestaurants.data">
            <v-card min-width="100" max-width="400" :loading="loading" :id="restaurant">
              <v-img height="250" :src='restaurant.RestaurantImgIdentityPath'></v-img>

              <v-card-title>
                {{ restaurant.RestaurantName }}
              </v-card-title>

              <v-card-subtitle>
                tags
              </v-card-subtitle>

              <v-card-text>
                {{ restaurant.RestaurantStars }}
                <v-rating color="amber" dense half-increments size="14" v-model="restaurant.RestaurantStars"></v-rating>
              </v-card-text>

              <v-card-actions>
                <router-link :to="{ name: 'restaurant_menus', params: { restaurant: restaurant.RestaurantName }, query: { id_restaurant: restaurant.UserID }}" style="text-decoration: none;">
                  <v-btn variant="elevated" size="default" color="rgb(255, 152, 0)" style="color: white">
                    Order from
                  </v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'ShopView',
  computed: mapGetters({
    allRestaurants: "restaurants"
  }),
  created() {
    this.$store.dispatch("getAllRestaurants")
  }
}
</script>
