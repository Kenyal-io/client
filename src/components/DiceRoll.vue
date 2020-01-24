<template>
    <button class="btn btn-dark btn-lg btn-dice mt-5" @click.prevent="roll">
        Roll Dice
    </button>
</template>

<script>
export default {
  name: 'DiceRoll',
  methods: {
    roll () {
      let dice = Math.floor(Math.random() * 6) + 1
      this.$emit('rolledDice', dice)
    }
  }
}
</script>

<style>
.btn-dice {
  font-weight: bold !important;
}

.btn-dice:hover {
    box-shadow: 3px 3px 3px #808080;
}
</style>
