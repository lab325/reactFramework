import axios from 'axios'

const service = axios.create({
  timeout: 2000
})

// 请求前拦截
service.interceptors.request.use(config => {
  // if (getToken()) {
  //   config.headers['x-auth-token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  // }
  config.headers['x-request-client'] = 'web'
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// 去请求后拦截
service.interceptors.response.use(
  response => {
    // const res = response.data
    // 此处可以进行强制登出、路由跳转等
    return response
  },
  error => {
    // for debug
    console.log('err' + error)
    return Promise.reject(error)
  })

export default service
