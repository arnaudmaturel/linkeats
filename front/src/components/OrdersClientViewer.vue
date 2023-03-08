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
                <!-- IN PROGRESS ORDER -->
                <div v-if="orderSate == 'En cours'">
                    <v-expansion-panels>
                        <v-expansion-panel v-for="order in currentOrders" :key="order">
                            <v-expansion-panel-title>
                                <v-row>
                                    <v-col>
                                        {{ order.order.SimpleID.Date + " " + order.order.SimpleID.Id4Resto }}
                                    </v-col>

                                    <v-col>
                                        {{ (order.order.OrderFinalPrice / 100).toFixed(2) }}€
                                    </v-col>

                                    <v-col cols="3" inline-block>
                                        {{ getPrgressText(order.order.OrderStatus) }}
                                    </v-col>

                                    <v-col offset="1">
                                        <!-- <v-icon icon="mdi-close-octagon" @click="idOdrer = order._id; snackbar = true" /> -->
                                        <v-icon icon="mdi-close-octagon"
                                            @click="cancelExpand, onCancelOrder(order.order._id)" />
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-title>

                            <v-expansion-panel-text>
                                <v-row>
                                    <v-col cols="10">
                                        <v-row>
                                            <v-col>
                                                Restaurant : {{ order.resto.RestaurantName }}
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                Articles : {{ (order.order.ItemsPrice / 100).toFixed(2) }}€
                                            </v-col>
                                        </v-row>
                                        <v-row v-for="item in order.order.Items" :key="item" in-block>
                                            <v-col offset="1" style="text-align:left;">
                                                {{ item.NameDish }} :
                                            </v-col>
                                            <v-col>
                                                {{ item.Quantity }} x {{ (item.Price / 100).toFixed(2) }}€
                                            </v-col>
                                            <v-col>
                                                = {{ ((item.Quantity * item.Price) / 100).toFixed(2) }}€
                                            </v-col>
                                        </v-row>
                                        <v-row style="text-align:left;">
                                            <v-col>
                                                Cout de livraison : {{ (order.order.OrderLinkEatsPart / 100 +
                                                    order.order.OrderDeliveryCost
                                                    / 100).toFixed(2) }}€
                                            </v-col>
                                        </v-row>
                                        <v-row style="text-align:center;">
                                            <v-col>
                                                <b>
                                                    Cout total : {{ (order.order.OrderFinalPrice / 100).toFixed(2) }}€
                                                </b>
                                            </v-col>
                                        </v-row>
                                    </v-col>


                                    <v-col v-if="order.order.OrderStatus == progressOrder">
                                        <v-btn icon="mdi-map-clock" @click="startOrderDelivery" />
                                    </v-col>
                                </v-row>

                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
                <!-- ENDED ORDER -->
                <div v-else-if="orderSate == 'Terminé'">
                    <v-expansion-panels>
                        <v-expansion-panel v-for="order in endedOrders" :key="order">
                            <v-expansion-panel-title>
                                <v-col>
                                    {{ order.order.SimpleID.Date + " " + order.order.SimpleID.Id4Resto }}
                                </v-col>

                                <v-col>
                                    {{ formatDate(order.order.RgpdObjectCreatedAt) }}
                                </v-col>

                                <v-col>
                                    {{ (order.order.OrderFinalPrice / 100).toFixed(2) }}€
                                </v-col>

                                <v-col cols="2" inline-block>
                                    {{ getPrgressText(order.order.OrderStatus) }}
                                </v-col>

                                <v-col offset="1">
                                    <v-icon icon="mdi-alert-octagon" @click="cancelExpand, onReport(order.order._id)" />
                                    <!-- <v-icon icon="mdi-alert-octagon" @click="idOdrer = order._id; snackbar = true" /> -->
                                </v-col>
                            </v-expansion-panel-title>

                            <v-expansion-panel-text>
                                <v-row>
                                    <v-col>
                                        Restaurant : {{ order.resto.RestaurantName }}
                                    </v-col>
                                </v-row>
                                <v-row v-for="item in order.order.Items" :key="item" in-block>
                                    <v-col style="text-align:right;">
                                        {{ item.NameDish }} :
                                    </v-col>
                                    <v-col>
                                        {{ item.Quantity }} x {{ (item.Price / 100).toFixed(2) }}€
                                    </v-col>
                                    <v-col>
                                        = {{ ((item.Quantity * item.Price) / 100).toFixed(2) }}€
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        Articles : {{ (order.order.ItemsPrice / 100).toFixed(2) }}€
                                    </v-col>
                                </v-row>
                                <v-row style="text-align:left;">
                                    <v-col>
                                        Cout de livraison : {{ (order.order.OrderLinkEatsPart / 100 +
                                            order.order.OrderDeliveryCost / 100).toFixed(2) }}€
                                    </v-col>
                                </v-row>
                                <v-row style="text-align:left;">
                                    <v-col>
                                        <b>
                                            Cout total : {{ (order.order.OrderFinalPrice / 100).toFixed(2) }}€
                                        </b>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="ma-auto">
                                        Evaluation Restaurant:
                                    </v-col>
                                    <v-col class="ma-auto">
                                        <v-rating v-model="order.rateResto" disabled color="rgb(255, 152, 0)"
                                            active-color="rgb(255, 152, 0)" half-increments size="18" />
                                    </v-col>
                                    <v-col class="ma-auto">
                                        <v-btn icon="mdi-pencil" id="btn"
                                            @click="editComment(order.order._id, order.order.RestaurantId)" />
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col class="ma-auto">
                                        Evaluation Livrason:
                                    </v-col>
                                    <v-col class="ma-auto">
                                        <v-rating v-model="order.rateDeliver" disabled color="rgb(255, 152, 0)"
                                            active-color="rgb(255, 152, 0)" half-increments size="18" />
                                    </v-col>
                                    <v-col class="ma-auto">
                                        <v-btn icon="mdi-pencil" id="btn"
                                            @click="editComment(order.order._id, order.order.DeliveryManId)" />
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-text>

                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>

            </v-card>
        </div>



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
        <v-dialog v-model="dialog">
            <MapViewer @on-close="dialog = false" :showProgressBar="true" :progress="progressValue"
                :positionStart="locStart" :positionEnd="locEnd" :positionDeliveryman="locDeliver" />
        </v-dialog>

        <v-dialog v-model="popUp">
            <PopUpConfirm :message="popUpMessage" @on-validated="onValidatePopUp()" @on-cancel="onClosePopUp()" />
        </v-dialog>

        <v-dialog v-model="dialogCom">
            <CommentEditVue @on-validate="saveCom" @on-close="dialogCom = false;" :comment="editCom" />
        </v-dialog>
    </v-card>
