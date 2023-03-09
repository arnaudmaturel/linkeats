<template>
    <v-container>

        <v-card id="form" rounded="5" elevation="0" class="mx-auto">
            <v-card class="overflow-y-auto" max-height="70vh">
                <v-row id="rowTitle">
                    <v-col class="ma-auto">
                        <div id="title">
                            <h5>Inscription {{ titleUser }}</h5>
                        </div>
                    </v-col>
                </v-row>
                <div id="middle"></div>
                <div id="img">
                    <div id="infPart">
                        <v-form v-model="form" @submit.prevent="onSubmit">

                            <v-row>
                                <v-col cols="6">

                                    <h6>Login</h6>
                                    <v-text-field v-model="newClient.CredentialLogin" :readonly="loading" clearable
                                        placeholder="Entrez votre login" variant="outlined" color="rgb(255, 152, 0)"
                                        :rules="[required]" class="mb-2" type="login">
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>

                                    <h6>Prénom</h6>
                                    <v-text-field v-model="newClient.ClientFirstName" :readonly="loading" clearable
                                        placeholder="Saisissez votre prénom" :rules="[required]" class="mb-2"
                                        variant="outlined" color="rgb(255, 152, 0)" type="text">
                                    </v-text-field>
                                </v-col>
                                <v-col>

                                    <h6>Nom</h6>
                                    <v-text-field v-model="newClient.ClientLastName" :readonly="loading" clearable
                                        placeholder="Saisissez votre nom" :rules="[required]" class="mb-2"
                                        variant="outlined" color="rgb(255, 152, 0)" type="text">
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>

                                    <h6>E-Mail</h6>
                                    <v-text-field v-model="newClient.CredentialEmail" :readonly="loading" clearable
                                        placeholder="Saisissez votre e-mail" :rules="[required]" class="mb-2"
                                        variant="outlined" color="rgb(255, 152, 0)" type="email">
                                    </v-text-field>
                                </v-col>
                                <v-col>

                                    <h6>Téléphone</h6>
                                    <v-text-field v-model="newClient.CredentialPhone" :readonly="loading" clearable
                                        placeholder="Saisissez votre numéro de téléphone" :rules="[required]" class="mb-2"
                                        variant="outlined" color="rgb(255, 152, 0)" type="phone">
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>

                                    <h6>Mot de passe</h6>
                                    <v-text-field v-model="newClient.CredentialPassword" :readonly="loading" clearable
                                        placeholder="Saisissez votre mot de passe" :rules="[required]" class="mb-2"
                                        variant="outlined" color="rgb(255, 152, 0)" type="password">
                                    </v-text-field>
                                </v-col>
                                <v-col>

                                    <h6>Confirmation</h6>
                                    <v-text-field v-model="password2" :readonly="loading" clearable
                                        placeholder="confimer votre mot de passe" :rules="[required]" class="mb-2"
                                        variant="outlined" color="rgb(255, 152, 0)" type="password">
                                    </v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="10">
                                    <h6>(Optionel) Identifiant parain :</h6>
                                    <v-text-field v-model="parainLogin" :readonly="loading" clearable @keydown.enter="CheckParainClient()"
                                        placeholder="Entrez le login\e-mail\téléphone" variant="outlined" color="rgb(255, 152, 0)" @input="resetParain">
                                    </v-text-field>
                                    <v-row>
                                        <v-col class="ma-auto">
                                            Prénom : {{ parain.parainFirstName }}
                                        </v-col>
                                        
                                        <v-col class="ma-auto">
                                           Nom : {{ parain.parainLastName }}
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="2">
                                     <v-btn v-if="parain.parainID==null" id="btn" icon="mdi-head-sync" @click="CheckParainClient()" style="margin-top: 32px" rounded="pill"/>                               
                                     <v-btn v-else icon="mdi-check-bold" style="margin-top: 32px; color: white; background-color: rgb(255, 152, 0)" rounded="pill"/>
                                </v-col>                      
                            </v-row>

                            <br/>
                            <br/>

                            <div style="justify-content=center; text-align: center;">
                                <v-btn id="btn" size="large" type="submit" :disabled="!form" rounded="pill"
                                    :ripple="{ class: 'text-orange', center: true }">
                                    S'inscrire
                                </v-btn>
                            </div>
                        </v-form>
                    </div>

                    <div id="middle"></div>
                    <div id="signUpPart">
                        <div style="text-align=center;">
                            <router-link to="login">
                                <a @click="$emit('sign-in')">Connexion</a>
                            </router-link>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-card>
    </v-container>
