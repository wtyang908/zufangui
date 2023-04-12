import request from '@/utils/request'

// 查询评论回复列表
export function listReply(query) {
  return request({
    url: '/system/reply/list',
    method: 'get',
    params: query
  })
}

// 查询评论回复详细
export function selectHouseReplyByCommentId(commentId) {
  return request({
    url: '/system/reply/list/' + commentId,
    method: 'get'
  })
}

//增加了回复和被恢复者昵称
export function getReply(id) {
  return request({
    url: '/system/reply/' + id,
    method: 'get'
  })
}

// 新增评论回复
export function addReply(data) {
  return request({
    url: '/system/reply',
    method: 'post',
    data: data
  })
}

// 修改评论回复
export function updateReply(data) {
  return request({
    url: '/system/reply',
    method: 'put',
    data: data
  })
}

// 删除评论回复
export function delReply(id) {
  return request({
    url: '/system/reply/' + id,
    method: 'delete'
  })
}