</template>

<script>
import MapViewer from './MapProgresOrderViewer.vue';
import OrderStatus from '@/store/OrderStatus';
import PopUpConfirm from '@/components/PopUpConfirm.vue';
import AppSetting from '@/AppSetting.js';
import CommentEditVue from './CommentEdit.vue';


const timer = ms => new Promise(res => setTimeout(res, ms));



export default {
    components: { MapViewer, PopUpConfirm, CommentEditVue },
    props: {
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
        orderSate: "En cours",
        menus: [
            'En cours',
            'Terminé'
        ],
        scrollInvoked: 0,
        dialog: false,
        currentOrders: [],
        endedOrders: [],
        snackbar: false,
        text: 'Nous avons pris en considération votre réclamation',
        timeout: 3000,
        idOdrer: -1,
        progressValue: 0,
        locStart: null,
        locEnd: null,
        locDeliver: null,
        bbox: null,
        dialogCom: false,
        modeTypePop: { report: 0, cancel: 1 },
        modePop: 0,
        popUpMessage: "",
        popUp: false,
        popUpData: null,
        mustRefresh: false,
        progressOrder: OrderStatus.DeliveryInProgress,
        comments: [],
        editCom: null,
    }),
    methods: {
        async onValidatePopUp() {
            switch (this.modePop) {
                case this.modeTypePop.report:
                    this.text = 'Nous avons pris en considération votre réclamation pour la commande ' + this.popUpData;
                    console.log("OnReport().text = " + this.text);
                    this.snackbar = true;
                    break;

                case this.modeTypePop.cancel:
                    this.text = 'Voulez vous annulez la commande ' + this.popUpData;
                    await this.$store.dispatch('saveOrder', { id: this.popUpData, data: { OrderStatus: OrderStatus.CancelledClient } });
                    this.snackbar = true;
                    await this.refreshData();
                    break;
            }
            this.popUp = false;
        },
        onClosePopUp() {
            this.popUp = false;
        },
        onReport(orderN) {
            this.popUpData = orderN;
            this.modePop = this.modeTypePop.report;
            this.popUpMessage = "Voulez vous faire réclamation de cette commande";
            this.popUp = true;
        },
        onCancelOrder(orderN) {
            this.popUpData = orderN;
            this.modePop = this.modeTypePop.cancel;
            this.popUpMessage = "Voulez vous annuler cette commande";
            this.popUp = true;
        },
        async startOrderDelivery() {
            this.locEnd = [1.075156398367302, 49.38240286389411];
            this.locStart = [1.0700076823176903, 49.41908420837877];
            this.bbox = [this.locStart[1], this.locStart[0], this.locStart[1], this.locStart[0]]
            this.dialog = true;
            this.progressValue = 0;
            for (let i = 0; i < 100; i++) {
                if (!this.dialog)
                    return;
                this.progressValue++;
                this.locDeliver = this.lerp(this.locStart, this.locEnd, this.progressValue / 100);
                await timer(1000);
            }
        },
        lerp(locA, locB, time) {
            const range0 = locB[0] - locA[0];
            const range1 = locB[1] - locA[1];

            return [locA[0] + range0 * time, locA[1] + range1 * time]
        },
        async timedRefresh() {
            while (this.mustRefresh) {
                await timer(AppSetting.REFRESH_TIME);
                await this.refreshData();
            }
        },
        async refreshData() {
            var tempCurrentOrder = [];
            var tempEndedOrder = [];

            await this.$store.dispatch('getAllClientComments', localStorage.getItem('userId'));
            this.comments = this.$store.state.comment.comments;

            await this.$store.dispatch('getAllClientOrders', localStorage.getItem('userId'));

            for (var i = 0; i < this.$store.state.order.orders.length; i++) {
                var x = this.$store.state.order.orders[i];
                const cResto = await this.getComment(x._id, x.RestaurantId);
                const cDeliver = await this.getComment(x._id, x.DeliveryManId);

                var rateResto = -1;
                if (cResto != null)
                    rateResto = cResto.Rate;

                var rateDeliver = -1;
                if (cDeliver != null)
                    rateDeliver = cDeliver.Rate;


                const resto = await this.getResto(x.RestaurantId);
                switch (x.OrderStatus) {
                    case OrderStatus.Unknown:
                    case OrderStatus.CancelledClient:
                    case OrderStatus.CancelledRestaurant:
                    case OrderStatus.RejectededDeliveryman:
                    case OrderStatus.DeliveryCancelled:
                    case OrderStatus.Delivered:
                        tempEndedOrder.push({ order: x, resto: resto, rateResto: rateResto, rateDeliver: rateDeliver });
                        break;

                    case OrderStatus.WaitingRestaurantConfirmation:
                    case OrderStatus.CookingProgress:
                    case OrderStatus.WaitingDeliverymanConfirmation:
                    case OrderStatus.WaitingDeliverymanPickUp:
                    case OrderStatus.DeliveryInProgress:
                        tempCurrentOrder.push({ order: x, resto: resto, rateResto: rateResto, rateDeliver: rateDeliver });
                        break;
                }
            }

            this.currentOrders = tempCurrentOrder;
            this.endedOrders = tempEndedOrder;
        },
        async getResto(id) {
            await this.$store.dispatch('getRestaurant', id);
            return this.$store.state.storeRestaurants.restaurant;
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
        },
        async cancelExpand(e) {
            e.cancelBubble = true;
        },
        getPrgressText(iProgress) {
            switch (iProgress) {
                case OrderStatus.Unknown:
                    return "INCONNU";

                case OrderStatus.CancelledClient:
                    return "Annulation Client";

                case OrderStatus.CancelledRestaurant:
                    return "Annulation Restaurant";

                case OrderStatus.DeliveryCancelled:
                case OrderStatus.RejectededDeliveryman:
                    return "Annulation livreur";

                case OrderStatus.Delivered:
                    return "Livré";

                case OrderStatus.WaitingRestaurantConfirmation:
                    return "En attente de confirmation du Restaurant"

                case OrderStatus.CookingProgress:
                    return "Préparation en cours"

                case OrderStatus.WaitingDeliverymanConfirmation:
                    return "En attente de confirmation du livreur"

                case OrderStatus.WaitingDeliverymanPickUp:
                    return "En attente de recupération par le livreur"

                case OrderStatus.DeliveryInProgress:
                    return "livraison en cours"
            }
        },
        async editComment(idOrder, idNotedUser) {
            var com = await this.getComment(idOrder, idNotedUser);

            if (com == null) {
                const id = await this.createComment(idOrder, idNotedUser);
                com = await this.$store("getComment", id);
            }

            if (com == null) {
                console.log("Erreur editComment().com = null");
                return;
            }

            console.log("editComment().com : ", com);

            this.editCom = com;
            this.dialogCom = true;
        },
        async saveCom() {
            console.log("saveCom().editCom :", this.editCom);
            await this.$store.dispatch("saveComment", { id: this.editCom._id, comment: this.editCom });
            this.dialogCom = false;
            await this.refreshData();
        },
        async getComment(idOrder, idNotedUser, recursif = true) {
            var comment = null;

            for (var i = 0; i < this.comments.length; i++) {
                var c = this.comments[i];

                if (c.IDOrderAssociated == idOrder && c.IDUserNoted == idNotedUser) {
                    comment = c;
                    break;
                }
            }

            return comment;
        },
        async createComment(idOrder, idNotedUser) {
            const newComment =
            {
                Title: "",
                Rate: 0,
                Description: "",
                IDClient: localStorage.getItem("userId"),
                IDOrderAssociated: idOrder,
                IDUserNoted: idNotedUser
            }

            await this.$store.dispatch("createComment", newComment);
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