<script>
import { defineComponent } from 'vue';
import FlipCard from '@/flip-card.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    FlipCard
  }
});
</script>

<template>
  <div id="app">
    <flip-card />
  </div>
</template>
