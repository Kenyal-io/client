<template>
    <b-container fluid>
        <b-row class="mt-3">
            <b-col>
                <vue-p5 v-on="{setup, draw}"></vue-p5>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapState } from 'vuex'
import VueP5 from 'vue-p5'

export default {
  components: {
    VueP5
  },
  computed: mapState([
  // map this.count to store.state.count
    'player', 'tiles', 'tile', 'ROLL_STATE', 'PREVIEW_STATE', 'MOVE_STATE'
  ]),
  data () {
    return {
      state: null
    }
  },
  created () {
    this.state = this.ROLL_STATE
  },
  methods: {
    showPlayer (sk, tiles) {
      let current = tiles[this.player.spot]
      sk.fill(255)
      let center = this.getCenter(current)
      sk.ellipse(center[0], center[1], 32)
    },
    getCenter (tiles) {
      let cx = tiles.x + tiles.wh / 2
      let cy = tiles.y + tiles.wh / 2
      return [cx, cy]
    },
    showObstacle (sk) {
      for (const tile of this.tiles) {
        if (tile.obstacle) {
          let myCenter = this.getCenter(tile)
          let nextCenter = this.getCenter(this.tiles[tile.index + tile.obstacle])
          sk.strokeWeight(4)
          tile.obstacle < 0 ? sk.stroke(255) : sk.stroke(0)
          sk.line(myCenter[0], myCenter[1], nextCenter[0], nextCenter[1])
        }
      }
    },
    showPreview (sk) {
      let start = sk.max(0, this.player.spot)
      let end = sk.min(this.tile.next, this.tiles.length - 1)
      for (let i = start; i <= end; i++) {
        this.highlight(sk, this.tiles[i])
      }
    },
    show (sk, color, tile) {
      sk.fill(color)
      sk.noStroke()
      sk.rect(tile.x, tile.y, tile.wh, tile.wh)
    },
    highlight (sk, tile) {
      sk.fill(0, 255, 0, 100)
      sk.noStroke()
      sk.rect(tile.x, tile.y, tile.wh, tile.wh)
    },
    movePlayer () {
      this.player.spot = this.tile.next
    },
    passObstacle () {
      let tile = this.tiles[this.player.spot]
      this.player.spot += tile.obstacle
    },
    isObstacle () {
      let tile = this.tiles[this.player.spot]
      return (tile && tile.obstacle !== 0)
    },
    setup (sk) {
      sk.resizeCanvas(800, 800)

      let resolution = 80
      let cols = sk.width / resolution
      let rows = sk.height / resolution

      let x = 0
      let y = (rows - 1) * resolution
      let direction = 1
      for (let i = 0; i < cols * rows; i++) {
        this.$store.commit('setTile', {
          x,
          y,
          wh: resolution,
          index: i,
          next: i + 1,
          obstacle: 0
        })

        this.tiles.push(this.tile)
        x += resolution * direction
        if (x >= sk.width || x <= -resolution) {
          direction *= -1
          x += resolution * direction
          y -= resolution
        }
      }

      // start generate obstacle
      let randomObstacle = 5
      for (let i = 0; i < randomObstacle; i++) {
        let index = sk.floor(sk.random(cols, this.tiles.length))
        let obstacle = -1 * sk.floor(sk.random(index % cols, index - 1))
        this.$store.commit('setObstacle', {
          index,
          obstacle
        })
      }

      for (let i = 0; i < randomObstacle; i++) {
        let index = sk.floor(sk.random(0, this.tiles.length - cols))
        let obstacle = sk.floor(sk.random(cols - (index % cols), this.tiles.length - index - 1))
        this.$store.commit('setObstacle', {
          index,
          obstacle
        })
      }
      // done generate obstacle
    },
    draw (sk) {
      sk.frameRate(10)
      sk.background('lightgreen')

      for (const tile of this.tiles) {
        this.show(sk, tile.color, tile)
      }

      this.showObstacle(sk)

      if (this.state === this.ROLL_STATE) {
        this.$store.commit('roll')
        this.showPreview(sk)
        this.state = this.MOVE_STATE
      } else if (this.state === this.MOVE_STATE) {
        this.movePlayer()
        if (this.isObstacle()) {
          this.state = this.OBSTACLE_STATE
        } else {
          this.state = this.ROLL_STATE
        }
      } else if (this.state === this.OBSTACLE_STATE) {
        this.passObstacle()
        this.state = this.ROLL_STATE
      }

      if (this.player.spot >= this.tiles.length - 1) {
        this.player.spot = this.tiles.length - 1
        console.log('game over')
        sk.noLoop()
      }

      this.showPlayer(sk, this.tiles)
    }
  }
}
</script>
