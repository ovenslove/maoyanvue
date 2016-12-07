<template>
    <div class="footers">
      <div class="footersSimBars filmsBar" :class="{active: activeIndex==0 }" v-on:click="clickFn(0)">
        <div class="icoBox"></div>
        <div class="icoIntr">电影</div>
      </div>
      <div class="footersSimBars cinimaBar" :class="{active: activeIndex==1 }" v-on:click="clickFn(1)">
        <div class="icoBox"></div>
        <div class="icoIntr">影院</div>
      </div>
      <div class="footersSimBars  discoverBar " :class="{active: activeIndex==2 }" v-on:click="clickFn(2)">
        <div class="icoBox"></div>
        <div class="icoIntr">发现</div>
      </div>
      <div class="footersSimBars userBar" :class="{active: activeIndex==3 }" v-on:click="clickFn(3)">
        <div class="icoBox"></div>
        <div class="icoIntr">我的</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'footers',
  data () {
    return {
      msg: 'hello vue',
      activeIndex: 0
    }
  },
  methods: {
    clickFn (index) {
      this.activeIndex = index
      // console.log(this)
      this.$emit('exchangeActiveIndex', this.activeIndex)
      // this.$dispatch('child-msg', this.msg)
    }
  }
}

</script>

<style>
    .footers{
        width:100%;
        height:12.5vw;
        background:#F5F5F5;
        position:absolute;
        left:0;
        bottom:0;
        color: #fff;
        display: flex;
        justify-content: space-around;
    }
    .footersSimBars{
      height: 12.5vw;
      width: 12.5vw;
      color: #696969;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      flex-direction:column;
    }
    .footersSimBars.active{
      color: #ED2F0B;
    }
    .icoBox{
      width: 22px;
      height: 22px;
      background: red;
    }
    .icoIntr{
      font-size: 10px;
      margin-top: 4px;
    }
    .filmsBar .icoBox{
      background: url("../common/images/a3v.png") no-repeat;
      background-size: 100% 100%;
    }
    .filmsBar.active .icoBox{
      background: url("../common/images/a3w.png") no-repeat;
      background-size: 100% 100%;
    }
    .cinimaBar .icoBox{
      background: url("../common/images/a3n.png") no-repeat;
      background-size: 100% 100%;
    }
    .cinimaBar.active .icoBox{
      background: url("../common/images/a3o.png") no-repeat;
      background-size: 100% 100%;
    }
    .discoverBar .icoBox{
      background: url("../common/images/a3p.png") no-repeat;
      background-size: 100% 100%;
    }
    .discoverBar.active .icoBox{
      background: url("../common/images/a3q.png") no-repeat;
      background-size: 100% 100%;
    }
    .userBar .icoBox{
      background: url("../common/images/a3t.png") no-repeat;
      background-size: 100% 100%;
    }
    .userBar.active .icoBox{
      background: url("../common/images/a3u.png") no-repeat;
      background-size: 100% 100%;
    }
</style>
