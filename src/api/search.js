import request from '../utils/request'

export const getSearchSuggestionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

/**
 * 获取搜索结果
 * @param {*} params 需要传入的参数 包含page 页数（非必选） per-page 每页数量（非必选） q 搜索关键词（必选）
 * @returns promise
 */
export const getSearchResultsAPI = (params) => {
  return request({
    url: '/v1_0/search',
    params
  })
}
