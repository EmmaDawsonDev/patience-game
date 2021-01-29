<template>
  <div id="app">
    <section class="wrapper top-wrapper">
      <deck-stack
        :deckStack="deckStack1"
        @cardClick2="moveToBin"
        class="stacked"
        stack="true"
      ></deck-stack>
      <deck-stack
        :deckStack="deckStack2"
        @cardClick2="moveToBin"
        class="stacked"
        stack="true"
      ></deck-stack>
      <deck-stack
        :deckStack="deckStack3"
        @cardClick2="moveToBin"
        class="stacked"
        stack="true"
      ></deck-stack>
      <deck-stack
        :deckStack="deckStack4"
        @cardClick2="moveToBin"
        class="stacked"
        stack="true"
      ></deck-stack>
    </section>
    <section class="wrapper">
      <deck-stack :deckStack="lastUsedItem" class="one-stack"></deck-stack>
      <deck-stack
        :deckStack="deck"
        cardBack="true"
        @click.native="draw4cards"
        class="one-stack"
      ></deck-stack>
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
      usedDeck: [],
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
    this.deck.splice(0, 4);
  },

  computed: {
    arrayOf4Cards() {
      let arrayOf4 = this.deck.slice(0, 4);
      return arrayOf4;
    },
    lastUsedItem() {
      if (this.usedDeck.length > 0) {
        return [this.usedDeck[this.usedDeck.length - 1]];
      } else {
        return this.usedDeck;
      }
    },
  },
  methods: {
    moveToBin(card) {
      let value = card.value;
      let color = "";
      let last4cards = [
        this.deckStack1[this.deckStack1.length - 1] || {
          suite: "",
          value: null,
        },
        this.deckStack2[this.deckStack2.length - 1] || {
          suite: "",
          value: null,
        },
        this.deckStack3[this.deckStack3.length - 1] || {
          suite: "",
          value: null,
        },
        this.deckStack4[this.deckStack4.length - 1] || {
          suite: "",
          value: null,
        },
      ];

      if (!last4cards.includes(card)) {
        return;
      }

      if (card.suite === "hearts" || card.suite === "diamonds") {
        color = "red";
      } else {
        color = "black";
      }

      for (let i = 0; i < last4cards.length; i++) {
        if (color === "red") {
          if (
            (last4cards[i].suite === "diamonds" ||
              last4cards[i].suite === "hearts") &&
            last4cards[i].value < value
          ) {
            switch (i) {
              case 0:
                this.usedDeck.push(this.deckStack1.pop());
                break;
              case 1:
                this.usedDeck.push(this.deckStack2.pop());
                break;
              case 2:
                this.usedDeck.push(this.deckStack3.pop());
                break;
              case 3:
                this.usedDeck.push(this.deckStack4.pop());
                break;
            }
          }
        } else if (color === "black") {
          if (
            (last4cards[i].suite === "clubs" ||
              last4cards[i].suite === "spades") &&
            last4cards[i].value < value
          ) {
            switch (i) {
              case 0:
                this.usedDeck.push(this.deckStack1.pop());
                break;
              case 1:
                this.usedDeck.push(this.deckStack2.pop());
                break;
              case 2:
                this.usedDeck.push(this.deckStack3.pop());
                break;
              case 3:
                this.usedDeck.push(this.deckStack4.pop());
                break;
            }
          }
        }
      }
    },
    draw4cards() {
      if (this.deck.length === 0) {
        return;
      }
      let [c1, c2, c3, c4] = this.deck.slice(0, 4);
      this.deckStack1.push(c1);
      this.deckStack2.push(c2);
      this.deckStack3.push(c3);
      this.deckStack4.push(c4);
      this.deck.splice(0, 4);
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

.top-wrapper {
  height: 50rem;
}
</style>
