<template>
  <v-container>
    <v-card variant="outlined"  class="mx-auto px-2 py-2"  max-width="1200" style="border: 1px solid grey; background-color: white;" elevation="24">
      <v-container fluid>
        <v-row>
          <v-col>
            <h4 style="color: black;">Votre pannier :</h4>
          </v-col>
        </v-row>
        <v-col v-for="item in cart" :key="item.title" dense>
          <v-card elevation="3" width="90%" height="90%"  class="mx-auto">
            <v-card-title style="color: black;">
              {{ item.plate }}: {{ item.dishName.price / 100 }} €/unit
            </v-card-title>

            <v-card-text style="color: black;">
              <v-row>
                <v-col cols="5">
                  Quantité : {{ item.dishName.quantity }}
                </v-col>

                <v-col cols="6">
                  Total : {{ (item.dishName.quantity * item.dishName.price) /100 }} €
                </v-col>

                <v-col cols="1">
                  <v-icon @click="del(item.dishName)">mdi-delete</v-icon>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-container>
      <v-card-title style="color: black;">
        Total à payer : {{ cartTotal / 100 }} €
      </v-card-title>
      <v-card-actions>
        <v-btn variant="elevated" size="large" color="rgb(255, 152, 0)" style="color: white;" @click="basket()">
          Passer commande !
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import { el } from "vuetify/locale";
import OrderStatus from '@/store/OrderStatus'

export default {
  data() {
    return {
      logged: false
    }
  },
  computed: mapGetters({
    cartTotal: "getTotal",
    cart: "getCart",
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
    },
    async basket() {


      if (localStorage.getItem("userRole") == 1)
      {
        const plate = JSON.parse(localStorage.getItem("cart"))
        console.log("plate:",plate)
        var dishes = []

        plate.forEach(element => { dishes.push(element.dishName) });
        
        var basketItem = {
          IDClient: localStorage.getItem("userId"),
          dishesNumber: this.cart.length,
          isPaid: 0,
          totalPrice: this.cartTotal,
          dishes: {dishName: dishes}
        }


        //await this.$store.dispatch("createBasket", basketItem)
          // WIP À réadapter avec les nouveau modèles de commandes et panier

        var orderItems = [];
        var itemsPrice = 0;

        plate.forEach(element => {
          const oItem = {
            DisheID: element.dishName.id,
            NameDish: element.plate,
            Quantity: element.dishName.quantity,
            Price: element.dishName.price,
            // WeightDish: Number
            WeightDish: 500
          }
          itemsPrice += element.dishName.price * element.dishName.quantity;
          orderItems.push(oItem);
        });

          const order = {
            Items: orderItems,
            ClientId: localStorage.getItem('userId'),

            RestaurantId: '{ type: String, required: true }',
            // DeliveryManId: { type: String, required: false },
            DeliveryManId: '',
            OrderStatus: OrderStatus.WaitingRestaurantConfirmation,
            // OrderStatus: { type: Number, required: true },
            OrderFinalPrice: 500,
            // OrderFinalPrice: { type: Number, required: true, },
            ItemsPrice: itemsPrice,
            // ItemsPrice: { type: Number, required: true, },
            OrderLinkEatsPart: itemsPrice*0.1,
            // OrderLinkEatsPart: { type: Number, required: true, },
            OrderDeliveryCost: 2,
            // OrderDeliveryCost: { type: Number, required: true, },
            OrderDistance: 5,
            // OrderPaymentInfo: { type: String, required: true, },
            OrderPaymentInfo: "credit card",
            // OrderedAt: { type: Date, default: Date.now(), required: true, },
            // CookedAt: { type: Date, required: false, },
            // PickedAt: { type: Date, required: false, },
            // DeliveredAt: { type: Date, required: false, },

            RestaurantLocation: { Longitude: 1, Latitude: 50, Address: "Rouen" },
            ClientLocation: {  Longitude: 1, Latitude: 50, Address: "Rouen" },
        };

        console.log("order", order)

        await this.$store.dispatch("createOrder", order);
      }
    }
  }
}
</script>
