<template>
  <div v-show="submit">
    <div class="row justify-content-center" style="margin-right: 0px; margin-left: 0px;">
      <div class="col-lg-4">
        <img src="../assets/dice.gif" alt="dice" style="max-width: 400px;margin-right: 350px;" />
      </div>
      <div class="col-lg-4">
        <formName @newUser="userJoin"></formName>
      </div>
      <!-- <chatForm></chatForm> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import chatForm from '@/components/chatForm.vue'
import FormName from '@/components/formName.vue'

export default {
  name: 'home',
  data () {
    return {
      submit: true
    }
  },
  components: {
    FormName
    // chatForm,
  },
  methods: {
    userJoin (username) {
      this.submit = false
    }
  }
}
</script>

<style scoped>
.home {
  background-image: url("https://wallpaperaccess.com/full/482770.jpg");
}
</style>
