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
                            <v-col class="ma-auto" cols="6"  inline-block >
                                {{ order._id }}
                            </v-col>

                            <v-col class="ma-auto" cols="2"  inline-block >
                                {{ order.ItemsPrice / 100 }}€
                            </v-col>

                            <v-btn id="btn" icon="mdi-check-bold" rounded="pill" @click="onAcceptOrder(order)" @click.native="cancelExpand($event)"/> 
                            <v-btn id="btn" icon="mdi-close-thick" color="red" rounded="pill" @click="onRejectOrder(order)" @click.native="cancelExpand($event)"/> 
                        </v-row>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                        <v-row v-for="item in order.Items" :key="item">
                            <v-col class="ma-auto"  inline-block >
                                {{ item.Quantity + '× ' + item.NameDish }}
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
                            <v-col inline-block >
                                {{ order._id }}
                            </v-col>

                            <v-col offset="2"  inline-block >
                                {{ order.ItemsPrice / 100 }}€
                            </v-col>

                        </v-row>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                        <v-checkbox v-for="item in order.Items" :key="item" :label="item.Quantity + '× ' + item.NameDish" dense style="height: 50px;" :value="item" v-model="order.ItemsDone"/>
                        <v-row>
                            {{ this.progressOrder[order._id] }}
                            <v-col class="ma-auto" cols="12" style="text-align:center;">
                                <!-- ORDER IS READY -->
                                <v-btn id="btn" icon="mdi-check-bold" rounded="pill" :disabled="order.ItemsDone.length!=order.Items.length" @click="onOrderReady(order)"  >
                                    <ConfettiExplosion v-if="visibleC" />
                                </v-btn> 

                                <!-- ORDER IS ABORT -->
                                <v-btn id="btn" icon="mdi-close-thick" color="red" rounded="pill" @click="onAbortOrder(order)">
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
                            <v-col inline-block >
                                {{ order._id }}
                            </v-col>

                            <v-col offset="2" inline-block >
                                {{ order.ItemsPrice / 100 }}€
                            </v-col>

                        </v-row>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                        <v-row v-for="item in order.Items" :key="item">
                                {{ item.Quantity + '× ' + item.NameDish }}
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>

            </v-expansion-panels>

        </v-card>


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
    props: {
        heightList: Number,
    },
    async created()
    {
        await this.refreshData();
    },
    data: () => ({
        visibleC: false,
        ordersForDelivery: [],
        orderCooking: [],
        orderToAccept: [],
        progressOrder:[],
        idOdrer: -1,
    }),
    methods: {
        async onAcceptOrder(order) {
            await this.$store.dispatch('saveOrder', { id: order._id, data: { OrderStatus: OrderStatus.CookingProgress } });
            console.log("order "+order._id+" updated");
            await this.refreshData();
        },
        async onRejectOrder(order) {
            await this.$store.dispatch('saveOrder', { id: order._id, data: { OrderStatus: OrderStatus.CancelledRestaurant } });
            await this.refreshData();
        },
        async onAbortOrder(order) {            
            await this.$store.dispatch('saveOrder', { id: order._id, data: { OrderStatus: OrderStatus.CancelledRestaurant } });
            await this.refreshData();
        },
        async onOrderReady(order) {
            this.visibleC = true;
            await setTimeout(async() => {
                this.visibleC = false;
                await this.$store.dispatch('saveOrder', { id: order._id, data: { OrderStatus: OrderStatus.WaitingDeliverymanConfirmation, CookedAt:new Date(),ItemsDone : [] } });
            }, 500);
            await this.refreshData();            
        },
        cancelExpand(e)
        {
            e.cancelBubble = true;
        },
        async refreshData()
        {
            console.log("check orders");
            await this.$store.dispatch('getAllRestoOrders', localStorage.getItem('userId'));
            this.orderToAccept = await this.$store.state.order.orders.filter(this.isWaitingAccpectation);
            this.orderCooking = await this.$store.state.order.orders.filter(this.isCookingProgress);
            this.ordersForDelivery = await this.$store.state.order.orders.filter(this.isWaitingDelivery);
        },
        isWaitingAccpectation(value) {
            return value.OrderStatus == OrderStatus.WaitingRestaurantConfirmation;
        },
        isCookingProgress(value) {  
            return value.OrderStatus == OrderStatus.CookingProgress;
        },
        isWaitingDelivery(value) {
            return value.OrderStatus == OrderStatus.WaitingDeliverymanConfirmation || value.OrderStatus == OrderStatus.WaitingDeliverymanPickUp;
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