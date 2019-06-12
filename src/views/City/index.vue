<template>
  <div class="city">
    <!-- 右边快速查找功能 -->
    <div class="quick-find">
      <ul>
        <li v-for="(item,i) in letters"
            :key="i"
            >
            {{item}}
        </li>
      </ul> 
    </div>
    <!-- 右边快速查找功能end -->

    <!-- 最近访问城市功能 -->
    <h1>最近访问城市</h1>
    <div class="latest-city">
      <van-button type="default" size="small" class="latest-cityname">北京</van-button>
      <van-button type="default" size="small" class="latest-cityname">深圳</van-button>
      <van-button type="default" size="small" class="latest-cityname">上海</van-button>
    </div>
    <!-- 热门城市功能 -->
    <h1>热门城市</h1>
    <div class="hot-city">
      <van-button type="default" size="small" class="hot-cityname">上海</van-button>
      <van-button type="default" size="small" class="hot-cityname">北京</van-button>
      <van-button type="default" size="small" class="hot-cityname">广州</van-button>
      <van-button type="default" size="small" class="hot-cityname">深圳</van-button>
      <van-button type="default" size="small" class="hot-cityname">武汉</van-button>
      <van-button type="default" size="small" class="hot-cityname">天津</van-button>
      <van-button type="default" size="small" class="hot-cityname">西安</van-button>
      <van-button type="default" size="small" class="hot-cityname">南京</van-button>
      <van-button type="default" size="small" class="hot-cityname">杭州</van-button>
      <van-button type="default" size="small" class="hot-cityname">成都</van-button>
      <van-button type="default" size="small" class="hot-cityname">重庆</van-button>
    </div>
    <!-- 城市列表部分 -->
    <div class="city-list">
        <ul>
            <li v-for="(province,i) in provinceList"
                :key="i"
                class="red"
                >
                {{province.Name}}
                <!-- <li v-for="(city,j) in province.City"
                        :key="j"
                        class="black"
                      >
                      {{province.City.Name}}
                </li> -->
                <!-- <ul>
                    <li v-for="(city,j) in province.City"
                        :key="j"
                        class="black"
                      >
                      {{province.City.Name}}
                    </li>
                </ul> -->
            </li>
        </ul>
        
    </div>
      

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
      return {
        provinceList: [],
        cityList:[],
        letters:['定位最近热门',
          'A','B','C','D','E','F','G','H','I',
          'J','K','L','M','N','O','P','Q',
          'R','S','T','U','V','W','X','Y','Z',
        ]
      };
  },
  computed:{

  },
  methods: {
    getCity:function(){

    }
  },

  created(){
    axios.get('http://localhost:8081/api/LocList.json')
          .then(response=>{
            console.log(response.data.CountryRegion.State);// Array数组,共33个省份
            var provinceData = response.data.CountryRegion.State;
            for(var i=0;i<provinceData.length;i++){
                // var cityData = provinceData[i].City;
                this.provinceList.push(provinceData[i]);// province[i]
                // for(var j=0;j<provinceData[i].City.length;j++){
                //     this.cityList.push(cityData[j]);
                // }
            }
            

          })
  }
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
        .red{
            color:red;
            .black{
                color: #000000;
                font-size: 12px;
            }
        }
    }
  }
  
  .quick-find{
    width: 10%;
    position: absolute;
    right: 2%;
    top: 10%;
    font-size: 12px;
    text-align: right;
    li{
      margin-bottom: 5px;
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
    height: 150px;
    background: #f5f5f5;
    margin-top: 10px;
    margin-bottom: 10px;
    .hot-cityname{
      margin-left: 12px;
      margin-top: 16px;
    }
  }
</style>

