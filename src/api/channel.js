import request from '@/utils/request'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
