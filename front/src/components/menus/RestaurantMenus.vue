<template>
  <v-container>
    <v-row>
      <v-col v-for="(menu, index) in allMenus" :key="index" cols="3">
        <v-card min-width="300" max-width="400" :id="menu.pid">
          <template>
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>

          <v-img height="250" :src='menu.image'></v-img>

          <v-card-title>{{ menu.title }} Menu</v-card-title>

          <v-card-text>
            <div class="my-4 text-subtitle-1">
              {{ $route.params.restaurant }}
            </div>
            <div>{{ ((menu.price)/100).toFixed(2) }} €</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" size="small">
              Infos
              <v-icon
                end
                icon="mdi-information-outline"
              ></v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="deep-purple lighten-2" @click="add(menu)">
              Add to cart
            </v-btn>
          </v-card-actions>
        </v-card>
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
    }
  },
  created() {
    this.$store.dispatch("getAllMenus")
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
    },
    del(menu, quantity = 1) {
      this.$store.commit("delItem", {
        itemKeys: {
          store: this.$route.params.restaurant, 
          title: menu.title
        },
        quantity: quantity
      });
    }
  }
}
</script>
