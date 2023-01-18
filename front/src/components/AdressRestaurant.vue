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
                            <v-btn style="top:42px" id="btn" icon="mdi-map-marker" @click="setCurrentLoc" />
                            <v-col class="ma-auto">
                                <h6>Adresse</h6>
                                <v-text-field v-model="data.addr" :readonly="loading" clearable placeholder="Saisissez l'adresse souhaité"
                                    :rules="[required]" class="mb-2" variant="outlined" color="rgb(255, 152, 0)" @keydown.enter="getPosition()">
                                </v-text-field>
                            </v-col>
                            <v-btn style="top:42px" id="btn" icon="mdi-check-bold" @click="getPosition()" />
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
                            <v-text-field v-model="cp" :readonly="true"
                                placeholder="Saisissez le code postal" class="mb-2"
                                variant="outlined" color="rgb(255, 152, 0)">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="ma-auto">
                            <h6>Ville</h6>
                            <v-text-field v-model="city" :readonly="true" 
                                placeholder="Saisissez la ville souhaité"  class="mb-2"
                                variant="outlined" color="rgb(255, 152, 0)">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="ma-auto">
                            <div style="justify-content=center; text-align: center;">
                                <v-btn id="btn" size="large" type="submit" @click="$emit('on-close')"
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
</template>

<script>
import hereIcon from '@/assets/shopMarker.png'
import { ref } from 'vue'

export default {
    
    name: 'AddressRestaurant',
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


        return {
            center,
            projection,
            zoom,
            rotation,
            hereIcon,
            fillColor,
            strokeWidth,
            strokeColor,
            view,
            map,
        }
    },
    props:
    {
        data: {
            cp: String,
            addr: String,
            city: String,
            lon: Number,
            lat:Number,
        },
    },
    data() {
        return {
            coordinate: [1, 50],
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

            this.data.cp = this.cp;
            this.data.city = this.city;
            this.data.addr = this.addr;
            this.data.lon = this.coordinate[0];
            this.data.lat = this.coordinate[1];

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

                    this.data.lat = result.features[0].properties.lat;
                    this.data.lon = result.features[0].properties.lon;
                    this.city = result.features[0].properties.city;
                    this.cp = result.features[0].properties.postcode;

                    this.coordinate = result.features[0].geometry.coordinates;

                    this.$refs.view.fit([this.data.lon, this.data.lat, this.data.lon, this.data.lat], { maxZoom: 14 })

                    console.log('data : ' + this.data.city);

                })
                .catch(error => console.log('error', error));
        },
        setCurrentLoc()
        {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                console.log('lat : ' + latitude + ' | lon : ' + longitude);
                this.coordinate = [longitude, latitude];
                this.$refs.view.fit([longitude,latitude, longitude, latitude], { maxZoom: 14 })
                this.addr = "";
                // Show a map centered at latitude / longitude.
            });
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

#maps {
    width: 100%;
    height: 250px !important;
    padding: 10px;
}
</style>