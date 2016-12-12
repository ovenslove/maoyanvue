<template>
  <div class="mainContainer">
     <div class="indexNavBarContainer">
          <div class="locationContainer">
              <span>广州</span><i class="fa fa-angle-down"></i>
          </div>
          <div class="swiperNavBarContainer">
            <div class="simSwiperNavItem" :class="{active: swiperActiveIndex==0 }">热映</div>
            <div class="simSwiperNavItem" :class="{active: swiperActiveIndex==1 }">待映</div>
              <div class="simSwiperNavItem" :class="{active: swiperActiveIndex==2 }">找片</div>
          </div>
     </div>
     <div class="swiper-container mainSwiper">
         <div class="swiper-wrapper">
           <div class="swiper-slide">
             <div class="searchContainer">
                  <input type="text" name="search" value="" placeholder="找影视剧、影人、影院" class="searchInput">
             </div>
             <div class="bannerContainer">
                <!-- <img :src="bannerImagesUrl" alt=""  class="bannerImages"/> -->
                <div class="swiper-container bannerSwiper">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="banner in bannerData">
                        <img class="bannerImages" :src="banner.imgUrl" alt="">
                      </div>
                    </div>
                </div>
             </div>
             <ul class="movieListGroup">
               <li class="movieListItem" v-for="movie in moviesData" >
                 <div class="moviePreviewImagesContainer">
                      <img :src="movie.img.replace(/(\/w.h\/)/igm, '/165.220/')" alt="" />
                 </div>
                 <div class="movieContentContainer">
                      <div class="movieInfoContainer">
                        <router-link :to="'/filminfo/'+movie.id">
                          <div class="movieTtileContainer">
                            {{movie.nm}}
                            <span v-if="movie.ver === '3DIMAX'">
                                <span class="markContainer">
                                  <span class="mark-1">3D</span>
                                  <span class="mark-2">IMAX</span>
                                </span>
                            </span>
                            <span v-if="movie.ver === '2DIMAX'">
                                <span class="markContainer">
                                  <span class="mark-1">2D</span>
                                  <span class="mark-2">IMAX</span>
                                </span>
                            </span>
                            <span v-if="movie.ver === '2D3D'">
                                <span class="markContainer">
                                  <span class="mark-1">2D</span>
                                  <span class="mark-2">3D</span>
                                </span>
                            </span>
                            <span v-if="movie.ver === '3D'">
                              <span class="markContainer">
                                <span class="mark-1">3D</span>
                              </span>
                            </span>
                          </div>
                          <div class="movieScoreContainer">
                            <div  v-if="movie.sc > 0">
                              观众 <span class="num">{{movie.sc}}</span>
                                <span v-if="movie.proScore > 0">
                                 | 专业 <span class="num">{{movie.proScore}}</span>
                                </span>
                            </div>
                            <div v-else>
                              <span class="num">{{movie.wish}}</span>人想看
                            </div>
                          </div>
                          <div class="movieWordsContainer">{{movie.scm}}</div>
                          <div class="movieCinemaContainer">{{movie.showInfo}}</div>
                        </router-link>
                      </div>
                      <div class="movieBookBtn bookNow" v-if="movie.sc > 0">
                            购票
                      </div>
                      <div class="movieBookBtn bookNext" v-else>
                            预售
                      </div>

                 </div>
               </li>
             </ul>
           </div>
           <div class="swiper-slide">
             <div class="searchContainer">
                  <input type="text" name="search" value="" placeholder="找影视剧、影人、影院" class="searchInput">
             </div>
           </div>
           <div class="swiper-slide">
             <div class="searchContainer">
                  <input type="text" name="search" value="" placeholder="找影视剧、影人、影院" class="searchInput">
             </div>
           </div>
         </div>
    </div>

  </div>
</template>

