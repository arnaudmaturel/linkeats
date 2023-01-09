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
              {{ $route.params.name }}
            </div>
            <div>{{ ((menu.price)/100).toFixed(2) }} €</div>
          </v-card-text>

          <!--<v-divider class="mx-4"></v-divider>

          <v-card-title>
            Choose your quantity
          </v-card-title>

          <v-card-text>
            <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
              <v-chip>Small</v-chip>
              <v-chip>Medium</v-chip>
              <v-chip>Large</v-chip>
            </v-chip-group>
          </v-card-text>-->

          <v-card-actions>
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
import store from '@/store';

export default {
  name: "RestaurantMenus",
  data() {
    return {
      cart: this.cart = this.$store.getters.cart,
      cartKeys: ['name','store'],
      store: this.$route.params.name
    }
  },
  computed: {
    allMenus () {
      return this.$store.getters.getAllMenus(this.$route.params.name)
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
        store: this.store,
        price: menu.price
      }
      this.$store.commit("addItem", item)
    },
    del(menu, quantity = 1) {
      this.$store.commit("delItem", {
        itemKeys: {store: this.store, title: menu.title}, 
        quantity: quantity
        }
      );
    }
  }
}
</script>
