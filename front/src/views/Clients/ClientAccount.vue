<template>
        <v-container >
            <v-row>
                <v-col class="ma-auto" id="account-title">
                    <div v-if="userRole == 'Client'">
                        <h1>Mon compte Client</h1>
                    </div>
                    <div v-else-if="userRole=='Restaurant'">
                        <h1>Mon compte Restaurant</h1>
                    </div>
                    <div v-else-if="userRole=='Deliveryman'">
                        <h1>Mon compte Livreur</h1>
                    </div>
                    <div v-else>
                        <h1>Mon compte</h1>
                    </div>
                </v-col>
            </v-row>

            <v-tabs id="tabMenu" centered grow v-model="tab" dir="Horizontale" hide-slider="true" color="transparent"
                active-class="active">
                <v-tab id="tabItem" v-for="menu in menus" :key="menu" :value="menu.title" ripple="false">
                    <div id="tabItemDiv">
                        <v-btn id="tabItemBtn" :class="(tab == menu.title) ? 'tabItemDivActic' : 'tabItemDiv'"
                            rounded="pill" width="100%">
                            <v-icon start>
                                {{menu.icon}}
                            </v-icon>
                            {{ menu.title }}
                        </v-btn>
                    </div>
                </v-tab>
            </v-tabs>
            <br />


            <div id="contentMainCard" class="d-flex">
                <v-window  :id="(tab == 'Commandes' && userRole == 'Restaurant')? 'tabRWindow' : 'tabWindow'" v-model="tab">
                    <v-window-item v-for="menu in menus" :key="menu" :value="menu.title" :ref="menu.title" style="width:100%;">
                
                <!-- GENERAL INFO -->
                        <div v-if="menu.component == 'GeneralInfoClient'">
                            <GeneralInfoClient v-if="userRole=='Client'" />
                            <GeneralInfoRestaurant v-else-if="userRole=='Restaurant'"/>
                            <GeneralInfoDeliveryMen v-else-if="userRole=='Deliveryman'"/>
                        </div>

                <!-- CREDENTIALS -->
                        <div v-else-if="menu.component == 'CredentialInfo'">
                            <CredentialInfo/>
                        </div>

                <!-- ORDERS -->
                        <div v-else-if="menu.component == 'OrderView'">
                            <div v-if="userRole == 'Client'">
                                <OrderVue/>
                            </div>
                            <div v-else-if="userRole=='Restaurant'" style="width:100%;">
                                <OrdersRestaurantViewer/>
                            </div >
                            <div v-else-if="userRole=='Deliveryman'">
                                <OrderDeliveryWorkComponent/>
                            </div>
                            <div v-else>
                                not avalaible for your accout
                            </div>
                        </div>

                <!-- ADDRESS -->
                        <div v-else-if="menu.component == 'AdressesView'">
                            <div v-if="userRole=='Client'">
                                <AdressViewerClient/>
                            </div>
                            <div v-else-if="userRole=='Restaurant'" > 
                                <AddressRestaurant :data="{name:'',cp:'',addr:'',city: ''}" style="width:100%"/>
                            </div>
                            <div v-else>
                                not available
                            </div>
                        </div>


                <!-- CARD EDITOR -->
                        <div v-else-if="menu.component == 'RestaurantCardEditor'">
                            <div v-if="userRole=='Restaurant'">
                                <RestaurantCardEditor style="width=100%"/>
                            </div>
                            <div v-else>
                                not available
                            </div>
                        </div>

                <!-- OPEN LAYER DEMO -->
                        <div v-else-if="menu.component == 'OpenLayerDemo'">
                            <opneLayerDemo/>
                        </div>


                <!-- STARS (DEBUG FOR NOW) -->
                        <div v-else-if="menu.component == 'Stars'">
                            <!-- <DishEditor :dish="{name : '',price: 0,PicturePaths: '',Description: '', Tags:'tag1;tag2;tag3',Allergens: '',Wheight: 0,}"/> -->
                            <CommentViewer v-if="userRole != 'Client'"/>
                            <StarsClient v-if="userRole == 'Client'" style="width: 100%;"/>
                        </div>



                <!-- DEBUG (DEBUG FOR NOW) -->
                        <div v-else-if="menu.component == 'DebugView' && isDebug">
                            <DebugReq/>
                        </div>

                        <div v-else-if="menu.component == 'PopUpConfirm'" >
                            <PopUpConfirm message="Hello World !"/>
                        </div>

                <!-- EVERYTHING ELSE -->
                        <div v-else>
                            Comming soon
                        </div>
                    </v-window-item>
                </v-window>

            </div>
        </v-container>
</template>




