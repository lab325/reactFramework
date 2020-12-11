import axios from 'axios'
// import { actionCreators } from './store/index'
// import store from '../store/index'

const $http = axios.create({
    // 超时时间 根据自己所需配置
    timeout: 8000
})

// 拦截器
$http.interceptors.request.use(function(config) {
    // 你可以在去请求前做的一些时候
    // 比如向请求头添加token以及处理全局loading但是每次调用api时都会进行loading所以我们使用按需引入loading
    return config
}, function(error) {
    return Promise.reject(error)
})

// 响应器
$http.interceptors.response.use(function(response) {
    // 响应器你可以在这里进行数据进行响应之后处理的一些抒情
    // loadinger(false)
    return response
}, function(error) {
    // Do something with response error
    return Promise.reject(error)
})

// function loadinger(flag) {
//     //  通过dispatch发送不同的action来执行不同的reducer
//     if (flag === true) {
//         store.dispatch(actionCreators.dispatchGalobData())
//     } else {
//         setTimeout(function() {
//             store.dispatch(actionCreators.dispatchGaladFalse())
//         }, 500)
//     }
// }

// 这里我使用了Es7的async/await
class http {
    // get
    static async get(url, params, loading) {
        // loading为你要按需使用的loading的值如果为true就开启如果为false就不开启
        // 因为await使异步等待执行所以他会先执行loading函数
        // loading ? loadinger(loading) : loadinger(undefined)
        // return await $http.get(url,{params})
        return $http.get(url, { params })
    }
    // post
    static async post(url, params, loading) {
        // loadinger(loading)
        // return await $http.post(url,{params});
        return $http.post(url, { params })
    }
    // all
    static async all(arr) {
        // 判断传入的值是不是数组如果不是的话就抛出‘错误参数’的弹窗
        if (Object.prototype.toString.call(arr) === '[object Array]') {
            // 注意这里的不是实例上的方法是axios的方法
            return await axios.all(arr)
        } else {
            const error = new Error('错误参数')
            try {
                throw error
            } catch (error) {
                    console.log(error)
            }
        }
    }
}

export default http
