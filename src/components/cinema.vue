<template>
  <ul class="listbox">
    <li class="listitem" v-for="list in cinemaList" :key="list.id">
      <div class="list-title">
        <span class="list-nm">{{list.nm}}</span>
        <span class="list-price">{{list.sellPrice}}</span>
        <span class="list-yuan">元起</span>
      </div>
      <div>
         <span>{{list.addr}}</span>
         <span>{{list.distance}}</span>
      </div>
      <div class="label-block">
        <div class="allowRefund">退</div>
        <div class="endorse">改签</div>
        <div class="snack">小吃</div>
        <div class="vipTag">折扣卡</div>
        <div class="hallType">CGS中国巨幕厅</div>
        <div class="hallType">杜比全景声厅</div>
      </div>
      <div class="listcard">
        <em v-if="list.promotion.cardPromotionTag">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg==" alt="">
        </em>
        <span>{{list.promotion.cardPromotionTag}}</span>
      </div>

    </li>
  </ul>
</template>
<script>
export default {
  props: {
    cinemaList: {
      type: Array
    }
  },
}
</script>
<style lang="less" scoped>
  @import '~@/styles/common/mixins.less';
  .listbox{
    height: calc(100% - 190px);
    overflow-y: auto;
  }
  .listitem{
    .border-bottom;
    box-sizing: border-box;
    height:122px;
    margin-left: 16px;
    & .listcard img{
      width: 14px;
      height: 14px;
    }
    & .label-block{
      display: flex;
      & .allowRefund,& .endorse, & .hallType{
        color: #589daf;
        border: 1px solid #589daf;
        margin-right: 5px;
      }
      & .snack, & .vipTag{
        color: #f90;
        border: 1px solid #f90;
        margin-right: 5px;
      }
    }
    & .list-title{
      line-height: 23px;
      height: 23px;
      padding-top: 20px;
      & .list-nm{
        font-size: 16px;
        color: #000;
        margin-right: 14px;
      }
      & .list-price{
        font-size: 16px;
        color: #f03d37;
      }
      & .list-yuan{
        color: #f03d37;
      }
    }
  }
</style>


