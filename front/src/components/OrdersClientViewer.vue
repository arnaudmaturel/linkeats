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
        <v-tabs id="tabMenu" centered grow v-model="orderSate" color="rgb(255, 152, 0)">
            <v-tab :id="(menu == orderSate) ? 'orderStateSelected' : 'orderState'" v-for="menu in menus" :key="menu"
                :value="menu" ripple="false">
                {{ menu }}
            </v-tab>
        </v-tabs>

        <div id="img">
            <v-card id="infPart" max-height="450px" class="overflow-y-auto">
                <v-expansion-panels>
                    <v-expansion-panel v-for="order in orders" :key="order">
                        <!-- IN PROGRESS ORDER -->
                        <div v-if="order.state == orderSate && orderSate == 'En cours'">
                            <v-expansion-panel-title>
                                <v-row>
                                    <v-col>
                                        {{ order.orderN }}
                                    </v-col>

                                    <v-col offset="3">
                                        {{ order.cost / 100 }}€
                                    </v-col>

                                    <v-col offset="4">
                                        <v-icon icon="mdi-close-octagon"
                                            @click="idOdrer = order.orderN; snackbar = true" />
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-title>

                            <v-expansion-panel-text>
                                <v-row>
                                    <v-col cols="8">
                                        <div v-for="item in order.items" :key="item">
                                            {{ item }}
                                        </div>
                                    </v-col>
                                    <v-col offset="1">
                                        <v-btn icon="mdi-map-clock" @click="startOrderDelivery"/>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-text>
                        </div>
                        <!-- ENDED ORDER -->
                        <div v-else-if="order.state == orderSate && orderSate == 'Terminé'">
                            <v-expansion-panel-title>
                                <v-col>
                                    {{ order.orderN }}
                                </v-col>

                                <v-col offset="1">
                                    {{ order.date }}
                                </v-col>

                                <v-col offset="2">
                                    {{ order.cost / 100 }}€
                                </v-col>

                                <v-col offset="1">
                                    <v-icon icon="mdi-alert-octagon" @click="idOdrer = order.orderN; snackbar = true" />
                                </v-col>
                            </v-expansion-panel-title>

                            <v-expansion-panel-text>
                                <v-row>
                                    <div v-for="item in order.items" :key="item">
                                        {{ item }}
                                    </div>
                                </v-row>
                            </v-expansion-panel-text>
                        </div>

                    </v-expansion-panel>
                </v-expansion-panels>

            </v-card>
        </div>



        <!-- SNACKBAR -->
        <v-snackbar v-model="snackbar" :timeout="timeout" style="border=solid 3px rgb(228, 228, 228);">
            {{ (orderSate == 'En cours') ?
            'Nous annulons votre coommande ' :
            'Nous avons pris en considération votre réclamation pour la commande ' }} {{ idOdrer }}
            <template v-slot:actions>
                <v-btn color="rgb(255, 152, 0)" rounded="pill" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        
        
        <!-- DIALOG -->
        <v-dialog v-model="dialog">
            <MapViewer @on-close="dialog=false" :showProgressBar="true"
             :progress="progressValue"
             :positionStart="locStart" 
             :positionEnd="locEnd" 
             :positionDeliveryman="locDeliver"/>
        </v-dialog>
    </v-card>
</template>

<script>
import EndOrderCompoent from './endOrder.vue';
import MapViewer from './MapProgresOrderViewer.vue';

const timer = ms => new Promise(res => setTimeout(res, ms));



export default {
    components: { EndOrderCompoent, MapViewer },
    props: {
    },
    data: () => ({
        orderSate: "En cours",
        menus: [
            'En cours',
            'Terminé'
        ],
        scrollInvoked: 0,
        dialog : false,
        orders: [
            { orderN: '0009999', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0007777', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0006666', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0005555', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0004444', state: 'En cours', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0003333', state: 'En cours', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0002222', state: 'En cours', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0001111', state: 'En cours', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0000000', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0000000', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0000000', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0000000', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0000000', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0000000', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0000000', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0000000', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0000000', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
            { orderN: '0000000', state: 'Terminé', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
        ],
        snackbar: false,
        text: 'Nous avons pris en considération votre réclamation',
        timeout: 3000,
        idOdrer: -1,
        progressValue: 0,
        locStart : null,
        locEnd : null,
        locDeliver: null,
        bbox: null,
    }),
    methods: {


        getProgressOrder() {
            let output = [];
            orders.forEach(order => {
                if (order.state == 'En cours') output.push(order);
            });
            return output;
        },
        onScroll() {
            this.scrollInvoked++
        },
        onReport(orderN) {
            text = 'Nous avons pris en considération votre réclamation pour la commande ' + orderN;
            snackbar = true;
        },
        onCancelOrder(orderN) {
            text = 'Voulez vous annulez la commande ' + orderN;
            snackbar = true;
        },
        async startOrderDelivery() {
            this.locEnd = [1.075156398367302, 49.38240286389411];
            this.locStart = [ 1.0700076823176903, 49.41908420837877];
            this.bbox = [this.locStart[1], this.locStart[0], this.locStart[1], this.locStart[0]]
            this.dialog = true;
            this.progressValue = 0;
            for (let i = 0; i < 100; i++) {
                if (!this.dialog)
                    return;
                this.progressValue++;
                this.locDeliver = this.lerp(this.locStart, this.locEnd, this.progressValue / 100);
                await timer(1000);

                console.log(this.progressValue);

            }
        },
        lerp(locA, locB, time) {
            const range0 = locB[0] - locA[0];
            const range1 = locB[1] - locA[1];

            return [locA[0] + range0*time,locA[1]+range1*time]

        }
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