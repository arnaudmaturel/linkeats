<template>
    <v-card style="background-color:rgb(250, 250, 250); display: inline; display:flex; padding: 5px;">

<!-- ORDER WAITING TO BE ACCECPTED -->
        <v-card style="border:solid 1px rgb(228, 228, 288); margin-bottom:10px; width:33%;" :height="heightList" :max-height="heightList"
            class="overflow-y-auto px-3">
            <h5 style="text-align:center; margin-top: 10px">
                Commandes Reçues
            </h5>
            <v-expansion-panels variant="popout" class="my-4">
                <v-expansion-panel v-for="order in orderToAccept" :key="order" style="width: 100%;">
                    <v-expansion-panel-title>
                        <v-row>
                            <v-col class="ma-auto">
                                {{ order.orderN }}
                            </v-col>

                            <v-col class="ma-auto">
                                {{ order.cost / 100 }}€
                            </v-col>

                            <v-col class="ma-auto"> <!--Accecpt Order-->
                                <v-btn id="btn" rounded="pill" @click="onAcceptOrder(order)" @click.native="cancelExpand($event)">
                                    <v-icon icon="mdi-check-bold" size="small"></v-icon>
                                </v-btn>
                            </v-col>

                            <v-col class="ma-auto"><!--Reject Order-->
                                <v-btn id="btn" color="red" rounded="pill" @click="onRejectOrder(order)" @click.native="cancelExpand($event)">
                                    <v-icon icon="mdi-close-thick" size="small">
                                    </v-icon>
                                </v-btn>
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
                </v-expansion-panel>

            </v-expansion-panels>

        </v-card>


<!-- PREPARING ORDER -->
        <v-card style="border:solid 1px rgb(228, 228, 288); margin-bottom:10px; width:33%;" :height="heightList" :max-height="heightList"
            class="overflow-y-auto px-3">
            <h5 style="text-align:center; margin-top: 10px">
                Commandes en préparation
            </h5>
            <v-expansion-panels variant="popout" class="my-4">
                <v-expansion-panel v-for="order in orderCooking" :key="order" style="width: 100%;">
                    <v-expansion-panel-title>
                        <v-row>
                            <v-col>
                                {{ order.orderN }}
                            </v-col>

                            <v-col offset="2">
                                {{ order.cost / 100 }}€
                            </v-col>

                        </v-row>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                        <v-checkbox v-for="item in order.items" :key="item" :label="item" dense style="height: 50px;" :value="item" v-model="order.itemsDone"/>
                        <v-row>
                            <v-col class="ma-auto" cols="12" style="text-align:center;">
                                <!-- ORDER IS READY -->
                                <v-btn id="btn" rounded="pill" :disabled="order.itemsDone.length!=order.items.length" @click="onOrderReady(order)"  >
                                    <v-icon icon="mdi-check-bold" />
                                    <ConfettiExplosion v-if="visibleC" />
                                </v-btn> 

                                <!-- ORDER IS ABORT -->
                                <v-btn id="btn" color="red" rounded="pill" @click="onAbortOrder(order)">
                                    <v-icon icon="mdi-close-thick" />
                                </v-btn> 
                            </v-col>
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>

            </v-expansion-panels>

        </v-card>


<!-- WAITING DELIVERY -->
        <v-card style="border:solid 1px rgb(228, 228, 288); margin-bottom:10px; width:33%;" :height="heightList" :max-height="heightList"
            class="overflow-y-auto px-3">
            <h5 style="text-align:center; margin-top: 10px;">
                Commandes à expédier
            </h5>
            <v-expansion-panels variant="popout" class="my-4">
                <v-expansion-panel v-for="order in ordersForDelivery" :key="order" style="width: 100%;">
                    <v-expansion-panel-title>
                        <v-row>
                            <v-col>
                                {{ order.orderN }}
                            </v-col>

                            <v-col offset="2">
                                {{ order.cost / 100 }}€
                            </v-col>

                        </v-row>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                        <v-row v-for="item in order.items" :key="item">
                            {{ item }}
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>

            </v-expansion-panels>

        </v-card>


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
        ordersForDelivery: [],
        orderCooking: [],
        orderToAccept:
            [
                { orderN: '0000001', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000002', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000003', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000004', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000005', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000006', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000007', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000008', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000009', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000010', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000011', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000012', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000013', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000014', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000015', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000016', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000017', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000018', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000019', cost: '999999', items: ['item1', 'item2', 'item3'] },
                { orderN: '0000020', cost: '999999', items: ['item1', 'item2', 'item3'] },
            ],
        idOdrer: -1,
    }),
    methods: {
        onAcceptOrder(order) {
            var idx = this.orderToAccept.indexOf(order);
            this.orderToAccept.splice(order, 1);
            var cookingObj = {};
            Object.assign(cookingObj, order);
            Object.defineProperty(cookingObj, 'itemsDone', {
                value: [],
                writable: true
            });

            // for (let i = 0; i < order.items.length; i++) {
            //     cookingObj.itemsDone.push(false)
            // }
            console.log(cookingObj);
            this.orderCooking.push(cookingObj);
        },
        onRejectOrder(order) {
            var idx = this.orderToAccept.indexOf(order);
            this.orderToAccept.splice(idx, 1);
        },
        onAbortOrder(order) {
            var idx = this.orderCooking.indexOf(order);
            this.orderCooking.splice(idx, 1)
        },
        onOrderReady(order) {
            this.visibleC = true;
            setTimeout(() => {
                this.visibleC = false;
                var idx = this.orderCooking.indexOf(order);
                this.orderCooking.splice(idx, 1)
                this.ordersForDelivery.push(order);
            }, 500);
            
        },
        onOrderExpediated(order) {
            var idx = this.ordersForDelivery.indexOf(order);
            this.ordersForDelivery.splice(idx, 1)
        },
        cancelExpand(e)
        {
            e.cancelBubble = true;
        },
    },

}
</script>


<style>
#btn {
    background-color: rgb(255, 152, 0);
    color: white !important;
}
</style>