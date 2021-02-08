<template>
  <section @click="closeModal" ref="section">
    <article>
      <h3>{{ $t("instructions.title") }}</h3>
      <p>{{ $t("instructions.body") }}</p>
    </article>
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
    max-width: 16rem;
    background-color: white;
    padding: 2rem;
    border-radius: 10px;

    h3 {
      margin-bottom: 1rem;
    }

    p {
      line-height: 1.5;
    }
  }
}
</style>
