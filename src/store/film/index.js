import axios from 'axios'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state: {
    filmList: [],
    movieIdsArr: [],
    pageNum: 0,
    filmList2: []
  },
  mutations: {
    SETFILMLIST (state, list) {
      state.filmList = list
    },
    SETFILMLIST2 (state, list) {
      state.filmList2 = list
    },
    SETmovieIdsArr (state, movieIds) {
      state.movieIdsArr = movieIds
    },
    ADDPAGENUM (state, isReset) {
      isReset ? state.pageNum = 10 : state.pageNum += 10
    }
  },
  actions: {
    getFilmList ({ commit, state }, isLoadMore) {
      Toast.loading({
        duration: 0,
        message: '加载中...'
      })
      let filmList1 = state.filmList
      let arr = state.movieIdsArr.slice(2 + state.pageNum, 12 + state.pageNum)
      console.log(arr)
      let str = arr.join(',')
      console.log(str)
      if (isLoadMore) {
        console.log(123)
        axios.get('http://localhost:8080/ajax/moreComingList', {
          params: {
            token: '',
            movieIds: str
          }
        }).then(res => {
          let data2 = res.data.coming

          var newData2 = data2.map(function (item) {
            return {
              ...item,
              img: item.img.replace('w.h', '128.180')
            }
          })
          console.log(newData2)

          commit('SETFILMLIST2', newData2)
          let newData3 = [...state.filmList, ...state.filmList2]
          commit('SETFILMLIST', newData3)
          commit('ADDPAGENUM')
          toast1.clear()
        })
      } else {
        axios.get('http://localhost:8080/ajax/movieOnInfoList', {
          params: {
            token: ''
          }
        })
          .then(res => {
            let movieIdsArr = res.data.movieIds
            var data = res.data.movieList
            var newData = data.map(function (item) {
              return {
                ...item,
                img: item.img.replace('w.h', '128.180')
              }
            })
            commit('SETmovieIdsArr', movieIdsArr)
            commit('SETFILMLIST', newData)
            commit('ADDPAGENUM')
            Toast.clear()
          })
    }
  }
}
}
