<template>
  <div class="top">
    <div class="t_top">
      <i class="iconfont icon-zjt"></i>
      <div class="c_top">猫眼电影</div>
    </div>
    <div class="b_top">
      <i class="iconfont icon-fdj"></i>
      <input 
      type="text"
      placeholder="搜电影" 
      class="txt"
      v-model="sousuoVal"
      >
      <router-link to="/" tag="div">
        <div class="r_top">取消</div>
      </router-link>
    </div>
    <div class="main">
      <p class="b_main" v-if="searchList.length > 0">电影/电视剧/综艺</p>
       <ul>
         <li
            v-for="item in searchList"
            :key="item.id"
            class="a_main"
         >
          <img :src="item.img" alt="" class="q_main">
          <p class="t_main">{{ item.nm }} 
            <span>{{ item.ver }}</span>
            <span v-if="item.globalReleased === false">{{ item.wish }}</span>
            <span v-if="item.globalReleased === false">人想看</span>
          </p>
          <p class="c_main">
            <span>{{ item.enm }} </span>
            <span class="yushou" v-if="item.globalReleased === false">预售</span>
            <span class="pinfen" v-if="item.globalReleased === true">{{ item.sc }}分</span>
          </p>
          <p class="f_main">
            {{ item.cat }}
          </p>
          <p class="d_main">
            <router-link 
             class="a_map"
             tag="span"
             :to="{ 
                name: 'place',
                params: {
                  id: item.id
                }
              }"
            >{{ item.rt }}
            </router-link>
            <router-link 
              v-if="item.hallType"
              tag="span"
              class="b_map"
              :to="{
                name: 'place',
                params: {
                  id: item.id
                }
              } "> {{ item.hallType }} 
            </router-link>
            <span class="e_map">{{ item.vipDesc }}</span>
          </p>
         </li>
       </ul>
    </div>
  </div>
</template>
<script>
import { mapState,mapActions } from 'vuex';
export default {
  data () {
   return {
     sousuoVal: ''
   }
  },
  watch: {
    sousuoVal: {
      handler (newVal,oldVal) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.getSearchList({
            newVal: newVal,
            inputVal: -1
          });
        }, 1000);
      },
      immediate: false
    }
  },
  computed: {
    ...mapState('search', ['searchList']),
  },
  methods: {
   ...mapActions('search', ['getSearchList'])
  }
}
</script>
<style lang="less" spaced>
@import '~@/styles/common/variable.less';
@import '~@/styles/common/mixins.less';
 body, html, .top {
   display: flex;
   flex-direction: column;
   height: 100%;
   .main{
     flex: 1;
     background: #f5f5f5;
     .q_main{
      background-color: #eee;
      width: 64px;
      height: 90px;
      float: left;
      margin-right: 10px;
     }
     .a_main {
      padding-left: 15px;
      height: 120px;
      background: #ffffff;
      position: relative;
        }
     .b_main {
      font-size: 15px;
      color: #999;
      padding: 9px 15px;
      border-bottom: 1px solid #e6e6e6;
      background: #ffffff;
      }
      .c_main{
        font-size: 13px;
        color: #666;
        margin-top: 2px;
        .yushou{
          color: #ffffff;
          background: #3c9fe6;
          position: absolute;
          top: 50px;
          right: 15px;
          display: inline-block;
          width: 50px;
          height: 30px;
          border-radius: 5px;
          text-align: center;
          font-size: 15px;
          line-height: 30px;
        }
        .pinfen {
          color: #fa0;
          font-size: 18px;
          position: absolute;
          right: 15px;
        }
      }
      .d_main{
        font-size: 13px;
        color: #666;
        margin-top: 2px;
      }
      .f_main{
        font-size: 13px;
        color: #666;
        margin-top: 2px;
      }
      .t_main {
      padding-top: 15px;
      span:nth-child(1) {
        color: red;
        font-size: 10px;
        border:1px solid blue;
        background: blue;
        color: #ffffff;
      }
      span:nth-child(2) {
        color: #fa0;
        font-size: 16px;
        margin-left: 100px;
      }
      // span:nth-child(3) {
      //   color: #fa0;
      //   font-size: 8px;
      // }
    }
   }
   .t_top{
      height: 50px;
      background: #e54847;
      display: flex;
      padding-left: 5px;
      flex-shrink: 0;
   }
   .icon-zjt{
      height: 50.5px;
      line-height: 50.5px;
      font-size: 28px;
      color: #ffffff;
   }
   .c_top{
      margin: 0 auto;
      font-size: 18px;
      font-weight: 400;
      line-height: 50px;
      color: #ffffff;
   }
   .b_top{
     .border-bottom;
      height: 50px;
      background: #f5f5f5;
      display: flex;
      .icon-fdj{
        font-size: 14px;
        color: #cccccc;
        position: relative;
        left: 20px;
        top: 17px;
      }
      .txt{
         border: none;
         height: 30px;
         border-radius: 5px;
         flex: 1;
         margin-top: 8px;
         padding-left: 25px;
         margin-right: 10px;
         outline: none;
      }
      .r_top{
        color: #e54847;
        line-height: 50px;
        margin-right: 5px;
      }
   }
 }
</style>

