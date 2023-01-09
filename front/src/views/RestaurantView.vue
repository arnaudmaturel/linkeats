<template>
  <SideBar />
  <RestaurantMenu />
</template>

<script>
import SideBar from '../components/SideBar.vue';
import RestaurantMenu from '../components/menus/RestaurantMenus.vue';

export default {
  name: "RestaurantView",
  components: {
    SideBar,
    RestaurantMenu,
  }
}
</script>
