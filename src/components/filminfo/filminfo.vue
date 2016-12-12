<template>
  <div class="mainContainer">
    <div class="mainContentContainer">
      <div class="filmInfoTopCtrlContainer" :style="{background: topCtrlBackground}">
          <router-link to="/index">
            <i class="fa fa-arrow-left fa-lg" aria-hidden="true"></i>
          </router-link>
          <div class="filminfotTitleContainer">
              <span class="filmName">{{ filmData.baseData.nm}}</span>
              <span class="filmEnName">{{ filmData.baseData.enm}}</span>
          </div>
          <i class="fa fa-share-square-o fa-lg" aria-hidden="true"></i>
      </div>
      <div class="filmBaseInfoContainer">
        <div class="filmBaseInfoBackImageContainer" :style="{backgroundImage:'url(' + filmData.baseData.img + ')'}"></div>
        <div class="filmBaseInfoInnerBox"></div>
        <div class="filmBaseInfoMainContainer">
            <div class="filmBaseInfoPrevImageContainer">
              <img :src="filmData.baseData.img" alt="">
            </div>
            <div class="filmBaseInfoContentContainer">
              <div class="filmName">{{ filmData.baseData.nm}}</div>
              <div class="filmEnName">{{ filmData.baseData.enm}}</div>
              <div class="filmScore" v-if="filmData.baseData.sc > 0">
                <div class="userScoreContainer">
                    <div class="title">
                      观众评分
                      <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                    <div class="scoreNumContainer">
                        <span class="scoreNum">{{ filmData.baseData.sc}}</span>
                        <span class="scoreAllNum">({{ filmData.baseData.snum >= 10000 ? (filmData.baseData.snum/10000).toFixed(1) + '万' : filmData.baseData.snum}}人评)</span>
                    </div>
                </div>
                <div class="professionalScoreContainer" >
                  <div class="title">
                    专业评分
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                  </div>
                  <div class="scoreNumContainer">
                      <span class="scoreNum">{{filmData.baseData.proScore}}</span>
                      <span class="scoreAllNum">({{filmData.baseData.proScoreNum}}人评)</span>
                  </div>
                </div>
              </div>
              <div class="filmScore" v-else>
                    <span class="wishContainer"><span class="wishNum">{{ filmData.baseData.wish}}</span>人想看</span>
              </div>
              <div class="filmCat">{{ filmData.baseData.cat}}</div>
              <div class="filmTimeLength">
                {{ filmData.baseData.src}} /
                {{ filmData.baseData.dur}}分钟
              </div>
              <div class="filmComeTime">
                {{ filmData.baseData.pubDesc}}
                <i class="fa fa-angle-right" aria-hidden="true" style="margin-left:5px;"></i>
              </div>
            </div>

        </div>
        <div class="filmBaseInfoCtrlContainer">
          <div class="wishBtn">
            <i class="fa fa-heart" aria-hidden="true"></i>
            想看
          </div>
          <div class="scoreBtn ">
            <i class="fa fa-star" aria-hidden="true"></i>
            评分
          </div>
        </div>
      </div>

      <div class="filmSimPanle filmIntroduceContainer">
          <div class="filmIntroduceContentContainer" :class="{active: filmIntrStatus}" >
              {{ filmData.baseData.dra}}
          </div>
          <div class="filmIntroduceCtrlContainer" @click="toggleSlide()">

            <i class="fa fa-angle-down" v-if="!filmIntrStatus" aria-hidden="true"></i>
            <i class="fa fa-angle-up" v-if="filmIntrStatus" aria-hidden="true"></i>
          </div>
      </div>
      <div class="filmSimPanle filmActorContainer">
          <div class="panleHeaderContainer filmActorHeaderContainer">
              <div class="directorColumn" :style="{marginLeft: directorColumnLeft1}" >
                  <span>导演</span>
              </div>
              <div class="actorColumn">
                  <span>演员</span>
                  <span class="more allActor">全部<i class="fa fa-angle-right" aria-hidden="true"></i></span>
              </div>
          </div>
          <div class="panleBodyContaner filmActorContentContainer">
              <ul class="actorListGroup" v-scroll="onScroll1">
                <li class="actorListItem" v-for="item in filmData.actorData.director">
                  <div class="actorImageShowContainer">
                      <img :src="item.avatar.replace(/(\/w.h\/)/igm, '/')" alt="" onerror="this.src='static/images/onerror-actor.png'">
                  </div>
                  <div class="actorNameContainer">
                      {{ item.cnm }}
                  </div>
                  <div class="actorInfilmName">
                        {{ item.roles }}
                  </div>
                </li>
                <li class="actorListItem" v-for="item in filmData.actorData.actor">
                  <div class="actorImageShowContainer">
                      <img :src="item.avatar.replace(/(\/w.h\/)/igm, '/')" alt="" onerror="this.src='static/images/onerror-actor.png'">
                  </div>
                  <div class="actorNameContainer">
                      {{ item.cnm }}
                  </div>
                  <div class="actorInfilmName">
                      {{ item.roles }}
                  </div>
                </li>
              </ul>
          </div>
          <div class="authorWordContainer" v-if="filmData.authorWordData[0]">
              <div class="authorHeader">
                 <span>主创说</span><div class="line"></div>
              </div>
              <div class="authorMainContainer" v-for="item in filmData.authorWordData">
                <div class="authorImageContainer">
                    <img :src="item.avatarurl" alt="">
                </div>
                <div class="authorContentContainer">
                  <div class="authorTitleContainer">
                      <span> <span class="name">{{item.nickName}}</span><span class="info">{{item.vipInfo}}</span></span>
                      <span class="approve"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>{{item.approve}}</span>
                  </div>
                  <div class="content">
                    {{ item.content }}

                  </div>
                </div>
              </div>
          </div>
      </div>
      <div class="filmSimPanle filmMediaContainer">
          <div class="panleHeaderContainer filmMediaHeaderContainer">
              <div class="MediaColumn" :style="{marginLeft: directorColumnLeft2}" >
                  <span>视频</span>
                  <span class="more allMedia">{{filmData.baseData.vnum}}<i class="fa fa-angle-right" aria-hidden="true"></i></span>
              </div>
              <div class="pictureColumn">
                  <span>照片</span>
                  <span class="more allPicture">{{filmData.baseData.pn}}
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                  </span>
              </div>
          </div>
          <div class="panleBodyContaner filmMediaContentContainer">
              <ul class="mediaListGroup" v-scroll="onScroll2">
                <li class="mediaListItem">
                  <div class="mediaImageShowContainer movie">
                      <img :src="filmData.baseData.videoImg" alt="">
                  </div>
                </li>
                <li class="mediaListItem" v-for="item in filmData.baseData.photos">
                  <div class="mediaImageShowContainer">
                      <img :src="item.replace(/(\/w.h\/)/igm, '/').split('@')[0]" alt="" onerror="this.src='static/images/onerror.png'">
                  </div>
                </li>
              </ul>
          </div>
          <div class="musicContainer" v-if="filmData.baseData.musicName">
              <div class="musicHeader">
                 <div class="line"></div>
              </div>
              <div class="musicMainContainer">
                <div class="musicImageContainer">
                  <div class="">
                    <img :src="filmData.baseData.img" alt="" onerror="this.src='static/images/onerror.png'">
                  </div>
                </div>
                <div class="musicContentContainer">
                    <div class="musicContent">
                      <div class="title">
                        电影原声
                      </div>
                      <div class="musicName">
                        {{ filmData.baseData.musicName}}
                      </div>
                    </div>
                    <div class="moreMusic">
                        {{ filmData.baseData.musicNum}}
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                </div>
              </div>
          </div>
      </div>
      <div class="filmSimPanle boxOfficePanle" v-if="filmData.boxOfficeData.firstWeekBox > 0">
        <div class="panleHeaderContainer ">
          <span>票房</span>
          <span><i class="fa fa-angle-right fa-lg" aria-hidden="true"></i></span>
        </div>
        <div class="panleBodyContaner">
            <div class="boxOfficeContainer">
                <div class="simBox">
                  <span class="num">{{filmData.boxOfficeData.lastDayRank}}</span>
                  <span class="intr">昨日票房排行</span>
                </div>
                <div class="simBox">
                  <span class="num">{{filmData.boxOfficeData.firstWeekBox}}</span>
                  <span class="intr">首周票房(万)</span>
                </div>
                <div class="simBox">
                  <span class="num">{{filmData.boxOfficeData.sumBox}}</span>
                  <span class="intr">累计票房(万)</span>
                </div>
            </div>
            <div class="winningContainer" v-if="filmData.winningData[0]">
                <span class="simWins" v-for=" item in filmData.winningData">
                  <img src="static/images/a7b.png" alt="">
                  <span class=simWin>
                    {{item.title}}
                    <br/>
                    <span class="simWinItem" v-for="win in item.items">
                      <span>{{win.title}}</span><br/>
                    </span>
                  </span>
                </span>
            </div>
        </div>
      </div>
      <div class="filmSimPanle datumPanle">
        <div class="panleHeaderContainer ">
          <span>影片资料</span>
          <span class="addDatum">添加资料</span>
        </div>
        <div class="panleBodyContaner ">
          <div class="simDatumBox" v-for="item in filmData.datumData">
            <img :src="item.img" alt="" class="simDatumIco">
            <div class="simDatumContent">
              <div class="title">
                {{ item.title}}
              </div>
              <div class="content">
                {{item.content}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 专业评论 -->
      <div class="filmSimPanle professionalReviewPanle" v-if="filmData.professionalReviewData.data">
        <div class="panleHeaderContainer ">
          <span>专业评论</span>
        </div>
        <div class="panleBodyContaner">
          <div class="simReviewContainer" v-for="item in filmData.professionalReviewData.data">
            <div class="userImageContainer">
              <img :src="item.avatarurl" alt="">
            </div>
            <div class="reviewContentContainer">
              <div class="userInfoContainer">
                <div class="userInfo">
                  <div class="userName">
                    {{item.nick}}
                  </div>
                  <div class="userOccupation">
                    {{item.authInfo}}
                  </div>
                </div>
                <div class="Score">
                    <span class="num">{{item.score * 2}}</span>分
                </div>
              </div>
              <div class="reviewContent">
                {{item.content}}
              </div>
              <div class="reviewBaseInfoContainer">
                <span class="time">{{((new Date().getTime() - new Date(item.time)) / 84000) > 3 ? (new Date(item.time).getMonth()+1) + '-' + (new Date(item.time).getDate()+1) : Math.floor(((new Date().getTime() - new Date(item.time)) / 84000)) + '天前'}}</span>
                <span class="approve">
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  {{item.approve}}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="moreProfessionalReview" v-if="filmData.professionalReviewData.paging">
            <span>查看全部{{filmData.professionalReviewData.paging.total}}条专业评论></span>
        </div>
      </div>
      <!-- 短评评论 -->
      <!-- <div class="filmSimPanle ">
        <div class="panleHeaderContainer ">
          <span>专业评论</span>
        </div>
        <div class="panleBodyContaner">
            11111
        </div>
      </div> -->

    </div>
    <div class="goToBuyBtn">
      立即购买
    </div>
  </div>
</template>

<style scoped lang="scss">
  @function  px2vw($px) {
      @return $px / 1080 * 100vw;
  }
  .mainContainer{
    width: 100%;
    min-height: 100%;
    background: #f5f5f5;
    font-family: "黑体";
    position:relative;
      .mainContentContainer{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        -webkit-overflow-scrolling : touch;
        padding-bottom: 12vw;
      }
      .goToBuyBtn{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 20;
        height: 14vw;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F34D41;
        color: #fff;
        font-size: 16px;
      }
  }
  a{
    color: inherit;
    text-decoration: none;
    outline: none;
  }
  .filmBaseInfoContainer{
    width: 100%;
    height: 73vw;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    color: #fff;
    background: #fff;
      .filmBaseInfoInnerBox{
        height: 10vw;
        width: 100%;
      }
      .filmBaseInfoBackImageContainer{
        top: 50%;
        left: 50%;
        width: 140%;
        height: 140%;
        z-index: 0;
        transform: translate(-50% , -50%);
        position: absolute;
        filter: blur(.6rem);
        -webkit-filter: blur(.6rem);
        background-size: cover;
        background-image: gray;
        background-repeat: no-repeat;
        background-position-y: 40%;
      }
  }
  .filmInfoTopCtrlContainer{
    left: 0;
    top: 0;
    width: 100%;
    height: 10vw;
    z-index: 10;
    box-sizing: border-box;
    padding: 0 2vw;
    position: fixed;
    z-index: 20;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
      .filminfotTitleContainer{
        width: 85%;
        height: 100%;
        box-sizing: border-box;
        padding: 1vw 3vw;
        display: flex;
        justify-content: center;
        flex-direction: column;
        position: relative;
        opacity: 0;
          .filmName{
            font-size: 13px;

          }
          .filmEnName{
            font-size: 12px;
          }
          &::before{
            content: '';
            position: absolute;
            height: 50%;
            width: 1px;
            background: rgba(0,0,0,0.3);
            left: 0;
            top: 25%;
          }
      }
  }
  .filmBaseInfoMainContainer{
    width: 100%;
    height: calc(100% - 25vw);
    z-index: 10;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 4vw;
      .filmBaseInfoPrevImageContainer{
        height: 100%;
        width: 30%;
        border:2px solid #fff;
        box-sizing: border-box;
        position: relative;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
          &::after{
            content: '';
            display: block;
            position: absolute;
            height: 12vw;
            width: 12vw;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: url('../common/images/a5a.png') no-repeat;
            background-size: 100% 100%;
          }
      }
      .filmBaseInfoContentContainer{
        height: 100%;
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
          div{
            display: flex;
            align-items: center;
            font-size: 12px;
            width: 100%;
          }
          .filmName{
            min-height: 7vw;
            font-size: 16px;

          }
          .filmEnName{
            min-height: 5vw;

          }
          .filmScore{
            height: 14vw;
            display: flex;
            justify-content: space-between;
              div{
                height: 100%;
                flex: 0.5;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-around;
                box-sizing: border-box;
                  .title{
                    display: block;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    i{
                      margin-left: 3px;
                      display: block;
                      background: blue;
                      height: 12px;
                      width: 12px;
                      text-align: center;
                      color: #fff;
                      background: rgba(255,255,255,.3);
                      border-radius: 4px;
                    }
                  }
                  .scoreNumContainer{
                    font-size: 10px;
                    display: flex;
                    justify-content: flex-start;
                    flex-direction: row;
                    align-items: baseline;
                      .scoreNum{
                        font-size: 16px;
                        color: #FBC303;
                        margin-right:5px;
                      }
                      .scoreAllNum{
                        font-size: 12px;
                        -webkit-transform-origin-x: 0;
                        -webkit-transform: scale(0.83333);
                      }
                  }
              }
              .userScoreContainer{
                flex: 0.5;
                position: relative;
                &::after{
                  content: '';
                  position: absolute;
                  height: 60%;
                  width: 1px;
                  right: 0;
                  top: 20%;
                  background: rgba(255,255,255,0.3)
                }
              }
              .professionalScoreContainer{
                flex: 0.5;
                padding-left: 5vw;
              }
              .wishContainer{
                color: #FFC600;
                .wishNum{
                  font-size: 14px;
                }
              }
          }
          .filmCat{
            height: 5vw;

          }
          .filmTimeLength{
            height: 5vw;

          }
          .filmComeTime{
              height: 5vw;
          }
      }

  }
  .filmBaseInfoCtrlContainer{
    width: 100%;
    height: 10vw;
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 3vw;
    box-sizing: border-box;
      div{
        width: 45%;
        height: 10vw;
        background: rgba(255,255,255,.4);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        border-radius: 4px;
        i{
          margin: 0 5px;
        }
        &.actived>i{
          color: #F34D41;
        }
      }
  }
  .filmIntroduceContainer{
    display: block;
    justify-content: flex-start;
    flex-direction: column;
    background: #fff;
      .filmIntroduceContentContainer{
        width: 100%;
        height: 19vw;
        overflow: hidden;
        box-sizing: border-box;
        padding: 3vw 2vw 2vw 2vw;
        font-size: 13px;
        line-height:5.5vw;
        &.active{
          height: auto;
        }
      }
      .filmIntroduceCtrlContainer{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5vw;
        width: 100%;
        color: #ddd;
        i{
          font-size: 22px;
        }
      }
  }
  .filmSimPanle{
    width: 100%;
    min-height: 30px;
    background: #fff;
    margin-bottom: 5vw;
    box-sizing: border-box;
    padding: 1vw;
      .panleHeaderContainer{
        height: px2vw(100);
        width: 100%;
      }
      .panleBodyContaner{
        width: 100%;
        box-sizing: border-box;
        // height:px2vw(200);
      }
  }
  .filmActorHeaderContainer{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    padding: 0 px2vw(35);
    font-size: 13px;
    .directorColumn{
      width: px2vw(250);
    }
    .actorColumn{
      width: 100%;
      display: flex;
      justify-content: space-between;
        .allActor{
          color: #ccc;
          i{
            margin-left: 4px;
          }
        }
    }
  }
  .filmActorContentContainer{
    width: 100%;
    height: px2vw(360);
    overflow-x: auto;
      .actorListGroup{
        display: block;
        width: auto;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
          .actorListItem{
            display: block;
            float: left;
            list-style: none;
            height: 100%;
            width: px2vw(200);
            margin: 0 0.8vw;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .actorImageShowContainer{
              width: 100%;
              height: px2vw(260);
              img{
                display: block;
                height: 100%;
                width: 100%;
              }
            }
            .actorNameContainer{
              font-size: 12px;
              // height: 5vw;
              text-overflow:ellipsis;
              overflow:hidden;
              white-space:nowrap;
            }
            .actorInfilmName{
              font-size: 12px;
              // height: 5vw;
              text-overflow:ellipsis;
              overflow:hidden;
              white-space:nowrap;
              color: #999;
            }
          }
      }
  }
  // 主创说
  .authorWordContainer{
    width: 100%;
    margin-top: 2vw;
    .authorHeader{
      width: 100%;
      height: px2vw(60);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 1vw;
       span{
         font-size: 13px;
         width: 14vw;
       }
       .line{
         height: 1px;
         width: 100%;
         background: #ddd;
       }
    }
    .authorMainContainer{
      width: 100%;
      height: 20vw;
      display: flex;
      justify-content: space-around;
      padding: 2vw 0 0 0;
      .authorImageContainer{
        width: px2vw(110);
        height: px2vw(110);
        border-radius: 50%;
        overflow: hidden;
        img{
          display: block;
          height: 100%;
          width: 100%;
        }
      }
      .authorContentContainer{
        width: px2vw(880);
        height: auto;
        font-size: 14px;
        .authorTitleContainer{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 8vw;
          span{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            span.name{
                font-size: 16px;
            }
            span.info{
              background: #EC4832;
              color: #fff;
              font-size: 10px;
              padding: 2px 4px;
              border-radius: 4px;
              margin-left: 5px;
            }
          }
          span.approve{
            color: #ccc;
            i{
              margin-right: 5px;
            }
          }
        }
        .content{
          height: 10vw;
          line-height: 5vw;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 13px;
        }
      }
    }
  }
  // 媒体照片
  .filmMediaHeaderContainer{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    padding: 0 px2vw(35);
    font-size: 13px;
    .MediaColumn{
      width: px2vw(380);
      display: flex;
      justify-content: space-between;
      padding-right: 2vw;
      box-sizing: border-box;
      .allMedia{
        color: #ccc;
        i{
          margin-left: 4px;
        }
      }
    }
    .pictureColumn{
      width: 100%;
      display: flex;
      justify-content: space-between;
        .allPicture{
          color: #ccc;
          i{
            margin-left: 4px;
          }
        }
    }
  }
  .filmMediaContentContainer{
    width: 100%;
    height: px2vw(230);
    overflow-x: auto;
      .mediaListGroup{
        display: block;
        width: auto;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
          .mediaListItem{
            display: block;
            float: left;
            list-style: none;
            height: 100%;
            width: px2vw(280);
            margin: 0 0.8vw;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .mediaImageShowContainer{
              width: 100%;
              height: px2vw(200);
              position: relative;
              img{
                display: block;
                height: 100%;
                width: 100%;
              }
              &.movie::after{
                content: '';
                display: block;
                position: absolute;
                height: 6vw;
                width: 6vw;
                right: 10%;
                bottom: 10%;
                background: url('../common/images/a5a.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }
      }
  }
  // 电影原声
  .musicContainer{
    width: 100%;
    margin-top: 0vw;
    .musicHeader{
      width: 100%;
      height: px2vw(20);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 1vw;
       span{
         font-size: 13px;
         width: 14vw;
       }
       .line{
         height: 1px;
         width: 100%;
         background: #ddd;
       }
    }
    .musicMainContainer{
      width: 100%;
      height: 16vw;
      display: flex;
      justify-content: space-around;
      padding:0;
      align-items: center;
      .musicImageContainer{
        width: px2vw(140);
        height: px2vw(140);
        position: relative;
        border:1px solid #ddd;
        box-sizing: border-box;
        div{
          height: 100%;
          width: 100%;
          position: relative;
          z-index: 1;
          overflow: hidden;
          background: #fff;
          img{
            display: block;
            height: auto;
            width: 100%;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }

        &::after{
          content: '';
          height: px2vw(110);
          width: px2vw(110);
          position: absolute;
          right: px2vw(-40);
          top: px2vw(15);
          background: #363642;
          border-radius: 50%;
          z-index: 0;
        }
      }
      .musicContentContainer{
        width: px2vw(800);
        height: px2vw(140);
        display: flex;
        justify-content: space-between;
        align-items: center;
          .musicContent{
            height: 80%;
            width: 80%;
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            box-sizing: border-box;
            padding-left: 2vw;
            .title{
                font-size: 14px;
            }
            .musicName{
                color: #999;
                font-size: 13px;
            }
          }
          .moreMusic{
              color: #ccc;
              i {
                color: #ddd;
              }
          }
      }
    }
  }
  // 票房
  .boxOfficePanle{
    padding: 0;
    .panleHeaderContainer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 3vw;
      box-sizing: border-box;
      span{
        font-size: 13px;
        i{
          color: #ccc;
        }
      }
    }
    .panleBodyContaner{
      min-height: 10vw;
        .boxOfficeContainer{
          width: 100%;
          height: px2vw(200);
          display: flex;
          justify-content: space-around;
          align-items: center;
            .simBox{
              height: 80%;
              width: 30%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
                span.num{
                  color: #D54544;
                  font-size: 16px;
                  line-height: 1.5;
                }
                span.intr{
                  color: #999;
                  font-size: 13px;
                  line-height: 1.5;

                }
            }
        }
        .winningContainer{
          border-top: 1px solid #ddd;
          min-height: px2vw(100);
          width: 100%;
            .simWins{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              min-height: px2vw(100);
              padding:  2vw 3vw;
              img{
                height: px2vw(50);
                width: auto;
                margin: 0 1vw 0 0;
              }
              span.simWin{
                color: #686868;
                font-size: 14px;
                line-height: 1.4;
                font-size: 14px;
                span.simWinItem{
                  color: #999;
                  font-size: 13px;
                }
              }
            }
        }
    }
  }
  // 影片资料
  .datumPanle{
    padding: 0;
    .panleHeaderContainer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 2vw;
      font-size: 13px;
      border-bottom: 1px solid #ddd;
        span.addDatum{
          border:1px solid #F34D41;
          padding: 3px 5px;
          border-radius:10px;
          font-size: 12px;
        }
    }
    .panleBodyContaner{
      min-height: 30vw;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      box-sizing: border-box;
        .simDatumBox{
          width: 50%;
          height: px2vw(170);
          box-sizing: border-box;
          display: flex;
          justify-content: space-around;
          align-items: center;
          &:nth-child(2n + 1){
            border-right: 1px solid #ddd;
          }
          &:nth-child(n){
            border-bottom: 1px solid #ddd;
          }
          .simDatumIco{
            width: px2vw(70);
            height: px2vw(70);
            display: block;
          }
          .simDatumContent{
            width: 70%;
            .title{
                line-height: 1.5;
                font-size: 16px;
            }
            .content{
              text-overflow:ellipsis;
              overflow:hidden;
              white-space:nowrap;
              font-size: 12px;
              line-height: 1.5;
              color: #999;
            }
          }
        }
    }
  }
  // 专业评论
  .professionalReviewPanle{
    padding: 0;
      .panleHeaderContainer{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding: 0 2vw;
        border-bottom: 1px solid #ddd;
      }
      .panleBodyContaner{
        width: 100%;
        min-height: 30vw;
        .simReviewContainer{
          width: 100%;
          height: auto;
          display: flex;
          justify-content: space-around;
          box-sizing: border-box;
          padding:1vw 2vw;
          &:not(:last-child) .reviewContentContainer{
            border-bottom: 1px solid #ddd;
          }
          .userImageContainer{
            width: px2vw(110);
            height: px2vw(110);
            border-radius: 50%;
            overflow: hidden;
            img{
              display: block;
              height: 100%;
              width: 100%;
            }
          }
          .reviewContentContainer{
            width: 84%;
            height: auto;

            .userInfoContainer{
              width: 100%;
              height: px2vw(150);
              display: flex;
              justify-content: space-between;
              align-items: center;
              box-sizing: border-box;
              padding: 0 2vw;
              .userInfo{
                width: 80%;
                .userName{
                  line-height: 1.5;
                  font-size: 15px;
                }
                .userOccupation{
                  font-size: 13px;
                  line-height: 1.5;
                  color: #999;
                  text-overflow:ellipsis;
                  overflow:hidden;
                  white-space:nowrap;
                }
              }
              .Score{
                font-size: 12px;
                color: #FFAE00;
                .num{
                  font-size: 20px;
                }
              }
            }
            .reviewContent{
              box-sizing: border-box;
              padding: 0 2vw;
              font-size: 14px;
              line-height: 1.3;
            }
            .reviewBaseInfoContainer{
              width: 100%;
              height: px2vw(110);
              display: flex;
              justify-content: space-between;
              align-items: center;
              box-sizing: border-box;
              padding: 0 2vw;
              color: #999;
              font-size: 13px;
              .time{}
              .approve{}
            }
          }
        }
      }
      .moreProfessionalReview{
        height: px2vw(130);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #ddd;
        span{
          font-size: 14px;
          color: #F34D41;
        }
      }
  }
</style>

<script>
import $ from 'jquery'
var getFilmInfo = (id, that) => {
  let filmDatas = {
        baseData: {},               // 基础信息
        actorData: [],              // 演员信息
        authorWordData: {},         // 主创说信息
        boxOfficeData: {},          // 票房信息
        winningData: {},            // 获奖信息
        datumData: {},              // 影片资料信息
        professionalReviewData: {}, // 专业评价信息
        shortReviewData: {},        // 短评信息
        longReviewData: {},         // 长评信息
        relatedInformationData: {}, // 相关资讯
        relatedTopic: {},           // 相关话题
        relatedFilms: {}            // 相关影片
  }
  let apiUrl = {
    baseData: '/mmdb/movie/v5/' + id + '.json',
    actorData: '/mmdb/v7/movie/' + id + '/celebrities.json',
    authorWordData: '/mmdb/comments/major/v2/info/' + id + '.json',
    boxOfficeData: '/mmdb/movie/' + id + '/feature/v1/mbox.json',
    winningData: '/mmdb/movie/' + id + '/feature/awards.json',
    datumData: '/mmdb/movie/' + id + '/feature/v2/list.json',
    professionalReviewData: '/mmdb/comments/pro/movie/' + id + '.json?limit=3',
    shortReviewData: '/mmdb/comments/movie/v2/' + id + '.json',
    longReviewData: '/sns/movie/' + id + '/filmReview/top.json',
    relatedInformationData: '/sns/news/v3/type/0/target/' + id + '/top.json',
    relatedTopic: '/sns/0/' + id + '/v2/hotTopics.json',
    relatedFilms: '/mmdb/movie/' + id + '/feature/relatedFilm.json'
  }
  // 基本信息baseData
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.baseData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          // console.log(response.body.data.movie)
          filmDatas.baseData = response.body.data.movie
          filmDatas.baseData.img = filmDatas.baseData.img.replace(/(\/w.h\/)/igm, '/375.220/')
        }, (response) => {
          console.log('error')
        })
    // 演员信息actorData
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.actorData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          // console.log(response.body.data)
          filmDatas.actorData = {
            director: response.body.data[0],
            actor: response.body.data[1]
          }
        }, (response) => {
          console.log('error')
        })
    // 主创说信息authorWordData
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.authorWordData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          // console.log(response.body.data.major)
          filmDatas.authorWordData = response.body.data.major
        }, (response) => {
          console.log('error')
        })
    // 票房信息boxOfficeData
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.boxOfficeData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          // console.log(response.body.mbox)
          filmDatas.boxOfficeData = response.body.mbox
        }, (response) => {
          console.log('error')
        })
    // 获奖信息winningData
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.winningData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          console.log(response.body.data)
          filmDatas.winningData = response.body.data
        }, (response) => {
          console.log('error')
        })
    // 影片资料信息datumData
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.datumData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          // console.log(response.body.data)
          filmDatas.datumData = response.body.data
        }, (response) => {
          console.log('error')
        })
    // 专业评论信息professionalReviewData
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.professionalReviewData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          console.log(response.body)
          filmDatas.professionalReviewData = response.body
        }, (response) => {
          console.log('error')
        })
    // 短评信息shortReviewData
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.shortReviewData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          // console.log(response.body)
          filmDatas.shortReviewData = response.body
        }, (response) => {
          console.log('error')
        })
    // 长评信息longReviewData
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.longReviewData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          // console.log(response.body.data)
          filmDatas.longReviewData = response.body.data
        }, (response) => {
          console.log('error')
        })
    // 相关资讯信息relatedInformationData
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.relatedInformationData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          // console.log(response.body.data.newsList)
          filmDatas.relatedInformationData = response.body.data.newsList
        }, (response) => {
          console.log('error')
        })
    // 相关话题信息relatedTopic
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.relatedTopic,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          // console.log(response.body.data.topics)
          filmDatas.relatedTopic = response.body.data.topics
        }, (response) => {
          console.log('error')
        })
    // 相关电影信息relatedFilms
    that.$http({
            method: 'GET',
            url: '/api' + apiUrl.relatedFilms,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
          // console.log(response.body.data[0].items)
          filmDatas.relatedFilms = response.body.data[0].items
        }, (response) => {
          console.log('error')
        })
    // console.log(filmDatas.datumData)
    return filmDatas
}

