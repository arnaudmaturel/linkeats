<template>
  <v-container>
    <v-row justify="space-around">
        <v-col>
            <v-card min-width="300" max-width="450" style="border: 1px solid grey; background-color: white;" elevation="24">
              <v-container fluid>
                <v-card-item>
                  <v-card-title style="color: black;">
                    Votre pannier :
                  </v-card-title>
                </v-card-item>

                <v-col v-for="item in cart" v-if='cartCount > 0' dense>
                  <v-card>
                    <v-card-item>
                      <v-row>
                        <v-col cols="6">
                          <b>
                            {{ item.plate }} X{{ item.dishName.quantity }}
                          </b>
                        </v-col>
                        <v-col cols="4">
                          {{ (((item.dishName.price.toFixed(2))/100) * item.dishName.quantity).toFixed(2) }} €
                        </v-col>
                        <v-col cols="2">
                          <v-icon @click="del(item.dishName)" size="small">mdi-delete</v-icon>
                        </v-col>
                      </v-row>
                    </v-card-item>
                  </v-card>
                </v-col>

                <v-card-actions v-if='cartCount > 0'>
                  <router-link :to="{ name: 'user_cart_to_order' }" style="text-decoration: none; color: black;">
                    <v-btn variant="elevated" size="default" color="rgb(255, 152, 0)" style="color: white;">Confimer</v-btn>
                  </router-link>
                </v-card-actions>
              </v-container>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: mapGetters({
    cart: "getCart",
    cartCount: "itemCount"
  }),
  created() {
    this.$store.dispatch("getTotal")
  },
  methods: {
    del(menu) {
      let item = {
        dishName: {
          id: menu.id,
          price: menu.price
        }
      }
      this.$store.commit("delItem", item);
      this.$store.commit("setCount")
      this.$store.commit("setTotal")
    }
  }
}
</script>