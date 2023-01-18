<template>
    <v-container id="container">
        <side-bar />
        <flip-card/>
    </v-container>
</template>

<script>
import FlipCard from '@/components/FlipLogSignClient.vue'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'

export default {
    name: 'LoginView',
    components: { LoginComponent, RegisterComponent, FlipCard },
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
