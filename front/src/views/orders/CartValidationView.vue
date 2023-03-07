<template>
  <v-container>
    <v-card variant="outlined" class="mx-auto px-2 py-2" max-width="1200"
      style="border: 1px solid grey; background-color: white;" elevation="24">
      <v-container fluid>
        <v-row>
          <v-col>
            <h4 style="color: black;">Votre pannier :</h4>
          </v-col>
        </v-row>
        <v-col v-for="item in items" :key="item" dense>
          <v-card elevation="3" width="90%" height="90%" class="mx-auto">
            <v-card-title style="color: black;">
              {{ item.name }}: {{ (item.price / 100).toFixed(2) }} €
            </v-card-title>

            <v-card-text style="color: black;">
              <v-row>
                <v-col cols="5">
                  Quantité : {{ item.quantity }}
                </v-col>

                <v-col cols="6">
                  Total : {{ ((item.quantity * item.price) / 100).toFixed(2) }} €
                </v-col>

                <v-col cols="1">
                  <v-icon @click="del(item.idDish)">mdi-delete</v-icon>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-container>
      <v-col cols="5">

        <p style="color: black;text-align: right;">
          Items Panier : {{ (itemsPrice / 100).toFixed(2) }} €
        </p>

        <p style="color: black;text-align: right;">
          Coût de Livraison : {{ (deliveryCost / 100).toFixed(2) }} €
        </p>

        <v-card-title style="color: black;text-align: right;">
          Coût Total : {{ (deliveryCost / 100 + itemsPrice / 100).toFixed(2) }} €
        </v-card-title>
      </v-col>
      <v-card-actions>
        <v-btn variant="elevated" size="large" color="rgb(255, 152, 0)" style="color: white;" @click="validateBasket">
          Passer commande !
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- DIALOG -->
    <v-dialog v-model="popUp">
      <PopUpConfirm :message="popUpMessage" @on-validated="onValidatePopUp()" @on-cancel="onClosePopUp()" />
    </v-dialog>

    <!-- SNACKBAR -->
    <v-snackbar v-model="snackbar" :timeout="timeout" style="border=solid 3px rgb(228, 228, 228);">
      <!-- {{ (orderSate == 'En cours') ?
                'Nous annulons votre coommande ' :
                'Nous avons pris en considération votre réclamation pour la commande ' }} {{ idOdrer }} -->
      {{ text }}
      <template v-slot:actions>
        <v-btn color="rgb(255, 152, 0)" rounded="pill" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import OrderStatus from '@/store/OrderStatus'
import PopUpConfirm from '@/components/PopUpConfirm.vue';
import lvlDataJson from "@/store/lvlData.json"
import DiscountState from "@/store/DiscountStatus"