</template>







<!--    SCRIPT -->
<script>
import bcrypt from "bcryptjs/dist/bcrypt";
import { mapGetters, mapMutations, useStore } from "vuex";
import DiscountState from "@/store/DiscountStatus";

export default {
    data: () => ({
        form: false,
        newClient: {
            CredentialEmail: null,
            CredentialPhone: null,
            CredentialLogin: null,
            CredentialPassword: null,
            ClientFirstName: null,
            ClientLastName: null,
        },
        parain: 
        {
            parainLastName: null,
            parainFirstName: null,
            parainID : null,
        },
        parainLogin:null,
        password2: null,
        loading: false,
        tagBorder: 'stdBorder'
    }),
    computed: mapGetters({

    }),
    methods: {
        async onSubmit() {
            if (!this.form) return

            //const hashedPwd = await bcrypt.hash(this.newClient.CredentialPassword, 10);
            const login =
            {
                username: this.newClient.CredentialLogin,
                // password: hashedPwd,
                password: this.newClient.CredentialPassword,
                userRole: this.userRole,
            };

            const userId = await this.$store.dispatch('createClient', this.newClient);
            if (userId) {
                await this.$store.dispatch('loginUser', login)
                console.log('user ' + userId + " connected");
                const newBasket = { IDClient: userId, dishesNumber: 0, totalPrice: 0, dishes: [] };

                // creation of the basket
                await this.$store.dispatch("createBasket", newBasket);

                // creation of the discount
                if (this.parain.parainID != null)
                {
                    const discount = 
                    {
                        Name: "Cadeau",
                        State: DiscountState.UnClaimed,
                        Description: `parainage avec ${this.newClient.ClientFirstName} ${this.newClient.ClientLastName}`,
                        Value: 1500,
                        IDClient: this.parain.parainID
                    }
                    await this.$store.dispatch("createDiscount", discount);
                }


                this.$router.push({ name: 'home' });
            }
            else {
                console.log("error registration");
                alert("error registration");
            }

        },
        required(v) {
            return !!v || 'Field is required'
        },
        async CheckParainClient()
        {
            // check
            const pLogin = 
            {
                CredentialLogin: this.parainLogin,
                CredentialEmail: this.parainLogin,
                CredentialPhone: this.parainLogin
            }

            const parain = await this.$store.dispatch("getClientByLogin", pLogin);
                        
            if (parain == null)
                this.resetParain();
            else {
                this.parain.parainFirstName = parain.ClientFirstName;
                this.parain.parainLastName = parain.ClientLastName;
                this.parain.parainID = parain.UserID;
            }
        },
        resetParain()
        {
            this.parain.parainFirstName = null;
            this.parain.parainLastName = null;
            this.parain.parainID = null;
        }
    },
    props: {
        titleUser: String,
        userRole: Number
    }
}
</script>



<!--      STYLE -->
<style scoped>
#btn {
    background-color: rgb(255, 152, 0);
    color: white;
}

a {
    color: rgb(255, 152, 0);
}

a:hover {
    color: rgb(205, 125, 0);
}

#rowTitle {

    padding: 20px;
    padding-bottom: 20px;
}

#middle {
    background-color: rgb(228, 228, 228);
    height: 3px;
    width: 100%;
}

#infPart,
#signUpPart {
    padding: 5%;
    padding-top: 2%;
}


#form {
    border: solid 3px rgb(228, 228, 228);
    background-color: white;
    font-family: MyFont;
    width: 22cm;
}

#img {
    background-image: url('../assets/linkEats_transp10.png');
    background-size: contain;
    background-position: center;
}

#title {
    text-align: center;
}

#signUpPart {
    justify-items: center;
    text-align: center;
}
</style>
