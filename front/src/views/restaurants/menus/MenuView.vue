<template>
    <v-container>
        <v-col>
            <v-row v-for="plate in dish.data">
                <v-card class="mx-auto" width="50%">
                    <!--<v-img class="align-end text-white" height="200" :src="dish.data.PicturePaths" cover></v-img>-->

                    <v-card-title>{{ plate.name }}</v-card-title>

                    <v-card-subtitle class="pt-4">
                        Allergies
                    </v-card-subtitle>
                
                    <v-card-text>
                        {{ plate.Allergens }}
                    </v-card-text>
                
                    <v-card-actions>
                        <!--<v-btn  variant="elevated" size="default" color="rgb(255, 152, 0)" style="color: white" :to="{ name: 'restaurant_menus', params: { restaurant: restaurant.data.RestaurantName } }">
                            Back
                        </v-btn>-->
                    </v-card-actions>
                </v-card>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      dish: "dish",
      restaurant: "restaurants"
    })
  },
  created() {
      this.$store.dispatch("getRestaurant", this.$route.params.restaurant)
      this.$store.dispatch("getDish", this.$route.params.menu)
    }
}
</script>
