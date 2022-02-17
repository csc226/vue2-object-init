import axios from 'axios'
import cookie from 'vue-cookie';
import router from '../../router.js'
//import {access_token} from "./auth.js"
// http request 拦截器 
// const token='bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcHVzTG9naW5Vc2VyIjp7InVzZXIiOnsidXNlcklkIjoiMmNlOGVmNzgtYmUwZS00OTc4LWJjZWMtMjNiZDI4MTY1YWVjIiwidXNlck5hbWUiOiJ1cGVfYWRtaW4iLCJsb2dpbk5hbWUiOiJ1cGVfYWRtaW4iLCJsb2dpblB3ZCI6bnVsbCwiaXNMb2NrIjpudWxsLCJsb2dpbkZhaWxOdW0iOm51bGwsImxvY2tUaW1lIjpudWxsfSwib3JncyI6bnVsbCwiY3VycmVudE9yZ0lkIjoiQSIsImN1cnJlbnRPcmdDb2RlIjoiUjAwMSIsImN1cnJlbnRUbW4iOiJwYyIsImFwcFNvZnRDb250ZXh0cyI6W10sInRtbk1lbnVDb250ZXh0cyI6W119LCJ1c2VyX25hbWUiOiJ1cGVfYWRtaW4iLCJzY29wZSI6WyJhbGwiXSwiZXhwIjoxNTk2NTc5NDk5LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiOTVhZjY2Y2MtNzY2My00MTMzLTg4ZDMtZmI0NDIzNjFiMDU0IiwiY2xpZW50X2lkIjoiYWdjb20ifQ.FdE7h62RoOuxkI5vFsI2ZRIJ3pa0P_7nqBpedtei9Ts';
axios.interceptors.request.use( 
  config => { 
    // console.log('config.url:',config.url)
      if (config.url.split('/').pop() === 'form') {
      }else if(config.url.indexOf('analysis')>-1){
      } else {
        // config.headers.Authorization=token
          if (cookie.get("access_token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
              config.headers.Authorization = 'bearer '+cookie.get("access_token");
          }else{
              router.push({
                  path:'/',
              });
          }
      }
     
      return config; 
  }, 
err => { 
  return Promise.reject(err); 
}); 
// http response 拦截器 
// axios.interceptors.response.use( 
// response => { 
//   alert("响应拦截成功");
//   return response; 
// }, 
// err => { 
//   alert("响应拦截失败");
//   return Promise.reject(err); 
// }); 
export default axios
