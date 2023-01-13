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
                        <v-text-field v-model="firstName" :readonly="loading" clearable
                            placeholder="Entrez votre login" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>

                    <v-col cols="5" offset="2">
                        <h6>Mail</h6>
                        <v-text-field v-model="lastName" :readonly="loading" clearable placeholder="Entrez votre nom"
                            variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="5">
                        <h6>Téléphone</h6>
                        <v-text-field v-model="firstName" :readonly="loading" clearable
                            placeholder="Entrez votre numéro de téléphone" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="5">
                        <h6>Mot de passe</h6>
                        <v-text-field v-model="lastName" :readonly="loading" clearable placeholder="Entrez votre nouveau mot de passe"
                            variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                    <v-col cols="5" offset="2">
                        <h6>Confirmez le mot de passe</h6>
                        <v-text-field v-model="lastName" :readonly="loading" clearable placeholder="confimer votre nouveau mot de passe"
                            variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col offset="9">
                        <v-btn id="btnSave" rounded="pill" :ripple="{ class: 'text-orange', center: true }">Sauvegarder</v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>

    </v-card>
</template>

<script>

export default {
    name: 'CredentialInfo',
    data: () => ({
        password: null,
        login: null,
        phone: null,
        mail: null,
        loading: false
    }),
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
