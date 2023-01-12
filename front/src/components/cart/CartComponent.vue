<template>
  <v-container>
    <v-row justify="space-around">
        <v-col>
            <v-card min-width="300" max-width="450">
                <v-card-item>
                  <v-card-title>
                    Your cart:
                  </v-card-title>
                </v-card-item>

                <!--<v-card-item v-for="item in cart" size="x-small" color="green">
                  <v-chip>
                      <b>{{ item.title }} X{{ item.quantity }}</b>

                    <v-card-text>
                      {{ (item.price.toFixed(2))/100 }} €
                    </v-card-text>
                    
                    <v-card-subtitle v-if='item.quantity > 1'>
                      (<b>{{ (((item.price.toFixed(2))/100) * item.quantity).toFixed(2) }}</b>) €
                    </v-card-subtitle>
                    
                    <v-avatar right @click="del(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-avatar>
                  </v-chip>
                </v-card-item>-->

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

                <v-btn variant="plain" v-if='this.$store.getters.itemCount > 0'>Validate</v-btn>
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
      cartCount: this.cartCount = this.$store.getters.itemCount,
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