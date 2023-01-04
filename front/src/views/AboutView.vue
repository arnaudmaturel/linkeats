<template>
  <SideBar />
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import SideBar from '../components/SideBar.vue';

export default {
  name: 'AboutView',
  components: {
    SideBar,
  },
}
</script>
