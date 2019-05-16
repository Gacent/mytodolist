import Mock from 'mockjs'
const Random = Mock.Random
Mock.mock('/list', 'get', function (options) {
  // console.log(options) //包含了url,type,和传递的参数
  Random.ctitle()
  Random.datetime()
  return Mock.mock({
    'list|1-10': [{
      'date': '@datetime("yyyy-MM-dd HH:mm:ss")',
      'dolist': '@ctitle()',
      'iscompleted|1-2': true
    }]
  })
})
