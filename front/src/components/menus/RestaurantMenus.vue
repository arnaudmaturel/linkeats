<template>
  <v-container>
    <v-row>
      <v-col>
        <!--<v-card width="50%" v-for="(restaurant, index) in getRestaurant" :key="index">
          <v-img max-height="350" :src='restaurant.image'></v-img>
          <v-card-title>
            {{ restaurant.title }}
          </v-card-title>
          <v-card-item>
            avis - adresse - tags
          </v-card-item>
        </v-card>-->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-item>
            <v-card-title>All menus</v-card-title>
          </v-card-item>

          <v-divider></v-divider>

          <v-card-item>
            <v-card-title>Categories</v-card-title>
          </v-card-item>

          <v-row>
            <v-card-item>
              <v-btn @click="filter('Justice')">
                <v-icon>mdi-food</v-icon>
              </v-btn>
              <v-btn @click="filter('Fast Food')">
                <v-icon>mdi-food-drumstick</v-icon>
              </v-btn>
              <v-btn @click="filter('Proteine')">
                <v-icon>mdi-hamburger</v-icon>
              </v-btn>
              <v-btn @click="filter('Cours')">
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
          <v-card-title>Catégories</v-card-title>
        </v-card>
      </v-col>
      <v-col class="d-flex" cols="12" md="10">
        <v-row>

          <v-col :cols="4" v-for="plate in dishes" :key="plate">
            <v-card min-width="100" max-width="400">
              <v-img height="250" :src="getFullPath(plate.PicturePaths)" cover></v-img>

              <v-card-title>{{ plate.name }}</v-card-title>

              <v-card-text>
                <div>
                  {{ ((plate.price) / 100).toFixed(2) }} €
                </div>
              </v-card-text>

              <v-card-actions>
                <router-link :to="{ name: 'menu_info', params: { restaurant: this.id_restaurant, menu: plate._id }}" style="text-decoration: none;">
                  <v-btn variant="elevated" color="rgb(255, 152, 0)" size="small" style="color: white">
                    Infos
                    <v-icon end icon="mdi-information-outline"></v-icon>
                  </v-btn>
                </router-link>

                <v-spacer></v-spacer>

                <v-snackbar :timeout="2000" color="success">
                  <template v-slot:activator="{ props }">
                    <v-btn variant="elevated" size="default" color="rgb(255, 152, 0)" v-bind="props" style="color: white" @click="add(plate)" rounded>
                      <v-icon size="large">mdi-plus-circle-outline</v-icon>
                    </v-btn>
                  </template>
                  Ajouté au panier avec succès
                </v-snackbar>
              </v-card-actions>
            </v-card>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import AppSetting from "@/AppSetting";


export default {
  name: "RestaurantMenus",
  props: ['id_restaurant'],
  data() {
    return {
      cart: this.cart = this.$store.getters.cart,
      id_restaurant: this.$route.query.id_restaurant,
      restaurantName: this.$route.params.restaurant
    }
  },
  computed: {
    ...mapGetters({
      dishes: "dishes"
    })
  },
  mounted() {
    if (this.id_restaurant) {
      this.id = this.id_restaurant
    }
  },
  created() {
    this.$store.dispatch("getAllMenus")
    this.$store.dispatch("getAllRestaurants")
    this.$store.dispatch("getAllDishes", this.id_restaurant)
  },
  methods: {
            getFullPath(end) {
      return AppSetting.baseUrl + AppSetting.DISHES_IMGS + end;
    },
    add(menu) {
      let d =
      {
        idDish: menu._id,
        quantity: 1,
      }
      this.$store.commit("ADD_ITEM", d);
      return;

      let item = {
        plate: menu.name,
        dishName: {
          id: menu._id,
          price: menu.price
        }
      }
      this.$store.commit("addItem", item)
      this.$store.commit("setCount")
      this.$store.commit("setTotal")
    },
    filter(cat) {
      console.log(cat)
    }
  }
}
</script>
