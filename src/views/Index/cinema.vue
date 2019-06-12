<template>
  <div class="main">
    <h1 class="nav-header">影院</h1>
    <div class="nav-title">
      <label for="serach">
         <i class="iconfont icon-fdj"></i>
      </label>

      <div class="l-title">
        <router-link to="/city">
          <span>{{cityName}}</span>
          <i class="iconfont icon-xjt"></i>
        </router-link>
      </div>
      <div>
        <input type="text" class="serach" placeholder="搜影院">
      </div>
    </div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>
    <cinemaList :cinemaList="cityList"/>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import cinemaList from '@/components/cinema.vue'
export default {
  data () {
    return {
      value1: 0,
      value2: 'a',
      value3: 'A',
      option1: [
        { text: '全城', value: 0 }
      ],
      option2: [
        { text: '品牌', value: 'a' }
      ],
      option3: [
        { text: '特色', value: 'A' }
      ]
    }
  },
  computed: {
    ...mapState('cinema',['cityList','cityName']),
    
  },
  methods: {
    ...mapActions('cinema', ['getCityList']),
    onScroll () {
      console.log('滚动事件')
    }
  },
  created () {
    this.getCityList()
    window.addEventListener('scroll', this.onScroll)
  },
  components:{
    cinemaList
  }
}
</script>
<style lang="less" scoped>
  @import '~@/styles/common/mixins.less';
  @import '~@/styles/common/variable.less';
  .main{
    height: 100%;
  }
  .nav-header{
    .nav-header;
  }
  .nav-title{
    .border-bottom;
    height: 40px;
    width: 100%;
    background: @titleColor;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    & .icon-fdj{
      position: absolute;
      left: 186px;
      bottom: 14px;
      font-size: 12px;
    }
    & .serach{
      display: block;
      width: 272px;
      height: 30px;
      box-sizing: border-box;
      border: 1px solid #eeeeee;
      border-radius: 4px;
      margin-left: 22px;
      text-align: center;
      color: #b1b1b1;
      outline: none;
    }
    & .l-title{
      & span{
        color: #656565;
        font-size: 14px;
      }
      & .icon-xjt{
        color: #afafaf;
        font-size: 8px;
      }
    }
  }
</style>
