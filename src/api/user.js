import request from '@/utils/request'

/**
 *登录API
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns promise
 */
export const getCodeApi = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 如果传的是对象, axios默认将对象转成json并且加上content-type=application/json
// 如果传的是formDate表单, 那么axios会将表单提交给后端, 并且默认的加上content-type=mutipart/form-data
// 如果后端要的是表单(form-data)
// const fm = new FormData()
// fm.append(表单的name,表单项)
/**
 * 上传头像
 * @param {*} file  图片的file对象
 * @returns  promise
 */
export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: 'v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
/**
 * 更新用户信息
 * @param {*} data 需要更新的信息
 * @returns promise
 */
export const uploadProfile = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

/**
 * 获取用户基本信息
 * @returns  promise
 */
export const getUser = () => {
  return request({
    url: '/v1_0/user'
  })
}
