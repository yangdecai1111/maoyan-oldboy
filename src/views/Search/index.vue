<template>
  <div class="top">
    <div class="s_top">
      <router-link to="/cinema" tag="div">
        <i class="iconfont icon-zjt"></i>
      </router-link>
      <div class="c_top">猫眼电影</div>
    </div>
    <div class="t_top">
      <i class="iconfont icon-fdj"></i>
      <input
      type="text"
      placeholder="搜影院"
      class="txt"
      v-model="searchVal"
      >
      <router-link to="/cinema" tag="div">
        <div class="r_top">取消</div>
      </router-link>
    </div>
    <div class="main">
      <p class="b_main" v-if="searchList.length > 0">影院</p>
       <ul>
         <li
            v-for="item in searchList"
            :key="item.id"
            class="a_main"
         >
          <p class="t_main">{{ item.nm }}
            <span>{{ item.sellPrice }}</span>
            <span>元起</span>
          </p>
          <p class="c_main">
            <span>{{ item.addr }} </span>
            <span>{{ item.distance }}</span>
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
            >座
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
            <router-link
              class="c_map"
              tag="span"
              :to="{
                name: 'place',
                params: {
                  id: item.id
                  }
              }">退
            </router-link>
            <router-link
              class="d_map"
              tag="span"
              :to="{
                name: 'place',
                params: {
                  id: item.id
                }
              }">改签
            </router-link>
            <span class="e_map">{{ item.vipDesc }}</span>
          </p>
         </li>
       </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      searchVal: ''
    }
  },
  watch: {
    searchVal: {
      handler (newVal, oldVal) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getSearchList({
            newVal: newVal,
            inputVal: 2
          })
        }, 1000)
      },
      immediate: false
    }
  },
  computed: {
    ...mapState('search', ['searchList'])
  },
  methods: {
    ...mapActions('search', ['getSearchList'])
  }
}
</script>
<style lang="less" spaced>
@import "~@/styles/common/mixins.less";
html,
body,
.top {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.main {
  background: #f5f5f5;
  flex: 1;
  .b_main {
    font-size: 15px;
    color: #999;
    padding: 9px 15px;
    border-bottom: 1px solid #e6e6e6;
    background: #ffffff;
  }
  .a_main {
    padding-left: 15px;
    height: 120px;
    background: #ffffff;
  }
  .t_main {
    padding-top: 15px;
    span:nth-child(1) {
      color: red;
      font-size: 18px;
    }
    span:nth-child(2) {
      color: #cccccc;
      font-size: 10px;
      margin-left: 5px;
    }
  }
  .c_main {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 6px;
    span:nth-child(1) {
      color: #cccccc;
      font-size: 14px;
    }
    span:nth-child(2) {
      color: #cccccc;
      font-size: 14px;
      margin-left: 125px;
    }
  }
  .d_main {
    margin-top: 6px;
    .a_map,
    .b_map,
    .c_map,
    .d_map {
      border: 1px solid #589daf;
      color: #589daf;
      position: relative;
      display: inline-block;
      padding: 0 3px;
      height: 15px;
      line-height: 15px;
      border-radius: 2px;
      font-size: 0.6rem;
    }
    .b_map,
    .c_map,
    .d_map {
      margin-left: 4px;
    }
    .e_map {
      margin-left: 4px;
      border: 1px solid #f90;
      color: #f90;
      position: relative;
      display: inline-block;
      padding: 0 3px;
      height: 15px;
      line-height: 15px;
      border-radius: 2px;
      font-size: 0.6rem;
    }
  }
}
.s_top {
  height: 50px;
  background: #e54847;
  display: flex;
  padding-left: 5px;
  flex-shrink: 0;
  .icon-zjt {
    font-size: 30px;
    color: #ffffff;
    line-height: 50px;
  }
  .c_top {
    color: #ffffff;
    font-size: 18px;
    margin: 0 auto;
    line-height: 50px;
  }
}
.t_top {
  height: 40px;
  background: #f5f5f5;
  // border-bottom: 1px solid #cccccc;
  .border-bottom;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  .txt {
    height: 26px;
    flex: 1;
    border: none;
    font-size: 13px;
    color: #333;
    line-height: 26px;
    border-radius: 5px;
    padding-left: 30px;
    outline: none;
  }
  .icon-fdj {
    font-size: 14px;
    color: #e6e6e6;
    position: relative;
    left: 25px;
  }
  .r_top {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-size: 16px;
    color: #f03d37;
  }
}
</style>
