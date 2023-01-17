<template>
  <v-container>
    <v-btn variant="elevated" size="default" color="rgb(255, 152, 0)" :to="{ name: 'restaurants' }" style="color: white">Retour</v-btn>
  </v-container>
  <RestaurantMenu />
</template>

<script>
import RestaurantMenu from '../../../components/menus/RestaurantMenus.vue';

export default {
  name: "RestaurantView",
  components: {
    RestaurantMenu
  }
}
</script>
