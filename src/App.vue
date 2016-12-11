<template>
  <div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view>

    </router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style scoped>
  #app{
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
  }
</style>
