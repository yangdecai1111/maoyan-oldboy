import axios from './node_modules/axios';
const http=axios.create();

http.defaults.baseURL =Process.env.NODE_ENV ==='production' ? 'http://m.maoyan.com/':'http://m.maoyan.com/';

http.defaults.timeout=1000;

http.interceptors.response.use(response=>{
  let res = response.data
  if (res.status === 0) {
    // 接口真正成功
    return res
  } else {
    // 接口后台逻辑有bug
    Toast(res.msg)
  }
}, error => {
  Toast(error.message)
})

export default http
