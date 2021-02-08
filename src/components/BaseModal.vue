<template>
  <section @click="closeModal" ref="section">
    <article>Instructions</article>
  </section>
</template>

<script>
export default {
  methods: {
    closeModal(e) {
      if (e.target === this.$refs.section) {
        this.$emit("clickedModalBg");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;

  article {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
  }
}
</style>
