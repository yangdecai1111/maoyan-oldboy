<template>
    <ul class="tabBar">
        <router-link v-for='tab in tabs' :key="tab.id" :to='tab.href' tag="li" active-class="z-act">
          <i :class="['iconfont',tab.icon]"></i>
          <span>{{ tab.name }}</span>
        </router-link>
    </ul>
</template>
<script>
export default {
  name: 'tabBar',
  props: {
    tabs: Array
  }

}
</script>
<style lang="less" scoped>
@import '~@/styles/common/variable.less';
@import '~@/styles/common/mixins.less';
  .tabBar{
    .border-top;
    // position: fixed;
    // bottom: 0;
    width: 100%;
    display: flex;
    padding: 0;
    margin: 0;
    z-index: 100;
    background: #fff;
    list-style: none;
    li {
      flex: 1;
      height: 48px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      color:@tabColor;
      .iconfont{
        font-size: 24px;
      }
      &.z-act{
        color:@tabColorActive;
      }
    }
  }
</style>
