<template>
  <section
    class="card"
    @click="emitValue"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragover.stop
  >
    <section class="top">
      <img :src="cardImage" alt="" class="img-top" />
      <p>{{ cardValue }}</p>
    </section>
    <img :src="cardImage" alt="" class="img-middle" />

    <section class="bottom">
      <img :src="cardImage" alt="" class="img-bottom" />
      <p>{{ cardValue }}</p>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
    deckId: Number,
  },
  data() {
    return {
      draggable: true,
    };
  },
  computed: {
    cardValue() {
      switch (this.card.value) {
        case 14:
        case 1:
          return "A";
        case 11:
          return "J";
        case 12:
          return "Q";
        case 13:
          return "K";
        default:
          return this.card.value;
      }
    },
    cardImage() {
      return require(`../assets/${this.card.suite}.svg`);
    },
  },
  methods: {
    emitValue() {
      this.$emit("cardClick", this.card);
    },
    dragStart(e) {
      const card = this.card.id;
      console.log("deckId", this.deckId);
      e.dataTransfer.setData("card-id", card);
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  background-color: #fff;
  border-radius: 10px;
  width: 10rem;
  height: 14rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  -webkit-box-shadow: 0px -4px 2px -3px #e5e5e5;
  box-shadow: 0px -4px 2px -3px #e5e5e5;
}

img {
  width: 1.5rem;

  &.img-middle {
    width: 2.5rem;
    align-self: center;
  }
}

.bottom {
  align-self: flex-end;
  transform: rotate(180deg);
}

.top {
  align-self: flex-start;
}

section {
  text-align: center;
}

.cardback {
  border: 5px solid white;
  background-color: rgb(182, 25, 25);
  background-image: url("~@/assets/dots.svg");

  * {
    display: none;
  }
}

.stacking {
  .bottom {
    transform: none;
  }
}
</style>
