import axios from 'axios'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state: {
    cityList: [],
    offset: 0,
    limit: 20,
    loading: false,
    day: new Date().toLocaleDateString(),
    district: [],
    subway: [],
    cityName: '深圳',
    latestCity: ['北京', '上海', '广州'],
    codeList: 30,
    cinemaDetail: {},
    curSelectMovieId: undefined,
    curDateIndex: 0 // 当前选择当前时间的下标
    // curSelectDay
  },
  getters: {
    changecinemaDetail (state) {
      let data = state.cinemaDetail.showData ? state.cinemaDetail.showData.movies : []
      let newdata = data.map(function (item) {
        return {
          ...item,
          img: item.img.replace('w.h', '128.180')
        }
      })
      return newdata
    },
    curSelectMovieAndPlist (state, getters) {
      let result = []
      if (state.curSelectMovieId) {
        let obj = getters.changecinemaDetail.find(item => item.id === state.curSelectMovieId)
        result = obj.shows[state.curDateIndex] ? obj.shows[state.curDateIndex].plist : []
      }
      return result
    },
    curSelectMovie (state, getters) {
      let result = {}
      if (state.curSelectMovieId) {
        result = getters.changecinemaDetail.find(item => item.id === state.curSelectMovieId)
      }
      return result
    },
    getvipInfo (state) {
      return state.cinemaDetail.showData ? state.cinemaDetail.showData.vipInfo : []
    },
    getDealList (state) {
      let data = state.cinemaDetail.dealList ? state.cinemaDetail.dealList.dealList : []
      let newData = data.map(function (item) {
        return {
          ...item,
          imageUrl: item.imageUrl.replace('w.h', '128.180')
        }
      })
      return newData
    }
  },
  mutations: {
    CHGSELECTMOVIEID (state, id) {
      state.curSelectMovieId = id
    },
    CHGDATEINDEX (state, index) {
      state.curDateIndex = index
    },
    SETCITYLIST (state, list) {
      state.cityList = list
    },
    SETLOADING (state, bol) {
      state.loading = bol
    },
    ADDOFFSET (state) {
      state.offset += 20
    },
    SETDISTRICT (state, list) {
      state.district = list
    },
    SETSUBWAY (state, list) {
      state.subway = list
    },
    whichCity (state) {
      state.cityName = '上海'
    },
    SETCODELIST (state, res) {
      state.codeList = res
    },
    SETCINEMADETAIL (state, list) {
      state.cinemaDetail = list
    }
  },
  actions: {
    getCityList ({
      commit,
      state
    }, isMore) {
      commit('SETLOADING', true)
      Toast.loading({
        duration: 0,
        message: '加载中...'
      })
      setTimeout(() => {
        axios.get('/maoyan/ajax/cinemaList', {
          params: {
            day: state.day,
            offset: state.offset,
            limit: state.limit,
            districtId: -1,
            lineId: -1,
            hallType: -1,
            brandId: -1,
            serviceId: -1,
            areaId: -1,
            stationId: -1,
            item: '',
            updateShowDay: false,
            reqId: 1560326026872,
            cityId: state.codeList
          }
        }).then(response => {
          let res = response.data
          Toast.clear()
          if (isMore) {
            let newCityList = [...state.cityList, ...res.cinemas]
            commit('SETCITYLIST', newCityList)
          } else {
            commit('SETCITYLIST', res.cinemas)
          }
          commit('ADDOFFSET')
          commit('SETLOADING', false)
        })
      }, 500)
    },
    getDistrictList ({
      commit, state
    }) {
      Toast.loading({
        duration: 0,
        message: '加载中...'
      })
      axios.get('/maoyan/ajax/filterCinemas', {
        params: {
          ci: state.codeList
        }
      }).then(response => {
        let res = response.data
        commit('SETDISTRICT', res)
        Toast.clear()
      })
    },
    getCodeList ({
      commit
    }, res) {
      commit('SETCODELIST', res)
    },
    getCinemaDetail ({ commit }, id) {
      Toast.loading({
        duration: 0,
        message: '加载中...'
      })
      axios.get('/maoyan/ajax/cinemaDetail', {
        params: {
          cinemaId: id,
          movieId: 246973
        }
      }).then(response => {
        let res = response.data
        commit('SETCINEMADETAIL', res)
        Toast.clear()
      })
    }
  }
}
