<template>
  <div class="page-index-movie">
    <h1 class="nav-header">猫眼电影</h1>
    <div class="nav-tabs">
      <van-tabs v-model="active" class="nav-tabs" ref="mytabs">
        <router-link to="/cinema" class="nav-left">
          <p class="nav-left-font">深圳</p>
          <span>▼</span>
        </router-link>
        <router-link to="/cinema" class="nav-left2">
          <p class="nav-left-font2"><van-icon name="search" /></p>
        </router-link>
        <van-tab disabled></van-tab>
        <van-tab title="正在热映">
          <ul class="film-list" v-for="todo in filmList" :key="todo.id">
            <li class="film-item">
              <img class="film-img" :src="todo.img" alt>
              <div class="film-info">
                <p class="film-info-name">{{todo.nm}}</p>
                <p v-if="todo.globalReleased">
                  观众评分
                  <span class="actors-font">{{todo.sc?todo.sc:'暂无'}}</span>
                </p>
                <p v-else>
                  <span class="actors-font">{{todo.wish}}</span> 人想看
                </p>
                <p class="film-info-detail font-color">主演：{{todo.star}}</p>
                <p class="film-info-ellipsis font-color">{{todo.showInfo}}</p>
              </div>
              <div
                class="film-buy"
                :style="{'background':todo.globalReleased ? 'red' : 'blue'}"
              >{{todo.globalReleased?'购票':'预售'}}</div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="即将上映" ref="kimi">
          <div class="most-expected">
            <p class="most-title">近期最受期待</p>

            <div class="most-expected-list" >
               <div class="expected-item" 
               v-for="todo in mostList"
               :key="todo.id"
               >
                 <div class="default-img-bg">
                <img class="most-img" :src="todo.img" alt="">
                <span class="wish-bg">
                  <span class="wish">{{todo.wish}} 人想看</span>
                </span>
              </div>
              <h5 class="line-ellipsis">{{todo.nm}}</h5>
              <p class="most-data">{{todo.comingTitle}}</p>
              </div>
            </div>
          </div>
          <div class="most-kimi">
 <div v-for="(item,index) in formatComingList"
            :key="index"
            >
              <p class="most-kimi-p">{{item.comingTitle}}</p>
               <ul class="film-list" v-for="main in item.list" 
               :key="main.id"
               >
            <li class="film-item">
              <img class="film-img" :src="main.img" alt>
              <div class="film-info">
                <p class="film-info-name">{{main.nm}}</p>
                <p>
                  <span class="actors-font">{{main.wish}} </span> 人想看
                </p>
                <p class="film-info-detail font-color">主演: {{main.star?main.star:'无'}} </p>
                <p class="film-info-ellipsis font-color">{{main.showInfo?main.showInfo:main.comingTitle}} </p>
              </div>
              <div
                class="film-buy"
                :style="{'background': main.showst===4  ? 'blue' :'yellow' }"
                
              >{{main.showst===4?'预售':'想看'}}</div>
            </li>
          </ul>
