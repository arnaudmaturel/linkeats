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
                    <v-form v-model="form">
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
                                <v-text-field v-model="data.address" :readonly="loading" clearable
                                    placeholder="Saisissez l'adresse souhaité" :rules="[required]" class="mb-2"
                                    variant="outlined" color="rgb(255, 152, 0)" @keydown.enter="getPosition(); cancelExpand($event)">
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
                                            <ol-geom-point :coordinates="[this.data.longitude,this.data.latitude]"/>
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
                                <div style="justify-content=center; text-align: center;">
                                    <v-btn id="btn" size="large" @click="onSubmit()"
                                        :disabled="this.data.latitude == null || this.data.longitude == null" rounded="pill"
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
            address: String,
            latitude:Number,
            longitude: Number,
            IDUser: Number,
            UserRole: 1,
        },
    },
    mounted()
    {
        if (!this.data.latitude && !this.data.longitude)
        {
            this.data.latitude = 50;
            this.data.longitude = 1;
        }

        this.$refs.view.fit([this.data.longitude, this.data.latitude, this.data.longitude, this.data.latitude], { maxZoom: 14 });
    },
    data() {
        return {
            // coordinate : [1, 50],
            // // form: false,
            // nameAddr: null,
            // cp: null,
            // city: null,
            // addr: null,
            // loading: false,
        }
    },
    methods: {
        onSubmit() {
            this.$emit('on-validated');
        },
        required(v) {
            return !!v || 'Field is required'
        },
        getPosition() {
            const myAPIKey = '&apiKey=630a891a8cd74b06952edfa21ed2bb5b';
            const myReqValue = '?text='
            const myReqAPI = 'https://api.geoapify.com/v1/geocode/search?';


            //var req = myReqAPI + myReqValue + this.data.address.trim() + myAPIKey;
            fetch(myReqAPI + new URLSearchParams(
                {
                    'text': this.data.address.trim(),
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
                    this.data.latitude = result.features[0].properties.lat;
                    this.data.longitude = result.features[0].properties.lon;
                    // this.data.city = result.features[0].properties.city;
                    // this.data.city = result.features[0].properties.postcode;

                    //this.coordinate = result.features[0].geometry.coordinates;

                    // this.$refs.view.fit(result.features[0].bbox, { maxZoom: 14 })
                    this.$refs.view.fit([this.data.longitude, this.data.latitude, this.data.longitude, this.data.latitude], { maxZoom: 14 })

                    console.log('GeoDecode retrun :', this.data);
                    this.form = true;

                })
                .catch(error => {
                    console.log('GeoDecode error :', error);
                    this.form = false;
                });
                    
        },
        cancelExpand(e) {
            e.cancelBubble = true;
        },
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