export default {
  components: { PopUpConfirm },
  data() {
    return {
      logged: false,
      snackbar: false,
      items: [],
      orders: [],
      modeTypePop: { validated: 0, romeveLine: 1 },
      modePop: 0,
      popUpMessage: "",
      popUp: false,
      popUpData: null,
      deliveryCost: 0,
      itemsPrice: 0,
      lvlData: lvlDataJson
    }
  },
  computed: mapGetters({
    basket: "basket"
  }),
  async created() {
    await this.refreshData();
  },
  methods: {
    // REFRESH DATA
    async refreshData() {
      this.items = [];

      if (!this.$store.basket && localStorage.getItem("userId")) {
        await this.$store.dispatch('getClientBasket', localStorage.getItem('userId'));
      }

      if (!this.basket) {
        console.log("error no basket");
        return;
      }

      // var itemsTemp = [];
      for (var i = 0; i < this.basket.dishes.length; i++) {
        var d = this.basket.dishes[i];
        const data = await this.$store.dispatch("getOnlyDish", d.idDish);
        const item = { id: d.idDish, idResto: data.IDRestaurant, name: data.name, price: data.price, quantity: d.quantity, weight: data.Wheight };
        this.items.push(item);

      }


      this.orders = [];
      this.items.forEach(item => {
        var idxOrder = -1;
        // search of index of corresponding restaurant
        for (var i = 0; i < this.orders.length; i++) {
          if (this.orders[i].RestaurantId == item.idResto) {
            idxOrder = i;
            break;
          }
        }


        // no order for the corresponding restaurant
        // creation of order associate to restaurant
        if (idxOrder == -1) {
          var order = {
            Items: [],
            ClientId: localStorage.getItem('userId'),
            RestaurantId: item.idResto,
            DeliveryManId: null,
            OrderStatus: OrderStatus.WaitingRestaurantConfirmation,
            // cost with delivery + commision + products
            OrderFinalPrice: 0,
            // cost of only products
            ItemsPrice: 0,
            // commision
            OrderLinkEatsPart: 0,
            // delivery cost
            OrderPaymentInfo: "credit card",
            // OrderedAt: { type: Date, default: Date.now(), required: true, },
            // CookedAt: { type: Date, required: false, },
            // PickedAt: { type: Date, required: false, },
            // DeliveredAt: { type: Date, required: false, },

            // not used for now
            OrderDistance: 5,
            OrderDeliveryCost: 200,
            RestaurantLocation: { Longitude: 1, Latitude: 50, Address: "Rouen" },
            ClientLocation: { Longitude: 1, Latitude: 50, Address: "Rouen" },
          };

          this.orders.push(order);
          idxOrder = this.orders.length - 1;
        }

        // creation of the new line order
        var orderLine =
        {
          DisheID: item.id,
          NameDish: item.name,
          Quantity: item.quantity,
          Price: item.price,
          WeightDish: item.weight
        }


        // update data for orders
        this.orders[idxOrder].Items.push(orderLine);
        this.orders[idxOrder].ItemsPrice += orderLine.Price * orderLine.Quantity;


      });

      // create orders
      this.orders.forEach(async o => {
        o.OrderLinkEatsPart = o.ItemsPrice * 0.1;
        o.OrderFinalPrice = o.ItemsPrice + o.OrderLinkEatsPart + o.OrderDeliveryCost;
      });

      this.deliveryCost = 0;
      this.itemsPrice = 0;

      this.orders.forEach(o => {
        this.deliveryCost += o.OrderDeliveryCost + o.OrderLinkEatsPart;
        this.itemsPrice += o.ItemsPrice;
      });

    },

    // VALIDATE FROM POPUP
    async onValidatePopUp() {
      switch (this.modePop) {

        case this.modeTypePop.validated:
          this.SendOrder();
          break;

        case this.modeTypePop.romeveLine:
          // TO DO DELETE Line
          var idx = -1;
          for (var i = 0; i < this.items.length; i++)
            if (this.items[i].idDish == this.popUpData) {
              idx = i;
              break;
            }

          if (idx == -1) {
            this.text = "erreur";
            this.snackbar = true;
            console.log("on delete line error !");
            return;
          }

          this.basket.dishes.splice(i, 1);
          this.$store.dispatch("saveBasket");

          this.refreshData();
          break;
      }
      this.popUp = false;
    },

    // CLOSE FROM  POP UP
    onClosePopUp() {
      this.popUp = false;
    },

    // DELETE ITEM
    del(idDish) {
      this.modePop = this.modeTypePop.romeveLine;
      this.popUpMessage = "vouler vous suprimmer cet élément ?";
      this.popUpData = idDish;
      this.popUp = true;
    },

    // VALIDATE THE BASKET 
    async validateBasket() {
      this.modePop = this.modeTypePop.validated;
      this.popUpMessage = "Envoyer la commander ?";
      this.popUp = true;
    },


    // SEND ORDERS
    async SendOrder() {
      this.orders.forEach(async o => {
        await this.$store.dispatch("createOrder", o);
      })

      this.basket.dishes = [];
      await this.$store.dispatch('saveBasket');

      const xp = Math.round((this.deliveryCost / 100 + this.itemsPrice / 100));


      await this.checkNextLevl(xp);


      this.$router.push({ name: 'home' });
    },
    async checkLevelValidity()
    {
      await this.$store.dispatch('getClient', localStorage.getItem('userId'));


      if (this.$store.state.client.client.ClientNextLevelXP == 0) {
        const lvlD = this.getLevel(this.$store.state.client.client.ClientLevel);

        const info = {
          ClientNextLevelXP: lvlD.MaxXP,
          ClientCurrentXP: 0
        };

        this.$store.commit('UPDATE_CLIENT', info);

        console.log("nextLevelXP Updated :", this.$store.state.client.client.ClientNextLevelXP)
        await this.$store.dispatch("saveClient");
      }

    },
    async checkNextLevl(xp) {

      console.log("xp earned", xp);
      console.log("INIT Client.CurrentXP = ", this.$store.state.client.client.ClientCurrentXP)

      await this.checkLevelValidity()
      
      if (xp + this.$store.state.client.client.ClientCurrentXP >= this.$store.state.client.client.ClientNextLevelXP) {
        // next level
        const lvlD = this.getLevel(this.$store.state.client.client.ClientLevel+1);

        if (lvlD == null)
          return;

        const xpLeft = xp + this.$store.state.client.client.ClientCurrentXP - this.$store.state.client.client.ClientNextLevelXP;

        console.log("xp left : ", xpLeft);

        const info = {
          ClientCurrentXP: 0,
          ClientNextLevelXP: lvlD.MaxXP,
          ClientLevel: lvlD.Level
        };

        this.$store.commit('UPDATE_CLIENT', info);

        // creation of discount
        const discount =
        {
          Name: "Récompense Stars",
          State: DiscountState.UnClaimed,
          Description: `Félcitation vous avez atteint le niveau ${lvlD.Level}`,
          Value: lvlD.Gift,
          IDClient: localStorage.getItem("userId")
        }

        await this.$store.dispatch("createDiscount", discount);

        console.log("END Client.CurrentXP = ", this.$store.state.client.client.ClientCurrentXP)
        await this.$store.dispatch("saveClient");
        this.checkNextLevl(xpLeft);
      }
      else
      {
        // add xp
        const info =
        {
          ClientCurrentXP: xp + this.$store.state.client.client.ClientCurrentXP
        };

        console.log("only add xp :", info);

        this.$store.commit('UPDATE_CLIENT', info);

        console.log("END Client.CurrentXP = ", this.$store.state.client.client.ClientCurrentXP)
        await this.$store.dispatch("saveClient");
      }


    },
    getLevel(lvl) {
      for (var i = 0; i < this.lvlData.length; i++) {
        if (this.lvlData[i].Level == lvl)
          return this.lvlData[i];
      };
      return null;
    }
  }
}

</script>
