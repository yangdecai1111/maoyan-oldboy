<template>
  <ul class="listbox">
    <li class="listitem" v-for="list in cinemaList" :key="list.id">
      <div class="list-title">
        <span class="list-nm">{{list.nm}}</span>
        <span class="list-price">{{list.sellPrice}}</span>
        <span class="list-yuan">元起</span>
      </div>
      <div class="list-adis">
         <span class="list-addr">{{list.addr}}</span>
         <span class="list-dist">{{list.distance}}</span>
      </div>
      <div class="label-block" v-if="list.tag.allowRefund || list.tag.endorse || list.tag.snack ||list.tag.vipTag || list.tag.hallType">
        <div class="allowRefund" v-if="list.tag.allowRefund">退</div>
        <div class="endorse" v-if="list.tag.endorse">改签</div>
        <div class="snack" v-if="list.tag.snack">小吃</div>
        <div class="vipTag" v-if="list.tag.vipTag">折扣卡</div>
        <div class="hallType" v-if="list.tag.hallType">
          <div >{{list.tag.hallType[0]}}{{list.tag.hallType[1]}}{{list.tag.hallType[2]}}{{list.tag.hallType[3]}}</div>
        </div>
      </div>
      <div class="listcard" v-if="list.promotion.cardPromotionTag">
        <em>
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
    margin: 0 0 0 15px;
    padding: 13px 15px 13px 0;
    & .listcard{
      color: #999;
      margin-bottom: 4px;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
    }
    & .listcard img{
      width: 14px;
      height: 14px;
    }
    & .label-block{
      display: flex;
      height: 17px;
      line-height: 17px;
      margin-top: 4px;
      margin-bottom: 4px;
      overflow: hidden;
      flex-shrink: 0;
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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
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
    & .list-adis{
        margin-top: 6px;
        font-size: 13px;
        color: #666;
        display: flex;
      & .list-addr{
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      & .list-dist{
        font-size: 13px;
        color: #666;
        margin-left: 4px;
      }
    }
  }
</style>
