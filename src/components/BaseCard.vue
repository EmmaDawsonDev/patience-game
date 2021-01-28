<template>
  <div class="card">
    <section class="top">
      <img :src="cardImage" alt="" class="img-top" />
      <p>{{ cardValue }}</p>
    </section>
    <img :src="cardImage" alt="" class="img-middle" />

    <section class="bottom">
      <img :src="cardImage" alt="" class="img-bottom" />
      <p>{{ cardValue }}</p>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
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
</style>