<script>
import Swiper from '../../../static/Swiper-3.4.0/js/swiper.min.js'
export default {
  name: 'films',
  data () {
    return {
      swiperActiveIndex: 0,
      bannerData: [],
      moviesData: []
    }
  },
  components: {
  },
  created () {
    console.log('已加载')
    var that = this
    this.$http({
            method: 'GET',
            url: '/ad/api/v3/adverts?cityid=20&category=11&version=7.6.0&new=0&app=movie&clienttp=android&uuid=963D1938E5007A1BCEC5A2D5BE928E3B3C42DFA3E7DA23A79000D1696D2C43B1&devid=867993025035633&uid=43325925&movieid=&partner=1&apptype=1&smId=&utm_campaign=AmovieBmovieCD100&movieBundleVersion=7601&utm_source=xiaomi&utm_medium=android&utm_term=7.6.0&utm_content=867993025035633&ci=20&net=255&dModel=MI%20NOTE%20LTE&lat=23.162082&lng=113.32446',
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            emulateJSON: true
        }).then((response) => {
            // console.log(response.body.data)
            that.bannerData = response.body.data
        }, (response) => {
          console.log('error')
        })
    this.$http({
            method: 'GET',
            url: '/api/mmdb/movie/v3/list/hot.json?ci=20&limit=12',
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            emulateJSON: true
        }).then((response) => {
            // console.log(response.body.data.hot)
            for (let item in response.body.data.hot) {
              let val = response.body.data.hot[item].ver
              // console.log('原字符--------------------------' + val)
              // console.log('匹配结果------------------------' + val.match(/3D\/IMAX/igm))
              if (val.match(/3d\/imax/igm) != null) {
                response.body.data.hot[item].ver = '3DIMAX'
              } else if (val.match(/2D\/IMAX/igm) != null) {
                response.body.data.hot[item].ver = '2DIMAX'
              } else if (val.match(/2D\/3D/igm) != null) {
                response.body.data.hot[item].ver = '2D3D'
              } else if (val.match(/3D/igm) != null) {
                response.body.data.hot[item].ver = '3D'
              } else if (val.match(/2D/igm) != null) {
                response.body.data.hot[item].ver = '2D'
              }
              // console.log('修改过的----------------------------' + val)
              // console.log(response.body.data.hot[item].ver)
            }

            that.moviesData = response.body.data.hot
        }, (response) => {
          console.log('error')
        })
  },
  mounted () {
     console.log('挂载好了')
     var that = this
     var mainSwiper = new Swiper('.mainSwiper', {
       direction: 'horizontal',
       onSlideChangeStart () {
         console.log(mainSwiper.activeIndex)
         that.swiperActiveIndex = mainSwiper.activeIndex
       }
     })
     /* eslint-disable no-new */
    new Swiper('.bannerSwiper', {
       direction: 'horizontal',
       paginationClickable: true,
       autoplay: 5000,
       centeredSlides: true,
       observer: true,
       observeParents: true,
       autoplayDisableOnInteraction: false,
       onSlideChangeStart () {
       }
     })
   },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  @import '/static/Swiper-3.4.0/css/swiper.min.css';
  a{
    text-decoration: none;
    color: inherit;
  }
  .mainContainer{
    width: 100%;
    height: 100%;
  }
  .indexNavBarContainer{
    position: relative;
    width: 100%;
    height: 12vw;
    background: #D23E34;
    display: flex;
    justify-content: center;
    align-items: center;
      .swiperNavBarContainer{
        width: 50vw;
        height: 8vw;
        background: #B31E18;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 4px;
        display: flex;
        justify-content: space-between;
          .simSwiperNavItem{
            flex: 0.32;
            border-radius: 4px;
            line-height: calc(8vw - 8px);
            color: #fff;
            font-size: 12px;
              &.active{
                background: #fff;
                color: #B31E18;
              }
          }
      }
      .locationContainer{
        height: 8vw;
        width: auto;
        max-width: 16vw;
        position: absolute;
        left: 3vw;
        font-size: 12px;
        color: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
          span{
            max-width: 12vw;
            text-overflow:ellipsis;
            overflow:hidden;
            white-space:nowrap;
          }
          i{
            margin-left: 0.5vw;
          }
      }
  }
  .movieListGroup{
    width: 100%;
    height: auto;
    min-height: 300px;
      .movieListItem{
        width: 100%;
        height: 25vw;
        border-top: 1px solid #ddd;
        background: #fff;
        list-style: none;
        box-sizing: border-box;
        padding: 2vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
          .moviePreviewImagesContainer{
            width: 16vw;
            height: 20vw;
            position: relative;
            &::after{
              content: '';
              display: block;
              position: absolute;
              height: 6.5vw;
              width: 6.5vw;
              left: 50%;
              top: 50%;
              background: red;
              transform: translate(-50% , -50%);
              background: url('../common/images/a5a.png') no-repeat;
              background-size: 100% 100%;
            }
            img{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .movieContentContainer{
            width: 78vw;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
              .movieInfoContainer{
                width: 60vw;
                height: 100%;
                // background: pink;
                text-align: left;
                font-size: 12px;
                color: #333;
                  .movieTtileContainer{
                    font-size: 14px;
                    height: 6vw;
                    line-height: 6vw;
                    color: #000;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                      .markContainer{
                        font-size: 10px;
                        display: flex;
                        margin-left: 5px;
                        align-items: center;
                          span{
                            padding: 0px 3px;
                            display: inline-block;
                            height: 14px;
                            line-height: 14px;
                            box-sizing: border-box;
                            align-items: center;
                          }
                          span.mark-1{
                            background: #8AB9CD;
                            color: #fff;
                            border: 1px solid #8AB9CD;
                            border-top-left-radius: 3px;
                            border-bottom-left-radius: 3px;
                          }
                          span.mark-2{
                            background: #fff;
                            color: #8AB9CD;
                            border-top: 1px solid #8AB9CD;
                            border-right: 1px solid #8AB9CD;
                            border-bottom: 1px solid #8AB9CD;
                            border-top-right-radius: 3px;
                            border-bottom-right-radius: 3px;
                          }
                      }
                  }
                  .movieScoreContainer{
                    height: 6vw;
                    line-height: 6vw;
                      span.num{
                        color: #F2B42B;
                        font-size: 14px;
                      }
                  }
                  .movieWordsContainer{
                    height: 4.5vw;
                    line-height: 4.5vw;
                  }
                  .movieCinemaContainer{
                    height: 4.5vw;
                    line-height: 4.5vw;
                  }
              }
              .movieBookBtn{
                margin: auto;
                padding: 1vw 2vw;
                border-radius: 4px;
                font-size: 14px;
                  &.bookNow{
                    color: #D23E34;
                    border: 1px solid #D23E34;
                  }
                  &.bookNext{
                    color: #159df1;
                    border: 1px solid #159df1;
                  }
              }
          }
      }
  }
  .swiper-container{
    width: 100%;
    height: calc(100% - 12vw);
      .swiper-slide{
        overflow: auto;
        -webkit-overflow-scrolling : touch;
      }
  }

  .searchContainer{
    width: 100%;
    height: 10vw;
    background: #D23E34;
    display: flex;
    justify-content: center;
    align-items: center;
      .searchInput{
        height: 7vw;
        width: 94vw;
        border-radius: 4vw;
        box-sizing: border-box;
        padding: 1vw 4vw;
        outline: none;
        font-size: 12px;
        text-align: center;
          &:focus{
            text-align: left;
          }
      }
  }
  .bannerContainer{
    width: 100%;
    height: 24vw;
      .bannerSwiper{
        width: 100%;
        height: 100%;
          .bannerImages{
            display: block;
            width: 100%;
            height: 100%;
          }
      }
  }
</style>
