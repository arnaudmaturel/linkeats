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

                <!-- <v-row id="banner">
                    <v-col class="ma-auto">
                        <v-card class="mx-auto">
                            <div  class="container">
                                    <v-img height="100%" color="rgb(250,250,250)" cover src="mdi-shop">
                                        <v-avatar size="160" rounded="pill" color="rgb(228,228,228)">
                                                <v-avatar size="150" rounded="pill" color="white" @click="openAvatar">
                                                    <v-img cover src="@/assets/shop.png" />
                                                </v-avatar>
                                        </v-avatar>
                                    </v-img>  
                            </div>
                        </v-card>
                    </v-col>
                </v-row> -->



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
                        <v-text-field v-model="lastName" :readonly="loading" clearable
                            placeholder="Entrez votre numero d'IBAN" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="ma-auto">
                        <h6>Heure d'ouverture</h6>
                        <Datepicker v-model="openAt" time-picker="true" />
                    </v-col>
                    <v-col class="ma-auto">
                        <h6>Heure de fermeture</h6>
                        <Datepicker v-model="cloaseAt" time-picker="true" />
                    </v-col>

                </v-row>



                <v-row>
                    <v-col class="ma-auto">
                        <h6>Rayon de livraison</h6>
                        <v-text-field v-model="lastName" :readonly="loading" clearable
                            placeholder="Entrez votre rayon de livraison" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>

                    <v-col class="ma-auto" style="text-align:right">
                        <v-btn id="btnSave" rounded="pill"
                            :ripple="{ class: 'text-orange', center: true }">Sauvegarder</v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>

    </v-card>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    name: 'GeneralInfoRestaurant',
    data: () => ({
        name: null,
        siren: null,
        siret: null,
        iban: null,
        openAt: null,
        cloaseAt: null,
    }),
    components: {
        Datepicker
    },
    methods:
    {
        openAvatar()
        {
            var src = this.$el.querySelector('#uploadmyfile');
            console.log(src);
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
