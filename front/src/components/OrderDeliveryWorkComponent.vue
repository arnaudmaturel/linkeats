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
                                <v-col class="ma-auto">
                                    N°{{ orderProgressDelivery.orderN }}
                                </v-col>

                                <v-col class="ma-auto">
                                    longueur: {{ orderProgressDelivery.distance }} km
                                </v-col>

                                <v-col class="ma-auto">
                                    Rémunération: {{ orderProgressDelivery.remun / 100 }}€
                                </v-col>

                            </v-row>

                            <v-row>
                                <v-col class="ma-auto" style="text-align:left">
                                    Address de collecte : {{ orderProgressDelivery.restoLoc }}
                                </v-col>
                                <v-col cols="2">
                                    <v-btn icon="mdi-map-search-outline"
                                        style="color:white; background-color:rgb(252, 152, 0)" />
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col class="ma-auto" style="text-align:left">
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
                                            <v-col class="ma-auto">
                                                N°{{ order.orderN }}
                                            </v-col>

                                            <v-col class="ma-auto">
                                                {{ order.distance }}km
                                            </v-col>

                                            <v-col class="ma-auto">
                                                {{ order.remun / 100 }}€
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
                                                Address de collecte : {{ order.restoLoc }}
                                            </v-col>
                                            <v-col cols="2">
                                                <v-btn icon="mdi-map-search-outline"
                                                    style="color:white; background-color:rgb(252, 152, 0)" />
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col class="ma-auto" style="text-align:left">
                                                Address de Livraison : {{ order.clientLoc }}
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
                                <v-expansion-panel-title>
                                    <v-row>
                                        <v-col class="ma-auto">
                                            N°{{ order.orderN }}
                                        </v-col>

                                        <v-col class="ma-auto">
                                            {{ order.distance }}km
                                        </v-col>

                                        <v-col class="ma-auto">
                                            {{ order.remun / 100 }}€
                                        </v-col>

                                        <v-col>
                                            {{ formatDate(order.date) }}
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-title>

                                <v-expansion-panel-text>
                                    <v-row>
                                        <v-col class="ma-auto" style="text-align:left">
                                            Address de collecte : {{ order.restoLoc }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="ma-auto" style="text-align:left">
                                            Address de Livraison : {{ order.clientLoc }}
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


export default {
    name: 'OrderRestaurantWorkComponent',
    components: {
        ConfettiExplosion,
    },
    props: {
        heightList: Number,
    },
    data: () => ({
        visibleC: false,
        curentTab: 'En Cours',
        orderProgressDelivery: null,
        orderDelivered: [],
        orderToAccept:
            [
                { orderN: '0000001', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000002', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000003', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000004', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000005', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000006', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000007', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000008', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000009', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000010', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000011', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000012', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000013', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000014', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000015', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000016', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000017', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000018', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000019', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
                { orderN: '0000020', remun: '9999', distance: 5, restoLoc: 'address restaurant', clientLoc: 'address client' },
            ],
    }),
    methods: {
        onAcceptOrder(order) {
            this.orderProgressDelivery = order;
        },
        onAbortOrder(order) {
            this.orderProgressDelivery = null;
        },
        cancelExpand(e) {
            e.cancelBubble = true;
        },
        onDelivered() {
            this.visibleC = true;
            var deliveredOrder = {
                orderN: this.orderProgressDelivery.orderN,
                remun: this.orderProgressDelivery.remun,
                distance: this.orderProgressDelivery.distance,
                restoLoc: this.orderProgressDelivery.restoLoc,
                clientLoc: this.orderProgressDelivery.clientLoc,
                date: new Date,
            };
            setTimeout(() => {
                this.visibleC = false;

                this.orderDelivered.push(deliveredOrder);
                this.orderProgressDelivery = null;
            }, 500);
        },
        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [day, month, year].join('/');
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