<template>
  <v-container>
    <v-row justify="space-around">
        <v-col>
            <v-card min-width="300" max-width="450" style="border: 1px solid grey; background-color: white;" elevation="24">
                <v-card-item>
                  <v-card-title style="color: black;">
                    Your cart:
                  </v-card-title>
                </v-card-item>

                <v-list v-for="item in cart">
                  <v-list-item>
                    <b>
                      {{ item.title }} X{{ item.quantity }}
                    </b>
                    <span style="margin: 5px">
                      {{ (((item.price.toFixed(2))/100) * item.quantity).toFixed(2) }} €
                    </span>
                    <v-avatar right @click="del(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-avatar>
                  </v-list-item>
                </v-list>
                
                <v-card-actions>
                  <router-link :to="{ name: 'user_cart_to_order' }" style="text-decoration: none; color: black;">
                    <v-btn variant="elevated" size="default" color="rgb(255, 152, 0)" style="color: white;" v-if='this.$store.getters.itemCount > 0'>Validate</v-btn>
                  </router-link>
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
      cart: this.cart = this.$store.getters.getCart,
      store: this.$route.params.name
    }
  },
  methods: {
    del(menu, quantity = 1) {
        let item = {
            pid: menu.pid,
            title: menu.title,
            price: menu.price,
            tags: menu.tags
        }
        this.$store.commit("delItem", item, quantity);
    }
  }
}
</script>