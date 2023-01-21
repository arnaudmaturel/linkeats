<template>
    <v-card id="form" rounded="5" elevation="0">
        <v-row id="rowTitle">
            <v-col offset="5" cols="2">
                <div id="title">
                    <h5>Sécurité</h5>
                </div>
            </v-col>
        </v-row>
        <div id="middle"></div>
        <div id="img">
            <div id="infPart">
                <v-row>
                    <v-col cols="5">
                        <h6>Login</h6>
                        <v-text-field v-model="login" :readonly="loading" clearable
                            placeholder="Entrez votre login" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="5">
                        <h6>Téléphone</h6>
                        <v-text-field v-model="phone" :readonly="loading" clearable
                            placeholder="Entrez votre numéro de téléphone" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>

                   <v-col cols="5" offset="2">
                       <h6>Mail</h6>
                       <v-text-field v-model="mail" type="email" :readonly="loading" clearable placeholder="Entrez votre nom" variant="outlined"
                           color="rgb(255, 152, 0)">
                       </v-text-field>
                   </v-col>
                </v-row>

                <v-row>
                    <v-col cols="ma-auto">
                        <v-checkbox v-model="this.isChangingPwd" color="rgb(252,152,0)" label="Modifier le mot de passe"></v-checkbox>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="5">
                        <h6>Mot de passe</h6>
                        <v-text-field v-model="password" :disabled="!this.isChangingPwd" :readonly="loading" clearable placeholder="Entrez votre nouveau mot de passe"
                            variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                    <v-col cols="5" offset="2">
                        <h6>Confirmez le mot de passe</h6>
                        <v-text-field v-model="password2" :disabled="!this.isChangingPwd" :readonly="loading" clearable placeholder="confimer votre nouveau mot de passe"
                            variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col offset="9">
                        <v-btn id="btnSave" rounded="pill" :ripple="{ class: 'text-orange', center: true }" @click="onSubmit">Sauvegarder</v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>

    </v-card>
</template>

<script>
import { thisExpression } from '@babel/types';
import { mapGetters } from 'vuex';

export default {
    name: 'CredentialInfo',
    async created() {
        await this.$store.dispatch('getCredential', localStorage.getItem('credentialId'));
        console.log("CredentialInfo : ", this.$store.state.user.credential);  
        this.login = this.$store.state.user.credential.CredentialLogin;
        this.phone = this.$store.state.user.credential.CredentialEmail;
        this.mail = this.$store.state.user.credential.CredentialPhone;
    },
    data: () => ({
        password: null,
        password2: null,
        login: null,
        phone: null,
        mail: null,
        loading: false,
        isChangingPwd : false,
    }),
    methods: {
        async onSubmit()
        {
            if (this.isChangingPwd)
            {
                const newCred = {
                    CredentialLogin: this.login,
                    CredentialEmail: this.mail,
                    CredentialPhone: this.phone,            
                }
                this.$store.dispatch('puCredential', newCred);
            }
            else
            {
                if (this.password != this.password2)
                {
                    // password not the same
                }
                else
                {
                    const newCred = {
                        CredentialLogin: this.login,
                        CredentialEmail: this.mail,
                        CredentialPhone: this.phone,
                        CredentialPassword: this.password,
                    }
                    this.$store.dispatch('puCredential', newCred);
                }
            }
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
}


#form {
    border: solid 3px rgb(228, 228, 228);
    background-color: white;
    font-family: MyFont;
}

#img
{
        background-image: url('../assets/linkEats_transp10.png');
        background-size: contain;
        background-position: center;
        /* opacity: 0.2; */
}

#title
{
    text-align: center;
}
</style>
