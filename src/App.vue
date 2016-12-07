<template>
  <div id="app">
    <div class="mainContainer">
      <component :is="currentView">
      </component>
    </div>
    <footers v-on:exchangeActiveIndex="exchangeView"></footers>
  </div>
</template>

<script>
import footers from './components/footers'
import films from './components/films'
import cinima from './components/cinima'
import discover from './components/discover'
import user from './components/user'

export default {
  name: 'app',
  data () {
    return {
      currentView: 'films'
    }
  },
  components: {
    footers,
    films,
    cinima,
    discover,
    user
  },
  methods: {
    exchangeView (msg) {
      switch (msg) {
        case 0 :this.currentView = 'films'; break
        case 1 :this.currentView = 'cinima'; break
        case 2 :this.currentView = 'discover'; break
        case 3 :this.currentView = 'user'; break
      }
    }
  }
}
</script>

<style>
#app {
  font-family: '黑体';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:#fff;
  width:100%;
  height:100%;
  position: relative;
  overflow: hidden;
}
.mainContainer{
  width: 100%;
  height: calc(100% - 12.5vw);
  background: #fff;
}
</style>
