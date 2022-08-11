import request from '@/utils/request'

/**
 * 获取文章评论
 * @param {*} articleId 文章id
 * @returns promise
 */
export const getArticleComment = (articleId) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source: articleId
    }
  })
}

// 对评论点赞
export const goodComment = (commmentsId) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commmentsId
    }
  })
}

// 取消对评论点赞
export const cancelGoodComment = (id) => {
  return request({
    url: `/v1_0/comment/likings/${id}`,
    method: 'delete'
  })
}

// 对文章评论
export const commentArticle = (id, content) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: id,
      content
    }
  })
}