window.onscroll = () => {
  let top = document.documentElement.scrollTop || document.body.scrollTop
  if (top < 200) {
    let opacity = top / 200
    document.querySelector('.filmInfoTopCtrlContainer').style.background = 'rgba(243,77,65,' + opacity + ')'
    document.querySelector('.filminfotTitleContainer').style.opacity = opacity
    // console.log(opacity)
  } else {
    document.querySelector('.filmInfoTopCtrlContainer').style.background = 'rgba(243,77,65,1)'
    document.querySelector('.filminfotTitleContainer').style.opacity = 1
  }
}

$('.filmActorContentContainer .actorListGroup').offset()
export default {
  name: 'filminfo',
  data () {
    return {
          filmData: {
          baseData: {},               // 基础信息
          actorData: [],              // 演员信息
          authorWordData: {},         // 主创说信息
          boxOfficeData: {},          // 票房信息
          winningData: {},            // 获奖信息
          datumData: {},              // 影片资料信息
          professionalReviewData: {}, // 专业评价信息
          shortReviewData: {},        // 短评信息
          longReviewData: {},         // 长评信息
          relatedInformationData: {}, // 相关资讯
          relatedTopic: {},           // 相关话题
          relatedFilms: {}            // 相关影片
        },
        filmIntrStatus: false,
        topCtrlBackground: 'rgba(255,0,0,0)',
        directorColumnLeft1: '0px',
        directorColumnLeft2: '0px'
    }
  },
  components: {
  },
  methods: {
    toggleSlide () {
      console.log('111')
      this.filmIntrStatus = !this.filmIntrStatus
    },
    onScroll1 (e, position) {
      this.position = position
      if (position.scrollLeft < 300) {
        // console.log(position.scrollLeft)
        this.directorColumnLeft1 = -position.scrollLeft + 'px'
      } else {
        this.directorColumnLeft1 = '-300px'
      }
    },
    onScroll2 (e, position) {
      this.position = position
      if (position.scrollLeft < 300) {
        // console.log(position.scrollLeft)
        this.directorColumnLeft2 = -position.scrollLeft + 'px'
      } else {
        this.directorColumnLeft2 = '-300px'
      }
    }
  },
  created () {
    console.log('created')
    let id = this.$route.params.id
    // console.log('id:' + id)
    this.filmData = getFilmInfo(id, this)
    // console.log(this.filmData.authorWordData)
  }
}
</script>
