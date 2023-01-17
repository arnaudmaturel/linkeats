<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card width="50%" v-for="(restaurant, index) in getRestaurant" :key="index">
          <v-img max-height="350" :src='restaurant.image'></v-img>
          <v-card-title>
            {{ restaurant.title }}
          </v-card-title>
          <v-card-item>
            avis - adresse - tags
          </v-card-item>
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
          <v-col :cols="4" v-for="(menu, index) in allMenus" :key="index">
            <v-card min-width="100" max-width="400" :id="menu.pid">
              <v-img height="250" :src='menu.image'></v-img>

              <v-card-title>{{ menu.title }} Menu</v-card-title>

              <v-card-text>
                <div>
                  {{ ((menu.price)/100).toFixed(2) }} €
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn variant="elevated" color="rgb(255, 152, 0)" size="small" style="color: white" :to="{ name: 'menu_info', params: { restaurant: menu.tags, menu: menu.title } }">
                  Infos
                  <v-icon end icon="mdi-information-outline"></v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-snackbar :timeout="2000" color="success">
                  <template v-slot:activator="{ props }">
                    <v-btn variant="elevated" size="default" color="rgb(255, 152, 0)" v-bind="props" style="color: white" @click="add(menu)" rounded>
                      <v-icon size="large">mdi-plus-circle-outline</v-icon>
                    </v-btn>
                  </template>
                  Ajouté au pannier avec succès
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
export default {
  name: "RestaurantMenus",
  data() {
    return {
      cart: this.cart = this.$store.getters.cart,
      store: this.$route.params.restaurant
    }
  },
  computed: {
    allMenus () {
      return this.$store.getters.getAllMenus(this.$route.params.restaurant)
    },
    getRestaurant () {
      return this.$store.getters.getRestaurantByName(this.$route.params.restaurant)
    }
  },
  created() {
    this.$store.dispatch("getAllMenus")
    this.$store.dispatch("getAllRestaurants")
    this.$store.dispatch("getAllDishes")
  },
  methods: {
    add(menu) {
      let item = {
        pid: menu.pid,
        title: menu.title,
        price: menu.price,
        tags: this.$route.params.restaurant
      }
      this.$store.commit("addItem", item)
      this.$store.commit("setCount")
      this.$store.commit("setTotal")
    }
  }
}
</script>
