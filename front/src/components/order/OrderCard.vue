<template>
    <v-card
        min-width="250"
        max-width="400"
        :loading="loading"
        :id="id"
    >
        <v-img
            height="100%"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>
            {{ tags }}
        </v-card-subtitle>
        <v-card-text>
            <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
            ></v-rating>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="deep-purple lighten-2"
                :href='"/restaurants/"+title'
            >
            Order from
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
// Components
import {mapGetters, mapMutations, useStore} from "vuex";
import {computed} from 'vue';

export default {
    name: 'ShopView',
    computed: mapGetters({
        allRestaurants: "getAllRestaurants"
    }),
    created() {
        this.$store.dispatch("getAllRestaurants");
    },
    props: {
        id: Number,
        title: String,
        tags: String,
    },
}
</script>