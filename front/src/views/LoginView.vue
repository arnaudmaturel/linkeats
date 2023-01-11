<template>
    <v-container id="container">
        <side-bar />
        <flip-card/>
    </v-container>
    <footer-component />
</template>

<script>
import FlipCard from '@/components/FlipCard.vue'
import FooterComponent from '../components/FooterComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import SideBar from '../components/SideBar.vue'

export default {
    name: 'LoginView',
    components: { LoginComponent, SideBar, FooterComponent, RegisterComponent, FlipCard },
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
