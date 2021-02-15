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
      @oldArrayId="setOldDeckId"
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

      this.$emit("droppedCard", {
        array: this.id,

        cardId,
      });
    },
    setOldDeckId(id) {
      this.$emit("oldArrayId", id);
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 10rem;
  height: 14rem;

  @media (max-width: 680px) {
    width: 7.5rem;
    height: 10.5rem;
  } 
  @media (max-width: 530px) {
    width: 5rem;
    height: 7rem;
  }
  @media (max-width: 360px) {
    width: 4.3rem;
    height: 5.9rem;
  }
}

.empty {
  width: 10rem;
  height: 14rem;
  border: 3px dashed white;
  border-radius: 10px;

  @media (max-width: 680px) {
    width: 7.5rem;
    height: 10.5rem;
  } 
  @media (max-width: 530px) {
    border: 2px dashed white;
    width: 5rem;
    height: 7rem;
  }
  @media (max-width: 360px) {
    width: 4.3rem;
    height: 5.9rem;
  }
  
}

.stacked {
  display: grid;
  grid-auto-rows: 1.5rem;

  @media (max-width: 360px) {
    grid-auto-rows: 1.2rem;
  }
}

.one-stack {
  overflow: hidden;
}
</style>
