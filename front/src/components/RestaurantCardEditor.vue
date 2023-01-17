<template>
    <v-card id="form" rounded="5" elevation="0">
        <div id="header">
            <h5 id="title">
                Liste des adresses
            </h5>
            <div>
                <v-btn rounded="pill" id="btn" elevation="6" icon="mdi-plus-thick" />
            </div>
        </div>
        <div id="middle"></div>
        <v-tabs id="tabMenu" centered grow v-model="currentTab" color="rgb(255, 152, 0)">
            <v-tab :id="(tab == currentTab) ? 'orderStateSelected' : 'orderState'" v-for="tab in tabs" :key="tab"
                :value="tab" ripple="false">
                {{ tab }}
            </v-tab>
        </v-tabs>

        <div id="img">
            <v-card id="infPart" max-height="450px" class="overflow-y-auto">
                <v-expansion-panels v-if="currentTab =='Plat'" style="width:100%">
                            <v-expansion-panel v-for="dish in dishes" :key="dish" style="width:100%">

                                <!-- DISHES -->
                                <v-expansion-panel-title style="width:100%">
                                    <v-row>
                                        <v-col>
                                            {{ dish.name }}
                                        </v-col>

                                        <v-col offset="3">
                                            {{ dish.price / 100 }}€
                                        </v-col>

                                        <v-col offset="4">
                                            <v-icon icon="mdi-close-octagon" @click="onDeleteDish(dish)" />
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-title>

                                <v-expansion-panel-text>
                                    <v-row>
                                        <v-col class="ma-auto" cols="9">
                                            Description : {{ dish.description }}
                                        </v-col>

                                        <v-col class="ma-auto">
                                            Masse : {{ dish.mass }}
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-text>

                            </v-expansion-panel>
                </v-expansion-panels>

                <v-expansion-panels v-else style="width:100%">
                            <v-expansion-panel v-for="menu in menus" :key="menu" style="width:100%">
                                <!-- DISHES -->
                                <v-expansion-panel-title style="width:100%">
                                    <v-row>
                                        <v-col>
                                            {{ menu.name }}
                                        </v-col>

                                        <v-col offset="3">
                                            {{ menu.price / 100 }}€
                                        </v-col>

                                        <v-col offset="4">
                                            <v-icon icon="mdi-close-octagon" />
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-title>

                                <v-expansion-panel-text>
                                    <v-row>
                                        <v-row class="ma-auto">
                                            Description : {{ menu.description }}
                                        </v-row>

                                        <v-row class="ma-auto">
                                            Contiens :
                                            <div v-for="item in menu.items" :key="item">
                                                {{ item }},
                                            </div>
                                        </v-row>
                                    </v-row>
                                </v-expansion-panel-text>

                            </v-expansion-panel>
                </v-expansion-panels>

            </v-card>
        </div>




        <!-- DIALOG -->
        <v-dialog v-model="dialog">
            <view-client-loc-order @on-close="dialog = false" />
        </v-dialog>
    </v-card>
</template>

<script>
import menus from '@/api/menus';


export default {
    props: {
    },
    data: () => ({
        currentTab: "Plat",
        tabs: [
            'Plat',
            'Menu'
        ],
        dialogD: false,
        dialogM: false,
        dishes: [
            { name: 'Burger', description: 'pain viande pain', price: 1550, mass: 500 },
            { name: 'Burger2', description: 'pain viande pain', price: 1550, mass: 500 },
            { name: 'Burger3', description: 'pain viande pain', price: 1550, mass: 500 },
            { name: 'Burger4', description: 'pain viande pain', price: 1550, mass: 500 },
            { name: 'Burger5', description: 'pain viande pain', price: 1550, mass: 500 },
        ],
        menus: [
            { name: 'Menu 1', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
            { name: 'Menu 2', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
            { name: 'Menu 3', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
            { name: 'Menu 4', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
            { name: 'Menu 5', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
            { name: 'Menu 6', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
        ]
        
    }),
    methods: {
        onAddDish() {

        },
        onDeleteDish(dish) {

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
    width: 100%;
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