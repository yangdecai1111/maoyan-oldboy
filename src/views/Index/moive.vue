<template>
  <div class="page-index-movie">
    <h1 class="nav-header">猫眼电影</h1>
    <div class="nav-tabs">
      <van-tabs v-model="active" class="nav-tabs" ref="mytabs">
        <router-link to="/cinema"  class="nav-left">
          <p class="nav-left-font">深圳</p>
          <span>▼</span>
        </router-link>
        <router-link to="/cinema"  class="nav-left">
          <p class="nav-left-font">深圳</p>
          <span>▼</span>
        </router-link>
        <van-tab disabled></van-tab>
        <van-tab title="正在热映">
          <ul class="film-list"
          v-for="todo in filmList"
          :key="todo.id"
          >
            <li class="film-item">
              <img class="film-img" :src='todo.img' alt="">
              <div class="film-info">
                <p class="film-info-name">{{todo.nm}}</p>
                <p v-if="todo.globalReleased">观众评分 <span class="actors-font">{{todo.sc}}</span>  </p>
                <p v-else><span class="actors-font">{{todo.wish}}</span> 人想看 </p>
                <p class="film-info-detail font-color">主演：{{todo.star}}</p>
                <p class="film-info-ellipsis font-color">{{todo.showInfo}} </p>
              </div>
              <div class="film-buy" :style="{'background':todo.globalReleased ? 'red' : 'blue'}">{{todo.globalReleased?'购票':'预售'}}</div>
            </li>
          </ul>
          </van-tab>
        <van-tab title="即将上映">
          <div
          >sadsad</div>
        </van-tab>
        <van-tab disabled></van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'moive',
  data () {
    return {
      active: 1
    }
  },
  computed: {
    ...mapState('film', ['filmList'])
  },
  methods: {
    ...mapActions('film', ['getFilmList']),
    onScroll () {
      let scrollBox = this.$refs['mytabs'].$el.querySelector('.van-tabs__content')
      let scrollTop = document.documentElement.scrollTop
      let scrollHeight = scrollBox.scrollHeight
      let clientHeight = scrollBox.clientHeight
      if (scrollHeight - (clientHeight + scrollBox.scrollTop) <= 0) {
        this.getFilmList(true)
      }
      // console.log(scrollBox.scrollTop,scrollHeight,clientHeight+scrollBox.scrollTop,scrollHeight-(clientHeight+scrollBox.scrollTop))
    }

  },

  created () {
    this.getFilmList()
  },
  mounted () {
    console.log(this.$refs['mytabs'])
    let scrollBox = this.$refs['mytabs'].$el.querySelector('.van-tabs__content')
    scrollBox.addEventListener('scroll', this.onScroll)
  }
}
</script>
<style lang="less" scoped>
@import "~@/styles/common/mixins.less";
.nav-header {
  .nav-header;
}
.page-index-movie{
  height:100%;
}
.nav-left {
  position: absolute;
  top: 0;
  left: 26px;
  z-index: 99;
  height: 44px;
  line-height: 44px;
  display: flex;
  width:50px;
  justify-content: center;

  .nav-left-font {
    font-size: 14px;
  }
  span{
    color: #cccccc
  }
}
.film-list{

    padding: 12px 14px 12px 0;
    height: 90px;
    max-height: 90px;
    position: relative;
    padding-left: 15px;
    background-color: #fff;
    .film-item{
      display: flex;
      align-content: center;
    }
    .film-img{
      width: 64px;
      height: 90px;
    }
    .film-info{
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content:space-between;
      .film-info-name{
        font-size: 20px;
        font-weight: 900;
      }
      .actors-font{
        font-weight: 900;
        color: yellow;
      }
    }
}
.font-color{
  font-size: 13px;
    color: #666;
}
.film-buy{
  color: #000;
  position:absolute;
  right: 20px;
  top:45%;
  width: 47px;
  height: 27px;
  color:#fff;
  line-height: 27px;
  text-align: center;
  border-radius: 5px

}

.page-index-movie {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.nav-tabs {
  overflow: hidden;
  height: calc(100% - 100px);
}

.van-tabs--line {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.film-info-detail{
  overflow: hidden;
  text-overflow:ellipsis;
  height: 14px;
  width: 200px;
}
</style>

<style lang="less">
.van-tabs__content {
  flex: 1;
  overflow-y: auto;
}
</style>
