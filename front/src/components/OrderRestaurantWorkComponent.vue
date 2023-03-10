<template>
    <v-card style="background-color:rgb(250, 250, 250); display: inline; display:flex; padding: 5px;">

        <!-- ORDER WAITING TO BE ACCECPTED -->
        <v-card style="border:solid 1px rgb(228, 228, 288); margin-bottom:10px; width:33%;" :height="heightList"
            :max-height="heightList" class="overflow-y-auto px-3">
            <h5 style="text-align:center; margin-top: 10px">
                Commandes reçues
            </h5>
            <v-expansion-panels variant="popout" class="my-4">
                <v-expansion-panel v-for="order in orderToAccept" :key="order" style="width: 100%;">
                    <v-expansion-panel-title>
                        <v-row>
                            <v-col cols="2" class="ma-auto" inline-block>
                                {{ order.SimpleID.Id4Resto }}
                            </v-col>

                            <v-col cols="4" class="ma-auto"  inline-block>
                                {{ order.ItemsPrice / 100 }}€
                            </v-col>

                            <v-col >
                                <v-row>
                                    <v-btn id="btn" icon="mdi-check-bold" rounded="pill" size="small" @click="onAcceptOrder(order)" @click.native="cancelExpand($event)" />
                                    <v-btn id="btn" icon="mdi-close-thick" color="red" size="small" rounded="pill" @click="onRejectOrder(order)" @click.native="cancelExpand($event)" />
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                        <v-row v-for="item in order.Items" :key="item">
                            <v-col class="ma-auto" inline-block>
                                {{ item.Quantity + '× ' + item.NameDish }}
                            </v-col>
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>

            </v-expansion-panels>

        </v-card>


        <!-- PREPARING ORDER -->
        <v-card style="border:solid 1px rgb(228, 228, 288); margin-bottom:10px; width:33%;" :height="heightList"
            :max-height="heightList" class="overflow-y-auto px-3">
            <h5 style="text-align:center; margin-top: 10px">
                Commandes en préparation
            </h5>
            <v-expansion-panels variant="popout" class="my-4">
                <v-expansion-panel v-for="order in orderCooking" :key="order" style="width: 100%;">
                    <v-expansion-panel-title>
                        <v-row>
                            <v-col inline-block>
                                {{ order.SimpleID.Id4Resto }}
                            </v-col>

                            <v-col offset="2" inline-block>
                                {{ order.ItemsPrice / 100 }}€
                            </v-col>

                        </v-row>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                        <v-checkbox v-for="item in order.Items" :key="item" :label="item.Quantity + '× ' + item.NameDish"
                            dense style="height: 50px;" :value="item" v-model="order.ItemsDone" @click="saveOrder(order)" />
                        <v-row class="ma-auto" style="text-align:center;">
                            {{ this.progressOrder[order._id] }}
                            <v-col style="text-align:right;">
                                <!-- ORDER IS READY -->
                                <div>
                                    <v-btn id="btn" icon="mdi-check-bold" rounded="pill"
                                        :disabled="order.ItemsDone.length != order.Items.length" @click="onOrderReady(order)">
                                        <ConfettiExplosion v-if="visibleC" />
                                        <v-icon icon="mdi-check-bold" />
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col class="ma-auto" style="text-align:left;">
                                <!-- ORDER IS ABORT -->
                                <v-btn id="btn" icon="mdi-close-thick" color="red" rounded="pill"
                                    @click="onAbortOrder(order)" />
                            </v-col>
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>

            </v-expansion-panels>

        </v-card>


        <!-- WAITING DELIVERY -->
        <v-card style="border:solid 1px rgb(228, 228, 288); margin-bottom:10px; width:33%;" :height="heightList"
            :max-height="heightList" class="overflow-y-auto px-3">
            <h5 style="text-align:center; margin-top: 10px;">
                Commandes à expédier
            </h5>
            <v-expansion-panels variant="popout" class="my-4">
                <v-expansion-panel v-for="order in ordersForDelivery" :key="order" style="width: 100%;">
                    <v-expansion-panel-title>
                        <v-row>
                            <v-col inline-block>
                                {{ order.SimpleID.Id4Resto }}
                            </v-col>

                            <v-col offset="2" inline-block>
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
    
    <!-- DIALOG -->
    <v-dialog v-model="popUp">
    <PopUpConfirm :message="popUpMessage" @on-validated="onValidatePopUp()" @on-cancel="onClosePopUp()" />
    </v-dialog>

    </v-card>

