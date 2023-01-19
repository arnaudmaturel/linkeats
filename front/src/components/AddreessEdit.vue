<template>
    <v-container>
        <v-card id="form" rounded="5" elevation="0" class="mx-auto">
            <div id="header">
                <h5 id="title">
                    Adresse
                </h5>
                <div>
                    <v-btn rounded="pill" id="btn" elevation="6" @click="this.$emit('on-close')"
                        icon="mdi-close-thick" />
                </div>
            </div>
            <div id="middle"></div>
            <div id="img">
                <div id="infPart">
                    <v-form v-model="form" @submit.prevent="onSubmit">
                        <v-row>
                            <v-col class="ma-auto">
                                <h6>Nom</h6>
                                <v-text-field v-model="data.name" :readonly="loading" clearable
                                    placeholder="Entrez le nom de l'adresse" variant="outlined" color="rgb(255, 152, 0)"
                                    :rules="[required]" class="mb-2">
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-btn style="top:42px" id="btn" icon="mdi-map-marker" />
                            <v-col class="ma-auto">
                                <h6>Adresse</h6>
                                <v-text-field v-model="data.addr" :readonly="loading" clearable
                                    placeholder="Saisissez l'adresse souhaité" :rules="[required]" class="mb-2"
                                    variant="outlined" color="rgb(255, 152, 0)" @keydown.enter="getPosition()">
                                </v-text-field>
                            </v-col>
                            <v-btn style="top:42px" id="btn" icon="mdi-check-bold" @click="getPosition()"/>
                        </v-row>

                        <div style="height=400px;" id="maps">
                            <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true"
                                style="height:100%">

                                <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom"
                                    :projection="projection" />

                                <ol-tile-layer>
                                    <ol-source-osm />
                                </ol-tile-layer>

                                <ol-vector-layer>
                                    <ol-source-vector>
                                        <ol-feature>
                                            <ol-geom-point :coordinates="coordinate"/>
                                                <ol-style>
                                                    <ol-style-icon :src="hereIcon" :scale="0.5"></ol-style-icon>
                                                </ol-style>
                                        </ol-feature>
                                    </ol-source-vector>
                                </ol-vector-layer>

                            </ol-map>
                        </div>

                        <br/>

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

    </v-container>
</template>

<script>
import hereIcon from '@/assets/homeMarker.png'
import { ref } from 'vue'

export default {
    name: 'AddressEdit',
    setup() {
        const center = ref([1, 50])
        const projection = ref('EPSG:4326')
        const zoom = ref(8)
        const rotation = ref(0)

        const strokeColor = ref('rgb(228,228,228)')
        const fillColor = ref('white')
        const strokeWidth = ref(5)
      
        const view = ref(null)
        const map = ref(null)
        
        // const coordinate = ref([40, 40])

        return {
            center,
            projection,
            zoom,
            rotation,
            hereIcon,
            fillColor,
            strokeWidth,
            strokeColor,
            //coordinate,
            view,
            map,
        }
    },
    props:
    {
        data: {
            name: String,
            cp: String,
            addr: String,
            city: String,
            lat: Number,
            lon: Number,
        },
    },
    data() {
        return {
            coordinate : [1, 50],
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
        getPosition() {
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
                    this.data.city = result.features[0].properties.city;
                    this.data.city = result.features[0].properties.postcode;

                    this.coordinate = result.features[0].geometry.coordinates;
                    
                    // this.$refs.view.fit(result.features[0].bbox, { maxZoom: 14 })
                    this.$refs.view.fit([this.data.lon, this.data.lat, this.data.lon, this.data.lat], { maxZoom: 14 })
                    
                    console.log('data : ' + this.data);

                })
                .catch(error => console.log('error', error));
        }
    },
}
</script>

<style scoped>
#maps {
    width: 100%;
    height: 250px !important;
    padding: 10px;
}

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