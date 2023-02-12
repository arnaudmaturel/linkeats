<template>

    <v-card id="form" rounded="5" elevation="0">
        <v-row id="rowTitle">
            <v-col class="ma-auto">
                <div id="title">
                    <h5>Commandes</h5>
                </div>
            </v-col>
        </v-row>
        <div id="middle"></div>
        <v-tabs id="tabMenu" centered grow v-model="curentTab" color="rgb(255, 152, 0)">
            <v-tab :id="('En Cours' == curentTab) ? 'orderStateSelected' : 'orderState'" value="En Cours"
                ripple="false">
                En Cours
            </v-tab>
            <v-tab :id="('Terminé' == curentTab) ? 'orderStateSelected' : 'orderState'" value="Terminé" ripple="false">
                Terminé
            </v-tab>
        </v-tabs>
        <div id="img">
            <v-card id="infPart" max-height="450px" class="overflow-y-auto">

                <div v-if="curentTab == 'En Cours'">
                    <!-- ORDER ACCECPTED -->
                    <div v-if="orderProgressDelivery != null">
                        <v-card class="ma-auto px-2 py-2">
                            <v-row>
                                <v-col class="ma-auto">
                                    <h5 style="text-align:center; margin-top: 10px">
                                        Livraison en cours
                                    </h5>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col class="ma-auto" inline-block>
                                    N°{{ orderProgressDelivery._id }}
                                </v-col>

                                <v-col class="ma-auto">
                                    longueur: {{ orderProgressDelivery.OrderDistance }} km
                                </v-col>

                                <v-col class="ma-auto" inline-block >
                                    Rémunération: {{ orderProgressDelivery.OrderDeliveryCost / 100 }}€
                                </v-col>

                            </v-row>

                            <v-row>
                                <v-col class="ma-auto" style="text-align:left" inline-block >
                                    Address de collecte : {{ orderProgressDelivery.restoLoc }}
                                </v-col>
                                <v-col cols="2">
                                    <v-btn icon="mdi-map-search-outline"
                                        style="color:white; background-color:rgb(252, 152, 0)" />
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col class="ma-auto" style="text-align:left" inline-block >
                                    Address de Livraison : {{ orderProgressDelivery.clientLoc }}
                                </v-col>
                                <v-col cols="2">
                                    <v-btn icon="mdi-map-search-outline"
                                        style="color:white; background-color:rgb(252, 152, 0)" />
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col class="d-flex" style="text-align:center; justify-content: center;">
                                    <v-btn rounded="pill" icon="mdi-check-bold"
                                        style="color:white; background-color:rgb(252, 152, 0)" @click="onDelivered" />
                                    <div>
                                        <ConfettiExplosion v-if="visibleC" />
                                    </div>
                                    <v-btn rounded="pill" icon="mdi-close-thick"
                                        style="color:white; background-color:rgb(252, 152, 0)" @click="onAbortOrder" />
                                </v-col>
                            </v-row>
                        </v-card>
                    </div>
                    <!-- AVALAIBLE ORDER TO BE DELIVER -->
                    <div v-else>
                        <v-card style="border:solid 1px rgb(228, 228, 288); margin-bottom:10px;"
                            :max-height="heightList" class="overflow-y-auto px-3">

                            <v-row>
                                <v-col class="ma-auto">
                                    <h5 style="text-align:center; margin-top: 10px">
                                        Livraison disponible
                                    </h5>
                                </v-col>
                            </v-row>

                            <v-expansion-panels variant="popout" class="my-4">
                                <v-expansion-panel v-for="order in orderToAccept" :key="order" style="width: 100%;">
                                    <v-expansion-panel-title>
                                        <v-row>
                                            <v-col class="ma-auto" inline-block>
                                                N°{{ order._id }}
                                            </v-col>

                                            <v-col class="ma-auto" inline-block >
                                                {{ order.OrderDistance }}km
                                            </v-col>

                                            <v-col class="ma-auto" inline-block >
                                                {{ order.OrderDeliveryCost / 100 }}€
                                            </v-col>

                                            <v-col cols="2">
                                                <v-btn rounded="pill"
                                                    style="color:white; background-color:rgb(252, 152, 0)"
                                                    icon="mdi-check-bold" @click="cancelExpand, onAcceptOrder(order)" />
                                            </v-col>

                                        </v-row>
                                    </v-expansion-panel-title>

                                    <v-expansion-panel-text>
                                        <v-row>
                                            <v-col class="ma-auto" style="text-align:left">
                                                Address de collecte : {{ order.RestaurantLocation.Address }}
                                            </v-col>
                                            <v-col cols="2">
                                                <v-btn icon="mdi-map-search-outline"
                                                    style="color:white; background-color:rgb(252, 152, 0)" />
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col class="ma-auto" style="text-align:left">
                                                Address de Livraison : {{ order.ClientLocation.Address }}
                                            </v-col>
                                            <v-col cols="2">
                                                <v-btn icon="mdi-map-search-outline"
                                                    style="color:white; background-color:rgb(252, 152, 0)" />
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>

                            </v-expansion-panels>

                        </v-card>

                    </div>
                </div>
                <!-- END ORDER DELIVERED -->
                <div v-else-if="curentTab == 'Terminé'">
                    <v-card style="border:solid 1px rgb(228, 228, 288); margin-bottom:10px;" :max-height="heightList"
                        class="overflow-y-auto px-3">

                        <v-row>
                            <v-col class="ma-auto">
                                <h5 style="text-align:center; margin-top: 10px">
                                    Livraison effectuées
                                </h5>
                            </v-col>
                        </v-row>

                        <v-expansion-panels variant="popout" class="my-4">
                            <v-expansion-panel v-for="order in orderDelivered" :key="order" style="width: 100%;">
                                {{order}}
                                <v-expansion-panel-title>
                                    <v-row>
                                        <v-col class="ma-auto" inline-block>
                                            N°{{ order._id }}
                                        </v-col>

                                        <v-col class="ma-auto">
                                            {{ order.OrderDistance }}km
                                        </v-col>

                                        <v-col class="ma-auto">
                                            {{ order.OrderDeliveryCost / 100 }}€
                                        </v-col>

                                        <v-col>
                                            {{ formatDate(order.DeliveredAt) }}
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-title>

                                <v-expansion-panel-text>
                                    <v-row>
                                        <v-col class="ma-auto" style="text-align:left">
                                            Address de collecte : {{ order.RestaurantLocation.Address }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="ma-auto" style="text-align:left">
                                            Address de Livraison : {{ order.ClientLocation.Address }}
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                        </v-expansion-panels>

                    </v-card>
                </div>
            </v-card>
        </div>
    </v-card>
</template>


<script>
import ConfettiExplosion from "vue-confetti-explosion";
import OrderStatus from '@/store/OrderStatus';

export default {
    name: 'OrderRestaurantWorkComponent',
    components: {
        ConfettiExplosion,
    },
    async created() {
        await this.refreshData();
    },
    props: {
        heightList: Number,
    },
    data: () => ({
        visibleC: false,
        curentTab: 'En Cours',
        orderProgressDelivery: null,
        orderDelivered: [],
        orderToAccept:[],
    }),
    methods: {
        async onAcceptOrder(order) {
            await this.$store.dispatch('deliveryManAcceptCourse', { id: order._id, data: { DeliveryManId:localStorage.getItem('userId'), OrderStatus: OrderStatus.WaitingDeliverymanPickUp } });
            await this.refreshData();
        },
        async onAbortOrder(order) {
            this.orderProgressDelivery = null;
        },
        async cancelExpand(e) {
            e.cancelBubble = true;
        },
        async onDelivered() {
            this.visibleC = true;
            // var deliveredOrder = {
            //     orderN: this.orderProgressDelivery.orderN,
            //     remun: this.orderProgressDelivery.remun,
            //     distance: this.orderProgressDelivery.distance,
            //     restoLoc: this.orderProgressDelivery.restoLoc,
            //     clientLoc: this.orderProgressDelivery.clientLoc,
            //     date: new Date,
            // };
            setTimeout(async() => {
                this.visibleC = false;
                // this.orderDelivered.push(deliveredOrder);
                this.orderProgressDelivery = null;
                await this.refreshData();
            }, 500);
        },
        async formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [day, month, year].join('/');
        },
        async refreshData() {
            console.log("check orders");
            await this.$store.dispatch('getAllDeliverOrders',localStorage.getItem('userId'));
            await this.$store.dispatch('getOrdersByStatus', OrderStatus.WaitingDeliverymanConfirmation);
            console.log("allOrder",this.$store.state.order.allOrder);
            const temp =await this.$store.state.order.allOrder.find(value => value.status == OrderStatus.WaitingDeliverymanConfirmation);
            
            this.orderToAccept = (temp) ? temp.data : [];
            console.log("orderToAccept", this.orderToAccept);
            //this.orderDelivered = await this.$store.state.order.orders.filter(this.isDelivered);
            this.orderProgressDelivery = null;
        },
        isWaitingAccpectation(value) {
            return value.OrderStatus == OrderStatus.WaitingDeliverymanConfirmation;
        },
        isDelivered(value) {
            return value.OrderStatus == OrderStatus.Delivered;
        },
        isOrderDeiveryProgress(value)
        {
            return value.OrderStatus == OrderStatus.WaitingDeliverymanPickUp
                || value.OrderStatus == OrderStatus.DeliveryInProgress;
        }
    },

}
</script>


<style>
#btn {
    background-color: rgb(255, 152, 0);
    color: white !important;
}
</style>