<template>
  <div>
    <div class="nav-header">
      <router-link to="/cinema" class="fanhui">
        <i class="iconfont icon-zjt"></i>
      </router-link>
      <h1>{{cinemaDetail.cinemaData && cinemaDetail.cinemaData.nm}}</h1>
    </div>
    <div class="cinema-info">
      <div>
        <div class="cinema-title line-ellipsis">{{cinemaDetail.cinemaData && cinemaDetail.cinemaData.nm}}</div>
        <div class="cinema-location line-ellipsis">{{cinemaDetail.cinemaData && cinemaDetail.cinemaData.addr}}</div>
      </div>
      <a href="https://map.baidu.com/mobile/webapp/index/index/" class="location-icon">
        <i class="iconfont icon-dw"></i>
      </a>
    </div>
    <ul class="post-bg">
      <li v-for="item in this.piclist" :key="item.id" class="post-cild" @click="listItem">
         <img :src="item.img" alt="">
      </li>
    </ul>
    <div class="cinema-info2">
      <div class="moive-title">{{moiveName}}</div>
      <div class="moive-desc">{{moivedesc}}</div>
    </div>
  </div>

</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      cinemaId: this.$route.params.id,
      moiveName: '',
      moivedesc: '',
    }
  },
  computed: {
    ...mapState('cinema', ['cinemaDetail', 'piclist'])
  },
  methods: {
    ...mapActions('cinema', ['getCinemaDetail', 'getPicList']),
    listItem (event) {
      for(let i=0;i<this.piclist.length;i++){
        if(event.target.src == this.piclist[i].img) {
            this.moiveName = this.piclist[i].nm
            this.moivedesc =this.piclist[i].desc
        }
      }
    }
  },
  created () {
    this.getCinemaDetail(this.cinemaId)
    this.getPicList(this.cinemaId)
  }
}
</script>

<style lang="less" scoped>
  @import '~@/styles/common/mixins.less';
  .nav-header{
    .nav-header;
    display: flex;
    & .fanhui{
      padding: 0 10px;
    }
    & .icon-zjt{
      color: white;
      font-size: 22px;
    }
    & h1{
      flex: 1;
    }
  }
  .cinema-info{
    padding: 15px 100px 15px 15px;
    position: relative;
    & .cinema-title{
      font-size: 17px;
      line-height: 24px;
      font-weight: 700;
      color: #333;
    }
    & .cinema-location{
      margin-top: 2px;
      font-size: 13px;
      line-height: 18.5px;
      color: #999;
    }
    & .location-icon{
      position: absolute;
      right: 0;
      top: 50%;
      width: 70px;
      height: 31px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      border-left: 1px solid #d8d8d8;
      text-align: center;
      & .icon-dw{
        font-size: 22px;
        color:#7abbfe;
      }
    }
  }
  .post-bg{
      position: relative;
      width: 100%;
      height: 135px;
      top: 0;
      left: 0;
      background: #40454d;
      opacity: .55;
      display: flex;
      overflow-y: auto;
      box-sizing: border-box;
      padding-top:20px;
      & .post-cild img{
        width: 74px;
        height: 96px;
        margin-left: 14px;
      }
    }
  .cinema-info2{
      padding: 11px 15px;
      text-align: center;
      & .moive-title{
        height: 24px;
        line-height: 24px;
        font-size: 17px;
        color: #333;
        font-weight: 700;
      }
      & .moive-desc{
        margin-top: 2px;
        height: 18.5px;
        line-height: 18.5px;
        font-size: 13px;
        color: #999;
      }
    }
</style>
