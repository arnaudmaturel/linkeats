<template>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:400px" ref="map">

        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

        <ol-geolocation :projection="projection" @positionChanged="geoLocChange">
            <template v-slot="slotProps">
                <ol-vector-layer :zIndex="2">
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
        
        
        <!-- <ol-geolocation :projection="projection" @positionChanged="geoLocChange">
                <ol-vector-layer :zIndex="2">
                    <ol-source-vector>
                        <ol-feature ref="positionFeature">
                            <ol-geom-point :coordinates="coordinateD"></ol-geom-point>
                            <ol-style>
                                    <ol-style-icon :src="deliverymanIcon" :scale="0.1"></ol-style-icon>
                            </ol-style>
                        </ol-feature>
                    </ol-source-vector>
                </ol-vector-layer>
        </ol-geolocation> -->

    </ol-map>
</template>


<script>
import hereIcon from '@/assets/homeMarker.png'
import deliverymanIcon from '@/assets/deliverymanIcon.png'
import { ref } from 'vue'

export default {
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

        const geoLocChange = (loc) => {
            console.log(loc);
            view.value.fit([loc[0], loc[1], loc[0], loc[1]], {
                maxZoom: 14
            })
        }

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
            geoLocChange,
            coordinateD
        }
    },
}
</script>


