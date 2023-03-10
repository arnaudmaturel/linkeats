<template>
    <v-card id="form" rounded="5" elevation="0">
        <div id="header">
            <h5 id="title">
                Liste des Plats et boissons
            </h5>
            <div>
                <v-btn rounded="pill" id="btn" elevation="6" :disabled="currentTab !='Plat'" icon="mdi-plus-thick" @click="onAddDish()"/>
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
                                        <v-col class="ma-auto" cols="8">
                                            {{ dish.name }}
                                        </v-col>

                                        <v-col class="ma-auto">
                                            {{ (dish.price / 100).toFixed(2) }}€
                                        </v-col>

                                        <v-col class="ma-auto" style="text-align:right">
                                            <v-btn icon="mdi-pencil" style="background-color:rgb(252, 152, 0); color:white" @click="onEditDish(dish)" />
                                        </v-col>
                                        <v-col class="ma-auto" style="text-align:right">
                                            <v-btn icon="mdi-close-thick" style="background-color:rgb(252, 152, 0); color:white" @click="onDeleteDish(dish)" />
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-title>

                                <v-expansion-panel-text>
                                    <v-row>
                                        <v-col class="ma-auto" cols="9">
                                            Description : {{ dish.Description }}
                                        </v-col>

                                        <v-col class="ma-auto">
                                            Masse : {{ dish.Wheight }}g
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        Tags:
                                        <v-chip class="ma-2" v-for="tag in dish.Tags.split(';')" :key="tag" id="btn">{{tag}}</v-chip>
                                    </v-row>
                                    <v-row>
                                        Allergènes:
                                        <v-chip class="ma-2" v-for="tag in dish.Allergens.split(';')" :key="tag" id="btn">{{tag}}</v-chip>
                                    </v-row>
                                </v-expansion-panel-text>

                            </v-expansion-panel>
                </v-expansion-panels>

                <v-expansion-panels v-else-if="false" style="width:100%">
                            <v-expansion-panel v-for="menu in menus" :key="menu" style="width:100%">
                                <!-- MENUS -->
                                <v-expansion-panel-title style="width:100%">
                                    <v-row>
                                        <v-col>
                                            {{ menu.name }}
                                        </v-col>

                                        <v-col offset="3">
                                            {{ (menu.price / 100).toFixed(2) }}€
                                        </v-col>

                                        <v-col offset="4">
                                            <v-icon icon="mdi-close-octagon" />
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-title>

                                <v-expansion-panel-text>
                                    <v-row>
                                        <v-row class="ma-auto">
                                            Description : {{ menu.Description }}
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

                <div v-else>Comming soon</div>

            </v-card>
        </div>






        <!-- DIALOG -->
        <v-dialog v-model="dialogD" class="ma-auto" width="50vw">
            <DishEditor maxHeight="80vh" :dish="dishEdit"
             @on-close="dialogD=false" :isEditing="this.isEdditing" @on-save="dialogD = false, refreshData()"/>
        </v-dialog>

        <v-dialog v-model="popUp">
                <PopUpConfirm :message="popUpMessage" @on-validated="onValidatePopUp()" @on-cancel="onClosePopUp()" />
        </v-dialog>

    </v-card>
</template>

<script>
import DishEditor from './DishEditor.vue';
import PopUpConfirm from '@/components/PopUpConfirm.vue';

const DEFAULT_DISH = { name: '', price: '0', PicturePaths: '', Description: '', Tags: '', Allergens: '', Wheight: 500 };

export default {
    components:
    {
        DishEditor,
        PopUpConfirm
    },
    async created()
    {
        await this.refreshData();
    },
    props: {
    },
    data: () => ({
        isEdditing : false,
        currentTab: "Plat",
        tabs: [
            'Plat',
            'Menu'
        ],
        dishEdit: { name: '', price: '0', PicturePaths: '', Description: '', Tags: '', Allergens: '', Wheight: 500 },
        dialogD: false,
        dialogM: false,
        dishes: [
            // { name: 'Plat', price: 1550, PicturePaths: '', Description: 'delicious dish', Tags: 'tag1;tag2;tag3', Allergens: 'allergen1;allergen2', Wheight: 500 },
        ],
        menus: [
            { name: 'Menu 1', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
            { name: 'Menu 2', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
            { name: 'Menu 3', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
            { name: 'Menu 4', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
            { name: 'Menu 5', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
            { name: 'Menu 6', description:'description du menu', price : 2000, items:[ 'item1', 'item2', 'item3']},
        ],
        modeTypePop: { suppr: 0 },
        modePop: 0,
        popUpMessage: "",
        popUp: false,
        popUpData: null, 
    }),
    methods: {
        async onValidatePopUp() {
            switch (this.modePop) {
                case this.modeTypePop.suppr:
                    await this.$store.dispatch('deleteDish', this.popUpData);
                    await this.refreshData();
                    break;
            }
            this.popUp = false;
        },
        onClosePopUp() {
            this.popUp = false;
        },
        async onDeleteDish(dish) {
            this.popUpData = dish;
            this.popUpMessage = "etes vous sûre de vouloir supprimer " + dish.name + " à " + (dish.price / 100).toFixed(2) + "€ ?";
            this.modePop = this.modeTypePop.suppr;
            this.popUp = true;
            // await this.$store.dispatch('deleteDish', dish);
            // await this.refreshData();
        },
        onEditDish(dish)
        {
            this.isEdditing = true;
            this.dishEdit = dish;
            this.dishEdit.price = (dish.price).toFixed(2);
            this.dialogD = true;
        },
        async refreshData()
        {
            await this.$store.dispatch('getAllDishes', localStorage.getItem('userId'));
            this.dishes = this.$store.state.dishes.dishes;
        },
        onAddDish()
        {
            this.isEdditing = false;
            this.dialogD = true;
            Object.assign(this.dishEdit, DEFAULT_DISH);
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