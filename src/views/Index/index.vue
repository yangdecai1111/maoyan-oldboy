<template>
  <div class="indexmain">
    <keep-alive include="cinema,moive">
      <router-view></router-view>
    </keep-alive>
    <tabBar :tabs='tabs'/>
  </div>
</template>

<script>
import tabBar from '@/components/tabBar.vue'
export default {
  name: 'index',
  data () {
    return {
      tabs: [
        { id: 1, name: '电影', icon: 'icon-film', href: '/moive' },
        { id: 2, name: '影院', icon: 'icon-moive', href: '/cinema' },
        { id: 3, name: '我的', icon: 'icon-center', href: '/center' }
      ]
    }
  },
  components: {
    tabBar
  }
}
</script>
<style lang="less">
.indexmain {
  height: 100%
}
</style>
