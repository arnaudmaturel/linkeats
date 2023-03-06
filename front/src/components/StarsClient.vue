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
                            <v-btn icon="mdi-plus-thick" id="btn" />
                        </div>
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
                        <v-timeline-item size="large">
                            <template v-slot:icon>
                                <v-avatar id="btn" icon="mdi-gift" />
                            </template>
                            <template v-slot:opposite >
                                <v-sheet  id="form" rounded="5" elevation="0" style="text-align: center;;">
                                    <b>Level 2 : Initié</b>
                                    <br />
                                    <v-btn id="btn" rounded="pill">
                                        +5€
                                    </v-btn>

                                </v-sheet>

                            </template>
                        </v-timeline-item>

                        <!-- LVL 3 -->
                                                <v-timeline-item size="large">
                                <template v-slot:icon>
                                    <v-avatar id="btn" icon="mdi-gift" />
                                </template>
                                <template v-slot:opposite >
                                    <v-sheet id="form" rounded="5" elevation="0" style="text-align: center;">
                                        <b>Level 2 : Debutant</b>
                                        <br />
                                        <v-btn id="btn" rounded="pill">
                                            +5€
                                        </v-btn>

                                    </v-sheet>

                                </template>
                            </v-timeline-item>
                        <!-- LVL 4 -->
                                                <v-timeline-item size="large">
                                <template v-slot:icon>
                                    <v-avatar id="btn" icon="mdi-gift" />
                                </template>
                                <template v-slot:opposite >
                                    <v-sheet id="form" rounded="5" elevation="0" style="text-align: center;">
                                        <b>Level 2 : connaisseur</b>
                                        <br />
                                        <v-btn id="btn" rounded="pill">
                                            +10€
                                        </v-btn>

                                    </v-sheet>

                                </template>
                            </v-timeline-item>
                        <!-- LVL 5 -->
                        <v-timeline-item size="large">

                            <template v-slot:icon>
                                <v-avatar id="btn" icon="mdi-gift" />
                            </template>
                                <template v-slot:opposite >
                                    <v-sheet id="form" rounded="5" elevation="0" style="text-align: center;">
                                        <b>Level 2 : Habitué</b>
                                        <br />
                                        <v-btn id="btn" rounded="pill">
                                            +10€
                                        </v-btn>
                                        
                                    </v-sheet>
                                    
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
        wallet: 15,
        level: 2,
        xpCurent: 500,
        xpNextLvl: 1500,
        loading: false,
        timeout: 3000,
        snackbar: false
    }),
    async created() {
        await this.$store.dispatch('getClient', localStorage.getItem('userId'));
        //await timer(1000);
        this.firstName = this.$store.state.client.client.ClientFirstName;
        this.lastName = this.$store.state.client.client.ClientLastName;
        console.log('client xp :', this.$store.state.client);
    },
    methods: {
        async onSubmit() {
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


/* 

                            </v-timeline-item>
                        <!-- LVL 6 -->
                                                <v-timeline-item size="large">
                                <template v-slot:icon>
                                    <v-avatar id="btn" icon="mdi-gift" />
                                </template>
                                <template v-slot:opposite >
                                    <v-sheet id="form" rounded="5" elevation="0" style="text-align: center;">
                                        <b>Level 2 : Professionel</b>
                                        <br />
                                        <v-btn id="btn" rounded="pill">
                                            +5€
                                        </v-btn>

                                    </v-sheet>

                                </template>
                            </v-timeline-item>
                        <!-- LVL 7 -->
                                                <v-timeline-item size="large">
                                <template v-slot:icon>
                                    <v-avatar id="btn" icon="mdi-gift" />
                                </template>
                                <template v-slot:opposite >
                                    <v-sheet id="form" rounded="5" elevation="0" style="text-align: center;">
                                        <b>Level 2 : Veteran</b>
                                        <br />
                                        <v-btn id="btn" rounded="pill">
                                            +5€
                                        </v-btn>

                                    </v-sheet>

                                </template>
                            </v-timeline-item>
                        <!-- LVL 9 -->
                                                <v-timeline-item size="large">
                                <template v-slot:icon>
                                    <v-avatar id="btn" icon="mdi-gift" />
                                </template>
                                <template v-slot:opposite >
                                    <v-sheet id="form" rounded="5" elevation="0" style="text-align: center;">
                                        <b>Level 2 : Maitre</b>
                                        <br />
                                        <v-btn id="btn" rounded="pill">
                                            +5€
                                        </v-btn>

                                    </v-sheet>

                                </template>
                            </v-timeline-item>
                        
                        <!-- LVL 10 -->
                        <v-timeline-item size="large">
                            <template v-slot:icon>
                                <v-avatar id="btn" icon="mdi-gift" />
                            </template>
                            <template v-slot:opposite >
                                <v-sheet id="form" rounded="5" elevation="0" style="text-align: center;">
                                    <b>Level 10 : Grand Maitre Link Eater</b>
                                    <br />
                                    <v-btn id="btn" rounded="pill">
                                        +5€
                                    </v-btn>

                                </v-sheet>

                            </template>
                        </v-timeline-item>

*/
</style>
