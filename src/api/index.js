import request from './request'
const getList = (data) => request({
  url: '/list',
  method: 'GET',
  data
})
export default {
  getList
}
