<template>
    <v-sheet id="form" rounded="5" elevation="0">
        <v-row id="rowTitle">
            <v-col class="ma-auto" style="text-align:center">
                <div class="d-flex justify-space-between">
                    <v-icon icon="mdi-star" color="rgb(255, 152, 0)" size="x-large" />
                    <h4> Stars</h4>
                    <v-icon icon="mdi-star" color="rgb(255, 152, 0)" size="x-large" />
                </div>
            </v-col>
        </v-row>
        <div id="middle"></div>
        <div id="img">
            <div id="infPart">
                <v-row>
                    <v-col cols="5">
                        <h5>Wallet:</h5>
                        <div class="d-flex">
                            <v-text-field v-model="wallet" readonly variant="outlined" color="black" />
                            <v-btn icon="mdi-plus-thick" id="btn"  />
                        </div>
                    </v-col>
                    <v-col offset="1" cols="6" style="text-align: right;">
                        <v-btn id="btn" class="mt-4" icon="mdi-gift" size="x-large" @click="dialog = true"/>
                        <v-badge :content="unclaimedDiscount.length" class="mb-3" color="error" size="x-large"/>
                    </v-col>
                </v-row>
                <br />
                <br />
                <v-row>
                    <div class="d-flex">
                        <v-avatar id="btn" icon="mdi-star" />
                        <h5 style="margin-top: 8px; margin-left: 20px"> Niveau : {{ level }}</h5>
                    </div>
                </v-row>
                <br />
                <br />
                <v-row>
                    <b>
                        Progression : {{ (xpCurent / xpNextLvl * 100).toFixed(2) }}%
                    </b>
                    <v-progress-linear :model-value="xpCurent / xpNextLvl * 100" height="25" striped color="rgb(255, 152, 0)" />
                    {{ xpCurent }} / {{ xpNextLvl }}
                </v-row>

                <v-row>

                    <v-timeline direction="horizontal" side="start">

                        <!-- LVL 2 -->
                        <v-timeline-item v-for="item in breadCrumData" :key="item" size="large">
                            <template v-slot:icon>
                                <v-avatar id="btn" icon="mdi-gift" />
                            </template>
                            <template v-slot:opposite >
                                <v-card  id="form" rounded="5" class="p-2" elevation="0" style="text-align: center;">
                                    <b>Level {{ item.Level }} <br/> {{ item.Title }}</b>
                                    <br />
                                    <v-btn id="btn" rounded="pill">
                                        {{ (item.Gift/100) }} €
                                    </v-btn>
                                </v-card>

                            </template>
                        </v-timeline-item>

                    </v-timeline>



                </v-row>
                <br />
                <br />

            </div>
        </div>

        <!-- SNACKBAR -->
        <v-snackbar v-model="snackbar" :timeout="timeout" style="border=solid 3px rgb(228, 228, 228);">
            Information général saugardé correctement
            <template v-slot:actions>
                <v-btn color="rgb(255, 152, 0)" rounded="pill" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>

        <!-- DIALOG -->
        <v-dialog v-model="dialog">
                <DiscountViewerVue maxHeight="80vh" @on-close="dialog=false; this.refreshData();" @on-refresh="this.refreshData()" :unclaimedDiscount="unclaimedDiscount"/>
        </v-dialog>
    </v-sheet>
</template>

<script>
import { mapState, mapActions } from "vuex";
const timer = ms => new Promise(res => setTimeout(res, ms));
import DiscountViewerVue from './DiscountViewer.vue';
import DiscountState from "@/store/DiscountStatus";
import lvlDataJson from "@/store/lvlData.json"


export default {
    name: 'GeneralInfoClient',
        components: {
        DiscountViewerVue,
    },
    data: () => ({
        wallet: 15,
        level: 2,
        xpCurent: 500,
        xpNextLvl: 1500,
        loading: false,
        timeout: 3000,
        snackbar: false,
        dialog: false,
        unclaimedDiscount: [],
        lvlData: lvlDataJson,
        breadCrumData : []
    }),
    async created() {
        await this.refreshData();
    },
    methods: {
        async refreshData()
        {
            await this.$store.dispatch('getClient', localStorage.getItem('userId'));

            this.wallet = this.$store.state.client.client.ClientWallet/100;
            this.level = this.$store.state.client.client.ClientLevel;
            this.xpCurent = this.$store.state.client.client.ClientCurrentXP;
            this.xpNextLvl = this.$store.state.client.client.ClientNextLevelXP;


            if (this.$store.state.client.client.ClientNextLevelXP == 0)
            {
                const lvlD = this.getLevel(this.$store.state.client.client.ClientLevel);

                const info = {
                    ClientNextLevelXP: lvlD.MaxXP,
                    ClientCurrentXP: 0
                };

                this.$store.commit('UPDATE_CLIENT', info);

                console.log("nextLevelXP Updated :", this.$store.state.client.client.ClientNextLevelXP)
                await this.$store.dispatch("saveClient");
                await this.refreshData();
                return;
            }

            var unclaimedDiscountTemp = [];
            
            await this.$store.dispatch('getDiscountByClient', localStorage.getItem('userId'));
            
            this.$store.state.discount.discounts.forEach(d => {
                if (d.State == DiscountState.UnClaimed)
                unclaimedDiscountTemp.push(d);
            });
            this.unclaimedDiscount = unclaimedDiscountTemp;
            
            this.breadCrumData = [];
            for (var lvlOffset = 0; lvlOffset < 5; lvlOffset++)
            {
                var ld = this.getLevel(this.$store.state.client.client.ClientLevel + lvlOffset+1);
                if (ld == null)
                    break;

                this.breadCrumData.push(ld);
            }
        },
        getLevel(lvl)
        {
            for (var i = 0; i < this.lvlData.length; i++)
            {
                if (this.lvlData[i].Level == lvl)
                    return this.lvlData[i];
            };
            return null;
        }
    }
}
</script>

<style scoped>
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
    padding-bottom: 2%;
}

#form {
    border: solid 3px rgb(228, 228, 228);
    background-color: white;
}

#img {
    background-image: url('../assets/linkEats_transp10.png');
    background-size: contain;
    background-position: center;
}

#btnSave {
    top: 100%;
}
</style>
