import axios from 'axios'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state: {
    searchList: []
    // sousuoList:[]
    // inputVal: 0 //当前影片类型
  },
  mutations: {
    SEARCHLIST (state, list) {
      state.searchList = list
    }
  //  SOUSUOLIST (state,list) {
  //   state.sousuoList = list
  // }
  // SOUSUOLIST (state, type) {
  //   state.inputVal = type
  // }
  },
  actions: {
    getSearchList ({ commit }, payload) {
      // console.log(payload)
      // console.log(newVal)
      axios.get('http://localhost:8080/ajax/search',
        {
          params: {
            kw: payload.newVal,
            cityId: 30,
            // stype: 2
            stype: payload.inputVal
          }
        }
      ).then(response => {
        // console.log(response);
        let res = []
        if (payload.inputVal === -1) {
          res = response.data.movies.list
          let resData = res.map(item => {
            return {
              ...item,
              img: item.img.replace('w.h', '128.180')
            }
          })
          commit('SEARCHLIST', resData)
        } else if (payload.inputVal === 2) {
          res = response.data.cinemas.list
          let newRes = res.map(item => {
          // 结构赋值是把新的hallType给改变
          // hasOwnProperty判断有某个属性,重新改变数据,在判断
            return {
              ...item,
              hallType: item.hasOwnProperty('hallType') ? (item.hallType.length == 0 ? false : item.hallType) : false
            }
          })
          commit('SEARCHLIST', newRes)
        }
      })
    }
  }
}
