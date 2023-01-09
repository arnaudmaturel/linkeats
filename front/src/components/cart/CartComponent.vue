<template>
  <v-container>
    <v-row justify="space-around">
        <v-col>
            <v-card width="350">
                <v-card-item>
                  <v-card-title>
                    Your cart {{ cart.lenght }}
                  </v-card-title>
                </v-card-item>

                <v-card-item v-for="item in cart" size="x-small" color="green">
                    <strong>
                        {{ item.title }} X{{ item.quantity }}
                    </strong> 
                    
                    {{ item.price.toFixed(2) }} ({{ (item.price.toFixed(2) * item.quantity).toFixed(2) }}) €

                    <v-btn @click="del(item)" size="x-small" icon="mdi-delete" class="justify-space-between"/>
                </v-card-item>
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
      cartKeys: ['name','store'],
      store: this.$route.params.name
    }
  },
  methods: {
    del(menu, quantity = 1) {
        let item = {
            pid: menu.pid,
            title: menu.title,
            price: menu.price
        }
        this.$store.commit("delItem", item, quantity);
    }
  }
}
</script>