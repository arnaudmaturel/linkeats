<template>
    <v-container id="container">
        <side-bar />
        <flip-card/>
    </v-container>
</template>

<script>
import FlipCard from '@/components/FlipLogSignClient.vue'

export default {
    name: 'LoginView',
    components: {  FlipCard },
    setup() {

    },
    
}
</script>

<style scoped>
#container {
    width: 100%;
    height: 100%;
}
</style>
