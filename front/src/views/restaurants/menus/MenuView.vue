<template>
    <v-container>
        <v-col>
            <v-row>
                <v-card
                class="mx-auto"
                width="50%"
                v-for="(info, index) in menu" :key="index"
                >
                    <v-img
                    class="align-end text-white" height="200" :src="info.image" cover></v-img>

                    <v-card-title>{{ info.title }}</v-card-title>

                    <v-card-subtitle class="pt-4">
                        Allergies
                    </v-card-subtitle>
                
                    <v-card-text>
                        <div>Whitehaven Beach</div>
                
                        <div>Whitsunday Island, Whitsunday Islands</div>
                    </v-card-text>
                
                    <v-card-actions v-for="restaurant in getRestaurant">
                        <v-btn  variant="elevated" size="default" color="rgb(255, 152, 0)" style="color: white" :to="{ name: 'restaurant_menus', params: { restaurant: restaurant.title } }">
                            Back
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
export default {
    computed: {
        menu () {
            return this.$store.getters.getMenu(this.$route.params.menu)
        },
        getRestaurant () {
            return this.$store.getters.getRestaurantByName(this.$route.params.restaurant)
        }
    },
    created() {
        this.$store.dispatch("getAllMenus"),
        this.$store.dispatch("getAllRestaurants")
    }
}
</script>
