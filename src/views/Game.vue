<template>
    <div>
        <h1> Active Room {{ $route.params.roomName }} </h1>
        <snake-ladder></snake-ladder>
        <!-- <dice-roll></dice-roll> -->
    </div>
</template>

<script>
import SnakeLadder from '@/components/SnakeLadder.vue'
// import DiceRoll from '@/components/DiceRoll.vue'

export default {
  components: {
    SnakeLadder
    // DiceRoll
  }
}
</script>
