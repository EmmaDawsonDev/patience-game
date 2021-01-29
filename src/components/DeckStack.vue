<template>
  <section v-if="deckStack.length === 0" class="empty"></section>
  <section v-else @click="clickedDeck" :class="{ stackStyle: stack }">
    <base-card
      v-for="item in deckStack"
      :key="item.id"
      :card="item"
      @cardClick="emitCardInfo"
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
  data() {
    return {
      stack: true,
    };
  },
  methods: {
    emitCardInfo(card) {
      this.$emit("cardClick2", card);
    },
    clickedDeck() {
      this.$emit("clickedOnDeck");
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
  border: 3px dashed white;
  border-radius: 10px;
}

.stackStyle {
  display: grid;
  grid-auto-rows: 3rem;
}
</style>
