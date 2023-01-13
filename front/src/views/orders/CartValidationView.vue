<template>
    <v-card variant="outlined" class="mx-auto" max-width="1200">
        <v-container fluid>
            <v-row dense>
                <v-col
                v-for="item in cart"
                :key="item.title"
                >
                    <v-card>
                        <v-card-item width="90%" height="90%"  class="mx-auto">
                            <v-card-title>
                                {{ item.title }}: {{ item.price / 100 }} €/unit
                            </v-card-title>
                            <v-card-subtitle>
                                {{ item.quantity }}
                            </v-card-subtitle>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-card-title>
            Total cart: {{ total / 100 }} €
        </v-card-title>
        <v-card-actions>
            <v-btn variant="plain">
                Pass order
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data() {
    return {
      cart: this.cart = this.$store.getters.getCart,
      total: this.total = this.$store.getters.getTotal
    }
  },
}
</script>
