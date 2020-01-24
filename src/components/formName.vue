<template>
  <div class="hello">
    <b-card class="text-center" style="max-width:480px; opacity:0.7; border:none">
      <b-form @submit.prevent="submit">
        <label for="feedback-user">Username</label>
        <b-input v-model="username" :state="validation" id="feedback-user"></b-input>
        <b-form-invalid-feedback :state="validation">Your username must be 5-12 characters long.</b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">Looks Good.</b-form-valid-feedback>
        <b-button type="submit" value="Let's Dice" squared variant="outline-secondary">Let's Dice</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: ""
    };
  },
  computed: {
    validation() {
      return this.username.length > 4 && this.username.length < 13;
    }
  },
  methods: {
    submit() {
      axios({
        url: "http://localhost:3000/users",
        method: "POST",
        data: {
          username: this.username
        }
      })
        .then(({ data, token }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.user._id);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("room", data.user.room);
          this.$emit("newUser", this.username);
          Swal.fire(
            "Welcome Back",
            "Success Login " + data.user.username,
            "success"
          );
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "message : " + err.message
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
