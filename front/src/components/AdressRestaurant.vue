<template>
        <v-card id="form" rounded="5" elevation="0" class="mx-auto">
            <div id="header">
                <h5 id="title">
                    Adresse
                </h5>
            </div>
            <div id="middle"></div>
            <div id="img">
                <div id="infPart">
                    <v-form v-model="form" @submit.prevent="onSubmit">

                        <v-row>
                            <v-col class="ma-auto">
                                <h6>Code postal</h6>
                                <v-text-field v-model="data.cp" :readonly="loading" clearable
                                    placeholder="Saisissez le code postal" :rules="[required]" class="mb-2"
                                    variant="outlined" color="rgb(255, 152, 0)">
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="ma-auto">
                                <h6>Ville</h6>
                                <v-text-field v-model="data.city" :readonly="loading" clearable
                                    placeholder="Saisissez la ville souhaité" :rules="[required]" class="mb-2"
                                    variant="outlined" color="rgb(255, 152, 0)">
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="ma-auto">
                                <h6>Adresse</h6>
                                <v-text-field v-model="data.addr" :readonly="loading" clearable
                                    placeholder="Saisissez l'adresse souhaité" :rules="[required]" class="mb-2"
                                    variant="outlined" color="rgb(255, 152, 0)">
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="ma-auto">
                                <div style="justify-content=center; text-align: center;">
                                    <v-btn id="btn" size="large" type="submit" @click="$emit('on-close')"
                                        :disabled="!form" rounded="pill"
                                        :ripple="{ class: 'text-orange', center: true }">
                                        Valider
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-form>

                </div>
            </div>
        </v-card>
</template>

<script>
export default {
    name: 'AddressRestaurant',
    components: {

    },
    props:
    {
        data: {
            cp: String,
            addr: String,
            city: String
        },
    },
    data() {
        return {
            form: false,
            nameAddr: null,
            cp: null,
            city: null,
            addr: null,
            loading: false,
        }
    },
    methods: {
        onSubmit() {
            if (!this.form) return

            this.loading = true

            this.$emit('on-validated');

        },
        required(v) {
            return !!v || 'Field is required'
        },
    },
}
</script>

<style scoped>
#btn {
    background-color: rgb(255, 152, 0);
    color: white;
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
</style>