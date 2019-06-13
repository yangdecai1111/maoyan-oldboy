<template>
  <div class="city" id="scrollBody">
    <!-- 右边快速查找功能 -->
    <div class="quick-find">
      <ul>
        <li @click="seek($event)">定位最近热门</li>
        <li v-for="(item,i) in provinceList"
            :key="i"
            @click="seek($event)"
            >
            {{item}}
        </li>
      </ul> 
    </div>
    <!-- 右边快速查找功能end -->

    <!-- 最近访问城市功能 -->
    <h1>最近访问城市</h1>
    <div class="latest-city">
      <van-button type="default" size="small" class="latest-cityname" @click="selected($event)">{{latestCity[0]}}</van-button>
      <van-button type="default" size="small" class="latest-cityname" @click="selected($event)">{{latestCity[1]}}</van-button>
      <van-button type="default" size="small" class="latest-cityname" @click="selected($event)">{{latestCity[2]}}</van-button>
    </div>
    <!-- 热门城市功能 -->
    <h1>热门城市</h1>
    <div class="hot-city">
      <van-button type="default" size="small" class="hot-cityname" @click="selected($event)">上海</van-button>
      <van-button type="default" size="small" class="hot-cityname" @click="selected($event)">北京</van-button>
      <van-button type="default" size="small" class="hot-cityname" @click="selected($event)">广州</van-button>
      <van-button type="default" size="small" class="hot-cityname" @click="selected($event)">深圳</van-button>
      <van-button type="default" size="small" class="hot-cityname" @click="selected($event)">武汉</van-button>
      <van-button type="default" size="small" class="hot-cityname" @click="selected($event)">天津</van-button>
      <van-button type="default" size="small" class="hot-cityname" @click="selected($event)">西安</van-button>
      <van-button type="default" size="small" class="hot-cityname" @click="selected($event)">南京</van-button>
      <van-button type="default" size="small" class="hot-cityname" @click="selected($event)">杭州</van-button>
      <van-button type="default" size="small" class="hot-cityname" @click="selected($event)">成都</van-button>
      <van-button type="default" size="small" class="hot-cityname" @click="selected($event)">重庆</van-button>
    </div>
    <!-- 城市列表部分 -->
    <div class="city-list">
        <ul>
            <li v-for="(province,i) in provinceList"
                :key="i"
                class="red"
                >
                <p class="distance">{{province}}</p>
                
                <ul class="pro-inner">
                    <li
                        v-for="(city,j) in cityList[i]"
                        :key="j"
                        @click="selected($event)"
                        class="black"
                      >
                        {{city}}
                    </li>
                </ul>
            </li>
        </ul>
        
    </div>
      

  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
      return {
        provinceList: [],
        cityList:[],
        // latestCity:['北京','上海','广州'],
        href: '/cinema',
        a:true
      };
  },
  computed:{
      ...mapState('cinema',['latestCity']),
  },
  methods: {
    selected(event){
      
      // console.log(this.$store.state.cinema.cityName);
      // console.log(el.innerText);
      // 点击城市名选择城市
      var el = event.currentTarget;
      this.$store.state.cinema.cityName=el.innerText;
      // 修改最近使用的城市数据
      
      this.$store.state.cinema.latestCity.push(el.innerText);
      this.$store.state.cinema.latestCity.shift();

      this.$router.go(-1);

      // this.latestCity[0] = el.innerText;
    },
    seek(event){
        var el = event.currentTarget.innerText;
        console.log(el);
        for(var i=0;i<this.provinceList.length;i++){
          if(this.provinceList[i] == el){
            // console.log(this.provinceList[i]);
            document.documentElement.scrollTop=document.getElementsByClassName('distance')[i].offsetTop; 
          } 
        }
        // document.documentElement.scrollTop=document.getElementsByClassName('distance')[0].offsetTop; 
        // 北京:320   定位最近热门:200 设置滚动距离
    }
  },

  created(){
    axios.get('http://localhost:8080/api/LocList.json')
          .then(response=>{
            // console.log(response.data.CountryRegion.State);// Array数组,共33个省份
            var provinceData = response.data.CountryRegion.State;
            for(var i=0;i<provinceData.length;i++){
                // var cityData = provinceData[i].City;
                this.provinceList.push(provinceData[i].Name);// provinceData[i]表示第i个省的对象,包含该省城市信息
                // console.log(provinceData[i].Name);
                this.cityList[i] = new Array();
                for(var j=0;j<provinceData[i].City.length;j++){
                  this.cityList[i][j]=provinceData[i].City[j].Name;
                  // console.log(provinceData[i].City[j].Name)
                }
            }
            // console.log(provinceData[2].City[1].Name)// provinceData[i].City为第i个城市的对象数组

          });
  },
  beforeMount: function () {
    // this.$toast('提示文案');
    if(this.a){
        // Toast.allowMultiple();
        const toast1 = this.$toast({
           message:"自动定位失败",
           type:"fail",
           duration:1500
        });
    }
  },
  mounted(){
    // if(this.a){
    //     // Toast.allowMultiple();
    //     const toast1 = this.$toast({
    //        message:"自动定位中",
    //        type:"loading"
    //     });
    // }
  },
  
        
}
</script>

<style lang="less" scoped>
  
  .city{
    background: #ebebeb;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    padding-top: 10px;
    h1{
      margin-left: 14px;
      font-size: 14px;
    }
    .city-list{
        background: #ebebeb;
        .red{
            color:red;
            font-size: 18px;
            font-weight: bold;
            p{
              margin-left: 14px;
            }
            .pro-inner{
              background: #f5f5f5;
            }
            .black{
                color: #000000;
                font-size: 10px;
                font-weight:300;
                margin-top: 10px;
                margin-bottom: 10px;
                margin-left: 14px;
                margin-right: 50px;
                padding-top: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #c8c7cc;
            }
        }
    }
  }
  
  .quick-find{
    width: 10%;
    position: absolute;
    right: 2%;
    top: 35%;
    font-size: 12px;
    text-align: right;
    li{
      margin-bottom: 10px;
    }
  }
  .latest-city{
    width: 90%;
    height: 58px;
    background: #f5f5f5;
    margin-top: 10px;
    margin-bottom: 10px;
    .latest-cityname{
      margin-left: 12px;
      margin-top: 16px;
    }
  }
  .hot-city{
    width: 90%;
    height: 195px;
    background: #f5f5f5;
    margin-top: 10px;
    margin-bottom: 10px;
    .hot-cityname{
      margin-left: 12px;
      margin-top: 16px;
    }
  }
</style>

