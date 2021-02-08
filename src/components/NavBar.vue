<template>
  <nav>
    <span @click="reloadGame"
      ><img src="@/assets/reload.svg" alt="reload arrow"
    /></span>
    <span
      ><img
        class="instructions"
        src="@/assets/question.svg"
        alt="question - show instructions"
    /></span>
  </nav>
</template>

<script>
export default {
  methods: {
    reloadGame() {
      this.$emit("clickRestart");
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: rgb(76, 146, 76);
  padding: 1rem;

  span {
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgba(171, 200, 171, 0.5);
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;

    img {
      width: 80%;
      height: 80%;
    }

    .instructions {
      height: 60%;
      align-self: start;
      padding-top: 0.4rem;
    }
  }
}
</style>
