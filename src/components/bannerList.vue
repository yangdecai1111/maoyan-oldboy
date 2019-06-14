<template>
  <van-tabs v-model="active" @click="tabClick">
    <van-tab title="商区">
      <!-- <van-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @navclick="onNavClick"
        @itemclick="onItemClick"
        /> -->
    </van-tab>
    <van-tab title="地铁站">
       <!-- <van-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @navclick="onNavClick"
        @itemclick="onItemClick"
        /> -->
    </van-tab>
  </van-tabs>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      active: 2,
      // items: [],
      // // 左侧高亮元素的index
      // mainActiveIndex: 0,
      // // 被选中元素的id
      // activeId: 1
    }
  },
  computed: {
    ...mapState('cinema', ['district'])
  },
  methods: {
    ...mapActions('cinema', ['getDistrictList']),
    tabClick (index, title) {

    }
    // onNavClick(index) {
    //   this.mainActiveIndex = index;
    // },
    // onItemClick(data) {
    //   this.activeId = data.id;
    // }
  },
  created () {
    this.getDistrictList()
  }
}
</script>
