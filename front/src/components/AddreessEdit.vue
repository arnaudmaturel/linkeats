<template>
    <v-container>
        <v-card id="form" rounded="5" elevation="0" class="mx-auto">
        <div id="header">
            <h5 id="title">
                Adresse
            </h5>
            <div>
                <v-btn rounded="pill" id="btn" elevation="6" @click="this.$emit('on-close')" icon="mdi-close-thick" />
            </div>
        </div>
            <div id="middle"></div>
            <div id="img">
                <div id="infPart">
                    <v-form v-model="form" @submit.prevent="onSubmit">
                        <v-row>
                            <v-col class="ma-auto">
                                <h6>Nom</h6>
                                <v-text-field v-model="data.name" :readonly="loading" clearable placeholder="Entrez le nom de l'adresse"
                                variant="outlined" color="rgb(255, 152, 0)" :rules="[required]" class="mb-2">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="ma-auto">
                            <h6>Adresse</h6>
                            <v-text-field v-model="data.addr" :readonly="loading" clearable
                            placeholder="Saisissez l'adresse souhaité" :rules="[required]" class="mb-2"
                            variant="outlined" color="rgb(255, 152, 0)"  @keydown.enter="getPosition()">
                        </v-text-field>
                    </v-col>
                </v-row>

                    <v-row>
                        <v-col class="ma-auto" style="text-align:center">
                            <v-btn icon="mdi-map-search-outline" id="btn"/>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="ma-auto">Longitude : {{ data.lon }}</v-col>
                        <v-col class="ma-auto">Latitude : <v-text-field :value="data.lat" ></v-text-field></v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col class="ma-auto">
                            <h6>Code postal</h6>
                            <v-text-field v-model="data.cp" :readonly="true" placeholder="76140"
                            :rules="[required]" class="mb-2" variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col class="ma-auto">
                        <h6>Ville</h6>
                        <v-text-field v-model="data.city" :readonly="true" clearable
                        placeholder="Rouen" :rules="[required]" class="mb-2"
                        variant="outlined" color="rgb(255, 152, 0)" >
                    </v-text-field>
                </v-col>
                    </v-row>

                
                <v-row>
                    <v-col class="ma-auto">
                        <div style="justify-content=center; text-align: center;">
                            <v-btn id="btn" size="large" type="submit" @click="$emit('on-close')" :disabled="!form"
                            rounded="pill" :ripple="{ class: 'text-orange', center: true }">
                            Valider
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-form>
            
                </div>
            </div>
        </v-card>

    </v-container>
</template>

<script>
import olms from 'ol-mapbox-style';
import * as proj from 'ol/proj';
import reqHand from '@/store/fetch';

export default {
    name: 'AddressEdit',
    
    components: {

    },
    setup() {
    },
    props:
    {
        data: {
            name: String,
            cp: String,
            addr: String,
            city: String,
            lat : Number,
            lon : Number,
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
        getPosition()
        {
            const myAPIKey = '&apiKey=630a891a8cd74b06952edfa21ed2bb5b';
            const myReqValue = '?text='
            const myReqAPI = 'https://api.geoapify.com/v1/geocode/search?';

            var req = myReqAPI + myReqValue + this.data.addr.trim() + myAPIKey;
            fetch(myReqAPI + new URLSearchParams(
                {
                    'text': this.data.addr.trim(),
                    'apiKey': '630a891a8cd74b06952edfa21ed2bb5b'
                }),
                {
                    method: 'GET',
                    headers: {
                        'Accept': '*/*',
                    }
                }).then(response => response.json())
                .then(result => {
                    console.log(result);
                    
                    this.data.lat = result.features[0].properties.lat;
                    this.data.lon = result.features[0].properties.lon;
                    console.log(this.data);
                })
                .catch(error => console.log('error', error));
        }
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