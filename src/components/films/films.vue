<template>
  <div class="mainContainer">
    电影推荐
     <router-link to="/filminfo">前往详情页</router-link>
     <div class="getInfo" v-on:click="getJson()">
        获取数据
     </div>
  </div>
</template>

<script>
export default {
  name: 'films',
  components: {
  },
  created () {
    console.log('已加载')
    this.$http({
            method: 'GET',
            url: '/api/movie/list.json?limit=10',
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            emulateJSON: true
        }).then((response) => {
            console.log(JSON.parse(response.body).data.movies)
        }, (response) => {
          // error callback
          console.log('error')
        })
  },
  methods: {
    getJson () {
      console.log('getJson')
    }
  }
}
</script>

<style scoped>
  .mainContainer{
    width: 100%;
    height: 100%;
    background: pink;
  }
</style>
