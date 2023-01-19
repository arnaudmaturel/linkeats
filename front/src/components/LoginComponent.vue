<template>
    <v-container>
        <v-card id="form" rounded="5" elevation="0" class="mx-auto">
            <v-row id="rowTitle">
                <v-col class="ma-auto">
                    <div id="title">
                        <h5>Connexion {{ titleUser }}</h5>
                    </div>
                </v-col>
            </v-row>
            <div id="middle"></div>
            <div id="img">
                <div id="infPart">

                    <v-form v-model="form" @submit.prevent="onSubmit">
                        
                        <v-row>
                            <v-col>
                                
                                <h6>nom d'utilisateur / E-Mail / Téléphone</h6>
                                <v-text-field v-model="login" :readonly="loading" clearable
                                placeholder="Entrez votre nom d'utilisateur" variant="outlined" color="rgb(255, 152, 0)"
                                :rules="[required]" class="mb-2" type="email">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            
                            <h6>Mot de passe</h6>
                            <v-text-field v-model="password" :readonly="loading" clearable
                            placeholder="Saisissez votre mot de passe" :rules="[required]" class="mb-2"
                            variant="outlined" color="rgb(255, 152, 0)" type="password">
                        </v-text-field>
                    </v-col>
                </v-row>
                
                <div style="justify-content=center; text-align: center;">
                    <v-btn id="btn" size="large" type="submit" :disabled="!form" rounded="pill"
                    :ripple="{ class: 'text-orange', center: true }">
                    Se Connecter
                </v-btn><br />
                <a id="restPwd" href="/client/reset-password">Password forget</a>
            </div>
            
        </v-form>


                </div>
                <div id="middle"></div>
                <div id="signUpPart">
                    <div style="text-align=center;">
                        <router-link to="login">
                            <a @click="$emit('sign-up')">Créer un compte</a>
                        </router-link>
                    </div>
                </div>
            </div>
        </v-card>

    </v-container>
</template>







<!--    SCRIPT -->
<script>
import bcrypt from 'bcryptjs';


export default {
    data: () => ({
        form: false,
        login: null,
        password: null,
        CredentialPassword: null,
        loading: false,
        tagBorder: 'stdBorder',
    }),

    methods: {
        async onSubmit() {
            if (!this.form) return
            
            const login =
            {
                username: this.login,
                password: this.password,
                userRole: this.userRole,
            };

            // console.log('login', login);
            await this.$store.dispatch('loginUser', login);

            if (this.$store.state.credential)
            {
                this.$router.push({ name:'account'})
            }
        },
        required(v) {
            return !!v || 'Field is required'
        }
    },
    props: {
        titleUser: String,
        userRole: Number,
    }
}
</script>



<!--      STYLE -->
<style scoped>
#btn {
    background-color: rgb(255, 152, 0);
    color: white;
}

#restPwd {
    color: rgb(0, 105, 146);
}

#restPwd:hover {
    color: rgb(0, 125, 175);
}

a:hover {
    color: rgb(205, 125, 0);
}

a {
    color: rgb(255, 152, 0);
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

#infPart ,#signUpPart {
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

#signUpPart
{
    justify-items: center;
    text-align: center;
}
</style>
