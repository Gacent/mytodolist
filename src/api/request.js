import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '/', // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use((configArg) => {
  const config = configArg
  return config
}, (error) => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    console.log('数据返回', res)
    return res
  },
  error =>
    Promise.reject(error)

)

export default service
