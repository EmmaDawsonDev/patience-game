<template>
<div>
  <div class="pyro">
  <div class="before"></div>
  <div class="after"></div>
</div>
<section>
  <h2>{{ $t("winner.title") }}</h2>
  <p>{{ $t("winner.body") }}</p>
  <button @click="reloadGame">{{ $t("winner.yes") }}</button>
  
</section>
</div>
</template>

<script>
export default {
methods: {
  reloadGame() {
      this.$emit("clickRestart");
    },
}
}
</script>

<style lang="scss" scoped>
div {
  display: grid;
  place-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
}

section {
    width: 18rem;
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    border: 2px solid #e3e3e3;
    

    h2, p {
      margin-bottom: 1rem;
    }

    button {
      text-transform: uppercase;
      padding: 0.3rem 0.7rem;
      background-color: rgb(76, 146, 76);
      color: white;
      border: 1px solid rgb(76, 146, 76);
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: rgb(58, 110, 58);
        transform: scale(1.1);
      }
    }

    
}



</style>