<template>
  <section
    v-if="deckStack.length === 0"
    class="empty"
    @dragover.prevent
    @drop.prevent="dropCard"
  ></section>
  <section v-else @click="clickedDeck">
    <base-card
      v-for="item in deckStack"
      :key="item.id"
      :card="item"
      :deckId="id"
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
    id: {
      type: Number,
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
    dropCard(e) {
      const cardId = e.dataTransfer.getData("card-id");
      console.log("cardID:", cardId);
      console.log("dropped", this.id);
      this.$emit("droppedCard", { array: this.id, cardId });
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
  grid-auto-rows: 1.5rem;
}

.one-stack {
  overflow: hidden;
}
</style>
