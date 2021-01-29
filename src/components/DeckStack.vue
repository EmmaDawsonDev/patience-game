<template>
  <section v-if="deckStack.length === 0" class="empty"></section>
  <section v-else @click="clickedDeck">
    <base-card
      v-for="item in deckStack"
      :key="item.id"
      :card="item"
      @cardClick="emitCardInfo"
      :class="{ cardback: cardBack, stacking: stack }"
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
    cardBack: {
      type: String,
    },
    stack: {
      type: String,
    },
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
  width: 10rem;
  height: 14rem;
  border: 3px dashed white;
  border-radius: 10px;
}

.stacked {
  display: grid;
  grid-auto-rows: 3rem;
}

.one-stack {
  overflow: hidden;
}
</style>
