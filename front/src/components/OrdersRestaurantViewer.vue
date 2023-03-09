<template>
    <v-card id="form" rounded="5" elevation="0">
        <div v-if="orderStateR == menus[0]">
            <div id="header">
                <h5 id="title">
                    Commandes
                </h5>
                <div>
                    <v-btn rounded="pill" id="btn" elevation="6" icon="mdi-fullscreen" @click="dialogOrderRW = true" />
                </div>
            </div>
        </div>

        <div v-else>
            <div id="header">
                <h5 id="title">
                    Commandes
                </h5>
            </div>
        </div>


        <div id="middle"></div>
        <v-tabs id="tabMenu" centered grow v-model="orderStateR" color="rgb(255, 152, 0)">
            <v-tab :id="(menu == orderStateR) ? 'orderStateSelected' : 'orderState'" v-for="menu in menus" :key="menu"
                :value="menu" ripple="false">
                {{ menu }}
            </v-tab>
        </v-tabs>

        <div id="img">
            <div v-if="orderStateR == 'En Cours'">
                <!-- ORDER IN PROGRESS -->
                <OrderRestaurantWorkComponent heightList="450px" />
            </div>
            <div v-else style="width=100%">
                <!-- ORDER END -->
                <v-card id="infPart" max-height="450px" class="overflow-y-auto">
                    <v-expansion-panels variant="popout" class="my-4">
                        <v-expansion-panel v-for="order in orders" :key="order" style="width: 100%;">
                            <div v-if="order.state == orderStateR && orderStateR == menus[1]">
                                <v-expansion-panel-title>
                                    <v-row>
                                        <v-col>
                                            {{ order.SimpleID.Date + " " + order.SimpleID.Id4Resto }}
                                        </v-col>

                                        <v-col offset="1">
                                            {{ order.date }}
                                        </v-col>

                                        <v-col offset="2">
                                            {{ order.cost / 100 }}€
                                        </v-col>

                                        <v-col offset="1">
                                            <v-icon icon="mdi-alert-octagon"
                                                @click="idOdrer = order.orderN; snackbar = true" />
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-title>

                                <v-expansion-panel-text>
                                    <v-row v-for="item in order.items" :key="item">
                                        <v-col class="ma-auto">
                                            {{ item }}
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-text>
                            </div>
                        </v-expansion-panel>

                    </v-expansion-panels>

                </v-card>
            </div>
        </div>



        <!-- SNACKBAR -->
        <v-snackbar v-model="snackbar" :timeout="timeout" style="border=solid 3px; rgb(228, 228, 228);">
            <template v-slot:actions>
                <v-btn color="rgb(255, 152, 0)" rounded="pill" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>


        <!-- DIALOG -->
        <v-dialog v-model="dialogOrderRW" fullscreen style="background-color:white;">
            <v-div style="border:solid 1px red; width: 100vw; height: 100%;">
                <div id="header">
                    <h5 id="title">
                        Commandes
                    </h5>
                    <div>
                        <v-btn rounded="pill" id="btn" elevation="6" icon="mdi-fullscreen-exit"
                            @click="dialogOrderRW = false" />
                    </div>
                </div>
                <OrderRestaurantWorkComponent />
            </v-div>
        </v-dialog>
    </v-card>
</template>

<script>
import OrderRestaurantWorkComponent from './OrderRestaurantWorkComponent.vue';
import OrderStatus from '@/store/OrderStatus';

export default {
    components: {
        OrderRestaurantWorkComponent,
    },
    props: {
    },
    data: () => ({
        orderStateR: "En cours",
        menus: [
            'En Cours',
            'Terminé'
        ],
        scrollInvoked: 0,
        dialogOrderRW: false,
        orders: [
            !{ orderN: '0009999', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
        ],
        snackbar: false,
        text: 'Nous avons pris en considération votre réclamation',
        timeout: 3000,
        idOdrer: -1,
    }),
    methods: {
        async refreshData() {
            await this.$store.dispatch('getAllRestoOrders', localStorage.getItem('userId'));
            var tempOrder = [];
            for (var i = 0; i < this.$store.state.order.orders.length; i++) {
                var order = this.$store.state.order.orders[i];

                switch (order.OrderStatus) {

                    case OrderStatus.Unknown:
                    case OrderStatus.CancelledClient:
                    case OrderStatus.CancelledRestaurant:
                    case OrderStatus.RejectededDeliveryman:
                    case OrderStatus.DeliveryCancelled:
                    case OrderStatus.Delivered:
                        tempOrder.push(order);
                        break;
                }
            }

            this.orders = tempOrder;

        },
        getProgressOrder() {
            let output = [];
            orders.forEach(order => {
                if (order.state == 'En cours') output.push(order);
            });
            return output;
        },
        test() {
            console.log(this.orderStateR);
            console.log(this.orderStateR == this.menus[0]);
        },
        onReport(orderN) {
            text = 'Nous avons pris en considération votre réclamation pour la commande ' + orderN;
            snackbar = true;
        },
        onCancelOrder(orderN) {
            text = 'Voulez vous annulez la commande ' + orderN;
            snackbar = true;
        },
    },

}
</script>


<style>
#rowTitle {

    padding: 20px;
    padding-bottom: 20px;
}

#middle {
    background-color: rgb(228, 228, 228);
    height: 3px;
    width: 100%;
}

#infPart {
    padding: 5%;
    padding-top: 2%;
}


#form {
    border: solid 3px rgb(228, 228, 228);
    background-color: white;
    font-family: MyFont;
}

#img {
    background-image: url('../assets/linkEats_transp10.png');
    background-size: contain;
    background-position: center;
    /* opacity: 0.2; */
}

#title {
    text-align: center;
}

#orderStateSelected {
    background-color: rgb(255, 152, 0);
    color: white !important;
}

#orderState {
    color: black !important;
    background-color: white;
}
</style>