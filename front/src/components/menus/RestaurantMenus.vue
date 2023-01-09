<template>
  <v-container>
    <v-row>
      <v-col v-for="(menu, index) in allMenus" :key="index" cols="3">
        <v-card
            min-width="250"
            max-width="400"
            :id="menu.pid"
        >
          <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
          </template>

          <v-img
              height="100%"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>{{ menu.title }}</v-card-title>

          <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
              <v-rating
                  :value="4"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
              ></v-rating>
            </v-row>

            <div class="my-4 text-subtitle-1">
              {{ $route.params.name }} Shop
            </div>

            <div>{{ menu.price }} €</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Choose your quantity</v-card-title>

          <v-card-text>
            <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
            >
              <v-chip>Small</v-chip>
              <v-chip>Medium</v-chip>
              <v-chip>Large</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn
                color="deep-purple lighten-2"
                @click="add(menu)"
            >
              Add to cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters, mapMutations, useStore} from "vuex";
import {computed} from 'vue';

export default {
  name: "RestaurantMenus",
  data() {
    return {
      cart: this.cart = this.$store.getters.cart,
      cartKeys: ['name','store'],
      store: this.$route.params.name
    }
  },
  computed: mapGetters({
    allMenus: "getAllMenus"
  }),
  created() {
    this.$store.dispatch("getAllMenus");
  },
  methods: {
    add(menu) {
      let item = {
        pid: menu.pid,
        title: menu.title,
        store: this.store,
        price: menu.price
      }
      this.$store.commit("addItem", item);
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