<!-- SCRPIT -->
<script lang="js">

// Components

import GeneralInfoClient from '@/components/GeneralInfoClient.vue'
import CredentialInfo from '@/components/CredentialInfo.vue';
import OrderVue from '@/components/OrdersClientViewer.vue'
import viewClientLocOrder from '@/components/MapViewer.vue'
import opneLayerDemo from '@/components/OpenLayerDemo.vue'
import AdressViewerClient from '@/components/AdressViewerClient.vue';
import AddreessEdit from '@/components/AddreessEdit.vue';
import OrdersRestaurantViewer from '@/components/OrdersRestaurantViewer.vue';
import AddressRestaurant from '@/components/AdressRestaurant.vue';
import GeneralInfoRestaurant from '@/components/GeneralInfoRestaurant.vue';
import RestaurantCardEditor from '@/components/RestaurantCardEditor.vue';
import OrderDeliveryWorkComponent from '@/components/OrderDeliveryWorkComponent.vue';
import DishEditor from '@/components/DishEditor.vue';
import PopUpConfirm from '@/components/PopUpConfirm.vue';
import GeneralInfoDeliveryMen from '@/components/GeneralInfoDeliveryMen.vue';
import StarsClient from '@/components/StarsClient.vue';
import CommentViewer from '@/components/CommentViewer.vue';

import DebugReqView from '@/components/debug/debugReq.vue';


import { mapGetters, mapMutations, useStore, mapState } from "vuex";
import DebugReq from '@/components/debug/debugReq.vue';


