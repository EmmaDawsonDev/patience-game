<template>
  <div id="app">
    <nav-bar
      @clickRestart="restartGame"
      @clickedOnQuestion="openTheModal"
    ></nav-bar>
    <base-modal v-if="modalOpen" @clickedModalBg="closeTheModal"></base-modal>
    <section class="wrapper top-wrapper">
      <deck-stack
        :deckStack="deckStack1"
        :id="1"
        @cardClick2="moveToBin"
        @oldArrayId="logOldArrayId"
        @droppedCard="moveCardToNewArray"
        class="stacked"
        stack="true"
      ></deck-stack>
      <deck-stack
        :deckStack="deckStack2"
        :id="2"
        @cardClick2="moveToBin"
        @oldArrayId="logOldArrayId"
        @droppedCard="moveCardToNewArray"
        class="stacked"
        stack="true"
      ></deck-stack>
      <deck-stack
        :deckStack="deckStack3"
        :id="3"
        @cardClick2="moveToBin"
        @oldArrayId="logOldArrayId"
        @droppedCard="moveCardToNewArray"
        class="stacked"
        stack="true"
      ></deck-stack>
      <deck-stack
        :deckStack="deckStack4"
        :id="4"
        @cardClick2="moveToBin"
        @oldArrayId="logOldArrayId"
        @droppedCard="moveCardToNewArray"
        class="stacked"
        stack="true"
      ></deck-stack>
    </section>
    <section class="wrapper">
      <deck-stack
        :deckStack="lastUsedItem"
        :id="5"
        class="one-stack"
      ></deck-stack>
      <deck-stack
        :deckStack="deck"
        :id="6"
        cardBack="true"
        @click.native="draw4cards"
        class="one-stack"
      ></deck-stack>
    </section>
    <winner-alert v-if="winnerAlertOpen" @clickRestart="restartGame"></winner-alert>
  </div>
</template>

<script>
import BaseModal from "./components/BaseModal.vue";
import DeckStack from "./components/DeckStack.vue";
import NavBar from "./components/NavBar.vue";
import generateDeck, { shuffleDeck } from "./game/index.js";
import WinnerAlert from "./components/WinnerAlert.vue"

export default {
  components: { DeckStack, NavBar, BaseModal, WinnerAlert },
  data() {
    return {
      totalDeck: [],
      deck: [],
      deckStack1: [],
      deckStack2: [],
      deckStack3: [],
      deckStack4: [],
      usedDeck: [],
      oldArrayId: null,
      modalOpen: false,
      
    };
  },
  created() {
    this.deck = generateDeck();
    this.totalDeck = this.deck.map((x) => x);
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
    winnerAlertOpen() {
      if (this.deckStack1.length === 1 &&
          this.deckStack2.length === 1 &&
          this.deckStack3.length === 1 &&
          this.deckStack4.length === 1 &&
          this.deckStack1[0].value === 14 &&
          this.deckStack2[0].value === 14 &&
          this.deckStack3[0].value === 14 &&
          this.deckStack4[0].value === 14
      ) {
        
        return true;
      } else {
        return false;
      }
    }
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
    moveCardToNewArray(payload) {
      let card = this.totalDeck.find((item) => item.id == payload.cardId);
      console.log("old", this.oldArrayId);

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

      if (last4cards.includes(card)) {
        if (payload.array === 1) {
          this.deckStack1.push(card);
        } else if (payload.array === 2) {
          this.deckStack2.push(card);
        } else if (payload.array === 3) {
          this.deckStack3.push(card);
        } else if (payload.array === 4) {
          this.deckStack4.push(card);
        }
        if (this.oldArrayId === 1) {
          this.deckStack1.pop();
        } else if (this.oldArrayId === 2) {
          this.deckStack2.pop();
        } else if (this.oldArrayId === 3) {
          this.deckStack3.pop();
        } else if (this.oldArrayId === 4) {
          this.deckStack4.pop();
        }
      }
    },
    logOldArrayId(id) {
      console.log(this.oldArrayId);
      this.oldArrayId = id;
      console.log(this.oldArrayId);
    },
    restartGame() {
      (this.totalDeck = []),
        (this.deck = []),
        (this.deckStack1 = []),
        (this.deckStack2 = []),
        (this.deckStack3 = []),
        (this.deckStack4 = []),
        (this.usedDeck = []),
        (this.oldArrayId = null),
        (this.deck = generateDeck());
      this.totalDeck = this.deck.map((x) => x);
      this.deck = shuffleDeck(this.deck);
      let [c1, c2, c3, c4] = this.arrayOf4Cards;
      this.deckStack1.push(c1);
      this.deckStack2.push(c2);
      this.deckStack3.push(c3);
      this.deckStack4.push(c4);
      this.deck.splice(0, 4);
    },
    closeTheModal() {
      this.modalOpen = false;
    },
    openTheModal() {
      this.modalOpen = true;
    },
  },

  name: "App",
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: rgb(33, 46, 33);
  font-family: "Roboto", sans-serif;
}

.wrapper {
  max-width: 48rem;
  display: flex;
  justify-content: space-between;
  margin: 3rem auto;
}

.top-wrapper {
  height: 30rem;
}
</style>
