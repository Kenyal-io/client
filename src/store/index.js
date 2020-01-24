import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: {
      spot: 0
    },
    tile: {
      x: null,
      y: null,
      wh: null,
      index: null,
      next: null,
      color: null,
      obstacle: null
    },
    tiles: [],
    ROLL_STATE: 0,
    OBSTACLE_STATE: 2,
    MOVE_STATE: 1,
    isConnected: false,
    socketMessage: null,
    rolled: false
  },
  mutations: {
    setTile: (state, { x, y, wh, index, next, obstacle }) => {
      let color
      if (index % 2 === 0) {
        color = 200
      } else {
        color = 100
      }
      state.tile = {
        x,
        y,
        wh,
        index,
        next,
        color,
        obstacle
      }
    },
    setObstacle: (state, { index, obstacle }) => {
      state.tiles[index].obstacle = obstacle
    },
    roll: (state) => {
      let r = Math.floor(Math.random() * 6) + 1
      state.tile.next = state.player.spot + r
    },
    setPlayerPos: (state, diceNum) => {
      state.tile.next = state.player.spot + diceNum
    }
  },
  actions: {
  },
  modules: {
  }
})
