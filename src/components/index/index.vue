<template>
  <div id="index">
    <div class="Container">
      <component :is="currentView"></component>
    </div>
    <footer>
      <footers v-on:exchangeActiveIndex="exchangeView"></footers>
    </footer>
  </div>
</template>

<script>
import films from 'components/films/films'
import cinema from 'components/cinema/cinema'
import discover from 'components/discover/discover'
import user from 'components/user/user'
import footers from 'components/footers/footers'

export default {
  name: 'index',
  data () {
    return {
      currentView: 'films'
    }
  },
  components: {
    footers,
    films,
    cinema,
    discover,
    user
  },
  methods: {
    exchangeView (msg) {
      switch (msg) {
        case 0 :this.currentView = 'films'; break
        case 1 :this.currentView = 'cinema'; break
        case 2 :this.currentView = 'discover'; break
        case 3 :this.currentView = 'user'; break
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
#index {
  font-family: '黑体';
  text-align: center;
  background:#fff;
  width:100%;
  height:100%;
  position: relative;
  overflow: hidden;
    .Container{
      width: 100%;
      height: calc(100% - 12.5vw);
    }
    footer{
      width: 100%;
      height: 12.5vw;
      position:relative;
    }
}

</style>
