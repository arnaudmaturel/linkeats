<template>
  <v-container>
    <v-row>
      <v-col v-for="order in orders" :key="order.id">
        <OrderCard 
          :id= "order.id"
          :title= "order.title"
          :tags= "order.tags"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Components
import OrderCard from '../../components/order/OrderCardALE.vue';
import {mapGetters} from "vuex";

export default {
  name: 'Orders',
  computed: mapGetters({
    orders: "orders"
  }),
  components: {
    OrderCard
  },
  data() {
    return {
      filters: {

      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$store.dispatch('getAllOrders', {
        filters: this.filters,
      })
    },
  }
}
</script>