export default {
    name: 'ClientAccount',
    // computed: mapState({
    //     credential: state => state.credential
    // }),
    props: {        
    },
    components: {
    GeneralInfoClient,
        CredentialInfo,
        OrderVue,
        viewClientLocOrder,
        opneLayerDemo,
        AdressViewerClient,
        AddreessEdit,
        OrdersRestaurantViewer,
        AddressRestaurant,
        GeneralInfoRestaurant,
        RestaurantCardEditor,
        OrderDeliveryWorkComponent,
        DishEditor,
        DebugReq,
        PopUpConfirm,
        GeneralInfoDeliveryMen,
        StarsClient,
        CommentViewer
},
    created()
    {
        switch (localStorage.getItem('userRole'))
        {
            case "1":
                this.userRole = "Client";
                this.menus = [
                    // { 'title': 'Debug (preview)', 'component': "PopUpConfirm", 'icon': 'mdi-bug' },
                    { 'title': 'Général', 'component': "GeneralInfoClient", 'icon': 'mdi-account' },
                    { 'title': 'Sécurité', 'component': "CredentialInfo", 'icon': 'mdi-account-lock' },
                    { 'title': 'Commandes', 'component': "OrderView", 'icon': 'mdi-clipboard-text' },
                    { 'title': 'Addresses', 'component': "AdressesView", 'icon': 'mdi-home-account' },
                    // { 'title': 'Carte', 'component': "RestaurantCardEditor", 'icon': 'mdi-food' },
                    { 'title': 'Stars (preview)', 'component': "Stars", 'icon': 'mdi-account-star' },
                    { 'title': 'Linker (preview)', 'component': "", 'icon': 'mdi-account-heart' },
                ]                
                break;


            case "2":
                this.userRole = "Restaurant";
                this.menus = [
                    // { 'title': 'Debug (preview)', 'component': "DebugView", 'icon': 'mdi-bug' },
                    { 'title': 'Général', 'component': "GeneralInfoClient", 'icon': 'mdi-account' },
                    { 'title': 'Sécurité', 'component': "CredentialInfo", 'icon': 'mdi-account-lock' },
                    { 'title': 'Commandes', 'component': "OrderView", 'icon': 'mdi-clipboard-text' },
                    { 'title': 'Addresses', 'component': "AdressesView", 'icon': 'mdi-home-account' },
                    { 'title': 'Carte', 'component': "RestaurantCardEditor", 'icon': 'mdi-food' },
                    { 'title': 'Stars (preview)', 'component': "Stars", 'icon': 'mdi-account-star' },
                    // { 'title': 'Linker (preview)', 'component': "", 'icon': 'mdi-account-heart' },
                ]
                break;


            case "3":
                this.userRole = "Deliveryman";
                this.menus = [
                    // { 'title': 'Debug (preview)', 'component': "DebugView", 'icon': 'mdi-bug' },
                    { 'title': 'Général', 'component': "GeneralInfoClient", 'icon': 'mdi-account' },
                    { 'title': 'Sécurité', 'component': "CredentialInfo", 'icon': 'mdi-account-lock' },
                    { 'title': 'Commandes', 'component': "OrderView", 'icon': 'mdi-clipboard-text' },
                    // { 'title': 'Addresses', 'component': "AdressesView", 'icon': 'mdi-home-account' },
                    // { 'title': 'Carte', 'component': "RestaurantCardEditor", 'icon': 'mdi-food' },
                    { 'title': 'Stars (preview)', 'component': "Stars", 'icon': 'mdi-account-star' },
                    // { 'title': 'Linker (preview)', 'component': "", 'icon': 'mdi-account-heart' },
                ]
                break;


            case "4":
                this.userRole = "Developper";
                this.menus = [
                    // { 'title': 'Debug (preview)', 'component': "DebugView", 'icon': 'mdi-bug' },
                    { 'title': 'Général', 'component': "GeneralInfoClient", 'icon': 'mdi-account' },
                    { 'title': 'Sécurité', 'component': "CredentialInfo", 'icon': 'mdi-account-lock' },
                    // { 'title': 'Commandes', 'component': "OrderView", 'icon': 'mdi-clipboard-text' },
                    // { 'title': 'Addresses', 'component': "AdressesView", 'icon': 'mdi-home-account' },
                    // { 'title': 'Carte', 'component': "RestaurantCardEditor", 'icon': 'mdi-food' },
                    // { 'title': 'Stars (preview)', 'component': "Stars", 'icon': 'mdi-account-star' },
                    // { 'title': 'Linker (preview)', 'component': "", 'icon': 'mdi-account-heart' },
                ]
                break;


            case "5":
                this.userRole = 'Visitor';
                this.menus = [
                    // { 'title': 'Debug (preview)', 'component': "DebugView", 'icon': 'mdi-bug' },
                    // { 'title': 'Général', 'component': "GeneralInfoClient", 'icon': 'mdi-account' },
                    // { 'title': 'Sécurité', 'component': "CredentialInfo", 'icon': 'mdi-account-lock' },
                    // { 'title': 'Commandes', 'component': "OrderView", 'icon': 'mdi-clipboard-text' },
                    // { 'title': 'Addresses', 'component': "AdressesView", 'icon': 'mdi-home-account' },
                    // // { 'title': 'Carte', 'component': "RestaurantCardEditor", 'icon': 'mdi-food' },
                    // { 'title': 'Stars (preview)', 'component': "Stars", 'icon': 'mdi-account-star' },
                    // { 'title': 'Linker (preview)', 'component': "", 'icon': 'mdi-account-heart' },
                ]
                break;
        }
    },
    data: () => ({
        //userRole: 'Visitor',
        isDebug:true,
        tab: 'Général',
        width: 100,
        menus: [],
        //     { 'title': 'Debug (preview)', 'component': "DebugView", 'icon': 'mdi-bug' },
        //     { 'title': 'Général', 'component': "GeneralInfoClient", 'icon': 'mdi-account' },
        //     { 'title': 'Sécurité', 'component': "CredentialInfo", 'icon': 'mdi-account-lock' },
        //     { 'title': 'Commandes', 'component': "OrderView", 'icon': 'mdi-clipboard-text' },
        //     { 'title': 'Addresses', 'component': "AdressesView", 'icon': 'mdi-home-account' },
        //     { 'title': 'Carte', 'component': "RestaurantCardEditor", 'icon': 'mdi-food' },
        //     { 'title': 'Stars (preview)', 'component': "Stars", 'icon': 'mdi-account-star' },
        //     { 'title': 'Linker (preview)', 'component': "", 'icon': 'mdi-account-heart' },
        // ]
    }),
    setCurrentTab(value) {
        activTitle = value;
        console.log("hello world");
    },
}
</script>





<!-- STYLE -->
<style>
#account-title {
    vertical-align: middle;
    text-align: center;
    justify-content: center;
    display: flex;
    padding-top: 40px;
    padding-bottom: 40px;
}

#borderMainCard {
    background-color: rgb(255, 152, 0);
    height: 80%;
}


#backgroundMainCard {
    background-color: white;
    color: rgb(0, 0, 0);
    height: 100%;
}

#contentMainCard {
    /* height: 650px; */
    justify-content: center;
}

#tabMenu:hover {
    padding-left: 0px;
    background-color: transparent !important;
    /* color: transparent !important;
    color: rgb(249, 250, 250) !important; */
    color-scheme: transparent !important;
}

.tabItemDiv {
    color: black !important;
}

.tabItemDivActic {
    color: white !important;
    background-color: rgb(255, 152, 0) !important;
}


#tabWindow {
    width: 22cm !important;}

#tabRWindow {
    width: 90% !important;
}

#btnTab {
    color: rgb(255, 152, 0);
}
</style>