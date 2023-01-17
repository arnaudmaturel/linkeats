<template>
    <v-container>
        <v-card variant="outlined"  class="mx-auto px-2 py-2"  max-width="1200" style="border: 1px solid grey; background-color: white;" elevation="24">
            <v-container fluid>
                <v-row>
                    <v-col>
                        <h4 style="color: black;">Your articles:</h4>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col
                    v-for="item in cart"
                    :key="item.title"
                    >
                        <v-card elevation="3">
                            <v-card-item width="90%" height="90%"  class="mx-auto">
                                <v-card-title style="color: black;">
                                    {{ item.title }}: {{ item.price / 100 }} €/unit
                                </v-card-title>
                                <v-card-subtitle style="color: black;">
                                    Quantity: {{ item.quantity }}
                                </v-card-subtitle>
                                <v-card-text style="color: black;">
                                    Total line: {{ (item.quantity * item.price) /100 }} €
                                </v-card-text>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-title style="color: black;">
                Total to pay: {{ total / 100 }} €
            </v-card-title>
            <v-card-actions>
                <v-btn variant="elevated" size="large" color="rgb(255, 152, 0)" style="color: white;" v-if="!logged" :to="{ name: 'login' }">
                    Pass order
                </v-btn>
                <v-btn variant="elevated" size="large" color="rgb(255, 152, 0)" style="color: white;" v-if="logged" :to="{ name: 'home' }">
                    Pass order
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            cart: this.cart = this.$store.getters.getCart,
            total: this.total = this.$store.getters.getTotal,
            logged: false
        }
    }
}
</script>
