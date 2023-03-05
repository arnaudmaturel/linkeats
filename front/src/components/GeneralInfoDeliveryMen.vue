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
                        <h6>Nom</h6>
                        <v-text-field v-model="lastName" :readonly="loading" clearable
                            placeholder="Entrez votre numero de siren" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                    
                    <v-col class="ma-auto">
                        <h6>Prénom</h6>
                        <v-text-field v-model="name" :readonly="loading" clearable
                            placeholder="Entrez votre numero de siren" variant="outlined" color="rgb(255, 152, 0)">
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

                <v-row>
                    <v-col cols="6">
                        <h6>Rayon d'Action (km)</h6>
                        <v-text-field v-model="range" :readonly="loading" clearable
                            placeholder="Entrez votre rayon de livraison" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>

                    
                </v-row>
                
                <v-row>                    
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
    name: 'GeneralInfoDeliveryMen',
    async created() {
        await this.refreshData();
    },
    data: () => ({
        name: null,
        lastName:null,
        iban: null,
        range: null,
        timeout: 3000,
        snackbar:false
    }),
    components: {
    },
    methods:
    {
        async refreshData()
        {
            await this.$store.dispatch('getdeliveryman', localStorage.getItem('userId'));
            //console.log("Deliverymen : ", this.$store.state.deliveryman.deliveryman);
            this.name = this.$store.state.deliveryman.deliveryman.DeliverymanFirstName;
            this.lastName = this.$store.state.deliveryman.deliveryman.DeliverymanLastName;
            this.iban = this.$store.state.deliveryman.deliveryman.DeliverymanIBAN;
            this.range = this.$store.state.deliveryman.deliveryman.DeliverymanActionRange;
        },
        async onSave()
        {
            const newDeliver = {
                DeliverymanLastName: this.lastName,
                DeliverymanFirstName: this.name,
               DeliverymanIBAN : this.iban,
               RestaurantDeliveryRange:this.range
            }
            await this.$store.dispatch('savedeliveryman', { id: localStorage.getItem('userId'), data: newDeliver });
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
