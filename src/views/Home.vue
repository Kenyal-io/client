<template>
  <div class="home">
    <chatForm></chatForm>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import chatForm from "@/components/chatForm.vue";

export default {
  name: "home",
  components: {
    chatForm
  }
};
</script>
