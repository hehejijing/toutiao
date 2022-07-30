import axios from 'axios'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

export default request
