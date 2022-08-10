import request from '@/utils/request'

/**
 * 获取文章列表
 * @param {*} channelId 频道id
 * @param {*} timestamp 请求第一页数据传当前的时间戳 请求上一页数据传上一页的时间戳
 * @returns promise
 */
export const getArticleAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}

export const getArticleInfo = (artid) => {
  return request({
    url: `/v1_0/articles/${artid}`
  })
}

/**
 *  点赞文章
 * @param {*} id  文章id
 * @returns  promise
 */
export const likes = (id) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/**
 * 取消点赞文章
 * @param {*} id 文章id
 * @returns promise
 */
export const cancelLikes = (id) => {
  return request({
    url: `/v1_0/article/likings/${id}`,
    method: 'delete'
  })
}

/**
 *收藏文章
 * @param {*} id文章id
 * @returns promise
 */
export const collection = (id) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}

export const cancelCollection = (id) => {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'delete'
  })
}
