<template>
  <div id="app">
    <section class="wrapper">
      <deck-stack :deckStack="deckStack1"></deck-stack>
      <deck-stack :deckStack="deckStack2"></deck-stack>
      <deck-stack :deckStack="deckStack3"></deck-stack>
      <deck-stack :deckStack="deckStack4"></deck-stack>
    </section>
  </div>
</template>

<script>
import DeckStack from "./components/DeckStack.vue";
import generateDeck, { shuffleDeck } from "./game/index.js";

export default {
  components: { DeckStack },
  data() {
    return {
      deck: [],
      deckStack1: [],
      deckStack2: [],
      deckStack3: [],
      deckStack4: [],
    };
  },
  created() {
    this.deck = generateDeck();
    this.deck = shuffleDeck(this.deck);
    let [c1, c2, c3, c4] = this.arrayOf4Cards;
    this.deckStack1.push(c1);
    this.deckStack2.push(c2);
    this.deckStack3.push(c3);
    this.deckStack4.push(c4);
    console.log(this.deckStack1);
  },

  computed: {
    arrayOf4Cards() {
      let arrayOf4 = this.deck.slice(0, 4);
      return arrayOf4;
    },
  },

  name: "App",
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: rgb(33, 46, 33);
}

.wrapper {
  max-width: 48rem;
  display: flex;
  justify-content: space-between;
  margin: 5rem auto;
}
</style>
