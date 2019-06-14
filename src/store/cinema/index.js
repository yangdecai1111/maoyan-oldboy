import axios from 'axios'
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
    latestCity: ['北', '上', '广'],
    codeList: 30,
    cinemaDetail: {},
    piclist: []
  },
  mutations: {
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
    },
    SETPICLIST (state, list) {
      state.piclist = list
    }
  },
  actions: {
    getCityList ({
      commit,
      state
    }, isMore) {
      commit('SETLOADING', true)
      setTimeout(() => {
        axios.get('http://localhost:8080/ajax/cinemaList', {
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
      axios.get('http://localhost:8080/ajax/filterCinemas', {
        params: {
          ci: state.codeList
        }
      }).then(response => {
        let res = response.data
        commit('SETDISTRICT', res)
      })
    },
    getCodeList ({
      commit
    }, res) {
      commit('SETCODELIST', res)
    },
    getCinemaDetail ({ commit }, id) {
      axios.get('http://localhost:8080/ajax/cinemaDetail', {
        params: {
          cinemaId: id,
          movieId: 246973
        }
      }).then(response => {
        let res = response.data
        commit('SETCINEMADETAIL', res)
      })
    },
    getPicList ({ commit }, id) {
      axios.get('http://localhost:8080/ajax/cinemaDetail', {
        params: {
          cinemaId: id,
          movieId: 246973
        }
      }).then(response => {
        let res = response.data
        let data = res.showData.movies
        let newdata = data.map(function (item) {
          return {
            ...item,
            img: item.img.replace('w.h', '128.180')
          }
        })
        commit('SETPICLIST', newdata)
      })
    }
  }
}
