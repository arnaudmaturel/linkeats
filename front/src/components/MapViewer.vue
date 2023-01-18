<template>
    <v-container>
        <v-card id="formView" rounded="5" elevation="0" class="mx-auto">
                    <div id="header">
                        <h5 id="title">
                            Livraison en cours
                        </h5>
                        <div>
                            <v-btn rounded="pill" id="btn" elevation="6" @click="$emit('on-close')" icon="mdi-close-thick" />
                        </div>
                    </div>
            <div id="middle"></div>
            <progress-a-l-e v-if="showProgressBar" :valueP="progress"/>
            
            <div id="middle"></div>
            <div id="maps">
                    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="width:100%;height:100%" ref="map">
                    
                        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />
                    
                        <ol-tile-layer>
                            <ol-source-osm />
                        </ol-tile-layer>
                    
                        <ol-geolocation :projection="projection" @positionChanged="geoLocChange">
                            <template v-slot="slotProps" ref="geoLoc"> 
                                <ol-vector-layer :zIndex="1">
                                    <ol-source-vector>
                                        <ol-feature ref="positionFeature">
                                            <ol-geom-point :coordinates="slotProps.position"></ol-geom-point>
                                            <ol-style>
                                                <ol-style-icon :src="hereIcon" :scale="0.5"></ol-style-icon>
                                            </ol-style>
                                        </ol-feature>
                                    </ol-source-vector>
                                </ol-vector-layer>
                            </template>
                        </ol-geolocation>
                        
                                <ol-vector-layer :zIndex="3">
                                    <ol-source-vector>
                                        <ol-feature>
                                            <ol-geom-point :coordinates="coordinateD"></ol-geom-point>
                                            <ol-style>
                                                <ol-style-icon :src="deliverymanIcon" :scale="0.1"></ol-style-icon>
                                            </ol-style>
                                        </ol-feature>
                                    </ol-source-vector>
                                </ol-vector-layer>
                    
                    </ol-map>
            </div>
        </v-card>

    </v-container>

</template>

<script>
import hereIcon from '@/assets/homeMarker.png'
import progressALE from '@/components/ALEProgressBar.vue'
import deliverymanIcon from '@/assets/deliverymanIcon.png'
import { ref } from 'vue'

export default {
    components:
    {
        progressALE
    },
    setup() {
        const center = ref([40, 40])
        const projection = ref('EPSG:4326')
        const zoom = ref(8)
        const rotation = ref(0)
        const radius = ref(20)

        const view = ref(null)
        const map = ref(null)
        const coordinateD = ref([1.05, 49.42])

        const strokeColor = ref('rgb(228,228,228)')
        const fillColor = ref('white')
        const strokeWidth = ref(5)


            
        return {
            center,
            projection,
            zoom,
            rotation,
            hereIcon,
            deliverymanIcon,
            view,
            fillColor,
            strokeWidth,
            strokeColor,
            radius,
            map,
            //geoLocChange,
            coordinateD
        }
    },
    mounted() {
        console.log("monted");
        
        this.$refs.view.fit([1.05, 49.42, 1.05, 49.42], { maxZoom: 14 })
    },
    data: () => ({
        progress : 0,
    }),
    props:
    {
        showProgressBar: false,
        progress:Number,
        locHome:null
    },
    methods: { 
    },
}
</script>

<style>
#maps {
    width: 100%;
    height: 100%;
    padding: 10px;
}

#btn {
    background-color: rgb(255, 152, 0);
    color: white;
}


#middle {
    background-color: rgb(228, 228, 228);
    height: 3px;
    width: 100%;
}


#formView {
    border: solid 3px rgb(228, 228, 228);
    background-color: white;
    font-family: MyFont;
    height: 75vh;
    width: 50vw;
    padding-bottom: 10px;
}

#title {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    margin-left: 15px;
    vertical-align: middle;
    text-align: center;
}
#header {
    text-align: center;
    padding: 20px;
    padding-bottom: 20px;
    text-align: center;
    vertical-align: middle;
    display: flex;
    justify-content: space-between;
}
</style>