<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-item>
            <v-card-title>All restaurants</v-card-title>
          </v-card-item>

          <v-divider></v-divider>

          <v-card-item>
            <v-card-title>Categories</v-card-title>
          </v-card-item>

          <v-row>
            <v-card-item>
              <v-btn>
                <v-icon>mdi-food</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>mdi-food-drumstick</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>mdi-hamburger</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>mdi-food-steak</v-icon>
              </v-btn>
            </v-card-item>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Filter</v-card-title>
        </v-card>
      </v-col>
      
      <v-col class="d-flex" cols="12" md="10">
        <v-row>
          <v-col cols="3" v-for="restaurant in allRestaurants">
            <v-card min-width="100" max-width="400" :loading="loading" :id="restaurant">
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
                <router-link :to="{ name: 'restaurant_menus', params: { restaurant: 1 }}" style="text-decoration: none;">
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
    {{ allRestaurants }}
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
