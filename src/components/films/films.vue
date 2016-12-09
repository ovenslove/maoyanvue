<template>
  <div class="mainContainer">
    <!-- 电影推荐 -->
     <!-- <router-link to="/filminfo">前往详情页</router-link> -->
     <!-- <div class="getInfo" v-on:click="getJson()">
        获取数据
     </div> -->
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
     <div class="swiper-container">
         <div class="swiper-wrapper">
           <div class="swiper-slide">
             <div class="searchContainer">
                  <input type="text" name="search" value="" placeholder="找影视剧、影人、影院" class="searchInput">
             </div>
             <div class="bannerContainer">
                <img :src="bannerImagesUrl" alt=""  class="bannerImages"/>
             </div>
             <ul class="movieListGroup">
               <li class="movieListItem" v-for="movie in moviesData" >
                 <div class="moviePreviewImagesContainer">
                      <img :src="movie.img" alt="" />
                 </div>
                 <div class="movieContentContainer">
                      <div class="movieInfoContainer">
                        <router-link :to="'/filminfo/'+movie.id">
                          <div class="movieTtileContainer">{{movie.nm}}</div>
                          <div class="movieScoreContainer">
                            评分 <span>{{movie.sc}}</span></div>
                          <div class="movieWordsContainer">{{movie.scm}}</div>
                          <div class="movieCinemaContainer">{{movie.showInfo}}</div>
                        </router-link>
                      </div>
                      <div class="movieBookBtn">
                          购票
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
      bannerImagesUrl: 'static/images/banner.jpg',
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
            url: '/api/movie/list.json?limit=20',
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            emulateJSON: true
        }).then((response) => {
            console.log(JSON.parse(response.body).data.movies)
            that.moviesData = JSON.parse(response.body).data.movies
        }, (response) => {
          // error callback
          console.log('error')
        })
  },
  mounted () {
     console.log('挂载好了')
     var that = this
     var mySwiper = new Swiper('.swiper-container', {
       direction: 'horizontal',
       onSlideChangeStart () {
         console.log(mySwiper.activeIndex)
         that.swiperActiveIndex = mySwiper.activeIndex
       }
     })
   },
  methods: {
    getJson () {
      console.log('getJson')
    }
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
                  }
                  .movieScoreContainer{
                    height: 6vw;
                    line-height: 6vw;
                      span{
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
                border: 1px solid #D23E34;
                margin: auto;
                padding: 1vw 2vw;
                border-radius: 4px;
                font-size: 14px;
                color: #D23E34;
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
      .bannerImages{
        display: block;
        width: 100%;
        height: 100%;
      }
  }
</style>
