<template>
  <nav>
    <span @click="reloadGame" class="bg-color"
      ><img src="@/assets/reload.svg" alt="reload arrow"
    /></span>
    <div>
      <span @click="langEn" class="flag" :class="{ activeLang: enActive }"
        ><img src="@/assets/uk-flag.svg" alt="uk flag"
      /></span>
      <span @click="langSv" class="flag" :class="{ activeLang: svActive }"
        ><img src="@/assets/sv-flag.svg" alt="Swedish flag"
      /></span>
      <span @click="openModal" class="bg-color"
        ><img
          class="instructions "
          src="@/assets/question.svg"
          alt="question - show instructions"
      /></span>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      enActive: true,
      svActive: false,
    };
  },
  computed: {
    lang() {
      return this.$root.$i18n.locale;
    },
  },
  methods: {
    reloadGame() {
      this.$emit("clickRestart");
    },
    openModal() {
      this.$emit("clickedOnQuestion");
    },
    langEn() {
      this.$root.$i18n.locale = "en";
      this.svActive = false;
      this.enActive = true;
    },
    langSv() {
      this.$root.$i18n.locale = "sv";
      this.svActive = true;
      this.enActive = false;
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

  div {
    display: flex;

    span {
      margin: 0 0.2rem;
    }

    .activeLang {
      outline: 1px solid rgba(250, 250, 250, 0.657);
    }
  }

  span {
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: 0.5s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  .bg-color {
    background-color: rgba(171, 200, 171, 0.5);
    border-radius: 50%;
  }

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
</style>
