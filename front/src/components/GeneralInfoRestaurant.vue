<template>
    <v-card id="form" rounded="5" elevation="0" class="overflow-y-auto">
        <v-row id="rowTitle">
            <v-col class="ma-auto" style="text-align:center">
                <h5> Information Général</h5>
            </v-col>
        </v-row>
        <div id="middle"></div>
        <div id="img">
            <div id="infPart">



                <v-row>
                    <v-col class="ma-auto">
                        <h6>Nom de l'établissement</h6>
                        <v-text-field v-model="name" :readonly="loading" clearable
                            placeholder="Entrez le nom de votre établissement" variant="outlined"
                            color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="ma-auto">
                        <h6>SIREN</h6>
                        <v-text-field v-model="siren" :readonly="loading" clearable
                            placeholder="Entrez votre numero de siren" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="ma-auto">
                        <h6>SIRET</h6>
                        <v-text-field v-model="siret" :readonly="loading" clearable
                            placeholder="Entrez votre numero de siret" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="ma-auto">
                        <h6>IBAN</h6>
                        <v-text-field v-model="iban" :readonly="loading" clearable
                            placeholder="Entrez votre numero d'IBAN" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>

                <!-- <v-row>
                    <v-col class="ma-auto">
                        <h6>Heure d'ouverture</h6>
                        <Datepicker v-model="openAt" time-picker="true" />
                    </v-col>
                    <v-col class="ma-auto">
                        <h6>Heure de fermeture</h6>
                        <Datepicker v-model="cloaseAt" time-picker="true" />
                    </v-col>

                </v-row> -->



                <v-row>
                    <v-col class="ma-auto">
                        <h6>Rayon de livraison (km)</h6>
                        <v-text-field v-model="range" :readonly="loading" clearable
                            placeholder="Entrez votre rayon de livraison" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>

                    <v-col class="ma-auto" style="text-align:right">
                        <v-btn id="btnSave" rounded="pill"
                            :ripple="{ class: 'text-orange', center: true }" @click="onSave">Sauvegarder</v-btn>
                    </v-col>
                </v-row>
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
    </v-card>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    name: 'GeneralInfoRestaurant',
    async created() {
        await this.$store.dispatch('getRestaurant', localStorage.getItem('userId'));
        console.log("Resto : ", this.$store.state.storeRestaurants.restaurant);
        this.name = this.$store.state.storeRestaurants.restaurant.RestaurantName;
        this.iban = this.$store.state.storeRestaurants.restaurant.RestaurantIBAN;
        this.siren = this.$store.state.storeRestaurants.restaurant.RestaurantSiren;
        this.siret = this.$store.state.storeRestaurants.restaurant.RestaurantSiret;
        this.range = this.$store.state.storeRestaurants.restaurant.RestaurantDeliveryRange;
    },
    data: () => ({
        name: null,
        siren: null,
        siret: null,
        iban: null,
        range:null,
        openAt: null,
        cloaseAt: null,
        timeout: 3000,
        snackbar: false
    }),
    components: {
        Datepicker
    },
    methods:
    {
        async onSave()
        {
            const newResto = {
               RestaurantName: this.name ,
               RestaurantIBAN: this.iban ,
               RestaurantSiren: this.siren,
               RestaurantSiret:this.siret,
               RestaurantDeliveryRange:this.range
            }
            await this.$store.dispatch('saveRestaurant', { id: localStorage.getItem('userId'), data: newResto });
            this.snackbar = true;
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
    padding-bottom: 13%;
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
