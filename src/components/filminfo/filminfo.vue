<template>
  <div class="mainContainer">
    电影详情
    <router-link to="/index">前往首页</router-link>

  </div>
</template>

<script>
import cheerio from 'cheerio'
var exchangeHtmlToJson = (str) => {
  let $ = cheerio.load(str)
  // console.log('asss' + $('.navbar-title').text())
  let movieInfo = {}
  movieInfo.title = $('.navbar-title').text()
  movieInfo.preimg = $('.movie-cover a img').attr('src')
  movieInfo.movieBackground = $('.movie-background').css('background-image')
  movieInfo.name = $('.movie-name').text()
  movieInfo.ename = $('.movie-ename').text()
  movieInfo.score = {
    'userScore': {
      'scoreVal': $('.movie-score .left-score .score-val').text(),
      'scoreNum': $('.movie-score .left-score .score-num span').eq(1).text()
    },
    'professionScore': {
      'scoreVal': $('.movie-score .right-score .score-val').text(),
      'scoreNum': $('.movie-score .right-score .score-num span').eq(1).text()
    }
  }
  movieInfo.category = $('.movie-category .movie-cat').text().split(',')
  movieInfo.releaseArea = $('.movie-content-row span').eq(0).text()
  movieInfo.timeLength = $('.movie-content-row span').eq(2).find('span').eq(0).text() + '分钟'
  movieInfo.releaseTime = $('.movie-content-row').eq(1).text()
  movieInfo.expanderContent = $('.text-expander-content p').text()
  var movieCelebrities = $('.movie-celebrities').find('li')
  var movieMedia = $('.movie-stages').find('li')
  movieInfo.movieCelebritiesArr = []
  movieInfo.movieMediaArr = []
  for (let key in movieCelebrities) {
    let celebritiesLink = movieCelebrities.eq(key).find('a').attr('href')
    let celebritiesImage = movieCelebrities.eq(key).find('a img.img').attr('src')
    let celebritiesName = movieCelebrities.eq(key).find('a span').eq(0).text()
    let celebritiesNameRole = movieCelebrities.eq(key).find('a span.movie-celebrities-roles').text()
    if (celebritiesLink && celebritiesImage && celebritiesName && celebritiesNameRole) {
      movieInfo.movieCelebritiesArr.push({
        celebritiesLink,
        celebritiesImage,
        celebritiesName,
        celebritiesNameRole
      })
    }
  }
  for (let key in movieMedia) {
    var media = movieMedia.eq(key).hasClass('video') ? 'video' : 'picture'
    let mediaLink = movieMedia.eq(key).find('a').attr('href')
    console.log(mediaLink)
    let mediaImage = movieMedia.eq(key).find('a img.img').attr('src')
    // let celebritiesName = movieStages.eq(key).find('a span').eq(0).text()
    // let celebritiesNameRole = movieStages.eq(key).find('a span.movie-celebrities-roles').text()
    if (mediaLink && media && mediaImage) {
      movieInfo.movieMediaArr.push({
        media,
        mediaLink,
        mediaImage
      })
    }
  }
  return movieInfo
}
export default {
  name: 'filminfo',
  components: {
  },
  created () {
    console.log('created')
    let id = this.$route.params.id
    console.log('id:' + id)
    this.$http({
            method: 'GET',
            url: '/api/movie/' + id + '?_v_=yes',
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            let data = exchangeHtmlToJson(response.body)
            console.log(data)
        }, (response) => {
          // error callback
          console.log('error')
        })
  }
}
</script>

<style scoped>
  .mainContainer{
    width: 100%;
    height: 100%;
    background: green;
  }
</style>