</div>
          
            </div>
            
        </van-tab>
        <van-tab disabled>
        </van-tab>
        
      </van-tabs>
      
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "moive",
  data() {
    return {
      active: 1
    }
  },
  computed: {
    ...mapState("film", ["filmList",'mostList']),
    ...mapGetters('film',['formatComingList'])
  },
  watch: {
    active (newVal, oldVal) {
      this.$nextTick(() => {
        let boxEl = this.$refs['kimi'].$el.querySelector('.most-expected-list');
        // console.log(boxEl)
        boxEl.addEventListener("scroll", this.onScroll2);
      })
      
    }
  },
  methods: {
    ...mapActions("film", ["getFilmList","getmostList","getcomingList"]),

    onScroll() {
      let scrollBox = this.$refs["mytabs"].$el.querySelector(
        ".van-tabs__content"
      );
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight = scrollBox.scrollHeight;
      let clientHeight = scrollBox.clientHeight;
      if (scrollHeight - (clientHeight + scrollBox.scrollTop) <= 0) {
        this.getFilmList(true);
        this.getcomingList(true);
      }
    },
    onScroll2(){
      // console.log(this.$refs["mytabs2"]);
      let boxEl = this.$refs['kimi'].$el.querySelector('.most-expected-list');
      // console.log(boxEl.scrollLeft)

      let scrollLeft = boxEl.scrollLeft
      let scrollWidth=boxEl.scrollWidth
      let clientWidth=boxEl.clientWidth
      if(scrollWidth-(scrollLeft+clientWidth)<=0){
        this.getmostList(true);
      }
      //  console.log(scrollLeft)
      // console.log(scrollWidth)
      // console.log(clientWidth)
     
      

    }
  },

  created() {
    this.getFilmList();
    this.getmostList();
    this.getcomingList();
  },
  mounted() {
    


    // console.log(this.$refs["mytabs"]);
    let scrollBox = this.$refs["mytabs"].$el.querySelector(
      ".van-tabs__content"
    );
    scrollBox.addEventListener("scroll", this.onScroll);
    // console.log(this.$refs['kimi'].$el.querySelector(".van-tab__pane"))
  }
}
</script>
<style lang="less" scoped>
@import "~@/styles/common/mixins.less";
.nav-header {
  .nav-header;
}
.page-index-movie {
  height: 100%;
}
.nav-left2{
  position: absolute;
  top: 2px;
  right:15px ;
  z-index: 99;
  height: 44px;
  line-height: 44px;
  display: flex;
  width: 50px;
  
}
.nav-left-font2{
    font-size: 20px;

  }
.nav-left {
  position: absolute;
  top: 0;
  left: 26px;
  z-index: 99;
  height: 44px;
  line-height: 44px;
  display: flex;
  width: 50px;
  justify-content: center;

  .nav-left-font {
    font-size: 14px;
  }
  
  span {
    color: #cccccc;
  }
}
.film-list {
  padding: 12px 14px 12px 0;
  height: 90px;
  max-height: 90px;
  position: relative;
  padding-left: 15px;
  background-color: #fff;
  .film-item {
    display: flex;
    align-content: center;
  }
  .film-img {
    width: 64px;
    height: 90px;
  }
  .film-info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .film-info-name {
      font-size: 20px;
      font-weight: 900;
    }
    .actors-font {
      font-weight: 900;
      color: yellow;
    }
  }
}
.font-color {
  font-size: 13px;
  color: #666;
}
.film-buy {
  color: #000;
  position: absolute;
  right: 20px;
  top: 45%;
  width: 47px;
  height: 27px;
  color: #fff;
  line-height: 27px;
  text-align: center;
  border-radius: 5px;
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
.film-info-detail {
  overflow: hidden;
  text-overflow: ellipsis;
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

<style lang="less">
.van-tabs__content{
    background-color: #f5f5f5;
}
  .most-expected {
  padding: 12px 15px 12px 15px;
  margin-bottom: 10px;
  background: #fff;
  .most-title {
    margin: 0 0 12px;
    font-size: 14px;
    color: #333;
    
  }
  .most-expected-list{
    overflow-y:hidden;
    white-space: nowrap;
  }
  .expected-item{
    display: inline-block;
    width: 85px;
    overflow: hidden;
    margin-right: 10px;
  }
  .default-img-bg{
    width: 85px;
    height: 115px;
    position: relative;
    margin-bottom: 6px;
  }
  .most-img{
    width: 100%;
    height: 115px;
  }
  .line-ellipsis{
    margin: 0 0 3px;
    font-size: 13px;
    color: #222;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .most-data{
    margin: 0;
    font-size: 12px;
    color: #999;
  }
  .wish-bg{
    display: inline-block;
    width: 100%;
    height: 35px;
    position: absolute;
    bottom: 0;
    background-image: -webkit-linear-gradient(top,rgba(77,77,77,0),#000);
    background-image: linear-gradient(-180deg,rgba(77,77,77,0),#000);
    left: 0;
  }
  .wish{
    position: absolute;
    left: 4px;
    bottom: 2px;
    color: #faaf00;
    font-size: 11px;
    font-weight: 600;
  }
}
.most-kimi{
  margin-top: 15px;
  background: #fff;
}
.most-kimi-p{
      padding: 12px 15px 0;
    margin: 0;
    font-size: 14px;
    color: #333;
}
</style>
