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
        <div
          class="cinema-title line-ellipsis"
        >{{cinemaDetail.cinemaData && cinemaDetail.cinemaData.nm}}</div>
        <div
          class="cinema-location line-ellipsis"
        >{{cinemaDetail.cinemaData && cinemaDetail.cinemaData.addr}}</div>
      </div>
      <a href="https://map.baidu.com/mobile/webapp/index/index/" class="location-icon">
        <i class="iconfont icon-dw"></i>
      </a>
    </div>
    <ul class="post-bg">
      <li
        v-for="item in this.changecinemaDetail"
        :key="item.id"
        class="post-cild"
        @click="listItem(item)"
      >
        <img :src="item.img" alt>
      </li>
    </ul>
    <div class="cinema-info2">
      <div class="moive-title">
        {{moiveName}}
        <span style="color:#feb312;font-weight:900;">{{moivesc == 0.0? '暂无评分' : moivesc + '分'}}</span>
      </div>
      <div class="moive-desc">{{moivedesc}}</div>
    </div>
    <van-tabs v-model="curDateIndex" class="ttt">
      <van-tab
        :title="list"
        v-for="list in todayPlay"
        :key="list"
        class="todaylist"
        @click="listDetail(list)"
      >
        <div class="vip-tops" v-for="vip in getvipInfo" :key="vip.process">
          <div class="label">{{vip.tag}}</div>
          <div class="label-text">{{vip.title}}</div>
          <div class="process">{{vip.process}} ></div>
        </div>
        <ul>
          <router-link v-for="pl in curSelectMovieAndPlist" :key="pl.seqNo" class="playlist" tag="li" to="/center" v-show="curSelectMovieAndPlist.length > 0">
            <div class="time-block">
              <div class="begin">{{pl.tm}}</div>
              <div class="end">{{pl.tm}}散场</div>
            </div>
            <div class="info-block">
              <div class="lan">{{pl.lang}}{{pl.tp}}</div>
              <div class="hall">{{pl.th}}</div>
            </div>
            <div class="price-block">
              <div class="selP">
                <span>¥</span>
                <span>{{Math.ceil((pl.vipPrice)*1.15)}}</span>
              </div>
              <div class="vipP">
                <span style="color: #fff;background-color: #f90;">{{pl.vipPriceName}}</span>
                <span style="color: #f90;background-color: #fff;">¥{{pl.vipPrice}}</span>
              </div>
              <div class="extra">
                {{pl.extraDesc}}
              </div>
            </div>
            <div class="buttom-block">
              <button class="btn">购票
              </button>
            </div>
          </router-link>
        </ul>

      </van-tab>
    </van-tabs>
    <div class="tuan">
      <div class="gap" style="height: 10px; background-color: #f0f0f0;"></div>
      <div class="tuan-list">
        <div class="tuan-title">影院超值套餐</div>
        <router-link to="/center" tag="div" class="tuan-item" v-for="list in getDealList" :key="list.title">
          <img :src="list.imageUrl">
          <span class="hot-tag" v-if="list.cardTag">{{list.cardTag}}</span>
          <div class="item-info">
            <div class="title">
              <span>{{list.recommendPersonNum > 1 ? '双人' : '单人'}}</span>
              大杯可乐2杯+中桶爆米花1桶
            </div>
            <div class="sell-num">{{list.curNumberDesc}}</div>
            <div class="price">
              <span style="font-size:14px;">¥</span>
              <span class="num" style="font-size:17px;">{{list.price}}</span>
            </div>
            <div class="buy-btn">去购买</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      cinemaId: this.$route.params.id,
      moiveName: '',
      moivedesc: '',
      moivesc: '',
      todayPlay: []
    }
  },
  computed: {
    ...mapState('cinema', ['cinemaDetail']),
    ...mapGetters('cinema', ['changecinemaDetail', 'curSelectMovieAndPlist', 'getvipInfo', 'getDealList']),
    curDateIndex: {
      get () {
        return this.$store.state.cinema.curDateIndex
      },
      set (index) {
        this.$store.commit('cinema/CHGDATEINDEX', index)
      }
    }
  },
  watch: {
    changecinemaDetail (newVal, oldVal) {
      if (newVal.length > 0) {
        this.listItem(newVal[0])
      }
    }
  },
  methods: {
    ...mapActions('cinema', ['getCinemaDetail']),
    listItem (item) {
      this.moiveName = item.nm
      this.moivedesc = item.desc
      this.moivesc = item.sc
      this.todayPlay = []
      this.$store.commit('cinema/CHGSELECTMOVIEID', item.id)
      for (let i = 0; i < item.shows.length; i++) {
        this.todayPlay.push(item.shows[i].dateShow)
      }
    }
  },
  created () {
    this.getCinemaDetail(this.cinemaId)
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/common/mixins.less";
.nav-header {
  .nav-header;
  display: flex;
  & .fanhui {
    padding: 0 10px;
  }
  & .icon-zjt {
    color: white;
    font-size: 22px;
  }
  & h1 {
    flex: 1;
  }
}
.cinema-info {
  padding: 15px 100px 15px 15px;
  position: relative;
  & .cinema-title {
    font-size: 17px;
    line-height: 24px;
    font-weight: 700;
    color: #333;
  }
  & .cinema-location {
    margin-top: 2px;
    font-size: 13px;
    line-height: 18.5px;
    color: #999;
  }
  & .location-icon {
    position: absolute;
    right: 0;
    top: 50%;
    width: 70px;
    height: 31px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    border-left: 1px solid #d8d8d8;
    text-align: center;
    & .icon-dw {
      font-size: 22px;
      color: #7abbfe;
    }
  }
}
.post-bg {
  position: relative;
  width: 100%;
  height: 135px;
  top: 0;
  left: 0;
  background: #40454d;
  opacity: 0.55;
  display: flex;
  overflow-y: auto;
  box-sizing: border-box;
  padding-top: 20px;
  & .post-cild img {
    width: 74px;
    height: 96px;
    margin-left: 14px;
  }
}
.cinema-info2 {
  padding: 11px 15px;
  text-align: center;
  & .moive-title {
    height: 24px;
    line-height: 24px;
    font-size: 17px;
    color: #333;
    font-weight: 700;
  }
  & .moive-desc {
    margin-top: 2px;
    height: 18.5px;
    line-height: 18.5px;
    font-size: 13px;
    color: #999;
  }
}
.todaylist {
  overflow-x: auto;
  overflow-y: hidden;
  & .vip-tops{
    padding: 0 15px;
    height: 42px;
    line-height: 42px;
    background-color: #fff5ea;
    display: flex;
    & .label{
      flex: 0 0 auto;
      display: inline-block;
      background-color: #60b8e1;
      border-radius: 2px;
      font-size: 10px;
      line-height: 15px;
      height: 15px;
      width: 34px;
      text-align: center;
      color: #fff;
      margin-top: 13px;
      margin-right: 10px;
      background-color: #ff941a;
    }
    & .label-text{
      color: #fa9600;
      flex: 1 1 auto;
    }
    & .process{
      flex: 0 0 auto;
      line-height: 42px;
      color: #999;
      font-size: 12px;
    }
  }
  & .playlist {
    .border-bottom;
    padding: 17px 0;
    margin-left: 12.5px;
    display: flex;
    & .time-block {
      width: 60px;
      & .begin {
        font-size: 20px;
        color: #333;
        line-height: 1;
        white-space: nowrap;
      }
      & .end {
        margin-top: 10px;
        color: #999;
        font-size: 11px;
        line-height: 1;
        white-space: nowrap;
      }
    }
    & .info-block {
      margin-left: 17px;
      overflow-x: hidden;
      width: 104px;
      & .lan {
        margin-top: 2px;
        line-height: 18px;
        font-size: 13px;
        color: #333;
        white-space: normal;
      }
      & .hall {
        margin-top: 10px;
        font-size: 11px;
        color: #999;
        white-space: normal;
      }
    }
    & .price-block{
      flex: 0 1 auto;
      width: 118px;
      margin-left: 5px;
      & .selP{
        display: inline-block;
        line-height: 1;
        color: #f03d37;
        margin-top: 1px;
        font-size: 19px;
      }
      & .vipP{
        display: inline-block;
        line-height: 15px;
        height: 15px;
        transform: scale(.8);
        transform-origin: left;
        margin-right: -16px;
        border: 1px solid #ff9000;
        border-radius: 2px;
        font-size: 12px;
      }
      & .extra{
        margin-top: 8px;
        display: block;
        font-size: 11px;
        color: #999;
      }
    }
    & .buttom-block{
      width: 45px;
      margin-left: 2px;
      position: relative;
      & .btn{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        height: 27px;
        line-height: 27px;
        font-size: 12px;
        background-color: #f03d37;
        color: #fff;
        border-radius: 4px;
        text-align: center;
        border: 0;
      }
    }
  }
}
.tuan-list{
  position: relative;
  margin: 0 0 0 15px;
  & .tuan-title{
    .border-bottom;
    line-height: 45px;
    height: 45px;
    font-size: 15px;
    color: #666;
  }
  & .tuan-item{
    cursor: pointer;
    position: relative;
    width: 100%;
    padding: 13px 0;
    overflow: hidden;
   & img {
    display: inline-block;
    width: 92px;
    height: 92px;
    float: left;
   }
   & .hot-tag{
    position: absolute;
    left: 0;
    top: 13px;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    background-color: #fa5939;
    font-size: 12px;
    padding: 0 5px;
    color: #fff;
    border-bottom-right-radius: 2px;
   }
   & .item-info{
    position: relative;
    margin: 0 15px 0 102px;
    height: 92px;
    overflow: hidden;
    & .title{
    font-size: 14px;
    line-height: 18px;
    color: #333;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    & span{
      display: inline-block;
      vertical-align: top;
      margin-top: 1px;
      margin-right: 7px;
      padding: 0 4px;
      font-size: 10px;
      line-height: 15px;
      height: 15px;
      background: #f90;
      border-radius: 2px;
      color: #fff;
    }
    }
    & .sell-num{
      display: inline-block;
      position: absolute;
      bottom: 34px;
      right: 0;
      line-height: 16px;
      height: 16px;
      font-size: 12px;
      color: #999;
    }
    & .price{
      color: #f03d37;
      display: inline-block;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    & .buy-btn{
      position: absolute;
      right: 0;
      bottom: 0;
      display: inline-block;
      padding: 0 8px;
      height: 27px;
      line-height: 27px;
      font-size: 12px;
      border-radius: 3px;
      color: #fff;
      background-color: #f03d37;
    }
   }
  }
}
</style>
