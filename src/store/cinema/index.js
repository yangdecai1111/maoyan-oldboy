import axios from 'axios'
export default {
  namespaced: true,
  state: {
    cityList: []
  },
  mutations: {
    SETCITYLIST (state, list) {
      state.cityList = list
    }
  },
  actions: {
    getCityList ({ commit }) {
      axios.get('http://localhost:8080/ajax/cinemaList?day=2019-06-11&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1560235018075&cityId=30').then(response => {
        let res = response.data
        commit('SETCITYLIST', res.cinemas)
      })
    }
  }
}
