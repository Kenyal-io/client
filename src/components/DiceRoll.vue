<template>
  <button class="btn btn-dark btn-lg btn-dice mt-5" v-on:click="">Roll Dice</button>
</template>

<script>
export default {
    name: 'DiceRoll',
    data() {
        return {
            d
        }
    }
}
</script>

<style>
.btn-dice {
    font-weight: bold !important;
}

.btn-dice:hover {
    box-shadow: 3px 3px 3px #808080	;
}
</style>