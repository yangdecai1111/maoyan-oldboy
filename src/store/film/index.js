import axios from 'axios'
import {
  Toast
} from 'vant'
export default {
  namespaced: true,
  state: {
    filmList: [],
    movieIdsArr: [],
    pageNum: 0,
    filmList2: [],
    mostList: [],
    offsetNum: 0,
    mostList2: [],
    comingList: [],
    movieIdsArr2: [],
    pageNum2: 0

  },
  getters: {
    formatComingList(state) {
      let list = state.comingList;
      let index = 0
      let hash = {}
      var result = []
      for (let i = 0; list.length > i; i++) {
        let time = list[i]
        let comingTitle = time.comingTitle
        if (hash[comingTitle]) {
          result[hash[comingTitle] - 1].list.push(time)
        } else {
          hash[comingTitle] = ++index
          let obj = {
            comingTitle: comingTitle,
            list: [time]
          }
          result.push(obj)
        }
      }
      return result;
    }
  },
  mutations: {
    SETFILMLIST(state, list) {
      state.filmList = list
    },
    SETFILMLIST2(state, list) {
      state.filmList2 = list
    },
    SETmovieIdsArr(state, movieIds) {
      state.movieIdsArr = movieIds
    },
    ADDPAGENUM(state, isReset) {
      isReset ? state.pageNum = 10 : state.pageNum += 10
    },
    MOSTLIST(state, list) {
      state.mostList = list
    },
    ADDOFFSET(state, isReset) {
      isReset ? state.offsetNum = 0 : state.offsetNum += 10
    },
    MOSTLIST2(state, list) {
      state.mostList2 = list
    },
    COMINGLIST(state, list) {
      state.comingList = list
    },
    SETmovieIdsArr2(state, movieIds) {
      state.movieIdsArr2 = movieIds
    },
    ADDPAGENUM2(state, isReset) {
      isReset ? state.pageNum2 = 10 : state.pageNum2 += 10
    },
  },
  actions: {
    getFilmList({
      commit,
      state
    }, isLoadMore) {
      Toast.loading({
        duration: 0,
        message: '加载中...'
      })
      let arr = state.movieIdsArr.slice(2 + state.pageNum, 12 + state.pageNum)
      // console.log(arr);
      let str = arr.join(',')
      console.log(str);
      if (isLoadMore) {
        console.log(123);
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
          commit("SETFILMLIST2", newData2)
          let newData3 = [...state.filmList, ...state.filmList2]
          commit("SETFILMLIST", newData3)
          commit('ADDPAGENUM')
          Toast.clear()
        })
      } else {
        axios.get('http://localhost:8080/ajax/movieOnInfoList', {
            params: {
              token: ''
            }
          })
          .then(res => {
            let movieIdsArr = res.data.movieIds
            let data = res.data.movieList;
            let newData = data.map(function (item) {
              return {
                ...item,
                img: item.img.replace('w.h', '128.180')
              }
            })
            commit("SETmovieIdsArr", movieIdsArr)
            commit("SETFILMLIST", newData)
            commit('ADDPAGENUM')
            Toast.clear()
          })
      }

    },
    getmostList({
      commit,
      state
    }, isMore) {
      let offsetNum = state.offsetNum;
      let setmostList = state.setmostList
      axios.get('http://localhost:8080/ajax/mostExpected', {
        params: {
          ci: 10,
          limit: 10,
          offset: offsetNum,
          token: ''
        }
      }).then(res => {
        let data = res.data.coming

        let newData = data.map(function (item) {
          return {
            ...item,
            img: item.img.replace('w.h', '128.180')
          }
        })
        if (!isMore) {
          let setmostList = [...newData]
          commit('MOSTLIST', setmostList)
          commit('ADDOFFSET')
        } else {
          commit('MOSTLIST2', newData)
          let setmostList = [...state.mostList, ...state.mostList2]
          commit('MOSTLIST', setmostList)
          commit('ADDOFFSET')
        }


      })
    },

    getcomingList({
      commit,
      state
    }, isComing) {
      Toast.loading({
        duration: 0,
        message: '加载中...'
      })
      let arr = state.movieIdsArr2.slice(2 + state.pageNum2, 12 + state.pageNum2)
      // console.log(arr);
      let str = arr.join(',')
      if (isComing) {
        console.log('jinlaimei')
        axios.get("http://localhost:8080/ajax/moreComingList", {
          params: {
            ci: 10,
            token: "",
            limit: 10,
            movieIds: str
          }
        }).then(res => {
          let data2 = res.data.coming
          console.log(res)
          var newData2 = data2.map(function (item) {
            return {
              ...item,
              img: item.img.replace('w.h', '128.180')
            }
          })


          // commit("COMINGLIST2",newData2)
          // let newData3 = [...state.comingList,...newData2]
          commit("COMINGLIST", [...state.comingList, ...newData2])
          commit('ADDPAGENUM2')
          Toast.clear()
        })
      } else {
        axios.get("http://localhost:8080/ajax/comingList", {
            params: {
              ci: 10,
              token: '',
              limit: 10
            }
          })
          .then(res => {
            let coming = res.data.coming
            let movieIds = res.data.movieIds
            // for(let i=0;movieIds.length>i;i++){
            //   console.log(i)
            // }
            let newData = coming.map(function (item) {
              return {
                ...item,
                img: item.img.replace('w.h', '128.180')
              }
            })
            commit("COMINGLIST", newData)
            commit("SETmovieIdsArr2", movieIds)
            commit('ADDPAGENUM2')
            Toast.clear()
          })
      }
    }
  }
}
