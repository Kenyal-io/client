<template>
  <div class="col-4">
    <div class="card" style="width: 18rem;">
      <img
        src="https://previews.123rf.com/images/bigredlynx/bigredlynx1107/bigredlynx110700051/9886585-fiery-dragon-emblem.jpg"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h3 class="card-title">{{group.name}}</h3>
        <h4>Total player: {{group.player.length}} / 4</h4>
        <div>
          <div class="col" v-if="group.player.length < 4">
            <button @click.prevent="joinRoom(group._id)" type="button" class="btn btn-primary">Join</button>
          </div>
          <div v-else>Full</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['group'],
  methods: {
    joinRoom (id) {
      axios({
        method: 'post',
        url: `http://localhost:3000/join/${id}`,
        data: {
          player: localStorage.username
        }
      })
        .then(({ data }) => {
          // this.$emit('reload')
          // this.$router.push({ path: `/game/${data.name}` })
          this.$router.push({ path: `/game/${data.name}` })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
