<template>
  <div v-if='logged === true'>
    Auth ok
  </div>
  <div v-else>
    <loginComponent />
  </div>
</template>

<script>
import loginComponent from '../components/forms/loginComponent.vue';

export default {
  name: "UserAccount",
  data() {
    return {
      logged: false
    }
  },
  components: {
    loginComponent
  }
}
</script>
