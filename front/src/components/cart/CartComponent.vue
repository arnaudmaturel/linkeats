<template>
  <v-container>
    <v-row justify="space-around">
      <v-col>
        <v-card min-width="500" max-width="450" style="border: 1px solid grey; background-color: white;" elevation="24">
          <v-container fluid>
            <v-card-item>
              <v-card-title style="color: black;">
                Votre panier :
              </v-card-title>
            </v-card-item>

            <div v-if="basket && basket.dishes && basket.dishes.length">
              <v-col v-for="item in items" :key="item" dense>
                <v-card>
                  <v-card-item>
                    <v-row inline-block style="text-align=end">
                      <v-col cols="5" inline-block >
                        <b>
                          {{ item.name}} :
                        </b>
                      </v-col>

                      <v-col cols="5" inline-block style="text-align=end">
                        {{ item.quantity + " × " + (item.price/100).toFixed(2)}}€
                        = {{ (item.quantity * item.price/100).toFixed(2)}}€

                      </v-col>
                  

                      <v-col inline-block>
                        <v-icon @click="del(item.dishName)" size="small">mdi-delete</v-icon>
                      </v-col>
                    </v-row>
                  </v-card-item>
                </v-card>
              </v-col>

              <v-card-actions v-if='this.items.length > 0'>
                <router-link :to="{ name: 'user_cart_to_order' }" style="text-decoration: none; color: black;">
                  <v-btn variant="elevated" size="default" color="rgb(255, 152, 0)" style="color: white;">Confimer</v-btn>
                </router-link>
              </v-card-actions>
            </div>
          </v-container>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({
    // cart: "getCart",
    // cartCount: "itemCount",
    basket: "basket"
  }),
  async created() {
    this.items = [];

    if (!this.$store.basket && localStorage.getItem("userId"))
    {
      console.log("CartComponent.Created() => no basket");
      await this.$store.dispatch('getClientBasket', localStorage.getItem('userId'));
    }
    
    if (this.basket)
    {
      this.basket.dishes.forEach(async d =>  {
        const data = await this.$store.dispatch("getOnlyDish", d.idDish);
        this.items.push({ name: data.name, price: data.price, quantity: d.quantity });
      });

      
    }
  },
  data: () => ({
    items: []
  }),
  methods: {
    del(menu) {
    },
  }
}
</script>