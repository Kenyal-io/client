<template>
  <div class="container">
    <div>
      <b-button v-b-modal.modal-1>Create New Room</b-button>

      <b-modal hide-footer id="modal-1" title="New Server">
        <form @submit.prevent="createdNew">
          <div class="form-group">
            <label for="exampleInputEmail1">Room Name</label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" class="btn btn-primary">Create</button>
        </form>
      </b-modal>
    </div>
    <div class="row">
      <div class="col mt-5" v-for="(room, index) in server" :key="index">
        <card :group="room" @reload="reloadPage" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import card from '../components/Cards'
export default {
  components: {
    card
  },
  data () {
    return {
      server: [],
      name: '',
      user: 'kuda'
    }
  },
  created () {
    this.findAll()
  },
  methods: {
    reloadPage () {
      this.server = []
      this.findAll()
    },
    createdNew () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/',
        data: {
          name: this.name,
          user: this.user
        }
      })
        .then(({ data }) => {
          this.server = []
          this.findAll()
        })
        .catch(err => {
          console.log(err)
        })
    },
    findAll () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/'
      })
        .then(({ data }) => {
          data.forEach(element => {
            this.server.push(element)
          })
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
