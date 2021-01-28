<template>
  <section v-if="deckStack.length === 0" class="empty"></section>
  <section v-else>
    <base-card
      v-for="item in deckStack"
      :key="item.id"
      :card="item"
    ></base-card>
  </section>
</template>

<script>
import BaseCard from "./BaseCard.vue";
export default {
  components: { BaseCard },
  props: {
    deckStack: {
      type: Array,
    },
  },
};
</script>

<style scoped>
section {
  width: 10rem;
  height: 14rem;
}

.empty {
  border: 5px dashed white;
}
</style>
