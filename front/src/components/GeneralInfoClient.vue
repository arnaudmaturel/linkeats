<template>
    <v-sheet id="form" rounded="5" elevation="0">
        <v-row id="rowTitle">
            <v-col class="ma-auto" style="text-align:center">
                <h5> Informations Générales</h5>
            </v-col>
        </v-row>
        <div id="middle"></div>
            <div id="img">
        <div id="infPart">
            <v-row>
                <v-col cols="5" >
                    <h6>Prénom</h6>
                    <v-text-field v-model="firstName" :readonly="loading" clearable placeholder="Entrez votre prénom"
                    variant="outlined" color="rgb(255, 152, 0)">
                </v-text-field>
            </v-col>
            
            <v-col cols="5" offset="2">
                <h6>Nom</h6>
                <v-text-field v-model="lastName" :readonly="loading" clearable placeholder="Entrez votre nom"
                variant="outlined" color="rgb(255, 152, 0)">
            </v-text-field>
        </v-col>

        <v-row>
            <v-col offset="9">
                <v-btn id="btnSave" rounded="pill" :ripple="{ class: 'text-orange', center:true }" @click="onSubmit()">Sauvegarder</v-btn>
            </v-col>
        </v-row>
    </v-row>
</div>
</div>

                    <!-- SNACKBAR -->
                <v-snackbar v-model="snackbar" :timeout="timeout" style="border=solid 3px rgb(228, 228, 228);">
                        Informations générales saugardées correctement
                    <template v-slot:actions>
                        <v-btn color="rgb(255, 152, 0)" rounded="pill" @click="snackbar = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>

    </v-sheet>
</template>

<script>
import { mapState, mapActions } from "vuex";
const timer = ms => new Promise(res => setTimeout(res, ms));

export default {
    computed: {
        // ...mapState({
        //     firstName: (state) => state.client.client.ClientFirstName,
        //     lastName: (state) => state.client.client.ClientLastName
        // })
    },
    name: 'GeneralInfoClient',
    data: () => ({
         firstName: null,
         lastName: null,
        loading: false,
        timeout: 3000,
        snackbar: false
    }),
    async created()
    {
        await this.$store.dispatch('getClient', localStorage.getItem('userId'));
        //await timer(1000);
        this.firstName = this.$store.state.client.client.ClientFirstName;
        this.lastName = this.$store.state.client.client.ClientLastName;
        console.log('client xp :',this.$store.state.client);
    },
    methods: {       
    async onSubmit()
    {
        console.log('onSubmit');

        const newGeneralClientInfo = {
            ClientFirstName: this.firstName,
            ClientLastName: this.lastName,
        };

        this.$store.commit('UPDATE_CLIENT', newGeneralClientInfo)

        console.log('client firstname :', this.$store.state.client.client.ClientFirstName);


        // "ClientLastName": "e",
        // "ClientFirstName": "e",
            await this.$store.dispatch('saveClient');
            this.snackbar = true;
        }
    }
}
</script>

<style scoped>
#rowTitle{

    padding: 20px;
    padding-bottom: 20px;
}

#middle{
    background-color: rgb(228, 228, 228);
    height: 3px;
    width: 100%;
}

#infPart
{
    padding: 5%;
    padding-top: 2%;
    padding-bottom: 13%;
}

#form{
    border: solid 3px rgb(228, 228, 228);
    background-color: white;
}

#img {
    background-image: url('../assets/linkEats_transp10.png');
    background-size: contain;
    background-position: center;
}

#btnSave
{
    top: 100%;
}
</style>