</template>


<script>
import ConfettiExplosion from "vue-confetti-explosion";
import OrderStatus from '@/store/OrderStatus';
import PopUpConfirm from '@/components/PopUpConfirm.vue';
import AppSetting from '@/AppSetting.js'


const timer = ms => new Promise(res => setTimeout(res, ms));


export default {
    name: 'OrderRestaurantWorkComponent',
    components: {
        ConfettiExplosion,
        PopUpConfirm
    },
    props: {
        heightList: Number,
    },
    async created() {
        await this.refreshData();
    },
    async mounted() {
        this.mustRefresh = true;
        this.timedRefresh();
    },
    async unmounted() {
        this.mustRefresh = false;
    },
    data: () => ({
        visibleC: false,
        ordersForDelivery: [],
        orderCooking: [],
        orderToAccept: [],
        progressOrder: [],
        idOdrer: -1,
        mustRefresh: false,
        modeTypePop: { reject: 0, abort: 1 },
        modePop: 0,
        popUpMessage: "",
        popUp: false,
        popUpData: null,
    }),
    methods: {
                async onValidatePopUp() {
            switch (this.modePop) {
                case this.modeTypePop.reject:
                    this.text = 'la commande '+this.popUpData+' commande a été refusé';
                    await this.$store.dispatch('saveOrder', { id: this.popUpData._id, data: { OrderStatus: OrderStatus.CancelledRestaurant } });
                    this.snackbar = true;
                    await this.refreshData();
                    break;

                case this.modeTypePop.abort:
                    this.text = 'Voulez vous annulez la commande ' + this.popUpData;
                    await this.$store.dispatch('saveOrder', { id: this.popUpData._id, data: { OrderStatus: OrderStatus.CancelledRestaurant } });
                    this.snackbar = true;
                    await this.refreshData();
                    break;
            }
            this.popUp = false;
        },
        onClosePopUp() {
            this.popUp = false;
        },

        async onAcceptOrder(order) {
            await this.$store.dispatch('saveOrder', { id: order._id, data: { OrderStatus: OrderStatus.CookingProgress } });
            console.log("order " + order._id + " updated");
            await this.refreshData();
        },

        async onRejectOrder(order) {
            this.popUpData = order;
            this.modePop = this.modeTypePop.reject;
            this.popUpMessage = "Voulez vous refuser cette commande ?";
            this.popUp = true;
        },
        async onAbortOrder(order) {
            this.popUpData = order;
            this.modePop = this.modeTypePop.abort;
            this.popUpMessage = "Voulez vous annuler cette commande ?";
            this.popUp = true;
        },
        async onOrderReady(order) {
            this.visibleC = true;
            await setTimeout(async () => {
                this.visibleC = false;
                await this.$store.dispatch('saveOrder', { id: order._id, data: { OrderStatus: OrderStatus.WaitingDeliverymanConfirmation, CookedAt: new Date(), ItemsDone: [] } });
                await this.refreshData();
            }, 500);
        },
        cancelExpand(e) {
            e.cancelBubble = true;
        },
        async timedRefresh() {
            while (this.mustRefresh) {
                await timer(AppSetting.REFRESH_TIME);
            }
        },
        async refreshData() {
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
        async saveOrder(order)
        {
            console.log('saved Order',order.ItemsDone);
            await this.$store.dispatch('saveOrder', { id: order._id, data: { ItemsDone: order.ItemsDone } });
            //await this.refreshData();
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