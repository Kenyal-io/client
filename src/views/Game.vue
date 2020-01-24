<template>
    <div>
        <audio autoplay>
          <source src="../assets/audio/backgorund.mp3" type="audio/mpeg"/>
        </audio>
        <h1 class="text-light font-weight-bold"> Active Room {{ $route.params.roomName }} </h1>
        <snake-ladder></snake-ladder>
        <!-- <dice-roll></dice-roll> -->
        <chat-form></chat-form>
    </div>
</template>

<script>
import SnakeLadder from '@/components/SnakeLadder.vue'
// import DiceRoll from '@/components/DiceRoll.vue'
import chatForm from '@/components/chatForm.vue'

export default {
  components: {
    SnakeLadder,
    chatForm
    // DiceRoll
  }
}
</script>
